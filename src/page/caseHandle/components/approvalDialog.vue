<template>
  <el-dialog
    title="审批意见"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    append-to-body
    width="30%"
  >
    <div>
      <el-form ref="approvalForm" :model="approvalForm" label-width="90px">
        <el-form-item label="审批意见">
          <el-radio-group v-model="approvalForm.executeHandle" @change="changeOpion">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">不同意</el-radio>
          </el-radio-group>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="审批说明"
            v-model="approvalForm.approveOpinions"
          ></el-input>
        </el-form-item>
        <el-form-item label="签批时间" id="approvalTimeBox">
          <el-date-picker
            v-model="approvalForm.approvalTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy年MM月dd日"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="approvalSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import {
  approvalPdfQzJxApi,
  approvalPdfApi,
  queryFlowBycaseIdApi,
  approvalPdfQzApi,
} from "@/api/caseHandle.js";
export default {
  data() {
    return {
      visible: false,
      //   myChooseNext: "", //选中的环节
      //   allNextLink: [], //所有环节
      //   caseId: "" //案件id
      approvalForm: {
        executeHandle: 1,
        approveOpinions: "同意",
        approvalTime: new Date().format("yyyy年MM月dd日"),
      },
      caseData: "",
      approvalPeopleName: iLocalStroage.gets("userInfo").nickName
        ? iLocalStroage.gets("userInfo").nickName
        : iLocalStroage.gets("userInfo").username,
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId", "docId", "showQZBtn", "docDataId"]) },
  methods: {
    async showModal(data) { 
      console.log(data);
      this.visible = true;
      this.caseData = data; 
      this.approvalForm.executeHandle = data.oldExecuteHandle || data.oldExecuteHandle === 0 ? data.oldExecuteHandle : 1;
      this.approvalForm.approveOpinions = data.oldApprovalOpion ? data.oldApprovalOpion : '同意';
      this.approvalForm.approvalTime = data.oldApprovalTime ? data.oldApprovalTime : new Date().format("yyyy年MM月dd日");
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    changeOpion(val) {
      console.log(val);
      if (val) {
        this.approvalForm.approveOpinions = "同意";
      } else {
        this.approvalForm.approveOpinions = "不同意";
      }
    },
    //审批
    async approvalSure() {
      console.log("this.docDataId", this.docDataId);
      let params = {
        // caseId: this.caseData.caseId,
        docId: this.docDataId,
        executeHandle: this.approvalForm.executeHandle == 1 ? "同意" : "不同意",
        // caseLinktypeId: this.caseData.caseLinktypeId,
        approveOpinions: this.approvalForm.approveOpinions,
        jsonApproveData: "",
      };
      
      if (this.caseData.currentApproval == "1") {
        //一级审批
        params.jsonApproveData = JSON.stringify({
          approveOpinions: this.approvalForm.approveOpinions,
          approvePeo: this.approvalPeopleName,
          approveTime: this.approvalForm.approvalTime,
          approveExecuteHandle:this.approvalForm.executeHandle
        });
      } else if (this.caseData.currentApproval == "2") {
        //二级审批
        params.jsonApproveData = JSON.stringify({
          secondApproveOpinions: this.approvalForm.approveOpinions,
          secondApprovePeo: this.approvalPeopleName,
          secondApproveTime: this.approvalForm.approvalTime,
          secondApproveExecuteHandle:this.approvalForm.executeHandle
        });
      } else if (this.caseData.currentApproval == "3") {
        //三级审批
        params.jsonApproveData = JSON.stringify({
          thirdApproveOpinions: this.approvalForm.approveOpinions,
          thirdApprovePeo: this.approvalPeopleName,
          thirdApproveTime: this.approvalForm.approvalTime,
          thirdApproveExecuteHandle:this.approvalForm.executeHandle
        });
      }
      console.log(params);
      let _this = this;
      _this.visible = false;

      //先审批
      let approvalResult, approvalQZResult;

      //如果有签章功能
      if (this.showQZBtn) {
        let jsonApproveData = JSON.parse(params.jsonApproveData);
        let opinion = "";
        let time = "";
        let step = "";
        if (jsonApproveData.approveOpinions) {
          opinion = jsonApproveData.approveOpinions;
          time = jsonApproveData.approveTime;
          step = "1";
        } else if (jsonApproveData.secondApproveOpinions) {
          opinion = jsonApproveData.secondApproveOpinions;
          time = jsonApproveData.secondApproveTime;
          step = "2";
        } else if (jsonApproveData.thirdApproveOpinions) {
          opinion = jsonApproveData.thirdApproveOpinions;
          time = jsonApproveData.thirdApproveTime;
          step = "3";
        }

        let data = {
          caseId: this.caseData.caseId,
          docId: this.docId,
          docOpinion: opinion,
          date: time,
          number: step,
        };

        let currentFlow,
          flowUrl = "";
        try {
          currentFlow = await queryFlowBycaseIdApi(this.caseId);
        } catch (err) {
          this.$message("获取案件流程失败！");
          throw new Error(err);
        }
        flowUrl = currentFlow.data.flowUrl;
        if(['commonGraphData','compensationGraphData','compensationGraphData_QH','commonGraphData_QH','commonGraphData_SC'].includes(flowUrl)){
          try {
            await approvalPdfQzApi(data);
          } catch (err) {
            this.$message("审批签章失败！");
            throw new Error(err);
          }
        } else if (flowUrl == "commonGraphData_JX") {
          try {
            await approvalPdfQzJxApi(data);
          } catch (err) {
            this.$message("审批签章失败！");
            throw new Error(err);
          }
        }
      } 
      //审批
      try {
        approvalResult = await approvalPdfApi(params);
        this.$message({
          type: "success",
          message: "审批成功",
        });
        _this.$store.commit("setApprovalState", "approvalOver");
        _this.$emit("getNewData");
      } catch (err) {
        this.$message("审批失败！");
        throw new Error(err);
      }
    },
  },

  mounted() {},
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
#approvalTimeBox .el-date-editor {
  width: 100%;
  padding: 0;
}
</style>
