import { mapGetters } from "vuex";
import {htmlExportPDF} from '@/js/htmlExportPDF'

export const mixinGetCaseApiList = {
  data() {
    return {
    }
  },
  computed: { ...mapGetters(['caseId']) },
  methods: {
    //获取列表中的数据  未立案 审批中  待办理
    getCaseList(params) {
      let data = {
        flag: params.flag,
        userId: params.userId,
        current: params.current,
        size: params.size,
      };
      console.log(data);
      this.$store.dispatch("queryCaseBasicInfoListPage", data).then(
        res => {
          console.log(res);
          this.tableData = res.data.records;
          this.tableData.forEach(item => {
            item.name = item.party ? item.party : item.partyName;
          })
          this.total = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //进入表单先是否保存过 保存过就直接带入信息，未保存择获取案件信息
    com_getFormDataByCaseIdAndFormId(caseId, caseLinktypeId, tableOrForm) {
      // console.log(this.caseId)
      let data = {
        casebasicInfoId: caseId,
        caseLinktypeId: caseLinktypeId
      };
      this.$store.dispatch("getFormDataByCaseIdAndFormId", data).then(
        res => {
          console.log("获取表单详情", res);
          //如果为空，则加载案件信息
          if (res.data == "") {
            this.com_getCaseBasicInfo(caseLinktypeId,caseId);
          } else {
            console.log(res.data);
            if (tableOrForm == 'form') {  //文书表单
              this.caseLinkDataForm.id = res.data.id;
              this.formData = JSON.parse(res.data.formData);
              console.log('this.formData',this.formData)
            } else if (tableOrForm == 'table') {
              this.tableData = JSON.parse(res.data.formData);
            }

          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取案件信息
    com_getCaseBasicInfo(typeId,caseId) {
      // console.log("this.$route.params.id", this.$route.params.id);
      // 获取案件信息
      let data = {
        // typeId:typeId,
        // caseBasicInfoId: caseId
        id: caseId

      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          console.log('获取案件信息',res)
          console.log(this);
          if(this.formData){
            this.formData = res.data;
          }
          else{
            this.docData = res.data;
            // if(this.docData.staff){
            //   debugger;
            //   this.docData.staffArr = res.data.staff.split(',');
            //   // this.docData.staff1 = this.docData.staffArr.staffArr['0'];
            // }
            // if(this.docData.staffId){
            //   this.docData.certificateIdArr = res.data.staffId.split(',');
            //   // this.docData.certificateId1 = certificateIdArr[0];
            // }

          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //提交表单信息，跳转到pdf文书
    com_submitCaseForm(handleType, docForm, hasNextBtn) {
      this.caseLinkDataForm.formData = JSON.stringify(this.formData);
      // this.caseLinkDataForm.caseBasicinfoId = caseId;
      //0暂存 1提交
      this.caseLinkDataForm.status = handleType;
      this.$refs[docForm].validate(valid => {
        if (valid) {
          // console.log(this.caseLinkDataForm);
          this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
            res => {
              console.log("保存表单", res);
              this.$message({
                type: "success",
                message: "保存成功"
              });
              if (handleType == 1) {
                //保存成功 
                if (hasNextBtn) {    //有下一环节按钮  
                  // this.nextBtnDisab = false;
                } else {   //表单下无文书 无下一环节按钮  直接跳转流程图
                  this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId)
                }
              };
              if(docForm == 'establishForm'){  //立案登记需要额外提交一些信息 调用另一个接口
                let newData = {
                  caseName:this.formData.caseName,
                  caseInfo:this.formData.caseInfo,
                  id:this.caseLinkDataForm.caseBasicinfoId
                }  
                this.com_updatePartCaseBasicInfo(newData)
              }
              if(this.formOrDocData){
                if(this.formOrDocData.pageDomId=='caseInvestig_pinft'){
                  this.formOrDocData.showBtn=[false,false,false,true,true,true,true,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
                }
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    },
    //点击下一环节和提交按钮都跳转流程图
    com_goToNextLinkTu(caseLinktypeId) {
      let data={
        caseId:this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId:caseLinktypeId
      };
      console.log(data);
      this.$store.dispatch("submitPdf", data).then(
        res => {
          console.log("更改流程图中的状态", res);
          this.$store.dispatch("deleteTabs", this.$route.name);
          this.$router.push({
            name: 'flowChart'
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    //根据环节ID转路由name 跳转
    com_getCaseRouteName(caseLinkId) {
      let nextLink = "";
      switch (caseLinkId) {
        case "2c90293b6c178b55016c17c255a4000d":   //立案登记
          nextLink = "establish";
          break;
        case "2c90293b6c178b55016c17c93326000f":   //调查类文书
          nextLink = "caseDoc";
          break;
        case "2c90293b6c178b55016c17c7ae92000e":   //行政强制措施
          nextLink = "";
          break;
        case "2c9029ee6cac9281016caca7f38e0002":   //调查报告
          nextLink = "caseInvestig";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204e":   //案件审核
          nextLink = "";
          break;
        case "2c9029ee6cac9281016caca8ea500003":   //违法行为通知
          nextLink = "illegalActionForm";
          break;
        case "2c9029ee6cac9281016caca9a0000004":   //责令改正
          nextLink = "order";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204f":   //移交移送
          nextLink = "";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204g":   //不予处罚
          nextLink = "";
          break;
        case "2c9029ac6c26fd72016c27247b290003":   //当事人权利
          nextLink = "partyRights";
          break;
        case "2c9029d56c8f7b66016c8f8043c90001":   //处罚决定
          nextLink = "adminPunishe";
          break;
        case "2c9029e16c753a19016c755fe1340001":   //决定执行
          nextLink = "penaltyExecution";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204h":   //强制执行
          nextLink = "";
          break;
        case "2c9029ee6cac9281016cacaadf990006":   //结案登记
          nextLink = "finishCaseReport";
          break;
        case "2c9029ee6cac9281016cacab478e0007":   //归档
          nextLink = "";
          break;
      }
      return nextLink;
    },
    //根据案件ID和文书Id获取数据   文书数据
    com_getDocDataByCaseIdAndDocId(params) {
      let data = {
        caseId: params.caseId,
        docId: params.docId
      };
      this.$store.dispatch("getDocDataByCaseIdAndDocId", data).then(
        res => {
          console.log("获取文书详情", res);
          //如果为空，则加载案件信息
          if (res.data.length == 0) {
            this.com_getCaseBasicInfo(params.docId,params.caseId);
          } else {
            console.log(res.data[0]);
            console.log(res.data[0].docData);
            this.caseDocDataForm.id = res.data[0].id;
            this.docData = JSON.parse(res.data[0].docData);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 提交文书表单
    com_addDocData(handleType, docForm) {
      this.caseDocDataForm.docData = JSON.stringify(this.docData);
      this.caseDocDataForm.status = handleType;
      console.log(this.caseDocDataForm);
      // this.$refs[docForm].validate(valid => {
      //   if (valid) {
          this.$store.dispatch("addDocData", this.caseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              this.$message({
                type: "success",
                message: "提交成功"
              });
              if(this.formOrDocData ){
                this.formOrDocData.showBtn=[true,false,false,true,true,true,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
              }
              this.printContent();
              // this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
              // this.$router.push({
              //   name: this.$route.params.url,
              // });
            },
            err => {
              console.log(err);
            }
          );
        // } else {
        //   console.log('error submit!!');
        //   return false;
        // }

      // });
    },
    //通过案件id和表单类型Id查询已绑定文书
    com_getDocListByCaseIdAndFormId(params) {
      let data = {
        casebasicInfoId: this.caseId,
        linkTypeId: params.linkTypeId
      };
      this.$store.dispatch("getDocListByCaseIdAndFormId", data).then(
        res => {
          this.docTableDatas = res.data;
          console.log('文书列表', this.docTableDatas)
        },
        err => {
          console.log(err);
        }
      );
    },
    //查看环节下的文书
    com_viewDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      console.log('row:',row)
      this.$router.push({
        name: row.url,
        params: {
          id: row.id,
          docId:row.docId,
          url:this.$route.name,
          docStatus:row.status,
        }
      });
    },
    //立案登记表提交之后调用  更新案由等信息到案件基本信息中
    com_updatePartCaseBasicInfo(formData){
      let data ={
        caseName:formData.caseName,
        caseInfo:formData.caseInfo,
        id:formData.id,
      }
      this.$store.dispatch("updatePartCaseBasicInfo", data).then(
        res => {
         console.log('修改案件信息',res);
        },
        err => {
          console.log(err);
        }
      );
    },
    async printContent() {
      htmlExportPDF(this.formOrDocData.pageDomId, this.uploadFile)
    },
    uploadFile (file, name) {
      var f = new File([file.output("blob")], name, {type: 'application/pdf'})
      var fd = new FormData()
      fd.append("file", f)
      fd.append('caseId',this.caseId)
      fd.append('docId',this.caseDocDataForm.caseDoctypeId);

      this.$store.dispatch("uploadFile", fd).then(
        res => {
          console.log('上传',res)
        },
        err => {
          console.log(err);
        }
      );
    },
  },
  created() {
    // this.getApiList();
  }
}