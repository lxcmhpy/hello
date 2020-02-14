import { mapGetters } from "vuex";
import { htmlExportPDF } from '@/js/htmlExportPDF'

export const mixinGetCaseApiList = {
  data() {
    return {
      isSaveLink: false, //是否点击了环节保存，未保存不可以操作文书
    }
  },
  computed: { ...mapGetters(['caseId']) },
  methods: {
    //获取列表中的数据  未立案 审批中  待办理
    getCaseList(params) {
      // let data = {
      //   flag: params.flag,
      //   userId: params.userId,
      //   current: params.current,
      //   size: params.size,
      //   acceptStartTime:params.acceptStartTime ? params.acceptStartTime: '', //受案开始时间
      //   acceptEndTime:params.acceptEndTime ? params.acceptEndTime :'', //受案结束时间
      // };
      let data = params;
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
    //进入文书先是否保存过 保存过就直接带入信息，未保存择获取案件信息
    com_getFormDataByCaseIdAndFormId(caseId, caseLinktypeId, refreshDataForPdf) {
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
            this.com_getCaseBasicInfo(caseId);
          } else {
            console.log(res.data);
            this.caseLinkDataForm.id = res.data.id;
            this.formData = JSON.parse(res.data.formData);
            this.setSomeData(this.formData);
            if (refreshDataForPdf) {
              //提交pdf页
              setTimeout(() => {
                this.printContent();
              }, 3000)
            }

          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取案件信息
    com_getCaseBasicInfo(caseId) {
      // console.log("this.$route.params.id", this.$route.params.id);
      // 获取案件信息
      let data = {
        id: caseId
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          console.log('获取案件信息', res)
          if (this.formData) {
            this.formData = res.data;
            this.setSomeData(this.formData);
          } else {
            this.docData = res.data;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //提交文书表单信息，跳转到pdf文书
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
                  //提交pdf 显示pdf页
                  this.printContent();
                  this.isSaveLink = true;
                } else {   //表单下无文书 无下一环节按钮  直接跳转流程图
                  // this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId)
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
    com_goToNextLinkTu(caseBasicinfoId, caseLinktypeId) {
      let data = {
        caseId: caseBasicinfoId,
        caseLinktypeId: caseLinktypeId
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
          nextLink = "punishDecisionDoc";
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
            this.com_getCaseBasicInfo(params.caseId);
          } else {
            console.log(res.data[0]);
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
      this.$refs[docForm].validate(valid => {
        if (valid) {
          this.$store.dispatch("addDocData", this.caseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              this.$message({
                type: "success",
                message: "提交成功"
              });
              this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
              //提交成功后提交pdf到服务器，后打开pdf
              this.printContent();
            },
            err => {
              console.log(err);
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }

      });
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
      if (this.isSaveLink) {
        this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
        console.log('row:', row)
        this.$router.push({
          name: row.url,
          params: {
            id: row.id,
            docId: row.docId,
            url: this.$route.name
          }
        });
      } else {
        this.$message('请先保存该环节表单');
      }
    },
    //立案登记表提交之后调用  更新案由等信息到案件基本信息中
    com_updatePartCaseBasicInfo(formData) {
      let data = {
        caseName: formData.caseName,
        caseInfo: formData.caseInfo,
        id: formData.id,
      }
      this.$store.dispatch("updatePartCaseBasicInfo", data).then(
        res => {
          console.log('修改案件信息', res);
        },
        err => {
          console.log(err);
        }
      );
    },
    async printContent() {
      console.log('this.formOrDocData.pageDomId', this.formOrDocData.pageDomId);
      htmlExportPDF(this.formOrDocData.pageDomId, this.uploadFile)
    },
    uploadFile(file, name) {
      var f = new File([file.output("blob")], name, { type: 'application/pdf' })
      var fd = new FormData()
      fd.append("file", f)
      fd.append('caseId', this.caseId);
      let docId = '';  //文书 id

      if (this.caseDocDataForm != undefined) {
        // 只是文书
        docId = this.caseDocDataForm.caseDoctypeId;
      } else {
        //即是环节也是文书
        docId = this.huanjieAndDocId;
      }
      fd.append('docId', docId);

      let caseLinktypeId = ""; //环节id
      if (this.caseLinkDataForm) {
        caseLinktypeId = this.caseLinkDataForm.caseLinktypeId
      }

      console.log('fd', fd.get('docId'));

      this.$store.dispatch("uploadFile", fd).then(
        res => {
          console.log('上传', res);
          //上传pdf之后显示pdf
          let routerData = {
            hasApprovalBtn: docId == '2c9029ae654210eb0165421564970001' || docId == '2c9029ca5b711f61015b71391c9e2420' || docId == '2c9029d2695c03fd01695c278e7a0001' ? true : false,
            docId: docId,
            approvalOver: this.approvalOver ? true : false,
            caseLinktypeId: caseLinktypeId, //环节id 立案登记、调查报告 结案报告 提交审批时需要
          }
          this.$store.dispatch("deleteTabs", this.$route.name);
          this.$router.push({ name: 'myPDF', params: routerData })
        },
        err => {
          console.log(err);
        }
      );
    },
    //为form设置数据，
    setSomeData(formData) {
      //带入数据禁止编辑
      if (this.originalData != undefined) {
        this.originalData = JSON.parse(JSON.stringify(formData));
      }
      //判断当事人类型
      if (formData.party) {
        this.isParty = true;
      } else {
        this.isParty = false;
      }
    }

  },
  created() {
    // this.getApiList();
  }
}