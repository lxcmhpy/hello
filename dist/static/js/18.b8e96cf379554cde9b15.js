webpackJsonp([18],{orjO:function(t,e){},rO7d:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),r=a("JSML"),n=a("dNZa"),o=a("zEDe"),u=a("NYxO"),c={data:function(){return{routekey:["signatureRequest","signatureHistory;signatureHistoryDetail"],loading:!1,backTitle:"Details",resultData:"",record:"",fileObjSrc:""}},components:{requestAndHisSubMenu:r.a,cutImage:o.a,backSubMenu:n.a},computed:i()({},Object(u.b)(["apiHistoryList","imgIp"])),methods:{getPosition:function(t){var e=[];if(t.length>0)for(var a=0;a<t.length;a++){var s=t[a].position?t[a].position:[];e[a]=[parseInt(s[0]),parseInt(s[1]),parseInt(s[2])-parseInt(s[0]),parseInt(s[7])-parseInt(s[1])],e[a]}else e=[[0,0,0,0]];this.$refs.cutImageCanvas.initCanvas2(this.fileObjSrc,e)},getDetailData:function(){var t=this.$route.params;this.record=t.record,this.resultData=t.record.response.data,this.fileObjSrc=this.imgIp+t.record.request.image_file,this.resultData,this.getPosition(this.resultData)}},mounted:function(){this.$route.params.record?this.getDetailData():this.$router.go(-1)},created:function(){}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"showContent detailContent"},[a("requestAndHisSubMenu",{attrs:{routekey:t.routekey}}),t._v(" "),a("backSubMenu",{attrs:{backTitle:t.backTitle,lineUnder:!1}}),t._v(" "),a("div",{staticClass:"detail"},[a("div",{staticClass:"left"},[a("cutImage",{ref:"cutImageCanvas"})],1),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"infor_form_detail"},[a("div",[a("label",[t._v("Time")]),t._v(" "),a("input",{attrs:{type:"text",readonly:""},domProps:{value:t.$util.timestampToDay(t.record.created_at)}})]),t._v(" "),a("div",{staticClass:"hasDot"},[a("label",[t._v("Situation")]),t._v(" "),a("input",{attrs:{type:"text",readonly:""},domProps:{value:t.record.status}}),t._v(" "),a("span",{class:"success"==t.record.status?"greenDot":"redDot",attrs:{id:"statusDot"}},[a("i",{staticClass:"iconfont amd-dot"})])])])])])],1)},staticRenderFns:[]};var d=a("VU/8")(c,l,!1,function(t){a("orjO")},null,null);e.default=d.exports}});
//# sourceMappingURL=18.b8e96cf379554cde9b15.js.map