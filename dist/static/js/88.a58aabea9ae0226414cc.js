webpackJsonp([88,84],{"48/i":function(e,t){},CJf7:function(e,t){},"Q+DW":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{visible:!1,showcateId:!1,illegalActSearchForm:{categoryId:"",hyTypeId:"",strNumber:"",strContent:""},cateName:"",tableData:[],currentPage:1,pageSize:10,totalPage:0,industryCategoryList:[],currentIllegaAct:""}},inject:["reload"],methods:{showModal:function(e){this.illegalActSearchForm.categoryId=e.cateId,this.cateName=e.cateName,this.cateName,this.visible=!0,this.getIndustryCategory()},closeDialog:function(){this.visible=!1},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getIllegaAct()},handleCurrentChange:function(e){this.currentPage=e,this.getIllegaAct()},getIndustryCategory:function(){var e=this;this.$store.dispatch("getIndustryCategory",this.illegalActSearchForm.categoryId).then(function(t){e.industryCategoryList=t.data,e.getIllegaAct()},function(e){})},getIllegaAct:function(){var e=this;this.illegalActSearchForm.size=this.pageSize,this.illegalActSearchForm.current=this.currentPage,this.$store.dispatch("getIllegaAct",this.illegalActSearchForm).then(function(t){e.tableData=t.data.records,e.totalPage=t.data.total},function(e){})},changehyType:function(){this.getIllegaAct()},selectIllegaAct:function(e){this.currentIllegaAct=e},backCaseRegister:function(){this.visible=!1,this.$emit("setIllegaAct",this.currentIllegaAct)}},mounted:function(){}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"选择违法行为",visible:e.visible,"close-on-click-modal":!1,width:"40%","append-to-body":""},on:{"update:visible":function(t){e.visible=t},close:e.closeDialog}},[a("div",[a("el-form",{ref:"illegalActSearchForm",staticClass:"illegalActSearchForm",attrs:{model:e.illegalActSearchForm,"label-width":"70px"}},[a("div",[a("div",{staticClass:"item"},[e.showcateId?a("el-input",{model:{value:e.illegalActSearchForm.categoryId,callback:function(t){e.$set(e.illegalActSearchForm,"categoryId",t)},expression:"illegalActSearchForm.categoryId"}}):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"执法门类"}},[a("el-input",{attrs:{disabled:""},model:{value:e.cateName,callback:function(t){e.cateName=t},expression:"cateName"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"行业类别"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changehyType},model:{value:e.illegalActSearchForm.hyTypeId,callback:function(t){e.$set(e.illegalActSearchForm,"hyTypeId",t)},expression:"illegalActSearchForm.hyTypeId"}},e._l(e.industryCategoryList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"行为代码"}},[a("el-input",{model:{value:e.illegalActSearchForm.strNumber,callback:function(t){e.$set(e.illegalActSearchForm,"strNumber",t)},expression:"illegalActSearchForm.strNumber"}})],1)],1)]),e._v(" "),a("div",[a("div",{staticClass:"itemBig"},[a("el-form-item",{attrs:{label:"违法行为"}},[a("el-input",{model:{value:e.illegalActSearchForm.strContent,callback:function(t){e.$set(e.illegalActSearchForm,"strContent",t)},expression:"illegalActSearchForm.strContent"}})],1)],1),e._v(" "),a("div",{staticClass:"itemSmall"},[a("el-button",{attrs:{type:"primary"},on:{click:e.getIllegaAct}},[e._v("确 定")])],1)])]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,height:"250",border:"","highlight-current-row":""},on:{"current-change":e.selectIllegaAct}},[a("el-table-column",{attrs:{prop:"strNumber",label:"代码",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"strContent",label:"违法行为"}})],1),e._v(" "),a("div",{staticClass:"paginationBox"},[a("el-pagination",{attrs:{"current-page":e.currentPage,background:"","page-sizes":[10,20,30,40],layout:"prev, pager, next",total:e.totalPage},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.backCaseRegister}},[e._v("确 定")])],1)])},staticRenderFns:[]};var s=a("VU/8")(l,i,!1,function(e){a("CJf7")},null,null);t.default=s.exports},rJ8s:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Q+DW"),i=a("ZfWL"),s=a("DxUu"),c=a("HukR"),r={data:function(){return{visible:!1,caseRegisterForm:{cateId:"",programType:0,caseType:"",illageAct:""},illageActId:"",rules:{cateId:[{required:!0,message:"请选择",trigger:"change"}],programType:[{required:!0,message:"请选择",trigger:"change"}],caseType:[{required:!0,message:"请选择",trigger:"change"}],illageAct:[{required:!0,message:"请选择",trigger:"change"}]},lawCateList:[],caseTypeList:[]}},inject:["reload"],components:{chooseillegalAct:l.default},methods:{showModal:function(){this.visible=!0,this.getEnforceLawType()},closeDialog:function(){this.visible=!1},changeType:function(){this.caseRegisterForm.caseType=[],this.getCaseType()},chooseIllegalAct:function(){var e=this;if(this.caseRegisterForm.cateId){var t="";this.lawCateList.forEach(function(a){a.cateId!=e.caseRegisterForm.cateId||(t=a.cateName)});var a={cateId:this.caseRegisterForm.cateId,cateName:t};this.$refs.chooseillegalActRef.showModal(a)}else this.$message("请选择执法门类")},getEnforceLawType:function(){var e=this;this.$store.dispatch("getEnforceLawType","1").then(function(t){e.lawCateList=t.data},function(e){})},getCaseType:function(){var e=this,t={programType:this.caseRegisterForm.programType,cateId:this.caseRegisterForm.cateId};this.$store.dispatch("getCaseType",t).then(function(t){e.caseTypeList=t.data},function(e){})},changeLawCate:function(e){this.getCaseType()},setIllegaAct:function(e){this.caseRegisterForm.illageAct=e.strContent,this.illageActId=e.id},goToInforCollect:function(){var e=this;this.$refs.caseRegisterForm.validate(function(t){if(t){var a="";e.caseTypeList.forEach(function(t){t.caseTypeName==e.caseRegisterForm.caseType&&(a=t.caseTypeId)});var l={illageAct:e.caseRegisterForm.illageAct,illageActId:e.illageActId,programType:"0"==e.caseRegisterForm.programType?"一般程序":"简易程序",caseType:e.caseRegisterForm.caseType,caseTypeId:a};i.a.sets("someCaseInfo",l),e.makeRoute("/inforCollect","/inforCollect2","/inforCollect3","inforCollect","inforCollect2","inforCollect3","信息采集","caseHandle/unRecordCase/inforCollection.vue")}})},makeRoute:function(e,t,l,i,r,o,n,g){this.$router.addRoutes([{path:e,name:i,component:c.default,children:[{path:t,name:r,component:s.a,children:[{path:l,name:o,meta:{title:n},component:function(){return a("RmSj")("./"+g)}}]}]}]),this.$router.push({name:o})}},mounted:function(){}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"立案登记",visible:e.visible,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(t){e.visible=t},close:e.closeDialog}},[a("div",[a("el-form",{ref:"caseRegisterForm",staticClass:"caseRegisterForm",attrs:{model:e.caseRegisterForm,rules:e.rules,"label-width":"100px"}},[a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"执法门类",prop:"cateId"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeLawCate},model:{value:e.caseRegisterForm.cateId,callback:function(t){e.$set(e.caseRegisterForm,"cateId",t)},expression:"caseRegisterForm.cateId"}},e._l(e.lawCateList,function(e){return a("el-option",{key:e.cateId,attrs:{label:e.cateName,value:e.cateId}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"程序类型",prop:"programType"}},[a("el-radio-group",{on:{change:e.changeType},model:{value:e.caseRegisterForm.programType,callback:function(t){e.$set(e.caseRegisterForm,"programType",t)},expression:"caseRegisterForm.programType"}},[a("el-radio",{attrs:{label:0}},[e._v("一般程序")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("简易程序")])],1)],1)],1),e._v(" "),a("div",{staticClass:"item",attrs:{id:"illegalActBox"}},[a("el-form-item",{attrs:{label:"违法行为",prop:"illageAct"}},[a("el-input",{on:{click:e.chooseIllegalAct},model:{value:e.caseRegisterForm.illageAct,callback:function(t){e.$set(e.caseRegisterForm,"illageAct",t)},expression:"caseRegisterForm.illageAct"}},[a("el-button",{attrs:{slot:"append"},on:{click:e.chooseIllegalAct},slot:"append"})],1)],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"案件类型",prop:"caseType"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.caseRegisterForm.caseType,callback:function(t){e.$set(e.caseRegisterForm,"caseType",t)},expression:"caseRegisterForm.caseType"}},e._l(e.caseTypeList,function(e){return a("el-option",{key:e.caseTypeName,attrs:{label:e.caseTypeName,value:e.caseTypeName}})}),1)],1)],1)])],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.goToInforCollect}},[e._v("确 定")])],1),e._v(" "),a("chooseillegalAct",{ref:"chooseillegalActRef",on:{setIllegaAct:e.setIllegaAct}})],1)},staticRenderFns:[]};var n=a("VU/8")(r,o,!1,function(e){a("48/i")},null,null);t.default=n.exports}});
//# sourceMappingURL=88.a58aabea9ae0226414cc.js.map