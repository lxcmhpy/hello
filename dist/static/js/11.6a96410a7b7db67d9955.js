webpackJsonp([11],{V100:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("Dd8w"),a=s.n(r),o=s("0Emr"),i={data:function(){return{visible:!1,formItemLayout:{labelCol:{span:7},wrapperCol:{span:17}},errorOldPassword:!1}},computed:{labelCol:function(){return"zh-CN"==o.a.get("play_lang")?{span:2}:{span:7}},wrapperCol:function(){return"zh-CN"==o.a.get("play_lang")?{span:22}:{span:17}},wrapperCol2:function(){return"zh-CN"==o.a.get("play_lang")?{span:20,offset:4}:{span:18,offset:6}},passwordwrapperCol:function(){return"zh-CN"==o.a.get("play_lang")?{span:20,offset:4}:{span:17,offset:7}}},components:{},inject:["reload"],methods:{showModal:function(){this.visible=!0},hideModal:function(){this.visible=!1},compareToFirstPassword:function(e,t,s){var r=this.form;t&&t!==r.getFieldValue("new_password")?s("密码不一致"):s()},submitInfor:function(){var e=this;this.form.validateFields(function(t,s){t||e.$store.dispatch("editPassword",s).then(function(t){e.reload(),e.$message.success("修改成功")},function(t){400==t.code&&(e.errorOldPassword=!0)})})}}},n={render:function(){var e=this,t=this,s=t.$createElement,r=t._self._c||s;return r("div",[r("a-modal",{staticClass:"formModel",attrs:{title:"Change Password",footer:null,closable:!1,destroyOnClose:!0},on:{ok:t.hideModal},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[r("div",{staticClass:"personPasswordForm"},[r("a-form",{attrs:{autoFormCreate:function(t){e.form=t},hideRequiredMark:!0},on:{submit:t.submitInfor}},[r("a-form-item",{attrs:{label:"Old password",fieldDecoratorId:"old_password",labelCol:t.labelCol,wrapperCol:t.wrapperCol,fieldDecoratorOptions:{rules:[{required:!0,whitespace:!0,message:this.$t("common.pleaseEnter")},{min:6,message:this.$t("verification.minLen6")}]}}},[r("a-input",{attrs:{type:"password"}})],1),t._v(" "),t.errorOldPassword?r("a-form-item",{staticClass:"errorFormItemTip",attrs:{wrapperCol:t.passwordwrapperCol}},[r("p",[t._v("原密码错误")])]):t._e(),t._v(" "),r("a-form-item",{attrs:{label:"New password",labelCol:t.labelCol,wrapperCol:t.wrapperCol,fieldDecoratorId:"new_password",fieldDecoratorOptions:{rules:[{required:!0,whitespace:!0,message:this.$t("common.pleaseEnter")},{min:6,message:this.$t("verification.minLen6")}]}}},[r("a-input",{attrs:{type:"password"}})],1),t._v(" "),r("a-form-item",{attrs:{label:"Confirm password",labelCol:t.labelCol,wrapperCol:t.wrapperCol,fieldDecoratorId:"confirm",fieldDecoratorOptions:{rules:[{required:!0,message:"Please confirm your password!"},{validator:this.compareToFirstPassword}]}}},[r("a-input",{attrs:{type:"password"}})],1),t._v(" "),r("a-form-item",{staticClass:"formCenter"},[r("a-button",{staticClass:"mainBtn",attrs:{type:"primary",htmlType:"submit"}},[t._v("Change Password")])],1)],1)],1)])],1)},staticRenderFns:[]};var l=s("VU/8")(i,n,!1,function(e){s("Z3PA")},null,null).exports,d=s("MGeE"),c=s("NYxO"),u={data:function(){return{visible:!1,noFile:!1,errorFile:!1}},computed:a()({},Object(c.b)(["imgIp"])),components:{uploadImage:d.a},inject:["reload"],methods:{showModal:function(){this.visible=!0},hideModal:function(){this.visible=!1},changeUser:function(){var e=this;this.fileObj=this.$refs.uploadImage.getImageFile(),this.fileObj,this.fileObj.fileImage?1==this.fileObj.errImg?this.$message.error(this.$t("verification.errorImg")):this.$store.dispatch("changeUserInfo",this.fileObj.fileImage).then(function(t){o.a.set("avatar",e.imgIp+t.data.icon),e.reload(),e.$message.success("修改成功")},function(e){}):this.$message.error(this.$t("main.pleaseUploadPicture"))}}},p={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("a-modal",{staticClass:"noformModel",attrs:{title:"Modify avatar",footer:null,closable:!1,destroyOnClose:!0},on:{ok:e.hideModal},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[s("div",{staticClass:"userAvatar"},[s("uploadImage",{ref:"uploadImage",attrs:{showNum:1}}),e._v(" "),e.noFile?s("p",[e._v("please upload")]):e._e(),e._v(" "),e.errorFile?s("p",[e._v("upload fomat error")]):e._e(),e._v(" "),s("p",{staticClass:"modelBtn"},[s("a-button",{attrs:{type:"primary"},on:{click:e.changeUser}},[e._v("Confirm")])],1)],1)])],1)},staticRenderFns:[]},f=s("VU/8")(u,p,!1,null,null,null).exports,m={data:function(){return{user:"",fullImgSrc:""}},computed:a()({},Object(c.b)(["imgIp"])),components:{editPassword:l,editUser:f},methods:{getUserInfo:function(){var e=this;this.$store.dispatch("getUserInfo").then(function(t){e.user=t.data,e.fullImgSrc=o.a.get("avatar")},function(e){})},editUser:function(){this.$refs.editUser.showModal()},editPassword:function(){this.$refs.editPassword.showModal()}},created:function(){this.getUserInfo()}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"showContent settingContent"},[e._m(0),e._v(" "),s("div",{staticClass:"box"},[s("table",[e._m(1),e._v(" "),s("tr",[s("td",[e._v("Username")]),e._v(" "),s("td",[e._v(e._s(e.user.username))]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Password")]),e._v(" "),s("td",[e._v("******")]),e._v(" "),s("td",[s("span",{on:{click:e.editPassword}},[e._v("Modify")])])]),e._v(" "),s("tr",[s("td",[e._v("Avatar")]),e._v(" "),s("td",[s("a-avatar",{attrs:{size:30,src:e.fullImgSrc}})],1),e._v(" "),s("td",[s("span",{on:{click:e.editUser}},[e._v("Modify")])])]),e._v(" "),s("tr",[s("td",[e._v("ID")]),e._v(" "),s("td",[e._v(e._s(e.user.key))]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Status")]),e._v(" "),s("td",[e._v(e._s(e.user.status))]),e._v(" "),s("td")]),e._v(" "),s("tr",[s("td",[e._v("Create_time")]),e._v(" "),s("td",[e._v(e._s(e.$util.getFormatDate1(e.user.created_at)))]),e._v(" "),s("td")])])]),e._v(" "),s("editPassword",{ref:"editPassword"}),e._v(" "),s("editUser",{ref:"editUser"})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"hederLink"},[t("ul",[t("li",[t("span",[this._v("Basic settings")])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("tr",[t("th",[this._v("Account information")]),this._v(" "),t("th",[this._v("Details")]),this._v(" "),t("th",[this._v("Operating")])])}]};var _=s("VU/8")(m,v,!1,function(e){s("nqx8")},null,null);t.default=_.exports},Z3PA:function(e,t){},nqx8:function(e,t){}});
//# sourceMappingURL=11.6a96410a7b7db67d9955.js.map