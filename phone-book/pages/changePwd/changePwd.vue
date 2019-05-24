<template>
	<view>
		<form> 
			<view class="cu-form-group margin-top">
				<view class="title">旧密码</view>
				<input placeholder="请填写旧密码" password name="input" v-model="oldpassword"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">新密码</view>
				<input placeholder="请输入新密码" password name="input" v-model="newpassword"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">再次输入新密码</view>
				<input placeholder="请输入再次输入新密码" password name="input" v-model="renewpassword"></input>
			</view>
			<view class="btn-row">
				<button type="primary" plain @click="submit">提交修改</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	import { mapState,
		    mapMutations } from 'vuex';
	import service from '../../service.js'
	export default {
		data() {
			return {
				
				oldpassword:'',
				newpassword:'',
				renewpassword:''
				
				
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
			
			submit(){
				let self = this;
				if(!this.hasLogin) return;
				if(this.newpassword!= this.renewpassword || this.newpassword.length<5){
					uni.showToast({
						icon:'none',
						title:'两次输入密码不一致，且不能低于5位，请重新输入',
						success() {
							
							self.newpassword = '';
							self.renewpassword = ''
						}
					})
					return ;
				}
				if(this.oldpassword== this.renewpassword){
					uni.showToast({
						icon:'none',
						title:'新旧输入密码一致，请重新输入',
						success() {
							self.newpassword = '';
							self.renewpassword = ''
						}
					})
					return ;
				}
				
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				
				data.oldpwd = this.oldpassword;
				
				data.newpwd = this.newpassword;
				
				uni.request({
					url:`${service.BASEURL}/User/editpwd`,
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
								success() {
									// uni.navigateTo({
									// 	url:'../group/group?id='+self.Id
									// })
									uni.navigateBack({
										delta:1
									})
								}
							});
							
						}
					},
				})
			},
			deleUser(){
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
								
				data.bid = this.Id;
				
				uni.request({
					url:`${service.BASEURL}/Addressbook/delbook`,
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
								success() {
									// uni.navigateTo({
									// 	url:'../group/group?id='+self.Id
									// })
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
							});
							
						}
					},
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			ChooseImage() {
				let self = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res1) => {
						const tempFilePaths = res1.tempFilePaths;
						uni.uploadFile({
							url: `${service.BASEURL}/User/upload`, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								res.data = JSON.parse(res.data);
								if(res.data.status == 1){
									self.headUrl = res.data.info
									if (self.imgList.length != 0) {
										self.imgList = self.imgList.concat(res1.tempFilePaths)
									} else {
										self.imgList = res1.tempFilePaths
									}
									
									uni.showToast({
										title:'上传成功',
										icon:'none'
									})
								}
								
							}
						});
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current:e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除图片吗？',
					cancelText: '返回',
					confirmText: '删掉',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.btn-row{
	padding: 20upx;
	button{
		margin: 10upx;
	}
}
input{
	text-align: right;
	color: #999;
}
</style>
