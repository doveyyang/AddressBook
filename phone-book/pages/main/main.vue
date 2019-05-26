<template>
    <view class="content">
        <view v-if="hasLogin" class="hello">
			
            <view class="title" style="text-indent: 0.5em;">
                好友分组
            </view>
			<view class="action-row">
				<button type="primary" plain @click='addGroup' >添加分组</button>					
			</view>
			<!-- <view class="list-view">				
				<uni-list>
					<uni-list-item @click="showDetail(item.id)" v-for="(item,index) in list" :title="item.name" :key="index" show-badge="true" :badge-text="item.count"></uni-list-item>
					<uni-list-item title="禁用状态" disabled="true" show-badge="true" badge-text="12"></uni-list-item>
				</uni-list>
			</view> -->
			<view class="cu-list menu-avatar table-list">
				<view class="cu-item group-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in list" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" @click="showDetail(item.id)">
					<view class=" cu-avatar round sm">
						<text class="cuIcon-group_fill text-pink"></text>
					</view>
					<view class="content"  >
						<view class="text-black">{{item.name}}</view>
					</view>
					<view class="action">
						<view class="cu-tag text-gray round  sm" v-if="item.nickname!='我'">{{item.nickname}} </view>
					</view>
					<view class="move">
						<view class="bg-red" @click.stop="delgroup(item.id)">删除</view>
					</view>
				</view>
			</view>
				
        </view>
        <view v-if="!hasLogin" class="hello">
            <view class="title">
                您好 尚未登录，请登录后操作。
            </view>
            <!-- <view class="ul">
                <view>这是 uni-app 带登录模板的示例App首页。</view>
                <view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
            </view> -->
        </view>
    </view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import service from '../../service.js'
    import {
        mapState,
		mapMutations
    } from 'vuex'

    export default {
		data() {
			return {
				list:[],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
			}
		},
		components:{
			uniList,uniListItem
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName','info','password']),
        onLoad() {
            if (!this.hasLogin) {
				// uni.setStorage({									
				// 	user_data : user_data,
				// })
				// 如果没有登录，则判断是否缓存中是否有登录凭证
				let hasUserData = uni.getStorageSync('user_data');
				if(hasUserData){
					//// 有则加载凭证，然后跳到上一页，
					console.log('有用户信息',hasUserData)
					
					this.getStorageInfo(hasUserData);
					// uni.navigateBack({
					// 	delta:1
					// })
				}else{
					// // 如果没有则则提醒登录
					 uni.showModal({
					    title: '未登录',
					    content: '您未登录，需要登录后才能继续',
					    /**
					     * 如果需要强制登录，不显示取消按钮
					     */
					    showCancel: !this.forcedLogin,
					    success: (res) => {
					        if (res.confirm) {
								/**
								 * 如果需要强制登录，使用reLaunch方式
								 */
					            if (this.forcedLogin) {
					                uni.reLaunch({
					                    url: '../login/login'
					                });
					            } else {
					                uni.navigateTo({
					                    url: '../login/login'
					                });
					            }
					        }
					    }
					});
					
				}
			}
			// else{
			// 	this.initData()
			// }
        },
		onShow() {
			this.initData();
		},
		methods:{
			...mapMutations(['login']),
			initData(){
				let self = this;
				if(!this.info){
					return;
				}
				let ndata = JSON.parse(this.info);
				
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				data.level = 0;
				uni.showLoading()
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
							 let list = [];
							 if(res.data.data.list.group)
							 {
								list =  res.data.data.list.group
							 }

							// for (let i = 0; i < list.length; i++) {
							// 	list[i].count = `${list[i].list.length}`;
							// }
							
							if(res.data.data.share && res.data.data.share.group.length>0){
								
								list =list.concat(res.data.data.share.group);
							}
							if(list.length>0){
								self.list = list;
							}
						}
						
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			showDetail(cid){
				console.log(cid)
				console.log('show detail')
				 uni.navigateTo({
				    url: `../group/group?id=${cid}&level=${cid}`
				});
			},
			addGroup(){
				// 添加分组
				uni.navigateTo({
					url:"../addmaingroup/addmaingroup"
				})
			},
			// ListTouch触摸开始
			delgroup(id){
				console.log('delete group',id)
				let self = this;
				uni.showToast({
					icon:'loading'
				})
				
				
				let data2 = {}
				data2.password = this.password;
				let ndata = JSON.parse(this.info);
				data2.id = ndata.id;
				data2.account = ndata.account;
				data2.token = ndata.token;
				
				data2.cid = id;
				// 获取该组下的分组
				uni.request({
					url:`${service.BASEURL}/Addbookcategory/delcate`,
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
									self.initData()
								}
							});
							
						}
					},
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
			getStorageInfo(hasUserData){
				let data = hasUserData
				service.addUser(data.user);
				this.$store.dispatch('SetInfo',JSON.stringify(data.info))
				this.$store.dispatch('setPwd',data.user.password)
				this.login(data.user.account)
			}
		}
	}
</script>

<style>
	.content{
		/* position: relative; */
	}
	.action-row{
		/* position: fixed; */
		
		/* bottom: 100upx; */
		/* width: 90%; */
		margin: 20upx;
		padding: 20upx;
		/* text-align: center; */
		/* margin: 0 auto; */
		/* box-sizing: border-box; */
		/* left: 50%; */
		/* top: 50%; */
		/* transform: translate(-50%, -50%); */
	}
	.list-view{
		margin: 20upx 0;
		/* background-color: #8F8F94; */
	}
	
	
    .hello {
        display: flex;
        flex: 1;
        flex-direction: column;
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

    .ul>view {
        line-height: 50upx;
    }
	.group-item{
			border-bottom: 1px solid #CCCCCC;
			margin: 10upx 0;
	}
	.cu-list.menu-avatar>.cu-item{
		height: 100upx;
	}
	/* .table-list{
		margin-bottom: 200upx;
	} */
</style>
