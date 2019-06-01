<template>
	<view>
		<form>			
			<!-- <view class="cu-form-group margin-top">
				<view class="title">录入日期</view>
				<picker mode="date" :value="date" start="2019-01-01" end="2020-01-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view> -->
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请填写姓名" name="input" v-model="name"></input>
			</view>
			<view class="cu-form-group">
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
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					用户头像
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
			<view class="margin-top remark-list margin-top">
				<view class="padding-sm bg-white">
					用户备注
				</view>
				<view class="item flex padding-sm " v-for="(item,index) in list" :key="index">
					<view class="left flex flex-direction flex-treble">
						<view class="text-black">
							{{item.uid}}
						</view>
						<view class="text-gray padding-sm">
							{{item.remarks}}
						</view>
					</view>
					<view class="right margin-top">
						<view class="margin-top">
							<button class="cu-btn round sm bg-blue" @tap="editRemarkBox(item.id,item.remarks)" data-target="editMarkModal" >修改</button>
						</view>
						<view class="margin-top">
							<button class="cu-btn round sm bg-red" @click="deleteRemark(item.id)">删除</button>
						</view>
					</view>
				</view>
			</view>
			<view class="btn-row">
				<button type="default" size="mini" plain  @click="callUser">联系用户</button>
				<button type="primary" size="mini" plain @click="submit">提交修改</button>				
				<button type="default" size="mini"  plain @tap="showModal" data-target="addMarkModal">添加备注</button>
				<button type="warn" size="mini"  @click="deleUser">删除用户</button>
			</view>
			
				
			
		</form>
		
		<!-- <view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 普通窗口
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="Modal">Modal</button>
			</view>
		</view> -->
		<view class="cu-modal" :class="modalName=='addMarkModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加备注</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<textarea maxlength="-1"  v-model="textareaBInput" placeholder="请输入备注"></textarea>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="addMark">确定</button>
				
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='editMarkModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">编辑备注</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<textarea maxlength="-1"  v-model="textareaBInput" placeholder="请输入备注"></textarea>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @click="editRemark">确定</button>
				
					</view>
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
				list:[],
				textareaBInput:'',
				editId:'',
			};
		},
		onLoad(option) {
			if(!this.hasLogin){
				// 获取id失败，重新到某个页面
				uni.reLaunch({
					url: '../main/main'
				});
			}
			if (!option.cid ) {
				// 获取id失败，重新到某个页面
				uni.reLaunch({
					url: '../main/main'
				});
			}else{
				
				this.Id = option.cid;
				this.initdata();
				this.initremarks();
				
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','info','password']),
		methods:{
			delremark(){
				console.log('delete remark')
			},
			initdata(){
				console.log('initdata')
				// 获取当前列表下的用户
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				
				data.bid = this.Id;
				
				uni.showLoading({
					
				})
				uni.request({
					url:`${service.BASEURL}/Addressbook/getInfo`,
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
							let record = res.data.data;
							self.name =  record.nickname;
							self.phone = record.phone;
							self.company = record.company;
							self.email = record.email;
							self.position = record.position;
							self.headUrl = record.head_img;
							if(record.head_img){
								self.imgList = [];
								let ilist = [];
								ilist.push( service.BASEIMGURL+record.head_img)
								self.imgList = ilist;
							}
						}
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			initremarks(){
				console.log('initremarks')
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				
				data.personid = this.Id;
				
				uni.showLoading({
					
				})
				uni.request({
					url:`${service.BASEURL}/Addressbook/remarks`,
					data: data,
					method:'POST',
					header:{
						"content-type":"application/json"
					},
					success: (res) => {
							self.list = res.data.list;
							// let record = res.data.data;
							// self.name =  record.nickname;
							// self.phone = record.phone;
							// self.company = record.company;
							// self.email = record.email;
							// self.position = record.position;
							// self.headUrl = record.head_img;
							// if(record.head_img){
							// 	self.imgList.push( service.BASEIMGURL+record.head_img)
							// }
						
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
				
				data.name = this.name;
				data.mobile = this.phone;
				data.company  = this.company;
				data.email = this.email;
				data.position = this.position;
				data.sort = this.sort;
				// data.team = this.pId;
				data.head_img = this.headUrl;
				data.bid = this.Id;
				
				uni.request({
					url:`${service.BASEURL}/Addressbook/edit_info`,
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
			callUser(){
				console.log('phone call')
				uni.makePhoneCall({
					phoneNumber:this.phone
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
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
							this.headUrl = '';
						}
					}
				})
			},
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			// 添加备注
			addMark(){
				console.log('addmark',this.textareaBInput)
				this.hideModal();
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				// debugger;
				data.personid = this.Id;
				data.remarks = this.textareaBInput;
				
				uni.showLoading({
					
				})
				uni.request({
					url:`${service.BASEURL}/Addressbook/addremarks`,
					data: data,
					method:'POST',
					header:{
						"content-type":"application/json"
					},
					success: (res) => {
						if(!res.data || res.data.code!=200){
							uni.showToast({
							    title: res.data.msg,
								icon:'none'
							});
						}else{
							self.initdata();
							self.initremarks();
							self.textareaBInput = '';
						}
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			editRemarkBox(id,remarks){
				this.editId  =id,
				this.textareaBInput = remarks;
				this.modalName = 'editMarkModal'
			},
			editRemark(){
				// this.textareaBInput = remarks;
				
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				// debugger;
				data.remark_id = this.editId;
				data.remarks = this.textareaBInput;
				uni.showLoading({
					
				})
				uni.request({
					url:`${service.BASEURL}/Addressbook/editinfo`,
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
							self.hideModal()
							self.initdata();
							self.initremarks();
						}
					},
					complete() {
						uni.hideLoading()
					}
				})
				
				
				console.log(`${this.editId} - ${this.textareaBInput}`);
				
			},
			deleteRemark(id){
				// console.log('deleteRemark',this.textareaBInput)
				let self = this;
				if(!this.hasLogin) return;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				// debugger;
				data.remark_id = id;
				
				uni.showLoading({
					
				})
				uni.request({
					url:`${service.BASEURL}/Addressbook/delonce`,
					data: data,
					method:'POST',
					header:{
						"content-type":"application/json"
					},
					success: (res) => {
						if(res.data && res.data.code!=1){
							uni.showToast({
							    title: res.data.msg,
								icon:'none'
							});
						}else{
							self.initdata();
							self.initremarks();
						}
					},
					complete() {
						uni.hideLoading()
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
.remark-list{
	border-top: 1upx solid #999;	
	.item{
		border-bottom: 1upx solid #999;
		background-color: #fff;
	}
}

</style>
