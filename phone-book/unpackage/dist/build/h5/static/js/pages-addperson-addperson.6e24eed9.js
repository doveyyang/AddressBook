(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addperson-addperson"],{"0284":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".btn-row[data-v-02db57a8]{padding:%?20?%}",""])},"04de":function(t,e,i){var a=i("0284");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("201381ec",a,!0,{sourceMap:!1,shadowMode:!1})},"9d8d":function(t,e,i){"use strict";i.r(e);var a=i("b38e"),n=i("e66f");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("e04c");var o=i("2877"),u=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"02db57a8",null);e["default"]=u.exports},b095:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("2f62"),n=s(i("b684"));function s(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{index:-1,date:(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate(),imgList:[],modalName:null,textareaAValue:"",textareaBValue:"",pId:"",name:"",phone:"",company:"",position:"",headUrl:"",email:"",sort:"10"}},onLoad:function(t){this.hasLogin||uni.reLaunch({url:"../main/main"}),t.id?this.pId=t.id:uni.reLaunch({url:"../main/main"})},computed:(0,a.mapState)(["forcedLogin","hasLogin","userName","info","password"]),methods:{submit:function(){if(this.hasLogin){var t=JSON.parse(this.info),e={};e.password=this.password,e.id=t.id,e.account=t.account,e.token=t.token,e.name=this.name,e.mobile=this.phone,e.company=this.company,e.email=this.email,e.position=this.position,e.sort=this.sort,e.team=this.pId,e.head_img=this.headUrl,uni.request({url:"".concat(n.default.BASEURL,"/Addressbook/append"),data:e,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&200!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):uni.showToast({title:t.data.msg,success:function(){uni.navigateBack({delta:1})}})}})}},PickerChange:function(t){this.index=t.detail.value},DateChange:function(t){this.date=t.detail.value},ChooseImage:function(){var t=this;uni.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(e){var i=e.tempFilePaths;uni.uploadFile({url:"".concat(n.default.BASEURL,"/User/upload"),filePath:i[0],name:"file",success:function(i){i.data=JSON.parse(i.data),1==i.data.status&&(t.headUrl=i.data.info,0!=t.imgList.length?t.imgList=t.imgList.concat(e.tempFilePaths):t.imgList=e.tempFilePaths,uni.showToast({title:"上传成功"}))}})}})},ViewImage:function(t){uni.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},DelImg:function(t){var e=this;uni.showModal({title:"提示",content:"确定要删除图片吗？",cancelText:"返回",confirmText:"删掉",success:function(i){i.confirm&&e.imgList.splice(t.currentTarget.dataset.index,1)}})}}};e.default=o},b38e:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-form",[i("v-uni-view",{staticClass:"cu-form-group margin-top"},[i("v-uni-view",{staticClass:"title"},[t._v("姓名")]),i("v-uni-input",{attrs:{placeholder:"请填写姓名",name:"input"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("手机")]),i("v-uni-input",{attrs:{placeholder:"请输入用户联系方式",name:"input"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("公司名称")]),i("v-uni-input",{attrs:{placeholder:"请输入公司名称(选填)",name:"input"},model:{value:t.company,callback:function(e){t.company=e},expression:"company"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("职务")]),i("v-uni-input",{attrs:{placeholder:"请输入用户职务(选填)",name:"input"},model:{value:t.position,callback:function(e){t.position=e},expression:"position"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("邮箱")]),i("v-uni-input",{attrs:{placeholder:"请输入用户邮箱(选填)",name:"input"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),i("v-uni-view",{staticClass:"cu-bar bg-white margin-top"},[i("v-uni-view",{staticClass:"action"},[t._v("用户头像")]),i("v-uni-view",{staticClass:"action"},[t._v(t._s(t.imgList.length)+"/1")])],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"grid col-4 grid-square flex-sub"},[t._l(t.imgList,function(e,a){return i("v-uni-view",{key:a,staticClass:"padding-xs bg-img",style:[{backgroundImage:"url("+t.imgList[a]+")"}],attrs:{"data-url":t.imgList[a]},on:{click:function(e){e=t.$handleEvent(e),t.ViewImage(e)}}},[i("v-uni-view",{staticClass:"cu-tag bg-red",attrs:{"data-index":a},on:{click:function(e){e.stopPropagation(),e=t.$handleEvent(e),t.DelImg(e)}}},[i("v-uni-text",{staticClass:"cuIcon-close"})],1)],1)}),t.imgList.length<1?i("v-uni-view",{staticClass:"padding-xs solids",on:{click:function(e){e=t.$handleEvent(e),t.ChooseImage(e)}}},[i("v-uni-text",{staticClass:"cuIcon-cameraadd"})],1):t._e()],2)],1),i("v-uni-view",{staticClass:"btn-row"},[i("v-uni-button",{attrs:{type:"primary",plain:""},on:{click:function(e){e=t.$handleEvent(e),t.submit(e)}}},[t._v("提交")])],1)],1)],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},b684:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a="USERS_KEY",n="//addressbook.jingru88.com/api",s="http://addressbook.jingru88.com/uploads/images/",o=function(){var t="";return t=uni.getStorageSync(a),t||(t="[]"),JSON.parse(t)},u=function(t){var e=o();e.push({account:t.account,password:t.password}),uni.setStorageSync(a,JSON.stringify(e))},c={getUsers:o,addUser:u,BASEURL:n,BASEIMGURL:s};e.default=c},e04c:function(t,e,i){"use strict";var a=i("04de"),n=i.n(a);n.a},e66f:function(t,e,i){"use strict";i.r(e);var a=i("b095"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a}}]);