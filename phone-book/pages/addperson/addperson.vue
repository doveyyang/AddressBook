<template>
	<view>
		<form>			
			<view class="cu-form-group margin-top">
				<view class="title">录入日期</view>
				<picker mode="date" :value="date" start="2019-01-01" end="2020-01-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">姓名</view>
				<input placeholder="请填写姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机</view>
				<input placeholder="请输入用户联系方式" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">公司名称</view>
				<input placeholder="请输入公司名称(选填)" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">职务</view>
				<input placeholder="请输入用户职务(选填)" name="input"></input>
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
		</form>
		<view class="btn-row">
			<button type="primary" plain> 提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				
				date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(), //'2019-12-25',
				
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: ''
			};
		},
		methods:{
			PickerChange(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
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
}
</style>
