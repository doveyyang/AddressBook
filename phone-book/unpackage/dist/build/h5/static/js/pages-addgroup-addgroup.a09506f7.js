(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addgroup-addgroup"],{"2af9":function(t,n,a){"use strict";a.r(n);var e=a("d2f1"),i=a("2b43");for(var o in i)"default"!==o&&function(t){a.d(n,t,function(){return i[t]})}(o);a("4667");var s=a("2877"),u=Object(s["a"])(i["default"],e["a"],e["b"],!1,null,"4ef1fc34",null);n["default"]=u.exports},"2b43":function(t,n,a){"use strict";a.r(n);var e=a("50da"),i=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(n,t,function(){return e[t]})}(o);n["default"]=i.a},4667:function(t,n,a){"use strict";var e=a("73ee"),i=a.n(e);i.a},"50da":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=a("2f62"),i=o(a("b684"));function o(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{name:"",pId:-1,isEdit:!1}},onLoad:function(t){this.hasLogin||uni.reLaunch({url:"../main/main"}),t.id?this.pId=t.id:uni.reLaunch({url:"../main/main"}),t.isEdit?(this.isEdit=!0,this.name=t.name):this.isEdit=!1},computed:(0,e.mapState)(["forcedLogin","hasLogin","userName","info","password"]),methods:{addgroup:function(){if(this.name||""!=this.name){var t={};t.password=this.password;var n=JSON.parse(this.info);t.id=n.id,t.account=n.account,t.token=n.token,t.level=this.pId,t.name=this.name,uni.request({url:"".concat(i.default.BASEURL,"/Addbookcategory/append"),data:t,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&200!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):uni.showToast({title:t.data.msg,success:function(){uni.navigateBack({delta:1})}})}})}else uni.showToast({title:"请输入分组名",icon:"none"});console.log(this.name)},editgroup:function(){console.log("editgroup");var t={};t.password=this.password;var n=JSON.parse(this.info);t.id=n.id,t.account=n.account,t.token=n.token,t.cid=this.pId,t.name=this.name,uni.request({url:"".concat(i.default.BASEURL,"/Addbookcategory/edit_category"),data:t,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&200!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):uni.showToast({title:t.data.msg,success:function(){},complete:function(){uni.navigateBack({delta:2})}})}})}}};n.default=s},"73ee":function(t,n,a){var e=a("b267");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=a("4f06").default;i("4a86d1e1",e,!0,{sourceMap:!1,shadowMode:!1})},b267:function(t,n,a){n=t.exports=a("2350")(!1),n.push([t.i,".btn-view[data-v-4ef1fc34]{padding:%?20?%}",""])},b684:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e="USERS_KEY",i="//addressbook.jingru88.com/api",o="http://addressbook.jingru88.com/uploads/images/",s=function(){var t="";return t=uni.getStorageSync(e),t||(t="[]"),JSON.parse(t)},u=function(t){var n=s();n.push({account:t.account,password:t.password}),uni.setStorageSync(e,JSON.stringify(n))},d={getUsers:s,addUser:u,BASEURL:i,BASEIMGURL:o};n.default=d},d2f1:function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",[a("v-uni-form",[a("v-uni-view",{staticClass:"cu-form-group margin-top"},[a("v-uni-view",{staticClass:"title"},[t._v("分组名")]),a("v-uni-input",{attrs:{placeholder:"请输入分组名称"},model:{value:t.name,callback:function(n){t.name=n},expression:"name"}})],1)],1),a("v-uni-view",{staticClass:"btn-view"},[t.isEdit?a("v-uni-button",{attrs:{type:"primary"},on:{click:function(n){n=t.$handleEvent(n),t.editgroup(n)}}},[t._v("编辑分组")]):a("v-uni-button",{attrs:{type:"primary"},on:{click:function(n){n=t.$handleEvent(n),t.addgroup(n)}}},[t._v("添加分组")])],1)],1)},i=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return i})}}]);