(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-user"],{"09b8":function(t,n,a){"use strict";a.r(n);var e=a("ee6e"),o=a("63d8");for(var i in o)"default"!==i&&function(t){a.d(n,t,function(){return o[t]})}(i);a("ae84");var r=a("2877"),u=Object(r["a"])(o["default"],e["a"],e["b"],!1,null,"56b7395f",null);n["default"]=u.exports},"63d8":function(t,n,a){"use strict";a.r(n);var e=a("6e36"),o=a.n(e);for(var i in e)"default"!==i&&function(t){a.d(n,t,function(){return e[t]})}(i);n["default"]=o.a},"6e36":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=i(a("b684")),o=a("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{},e=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),e.forEach(function(n){u(t,n,a[n])})}return t}function u(t,n,a){return n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t}var s={data:function(){return{username:"体验模式",phone:"13333333333",sex:"男",head_img:"/static/img/me.png"}},onLoad:function(){this.hasLogin||uni.switchTab({url:"../main/main"})},onShow:function(){this.initData()},computed:r({},(0,o.mapState)(["hasLogin","forcedLogin","info","password"])),methods:r({},(0,o.mapMutations)(["logout"]),{bindLogin:function(){uni.navigateTo({url:"../login/login"})},bindLogout:function(){this.logout(),this.forcedLogin&&uni.reLaunch({url:"../login/login"})},initData:function(){var t=this;if(this.info){var n=JSON.parse(this.info),a={};a.password=this.password,a.id=n.id,a.account=n.account,a.token=n.token,a.level=0,uni.showLoading(),uni.request({url:"".concat(e.default.BASEURL,"/User/My"),data:a,method:"POST",header:{"content-type":"application/json"},success:function(n){n.data&&200!=n.data.code?uni.showToast({title:n.data.msg,icon:"none"}):(t.username=n.data.data.nickname,t.head_img="".concat(e.default.BASEIMGURL).concat(n.data.data.head_img))},complete:function(){uni.hideLoading()}})}},gotoEditUser:function(){uni.navigateTo({url:"../edituser/edituser"})},updatePwd:function(){console.log("update pwd"),uni.navigateTo({url:"../changePwd/changePwd"})}})};n.default=s},a0da:function(t,n,a){n=t.exports=a("2350")(!1),n.push([t.i,".content .btn-row[data-v-56b7395f]{padding:%?20?%}.content .btn-row uni-button[data-v-56b7395f]{margin:%?20?%}.content .avertar-box[data-v-56b7395f]{background:url(/static/img/mine/bg.jpg) no-repeat 50%;background-size:100% 100%;height:%?576?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;color:#fff}.content .avertar-box .info-box[data-v-56b7395f]{margin:auto}.content .avertar-box .info-box .avatar-info[data-v-56b7395f]{margin-top:%?-50?%;font-size:%?32?%}.content .avertar-box .info-box .avatar-info .avatar[data-v-56b7395f]{margin:auto;display:block;padding:0 auto}.content .avertar-box .info-box .avatar-info .username[data-v-56b7395f]{line-height:%?70?%;text-indent:.5em;font-weight:700;text-align:center}.content .avertar-box .info-box .avatar-info .username .msex[data-v-56b7395f]{margin-left:%?20?%;color:#ff29ff;display:inline}.content .avertar-box .info-box .avatar-info .phone[data-v-56b7395f]{font-size:%?28?%;text-align:center}.content .avertar-box .info-box .avatar-info .phone .picon[data-v-56b7395f]{font-size:%?24?%}",""])},ae84:function(t,n,a){"use strict";var e=a("fbd8"),o=a.n(e);o.a},b684:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e="USERS_KEY",o="//addressbook.jingru88.com/api",i="http://addressbook.jingru88.com/uploads/images/",r=function(){var t="";return t=uni.getStorageSync(e),t||(t="[]"),JSON.parse(t)},u=function(t){var n=r();n.push({account:t.account,password:t.password}),uni.setStorageSync(e,JSON.stringify(n))},s={getUsers:r,addUser:u,BASEURL:o,BASEIMGURL:i};n.default=s},ee6e:function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",{staticClass:"content"},[t.hasLogin?a("v-uni-view",{staticClass:"avertar-box"},[a("v-uni-view",{staticClass:"info-box",on:{click:function(n){n=t.$handleEvent(n),t.gotoEditUser(n)}}},[a("v-uni-view",{staticClass:"avatar-info"},[a("v-uni-view",{staticClass:"cu-avatar xl round avatar",style:"background-image:url("+t.head_img+")"}),a("v-uni-view",{staticClass:"username"},[t._v(t._s(t.username))])],1)],1)],1):t._e(),a("v-uni-view",{staticClass:"btn-row"},[t.hasLogin?a("v-uni-button",{attrs:{plain:"",type:"primary"},on:{click:function(n){n=t.$handleEvent(n),t.updatePwd(n)}}},[t._v("修改密码")]):t._e(),t.hasLogin?t._e():a("v-uni-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(n){n=t.$handleEvent(n),t.bindLogin(n)}}},[t._v("登录")]),t.hasLogin?a("v-uni-button",{attrs:{type:"warn"},on:{click:function(n){n=t.$handleEvent(n),t.bindLogout(n)}}},[t._v("退出登录")]):t._e()],1)],1)},o=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return o})},fbd8:function(t,n,a){var e=a("a0da");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=a("4f06").default;o("b717394a",e,!0,{sourceMap:!1,shadowMode:!1})}}]);