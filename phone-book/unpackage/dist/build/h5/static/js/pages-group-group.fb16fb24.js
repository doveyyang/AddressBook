(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-group-group"],{"05ad":function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i("2f62"),e=s(i("b684")),o=s(i("71c0"));function s(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{list:[],menuArrow:!0,menuBorder:!1,menuCard:!1,iconList:[{icon:"add",color:"red",badge:0,name:"分组",page:"/pages/addgroup/addgroup"},{icon:"add",color:"orange",badge:0,name:"联系人",page:"/pages/addperson/addperson"},{icon:"edit",color:"orange",badge:0,name:"编辑",page:"edit"}],modalName:null,gridCol:3,gridBorder:!1,currentId:-1,personList:[],title:"",level:0,navList:[{name:"主列表",id:0}],groupName:"组分类"}},components:{doveyNav:o.default},computed:(0,n.mapState)(["forcedLogin","hasLogin","userName","info","password"]),onLoad:function(t){this.hasLogin||uni.reLaunch({url:"../main/main"}),console.log(t.id),console.log(JSON.stringify(t)),t.id?(this.currentId=t.id,this.level=t.level):uni.reLaunch({url:"../main/main"})},onShow:function(){this.initData()},methods:{initData:function(){var t=this,a=JSON.parse(this.info),i={};i.password=this.password,i.id=a.id,i.account=a.account,i.token=a.token,i.level=this.currentId,uni.showLoading({}),uni.request({url:"".concat(e.default.BASEURL,"/Addressbook/indexlist"),data:i,method:"POST",header:{"content-type":"application/json"},success:function(a){if(a.data&&200!=a.data.code)uni.showToast({title:a.data.msg,icon:"none"});else{a.data.data&&a.data.data.group&&a.data.data.group.length>0&&(t.list=a.data.data.group),a.data.data&&a.data.data.list&&a.data.data.list.length>0&&(t.personList=a.data.data.list),t.updateNavList()}},complete:function(){uni.hideLoading()}})},gotogroup:function(t){uni.navigateTo({url:"/pages/group/group?id=".concat(t,"&level=").concat(this.currentId)})},setTitle:function(t){this.title=t},gotoUrl:function(t){switch(t){case"/pages/addgroup/addgroup":uni.navigateTo({url:"".concat(t,"?id=").concat(this.currentId)});break;case"/pages/addperson/addperson":uni.navigateTo({url:"".concat(t,"?id=").concat(this.currentId)});break;case"edit":uni.navigateTo({url:"../addgroup/addgroup?id=".concat(this.currentId,"&isEdit=true&name=").concat(this.title)});break;case"/pages/sharegroup/sharegroup":uni.navigateTo({url:"".concat(t,"?id=").concat(this.currentId,"&groupname=").concat(this.title)});break;default:break}},showModal:function(t){this.modalName="RadioModal"},updateNavList:function(){var t=uni.getStorageSync("groupList");console.log(t);var a=this.currentId,i=[];if(t){do{for(var n=0;n<t.length;n++){var e=t[n];if(e.id==a){i.push(e),a=e.pid;break}n==t.length&&(a=-1)}}while(a>0);var o=[{name:"主列表",id:0}];this.navList=o.concat(i.reverse()),this.groupName=this.navList[this.navList.length-1].name}},hideModal:function(t){this.modalName=null},editgroup:function(){this.hideModal(),console.log("编辑分组"),uni.navigateTo({url:"../addgroup/addgroup?id=".concat(this.currentId,"&isEdit=true&name=").concat(this.title)})},deletegroup:function(){this.modalName="DialogModal1"},showDetail:function(t){uni.navigateTo({url:"../editperson/editperson?cid=".concat(t.id)})},delGroup:function(){this.modalName=null,uni.showToast({icon:"loading"});var t={};t.password=this.password;var a=JSON.parse(this.info);t.id=a.id,t.account=a.account,t.token=a.token,t.cid=this.currentId,uni.request({url:"".concat(e.default.BASEURL,"/Addbookcategory/delcate"),data:t,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&200!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):uni.showToast({title:t.data.msg,success:function(){}})}})},delgroup:function(t){console.log("delete group",t);var a=this;uni.showToast({icon:"loading"});var i={};i.password=this.password;var n=JSON.parse(this.info);i.id=n.id,i.account=n.account,i.token=n.token,i.cid=t,uni.request({url:"".concat(e.default.BASEURL,"/Addbookcategory/delcate"),data:i,method:"POST",header:{"content-type":"application/json"},success:function(t){t.data&&200!=t.data.code?uni.showToast({title:t.data.msg,icon:"none"}):uni.showToast({title:t.data.msg,success:function(){a.initData()}})}})},ListTouchStart:function(t){this.listTouchStart=t.touches[0].pageX},ListTouchMove:function(t){this.listTouchDirection=t.touches[0].pageX-this.listTouchStart>0?"right":"left"},ListTouchEnd:function(t){"left"==this.listTouchDirection?this.modalName=t.currentTarget.dataset.target:this.modalName=null,this.listTouchDirection=null}}};a.default=c},"22cc":function(t,a,i){a=t.exports=i("2350")(!1),a.push([t.i,'.nav-list[data-v-bcd4f736]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background-color:#fff}.nav-list .nav-item[data-v-bcd4f736]{line-height:%?80?%;display:inline-block;padding:0 %?10?%;color:#4169e1}.nav-list .nav-item[data-v-bcd4f736]:last-child{color:#ccc}.nav-list .nav-item[data-v-bcd4f736]:before{content:">";color:#ccc;margin-right:%?20?%}.nav-list .main[data-v-bcd4f736]:before{content:""}.scroll-view-item_H[data-v-bcd4f736]{white-space:nowrap}',""])},"2c40":function(t,a,i){"use strict";var n=i("3f96"),e=i.n(n);e.a},"2e5d":function(t,a,i){"use strict";var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-gradual-blue",isBack:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("返回")]),i("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.groupName))])],2),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"cu-list grid",class:["col-"+t.gridCol,t.gridBorder?"":"no-border"]},t._l(t.iconList,function(a,n){return n<2*t.gridCol?i("v-uni-view",{key:n,staticClass:"cu-item",on:{click:function(i){i=t.$handleEvent(i),t.gotoUrl(a.page)}}},[i("v-uni-view",{class:["cuIcon-"+a.icon,"text-"+a.color]},[0!=a.badge?i("v-uni-view",{staticClass:"cu-tag badge"},[1!=a.badge?[t._v(t._s(a.badge>99?"99+":a.badge))]:t._e()],2):t._e()],1),i("v-uni-text",[t._v(t._s(a.name))])],1):t._e()}),1),i("v-uni-view",{staticClass:"margin-top"},[i("doveyNav",{attrs:{navlist:t.navList}})],1),i("v-uni-view",{staticClass:"cu-list menu-avatar margin-top"},t._l(t.list,function(a,n){return i("v-uni-view",{key:n,staticClass:"cu-item group-item",class:t.modalName=="move-box-"+n?"move-cur":"",attrs:{"data-target":"move-box-"+n},on:{touchstart:function(a){a=t.$handleEvent(a),t.ListTouchStart(a)},touchmove:function(a){a=t.$handleEvent(a),t.ListTouchMove(a)},touchend:function(a){a=t.$handleEvent(a),t.ListTouchEnd(a)},click:function(i){i=t.$handleEvent(i),t.gotogroup(a.id)}}},[i("v-uni-view",{staticClass:" cu-avatar round sm"},[i("v-uni-text",{staticClass:"cuIcon-group_fill text-pink"})],1),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-black"},[t._v(t._s(a.name))])],1),i("v-uni-view",{staticClass:"action"}),i("v-uni-view",{staticClass:"move"},[i("v-uni-view",{staticClass:"bg-red",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.delgroup(a.id)}}},[t._v("删除")])],1)],1)}),1),i("v-uni-view",{staticClass:"cu-list menu-avatar"},[t._l(t.personList,function(a,n){return i("v-uni-view",{key:n,staticClass:"cu-item",on:{click:function(i){i=t.$handleEvent(i),t.showDetail(a)}}},[i("v-uni-view",{staticClass:"cu-avatar round ",style:"background-image:url(//addressbook.jingru88.com/uploads/images/"+a.head_img+");"}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"text-black"},[t._v(t._s(a.nickname))]),i("v-uni-view",{staticClass:"text-gray text-sm flex"},[i("v-uni-text",{staticClass:"text-cut"},[t._v(t._s(a.company))])],1)],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-view",{staticClass:"text-grey text-xs text-cut"},[t._v(t._s(a.position))])],1)],1)}),0==t.personList.length?i("v-uni-view",{staticClass:"empty"},[t._v("未添加好友")]):t._e()],2),i("v-uni-view",{staticClass:"cu-modal",class:"RadioModal"==t.modalName?"show":"",on:{click:function(a){a=t.$handleEvent(a),t.hideModal(a)}}},[i("v-uni-view",{staticClass:"cu-dialog btn-dlg",on:{click:function(a){a.stopPropagation(),a=t.$handleEvent(a)}}},[i("v-uni-button",{attrs:{type:"primary"},on:{click:function(a){a=t.$handleEvent(a),t.editgroup(a)}}},[t._v("编辑分组")]),i("v-uni-button",{attrs:{type:"warn","data-target":"DialogModal1"},on:{click:function(a){a=t.$handleEvent(a),t.deletegroup(a)}}},[t._v("删除分组")])],1)],1),i("v-uni-view",{staticClass:"cu-modal",class:"DialogModal1"==t.modalName?"show":""},[i("v-uni-view",{staticClass:"cu-dialog"},[i("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[i("v-uni-view",{staticClass:"content"},[t._v("Modal标题")]),i("v-uni-view",{staticClass:"action",on:{click:function(a){a=t.$handleEvent(a),t.hideModal(a)}}},[i("v-uni-text",{staticClass:"cuIcon-close text-red"})],1)],1),i("v-uni-view",{staticClass:"padding-xl"},[t._v("Modal 内容。")]),i("v-uni-view",{staticClass:"cu-bar bg-white justify-end"},[i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn line-green text-green",on:{click:function(a){a=t.$handleEvent(a),t.hideModal(a)}}},[t._v("取消")]),i("v-uni-button",{staticClass:"cu-btn bg-green margin-left",on:{click:function(a){a=t.$handleEvent(a),t.delGroup(a)}}},[t._v("确定")])],1)],1)],1)],1)],1)],1)},e=[];i.d(a,"a",function(){return n}),i.d(a,"b",function(){return e})},"3f96":function(t,a,i){var n=i("fa48");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=i("4f06").default;e("ee336a9c",n,!0,{sourceMap:!1,shadowMode:!1})},"4db7":function(t,a,i){"use strict";i.r(a);var n=i("2e5d"),e=i("7e15");for(var o in e)"default"!==o&&function(t){i.d(a,t,function(){return e[t]})}(o);i("2c40");var s=i("2877"),c=Object(s["a"])(e["default"],n["a"],n["b"],!1,null,"48a857f9",null);a["default"]=c.exports},"5c4b":function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{}},props:["navlist"],methods:{clickitem:function(t){console.log("id:",t),0==t?uni.switchTab({url:"../main/main"}):uni.navigateTo({url:"../group/group?id=".concat(t,"&level=").concat(t)})}}};a.default=n},"71c0":function(t,a,i){"use strict";i.r(a);var n=i("df57"),e=i("8322");for(var o in e)"default"!==o&&function(t){i.d(a,t,function(){return e[t]})}(o);i("b223");var s=i("2877"),c=Object(s["a"])(e["default"],n["a"],n["b"],!1,null,"bcd4f736",null);a["default"]=c.exports},"7e15":function(t,a,i){"use strict";i.r(a);var n=i("05ad"),e=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(a,t,function(){return n[t]})}(o);a["default"]=e.a},8322:function(t,a,i){"use strict";i.r(a);var n=i("5c4b"),e=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(a,t,function(){return n[t]})}(o);a["default"]=e.a},9992:function(t,a,i){var n=i("22cc");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=i("4f06").default;e("2fab53af",n,!0,{sourceMap:!1,shadowMode:!1})},b223:function(t,a,i){"use strict";var n=i("9992"),e=i.n(n);e.a},b684:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n="USERS_KEY",e="//addressbook.jingru88.com/api",o="http://addressbook.jingru88.com/uploads/images/",s=function(){var t="";return t=uni.getStorageSync(n),t||(t="[]"),JSON.parse(t)},c=function(t){var a=s();a.push({account:t.account,password:t.password}),uni.setStorageSync(n,JSON.stringify(a))},u={getUsers:s,addUser:c,BASEURL:e,BASEIMGURL:o};a.default=u},df57:function(t,a,i){"use strict";var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"bread-nav"},[i("v-uni-scroll-view",{staticClass:"scroll-view-item_H nav-list",attrs:{"scroll-x":"true","scroll-left":"0"},on:{scroll:function(a){a=t.$handleEvent(a),t.scroll(a)}}},t._l(t.navlist,function(a,n){return i("v-uni-view",{key:n,staticClass:"nav-item ",class:{main:0==n},attrs:{id:a.id},on:{click:function(i){i=t.$handleEvent(i),t.clickitem(a.id)}}},[t._v(t._s(a.name))])}),1)],1)},e=[];i.d(a,"a",function(){return n}),i.d(a,"b",function(){return e})},fa48:function(t,a,i){a=t.exports=i("2350")(!1),a.push([t.i,".hello[data-v-48a857f9]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.btn-dlg[data-v-48a857f9]{padding:%?20?%}.btn-dlg uni-button[data-v-48a857f9]{margin:%?20?%}.title[data-v-48a857f9]{color:#8f8f94;margin-top:%?50?%}.ul[data-v-48a857f9]{font-size:%?30?%;color:#8f8f94;margin-top:%?50?%}.ul>uni-view[data-v-48a857f9]{line-height:%?50?%}.action-row[data-v-48a857f9]{position:fixed;bottom:%?100?%;left:0}.right-box[data-v-48a857f9]{margin-right:%?20?%}.empty[data-v-48a857f9]{text-indent:.5em}.group-item[data-v-48a857f9]{border-bottom:1px solid #ccc;margin:%?10?% 0}.cu-list.menu-avatar>.cu-item[data-v-48a857f9]{height:%?100?%}",""])}}]);