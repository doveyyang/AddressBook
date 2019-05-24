<template>
	<view>
		<form> 
			<view class="cu-form-group margin-top">
				<view class="title">我的昵称</view>
				<input placeholder="请填写姓名" name="input" v-model="name"></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">手机</view>
				<input placeholder="请输入用户联系方式" name="input" v-model="phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">公司名称</view>
				<input placeholder="请输入公司名称(选填)" name="input" v-model="company"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">职务</view>
				<input placeholder="请输入用户职务(选填)" name="input" v-model="position"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="请输入用户邮箱(选填)" name="input" v-model="email"></input>
			</view> -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					我的头像
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
					 :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
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
				index: -1,
				
				date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(), //'2019-12-25',
				
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
				Id:'',
				name:'',
				phone:'',
				company:'',
				position:'',
				headUrl:'',
				email:'',
				sort:'10',
				
				
			};
		},
		onLoad(option) {
			if(!this.hasLogin){
				// 获取id失败，重新到某个页面
				uni.reLaunch({
					url: '../main/main'
				});
			}
			
			this.initdata();
			
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
				
				// data.bid = this.Id;
				
				uni.showLoading({
					
				})
				uni.request({
					url:`${service.BASEURL}/User/My`,
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
							// self.name = res.data.data.nickname;
							// self.headUrl = `${res.data.data.head_img}`;
							let record = res.data.data;
							self.name =  record.nickname;
							// self.phone = record.mobile;
							// self.company = record.company;
							// self.email = record.email;
							// self.position = record.position;
							self.headUrl = record.head_img;
							if(record.head_img){
								self.imgList.push( service.BASEIMGURL+record.head_img)
							}
						}
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			submit(){
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				
				data.nickname = this.name;
				
				data.head_img = this.headUrl;
				
				uni.request({
					url:`${service.BASEURL}/User/edituserinfo`,
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
