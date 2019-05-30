<template>
	<view class="bread-nav">
		<scroll-view class="scroll-view-item_H nav-list" scroll-x="true" @scroll="scroll" scroll-left="0">
			<view class="nav-item " v-for="(item,index) in navlist" :key="index" :class="{'main':index==0}" :id='item.id' @click="clickitem(item.id)">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:[
			'navlist'
		],
		methods:{
			clickitem(id){
				console.log('id:',id);
				// this.$emit('gogroup',id);
				if(id==0){
					 uni.switchTab({
					 	url:`../main/main`
					 });
				}else
				 uni.navigateTo({
				    url: `../group/group?id=${id}&level=${id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.nav-list{
		display: flex;
		background-color: #fff;
		.nav-item{
			line-height: 80upx;
			display: inline-block;
			padding: 0 10upx;
			color: royalblue;
		}
		.nav-item:last-child{
			color: #ccc;
		}
		.nav-item:before{
			content: '>';
			color: #ccc;
			margin-right: 20upx;
		}
		.main:before{
			content: ''
		}
	}
	.scroll-view-item_H{
		white-space: nowrap;
	}
</style>
