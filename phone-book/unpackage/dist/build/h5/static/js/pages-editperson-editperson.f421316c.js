(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-editperson-editperson"],{"595a":function(t,i,a){"use strict";a.r(i);var n=a("f801"),e=a("6a26");for(var s in e)"default"!==s&&function(t){a.d(i,t,function(){return e[t]})}(s);a("9832");var o=a("2877"),c=Object(o["a"])(e["default"],n["a"],n["b"],!1,null,"7330db8a",null);i["default"]=c.exports},"6a26":function(t,i,a){"use strict";a.r(i);var n=a("a73d"),e=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(i,t,function(){return n[t]})}(s);i["default"]=e.a},9832:function(t,i,a){"use strict";var n=a("b520"),e=a.n(n);e.a},a73d:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=a("2f62"),e=s(a("b684"));function s(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{index:-1,date:(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate(),imgList:[],modalName:null,textareaAValue:"",textareaBValue:"",Id:"",name:"",phone:"",company:"",position:"",headUrl:"",email:"",sort:"10",list:[],textareaBInput:"",editId:""}},onLoad:function(t){this.hasLogin||uni.reLaunch({url:"../main/main"}),t.cid?(this.Id=t.cid,this.initdata(),this.initremarks()):uni.reLaunch({url:"../main/main"})},computed:(0,n.mapState)(["forcedLogin","hasLogin","userName","info","password"]),methods:{delremark:function(){console.log("delete remark")},initdata:function(){console.log("initdata");var t=this;if(this.hasLogin){var i=JSON.parse(this.info),a={};a.password=this.password,a.id=i.id,a.account=i.account,a.token=i.token,a.bid=this.Id,uni.showLoading({}),uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/getInfo"),data:a,method:"POST",header:{"content-type":"application/json"},success:function(i){if(i.data&&200!=i.data.code)uni.showToast({title:i.data.msg,icon:"none"});else{var a=i.data.data;if(t.name=a.nickname,t.phone=a.phone,t.company=a.company,t.email=a.email,t.position=a.position,t.headUrl=a.head_img,a.head_img){t.imgList=[];var n=[];n.push(e.default.BASEIMGURL+a.head_img),t.imgList=n}}},complete:function(){uni.hideLoading()}})}},initremarks:function(){console.log("initremarks");var t=this;if(this.hasLogin){var i=JSON.parse(this.info),a={};a.password=this.password,a.id=i.id,a.account=i.account,a.token=i.token,a.personid=this.Id,uni.showLoading({}),uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/remarks"),data:a,method:"POST",header:{"content-type":"application/json"},success:function(i){t.list=i.data.list},complete:function(){uni.hideLoading()}})}},submit:function(){if(this.hasLogin){var t=JSON.parse(this.info),i={};i.password=this.password,i.id=t.id,i.account=t.account,i.token=t.token,i.name=this.name,i.mobile=this.phone,i.company=this.company,i.email=this.email,i.position=this.position,i.sort=this.sort,i.head_img=this.headUrl,i.bid=this.Id,uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/edit_info"),data:i,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&200!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):uni.showToast({title:t.data.msg,success:function(){uni.navigateBack({delta:1})}})}})}},deleUser:function(){if(this.hasLogin){var t=JSON.parse(this.info),i={};i.password=this.password,i.id=t.id,i.account=t.account,i.token=t.token,i.bid=this.Id,uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/delbook"),data:i,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&200!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):uni.showToast({title:t.data.msg,success:function(){uni.showToast({title:t.data.msg,icon:"none",complete:function(){uni.navigateBack({delta:1})}})}})}})}},callUser:function(){console.log("phone call"),uni.makePhoneCall({phoneNumber:this.phone})},PickerChange:function(t){this.index=t.detail.value},showModal:function(t){this.modalName=t.currentTarget.dataset.target},hideModal:function(t){this.modalName=null},DateChange:function(t){this.date=t.detail.value},ChooseImage:function(){var t=this;uni.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(i){var a=i.tempFilePaths;uni.uploadFile({url:"".concat(e.default.BASEURL,"/User/upload"),filePath:a[0],name:"file",success:function(a){a.data=JSON.parse(a.data),1==a.data.status&&(t.headUrl=a.data.info,0!=t.imgList.length?t.imgList=t.imgList.concat(i.tempFilePaths):t.imgList=i.tempFilePaths,uni.showToast({title:"上传成功",icon:"none"}))}})}})},ViewImage:function(t){uni.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},DelImg:function(t){var i=this;uni.showModal({title:"提示",content:"确定要删除图片吗？",cancelText:"返回",confirmText:"删掉",success:function(a){a.confirm&&(i.imgList.splice(t.currentTarget.dataset.index,1),i.headUrl="")}})},ListTouchStart:function(t){this.listTouchStart=t.touches[0].pageX},ListTouchMove:function(t){this.listTouchDirection=t.touches[0].pageX-this.listTouchStart>0?"right":"left"},ListTouchEnd:function(t){"left"==this.listTouchDirection?this.modalName=t.currentTarget.dataset.target:this.modalName=null,this.listTouchDirection=null},addMark:function(){console.log("addmark",this.textareaBInput),this.hideModal();var t=this;if(this.hasLogin){var i=JSON.parse(this.info),a={};a.password=this.password,a.id=i.id,a.account=i.account,a.token=i.token,a.personid=this.Id,a.remarks=this.textareaBInput,uni.showLoading({}),uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/addremarks"),data:a,method:"POST",header:{"content-type":"application/json"},success:function(i){i.data&&200==i.data.code?(t.initdata(),t.initremarks(),t.textareaBInput=""):uni.showToast({title:i.data.msg,icon:"none"})},complete:function(){uni.hideLoading()}})}},editRemarkBox:function(t,i){this.editId=t,this.textareaBInput=i,this.modalName="editMarkModal"},editRemark:function(){var t=this;if(this.hasLogin){var i=JSON.parse(this.info),a={};a.password=this.password,a.id=i.id,a.account=i.account,a.token=i.token,a.remark_id=this.editId,a.remarks=this.textareaBInput,uni.showLoading({}),uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/editinfo"),data:a,method:"POST",header:{"content-type":"application/json"},success:function(i){i.data&&200!=i.data.code?uni.showToast({title:i.data.msg,icon:"none"}):(t.hideModal(),t.initdata(),t.initremarks())},complete:function(){uni.hideLoading()}}),console.log("".concat(this.editId," - ").concat(this.textareaBInput))}},deleteRemark:function(t){var i=this;if(this.hasLogin){var a=JSON.parse(this.info),n={};n.password=this.password,n.id=a.id,n.account=a.account,n.token=a.token,n.remark_id=t,uni.showLoading({}),uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/delonce"),data:n,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&1!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):(i.initdata(),i.initremarks())},complete:function(){uni.hideLoading()}})}}}};i.default=o},b520:function(t,i,a){var n=a("bb0c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=a("4f06").default;e("d84c8348",n,!0,{sourceMap:!1,shadowMode:!1})},b684:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n="USERS_KEY",e="//addressbook.jingru88.com/api",s="http://addressbook.jingru88.com/uploads/images/",o=function(){var t="";return t=uni.getStorageSync(n),t||(t="[]"),JSON.parse(t)},c=function(t){var i=o();i.push({account:t.account,password:t.password}),uni.setStorageSync(n,JSON.stringify(i))},u={getUsers:o,addUser:c,BASEURL:e,BASEIMGURL:s};i.default=u},bb0c:function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,".btn-row[data-v-7330db8a]{padding:%?20?%}.btn-row uni-button[data-v-7330db8a]{margin:%?10?%}uni-input[data-v-7330db8a]{text-align:right;color:#999}.remark-list[data-v-7330db8a]{border-top:%?1?% solid #999}.remark-list .item[data-v-7330db8a]{border-bottom:%?1?% solid #999;background-color:#fff}",""])},f801:function(t,i,a){"use strict";var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[a("v-uni-form",[a("v-uni-view",{staticClass:"cu-form-group margin-top"},[a("v-uni-view",{staticClass:"title"},[t._v("姓名")]),a("v-uni-input",{attrs:{placeholder:"请填写姓名",name:"input"},model:{value:t.name,callback:function(i){t.name=i},expression:"name"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[t._v("手机")]),a("v-uni-input",{attrs:{placeholder:"请输入用户联系方式",name:"input"},model:{value:t.phone,callback:function(i){t.phone=i},expression:"phone"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[t._v("公司名称")]),a("v-uni-input",{attrs:{placeholder:"请输入公司名称(选填)",name:"input"},model:{value:t.company,callback:function(i){t.company=i},expression:"company"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[t._v("职务")]),a("v-uni-input",{attrs:{placeholder:"请输入用户职务(选填)",name:"input"},model:{value:t.position,callback:function(i){t.position=i},expression:"position"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[t._v("邮箱")]),a("v-uni-input",{attrs:{placeholder:"请输入用户邮箱(选填)",name:"input"},model:{value:t.email,callback:function(i){t.email=i},expression:"email"}})],1),a("v-uni-view",{staticClass:"cu-bar bg-white margin-top"},[a("v-uni-view",{staticClass:"action"},[t._v("用户头像")]),a("v-uni-view",{staticClass:"action"},[t._v(t._s(t.imgList.length)+"/1")])],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"grid col-4 grid-square flex-sub"},[t._l(t.imgList,function(i,n){return a("v-uni-view",{key:n,staticClass:"padding-xs bg-img",style:[{backgroundImage:"url("+t.imgList[n]+")"}],attrs:{"data-url":t.imgList[n]},on:{click:function(i){i=t.$handleEvent(i),t.ViewImage(i)}}},[a("v-uni-view",{staticClass:"cu-tag bg-red",attrs:{"data-index":n},on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.DelImg(i)}}},[a("v-uni-text",{staticClass:"cuIcon-close"})],1)],1)}),t.imgList.length<1?a("v-uni-view",{staticClass:"padding-xs solids",on:{click:function(i){i=t.$handleEvent(i),t.ChooseImage(i)}}},[a("v-uni-text",{staticClass:"cuIcon-cameraadd"})],1):t._e()],2)],1),a("v-uni-view",{staticClass:"margin-top remark-list margin-top"},[a("v-uni-view",{staticClass:"padding-sm bg-white"},[t._v("用户备注")]),t._l(t.list,function(i,n){return a("v-uni-view",{key:n,staticClass:"item flex padding-sm "},[a("v-uni-view",{staticClass:"left flex flex-direction flex-treble"},[a("v-uni-view",{staticClass:"text-black"},[t._v(t._s(i.uid))]),a("v-uni-view",{staticClass:"text-gray padding-sm"},[t._v(t._s(i.remarks))])],1),a("v-uni-view",{staticClass:"right margin-top"},[a("v-uni-view",{staticClass:"margin-top"},[a("v-uni-button",{staticClass:"cu-btn round sm bg-blue",attrs:{"data-target":"editMarkModal"},on:{click:function(a){a=t.$handleEvent(a),t.editRemarkBox(i.id,i.remarks)}}},[t._v("修改")])],1),a("v-uni-view",{staticClass:"margin-top"},[a("v-uni-button",{staticClass:"cu-btn round sm bg-red",on:{click:function(a){a=t.$handleEvent(a),t.deleteRemark(i.id)}}},[t._v("删除")])],1)],1)],1)})],2),a("v-uni-view",{staticClass:"btn-row"},[a("v-uni-button",{attrs:{type:"default",size:"mini",plain:""},on:{click:function(i){i=t.$handleEvent(i),t.callUser(i)}}},[t._v("联系用户")]),a("v-uni-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){i=t.$handleEvent(i),t.submit(i)}}},[t._v("提交修改")]),a("v-uni-button",{attrs:{type:"default",size:"mini",plain:"","data-target":"addMarkModal"},on:{click:function(i){i=t.$handleEvent(i),t.showModal(i)}}},[t._v("添加备注")]),a("v-uni-button",{attrs:{type:"warn",size:"mini"},on:{click:function(i){i=t.$handleEvent(i),t.deleUser(i)}}},[t._v("删除用户")])],1)],1),a("v-uni-view",{staticClass:"cu-modal",class:"addMarkModal"==t.modalName?"show":""},[a("v-uni-view",{staticClass:"cu-dialog"},[a("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[a("v-uni-view",{staticClass:"content"},[t._v("添加备注")]),a("v-uni-view",{staticClass:"action",on:{click:function(i){i=t.$handleEvent(i),t.hideModal(i)}}},[a("v-uni-text",{staticClass:"cuIcon-close text-red"})],1)],1),a("v-uni-view",{staticClass:"padding-xl"},[a("v-uni-textarea",{attrs:{maxlength:"-1",placeholder:"请输入备注"},model:{value:t.textareaBInput,callback:function(i){t.textareaBInput=i},expression:"textareaBInput"}})],1),a("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[a("v-uni-view",{staticClass:"action"},[a("v-uni-button",{staticClass:"cu-btn line-green text-green",on:{click:function(i){i=t.$handleEvent(i),t.hideModal(i)}}},[t._v("取消")]),a("v-uni-button",{staticClass:"cu-btn bg-green margin-left",on:{click:function(i){i=t.$handleEvent(i),t.addMark(i)}}},[t._v("确定")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"cu-modal",class:"editMarkModal"==t.modalName?"show":""},[a("v-uni-view",{staticClass:"cu-dialog"},[a("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[a("v-uni-view",{staticClass:"content"},[t._v("编辑备注")]),a("v-uni-view",{staticClass:"action",on:{click:function(i){i=t.$handleEvent(i),t.hideModal(i)}}},[a("v-uni-text",{staticClass:"cuIcon-close text-red"})],1)],1),a("v-uni-view",{staticClass:"padding-xl"},[a("v-uni-textarea",{attrs:{maxlength:"-1",placeholder:"请输入备注"},model:{value:t.textareaBInput,callback:function(i){t.textareaBInput=i},expression:"textareaBInput"}})],1),a("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[a("v-uni-view",{staticClass:"action"},[a("v-uni-button",{staticClass:"cu-btn line-green text-green",on:{click:function(i){i=t.$handleEvent(i),t.hideModal(i)}}},[t._v("取消")]),a("v-uni-button",{staticClass:"cu-btn bg-green margin-left",on:{click:function(i){i=t.$handleEvent(i),t.editRemark(i)}}},[t._v("确定")])],1)],1)],1)],1)],1)},e=[];a.d(i,"a",function(){return n}),a.d(i,"b",function(){return e})}}]);