<template>
    <view class="content">
		<view class="avertar-box" v-if="hasLogin">
			<!-- 登录用户 -->
			<view class="info-box" @click="gotoEditUser">
				<view class="avatar-info">
					<view class="cu-avatar xl round avatar" :style="'background-image:url('+head_img+')'"></view>
					<view class="username">
						{{username}} 
						<!-- <text class="iconfont msex" v-if="sex == '男'">&#xe646;</text>
						<text class="iconfont msex" v-else>&#xe647;</text> -->
					</view>
					<!-- <view class="phone">
						<text class="iconfont picon">&#xe8f9;</text>
						{{phone}}
					</view> -->
				
				</view>	
				
			</view>
			
		</view>
        <view class="btn-row">
            <button v-if="hasLogin" plain type="primary" @click="updatePwd">修改密码</button>
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button v-if="hasLogin" type="warn" @tap="bindLogout">退出登录</button>			
        </view>
    </view>
</template>

<script>
	import service from '../../service.js'
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
		data(){
			return {
				username:'体验模式',
				phone:'13333333333',
				sex:'男',
				head_img:'/static/img/me.png',
			}
		},
		onLoad() {
			// debugger
			if(!this.hasLogin){
				uni.switchTab({
					url:"../main/main",
					
				})
			}
			
			
		},
		onShow() { 
			this.initData(); 
		},
        computed: {
            ...mapState(['hasLogin', 'forcedLogin','info','password',])
        },
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            },
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
							 self.username = res.data.data.nickname;
							 self.head_img = `${service.BASEIMGURL}${res.data.data.head_img}`;
							 // self.email
						}
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			gotoEditUser(){
				uni.navigateTo({
					url:'../edituser/edituser'
				})
			},
			updatePwd(){
				console.log('update pwd')
				uni.navigateTo({
					url:'../changePwd/changePwd'
				})
			}
        }
    }
</script>

<style lang="scss" scoped="">
	.content{
		
		.btn-row{
			padding: 20upx;
			button{
				margin: 20upx;
			}
		}
		.avertar-box{
				background: url('/static/img/mine/bg.jpg') no-repeat center;
				background-size: 100% 100%;
				// border: 1px solid red;
				height: 576upx;
				display: flex;
				width: 100%;
				color: #FFFFFF;
				.info-box{
					// .cu-avatar{
					// 	border: 1px solid pink;
					// }
					margin:auto;
					.avatar-info{
						// align: center;
						// border: 1px solid pink;
						margin-top: -50upx;
						font-size: 32upx;
						// padding: 0 auto;
						// display: block;
						.avatar{
							margin:auto;
							display: block;
							padding: 0 auto;
							// border: 1px solid purple;
						}
						.username{
							// font-size: 25upx;
							line-height: 70upx;
							text-indent: 0.5em;
							font-weight: 700;
							text-align: center;
							.msex{
								margin-left:20upx;
								color: #FF29FF;
								display: inline;
							}
						}
						.phone{
							// font-size: 14px;
							font-size: 28upx;
							text-align: center;
							.picon{
								font-size: 24upx;
						}
					}
						
				}
					
			}
		}
	}
</style>
