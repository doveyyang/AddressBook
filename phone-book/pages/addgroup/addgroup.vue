<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">分组名</view>
				<input placeholder="请输入分组名称" v-model="name"></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">输入框</view>
				<input placeholder="三字标题" name="input"></input>
			</view> -->
		</form>
		<view class="btn-view">
			<button type="primary" @click="addgroup">添加分组</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				
			};
		},
		methods:{
			addgroup(){
				if(this.name || this.name != ''){
					uni.showToast({
						title:`添加分组${name}成功`,
						success() {
							uni.navigateTo({
								url:'../group/group?id=1'
							})
						}
					})
				}else{
					uni.showToast({
						title:`请输入分组名`,
						icon:'none'
					})
				}
				console.log(this.name);
			},
		}
	}
</script>

<style lang="scss">
.btn-view{
	padding: 20upx;
}
</style>
