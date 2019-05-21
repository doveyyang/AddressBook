<template>
    <view class="content">
        <view v-if="hasLogin" class="hello">
			
            <view class="title" style="text-indent: 0.5em;">
                好友分组
            </view>
			<view class="action-row">
				<button type="primary" plain @click='addGroup' >添加分组</button>					
			</view>
			<view class="list-view">				
				<uni-list>
					<uni-list-item @click="showDetail(item.id)" v-for="(item,index) in list" :title="item.name" :key="index" show-badge="true" :badge-text="item.count"></uni-list-item>
					<!-- <uni-list-item title="禁用状态" disabled="true" show-badge="true" badge-text="12"></uni-list-item> -->
				</uni-list>
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
        mapState
    } from 'vuex'

    export default {
		data() {
			return {
				list:[]
			}
		},
		components:{
			uniList,uniListItem
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName','info','password']),
        onLoad() {
            if (!this.hasLogin) {
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
				
			}else{
				this.initData()
			}
        },
		methods:{
			initData(){
				let self = this;
				let ndata = JSON.parse(this.info);
				let data = {}
				data.password = this.password;
				data.id = ndata.id;
				data.account = ndata.account;
				data.token = ndata.token;
				data.level = 0;
				
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
							self.list = res.data.data;

							for (let i = 0; i < self.list.length; i++) {
								self.list[i].count = `${self.list[i].list.length}`;
							}
						}
						
					},
				})
			},
			showDetail(cid){
				console.log(cid)
				console.log('show detail')
				 uni.navigateTo({
				    url: `../group/group?id=${cid}`
				});
			},
			addGroup(){
				// 添加分组
				uni.navigateTo({
					url:"../addgroup/addgroup"
				})
			}
		}
	}
</script>

<style>
	.content{
		position: relative;
	}
	.action-row{
		position: fixed;
		bottom: 100upx;
		width: 90%;
		/* text-align: center; */
		/* margin: 0 auto; */
		/* box-sizing: border-box; */
		left: 50%;
		/* top: 50%; */
		transform: translate(-50%, -50%);
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
</style>
