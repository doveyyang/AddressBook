<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">主分组名</view>
				<input placeholder="请输入主分组名称" v-model="name"></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">输入框</view>
				<input placeholder="三字标题" name="input"></input>
			</view> -->
		</form>
		<view class="btn-view">
			<button type="primary" @click="addgroup" >添加主分组</button>
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
				name:'',
				pId : -1
			};
		},
		onLoad(option) {
			if(!this.hasLogin){
				// 获取id失败，重新到某个页面
				uni.reLaunch({
					url: '../main/main'
				});
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','info','password']),
		methods:{
			addgroup(){
				let self = this;
				if(this.name || this.name != ''){
					let data2 = {}
					data2.password = this.password;
					let ndata = JSON.parse(this.info);
					data2.id = ndata.id;
					data2.account = ndata.account;
					data2.token = ndata.token;
					
					data2.level = 0;
					data2.name = this.name;
					// 获取该组下的分组
					uni.request({
						url:`${service.BASEURL}/Addbookcategory/append`,
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
								uni.showToast({
								    title: res.data.msg,
									success() {
										// uni.navigateTo({
										// 	url:'../group/group?id='+self.pId
										// })
										uni.navigateBack({
											delta:1
										})
									}
								});
								
							}
						},
					})
					
					// uni.showToast({
					// 	title:`添加分组${name}成功`,
					// 	success() {
					// 		uni.navigateTo({
					// 			url:'../group/group?id=1'
					// 		})
					// 	}
					// })
				}else{
					uni.showToast({
						title:`请输入分组名`,
						icon:'none'
					})
				}
				console.log(this.name);
			},
			editgroup(){
				let self = this;
				console.log('editgroup')
				let data2 = {}
				data2.password = this.password;
				let ndata = JSON.parse(this.info);
				data2.id = ndata.id;
				data2.account = ndata.account;
				data2.token = ndata.token;
				
				data2.cid = this.pId;
				data2.name = this.name;
				// 获取该组下的分组
				uni.request({
					url:`${service.BASEURL}/Addbookcategory/edit_category`,
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
							uni.showToast({
							    title: res.data.msg,
								success() {
									uni.navigateTo({
										url:'../group/group?id='+self.pId
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
.btn-view{
	padding: 20upx;
}
</style>
