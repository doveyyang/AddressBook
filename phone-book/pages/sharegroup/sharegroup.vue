<template>
	<view>
		
		<view class="btn-row">
			<text>分享组（{{name}}）给以下好友</text>
			<button type="primary" eplain @click="ShareTo">分享给他们</button>
		</view>
		<checkbox-group class="block" @change="CheckboxChange">
			<view class="cu-form-group margin-top" v-for="(item,index) in checkbox" :key ="index">
				<view class="title">{{item.nickname}}</view>
				<checkbox :class="item.checked?'checked':''" :checked="item.checked?true:false" :value="item.id+''"></checkbox>
				<!-- <checkbox class="checked" :checked="true" :value="item.id+''"></checkbox> -->
			</view>
			
		</checkbox-group>
		<!-- <view class="btn-view">
			<button type="primary">分享给他们</button>
		</view> -->
		
	</view>
</template>

<script>
	import { mapState,
		    mapMutations } from 'vuex';
	import service from '../../service.js'
	export default {
		data() {
			return {
				id:-1,				
				name:'',
				checkbox: [],
				value:'',
			};
		},
		onLoad(option) {
			
			if(!this.hasLogin){
				// 获取id失败，重新到某个页面
				uni.reLaunch({
					url: '../main/main'
				});
			}
			if (!option.id ) {
				// 获取id失败，重新到某个页面
				uni.reLaunch({
					url: '../main/main'
				});
			}else{
				
				this.id = option.id;
				this.name = option.groupname;
				this.initdata();
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','info','password']),
		methods:{
			initdata(){
				// 获取当前列表下的用户
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				
				data.bid = this.id;
				
				uni.showToast({
					icon:"loading",
					duration:1500
				})
				uni.request({
					url:`${service.BASEURL}/User/getAllUser`,
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
							let checkbox= res.data.data;
							for (let i = 0; i < checkbox.length; i++) {
								checkbox[i].checked=false;
							}
							self.checkbox  = checkbox;
							
						}
					},
				})
			},
			CheckboxChange(e) {
				
				var items = this.checkbox,
					values = e.detail.value;
				this.value = values;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].id == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			ShareTo(){
				if(this.value==''){
					uni.showToast({
						title:'请选择分享的好友',
						icon:'none'
					})
					return 
				}
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				
				data.other = this.value.join(',');
				data.teamid = this.id;
				
				uni.showToast({
					icon:"loading",
					duration:1500
				})
				uni.request({
					url:`${service.BASEURL}/User/share`,
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
							uni.showToast({
							    title: res.data.msg,
								icon:'none',
								complete() {
										uni.navigateBack({
										delta:1
									})
								}
							});
						}
					},
				})
			}
		}
	}
</script>

<style lang="scss">
.btn-row{
	padding: 20upx;
}
input{
	text-align: right;
	color: #999;
}

</style>
