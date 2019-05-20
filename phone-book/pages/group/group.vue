<template>
	<view >
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">分组一</block>
			<block slot="right">
				<view class="right-box" @click="showModal" data-target="RadioModal">
					编辑
				</view>
			</block>
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
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="text-grey">李菊岚</view>
						<view class="text-gray text-sm flex">
							<text class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								需要保持长期跟进联系
							</text>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs text-cut">总经理</view>
						<!-- <view class="cu-tag round bg-grey sm"></view> -->
					</view>
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
import { mapState } from 'vuex';

export default {
	data() {
		return {
			list: [{ name: '列表一', count: '2', id: 1 }, { name: '列表二', count: '3', id: 2 }],
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
			gridCol: 3,
			gridBorder: false
		};
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	onLoad(option) {
		console.log(option.id);
		console.log(JSON.stringify(option));
		if (!option.id) {
			// 获取id失败，重新到某个页面
			uni.reLaunch({
				url: '../main/main'
			});
		}
		uni.setNavigationBarTitle({
			title:'分组一'
		})
	},
	methods: {
		gotogroup(id) {
			uni.redirectTo({
				url: `/pages/group/group?id=${id}`
			});
		},
		gotoUrl(url){
			uni.navigateTo({
				url:url
			})
		},
		showModal(e) {
			// debugger;
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		editgroup(){
			this.hideModal();

			console.log('编辑分组')
			uni.showToast({
				title:'编辑分组'
			})
		},
		deletegroup(){
			console.log('删除分组')
			this.hideModal();
			uni.showToast({
				title:'删除分组'
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
</style>
