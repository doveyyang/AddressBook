<template>
	<view >
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
			<!-- <block slot="right">
				<view class="right-box" @click="showModal" data-target="RadioModal">
					编辑
				</view>
			</block> -->
		</cu-custom>
		<view class="content">
			<view class="cu-list grid" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
				<view class="cu-item" v-for="(item, index) in iconList" :key="index" v-if="index < gridCol * 2" @click="gotoUrl(item.page)">
					<view :class="['cuIcon-' + item.icon, 'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge != 0">
							<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
						</view>
					</view>
					<text>{{ item.name }}</text>
				</view>
			</view>

			<view class="cu-list menu margin-top" :class="[menuBorder ? 'sm-border' : '', menuCard ? 'card-menu margin-top' : '']">
				<view class="cu-item" v-for="(item, index) in list" :key="index" :class="menuArrow ? 'arrow' : ''" @click="gotogroup(item.id)">
					<view class="content">
						<text class="cuIcon-group_fill text-pink"></text>
						<text class="text-grey">{{ item.name }}</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ item.count }} 人</text>
					</view>
				</view>
				<view class="empty" v-if="list.length == 0">
					没有子分组
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(person,index) in personList" :key = "index" @click="showDetail(person)">
					<view class="cu-avatar round lg" :style="'background-image:url(//addressbook.jingru88.com/uploads/images/'+person.head_img+');'"></view>
					<view class="content">
						<view class="text-grey">{{person.name}}</view>
						<view class="text-gray text-sm flex">
							<text class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								{{person.company}} 
							</text>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs text-cut">{{person.position}}</view>
						<!-- <view class="cu-tag round bg-grey sm"></view> -->
					</view>
				</view>
				<view class="empty" v-if="personList.length == 0">
					未添加好友
				</view>
			</view>
			
			<!-- 编辑选择窗口 -->
			<!-- <view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 编辑分组
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="showModal" data-target="RadioModal">分组</button>
				</view>
			</view> -->
			<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog btn-dlg" @tap.stop="">
					<button type="primary" @click="editgroup" >编辑分组</button>
					<button type="warn" @click="deletegroup">删除分组</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
import { mapState,
	    mapMutations } from 'vuex';
import service from '../../service.js'
export default {
	data() {
		return {
			list: [],
			menuArrow: true,
			menuBorder: false,
			menuCard: false,
			iconList: [
				{
					icon: 'add',
					color: 'red',
					badge: 0,
					name: '分组',
					page: '/pages/addgroup/addgroup'
					
				},
				{
					icon: 'add',
					color: 'orange',
					badge: 0,
					name: '联系人',
					page: '/pages/addperson/addperson'
				},{
					icon: 'edit',
					color: 'orange',
					badge: 0,
					name: '编辑',
					page: 'edit'
				},
				{
					icon: 'share',
					color: 'olive',
					badge: 0,
					name: '分享',
					page: '/pages/addgroup/addgroup'
				}
			],
			modalName: null,
			gridCol: 4,
			gridBorder: false,
			currentId:-1,
			personList:[],
			title:""
		};
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'userName','info','password']),
	onLoad(option) {
		if(!this.hasLogin){
			// 获取id失败，重新到某个页面
			uni.reLaunch({
				url: '../main/main'
			});
		}
		console.log(option.id);
		console.log(JSON.stringify(option));
		if (!option.id) {
			// 获取id失败，重新到某个页面
			uni.reLaunch({
				url: '../main/main'
			});
		}else{
			
			this.currentId = option.id;
			this.initData();
		}
		
		
	},
	
	methods: {
		initData(){
			
			// 获取当前列表下的用户
			let self = this;
			if(!this.hasLogin) return;
			let ndata = JSON.parse(this.info);
			let data = {}
			data.password = this.password;
			data.id = ndata.id;
			data.account = ndata.account;
			data.token = ndata.token;
			data.level = 0;
			uni.showToast({
				icon:"loading",
				duration:1500
			})
			uni.request({
				url:`${service.BASEURL}/Addressbook/index`,
				data: data,
				method:'POST',
				header:{
					"content-type":"application/json"
				},
				success: (res) => {
					if(res.data && res.data.code!=200){
						uni.showToast({
						    title: res.data.msg,
							icon:'none'
						});
					}else{
						let list = res.data.data;
						
						for (let i = 0; i < list.length; i++) {
							if(list[i].id == self.currentId){
								self.personList = list[i].list ;
								console.log(list[i].name);
								self.setTitle(list[i].name); 
								break;
							}
							
						}
					}
				},
			})
			let data2 = {}
			data2.password = this.password;
			data2.id = ndata.id;
			data2.account = ndata.account;
			data2.token = ndata.token;
			data2.level = this.currentId;
			// 获取该组下的分组
			uni.request({
				url:`${service.BASEURL}/Addressbook/index`,
				data: data2,
				method:'POST',
				header:{
					"content-type":"application/json"
				},
				success: (res) => {
					if(res.data && res.data.code!=200){
						uni.showToast({
						    title: res.data.msg,
							icon:'none'
						});
					}else{
						self.list = res.data.data;
						
						for (let i = 0; i < self.list.length; i++) {
							self.list[i].count = `${self.list[i].list.length}`;
						}
					}
				},
			})
		},
		gotogroup(id) {
			uni.redirectTo({
				url: `/pages/group/group?id=${id}`
			});
		},
		setTitle(name){
			this.title = name;
		},
		gotoUrl(url){
			switch (url){
				case '/pages/addgroup/addgroup':
					uni.navigateTo({
						url:`${url}?id=${this.currentId}`
					})
					break;
					
				case '/pages/addperson/addperson':
					uni.navigateTo({
						url:`${url}?id=${this.currentId}`
					})
					break;
				case 'edit':
					this.showModal()
					// uni.navigateTo({
					// 	url:`${url}?id=${this.currentId}`
					// })
					break;
				default:
					break;
			}
			
		},
		showModal(e) {
			// debugger;
			this.modalName = "RadioModal";//e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		editgroup(){
			this.hideModal();
			console.log('编辑分组')
			uni.navigateTo({
				url:`../addgroup/addgroup?id=${this.currentId}&isEdit=true&name=${this.title}`
			})
			
			
			// uni.showToast({
			// 	title:'编辑分组'
			// })
		},
		deletegroup(){
			console.log('删除分组')
			this.hideModal();
			uni.showToast({
				title:'删除分组'
			})
		},
		showDetail(person){
			uni.navigateTo({
				url:`../editperson/editperson?cid=${person.id}`
			})
		}
		
	}
};
</script>

<style>
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}
.btn-dlg{
	padding: 20upx;
}
.btn-dlg button{
	margin: 20upx;
}

.title {
	color: #8f8f94;
	margin-top: 50upx;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}
.action-row {
	position: fixed;
	bottom: 100upx;
	left: 0;
}
.right-box{
	margin-right: 20upx;
}
.empty{
	text-indent: 0.5em;
	
}
</style>
