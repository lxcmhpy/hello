<template>
  <el-dialog
    title="选择审批人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div class="showApprovePeople">
      <div class="part" v-for="(item,index) in approvalPeopleList" :key="index">
        <div>{{item.returnValue[0]}}</div>
        <div>
          <el-tag
            :key="tag.userId"
            v-for="tag in item.approveUserVo"
            closable
            :disable-transitions="false"
            @close="deleteCurrentUser(tag,item)"
          >{{tag.userName}}
          </el-tag>
        </div>
      </div>
      <!-- <div class="part">
        <div>执法部门负责人</div>
        <div>
          <el-tag
            :key="tag.userId"
            v-for="tag in secondApprovePeople"
            closable
            :disable-transitions="false"
            @close="deleteOne(tag)"
          >{{tag.userName}}</el-tag>
        </div>
      </div> -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitPdf">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {
     submitPdfByPersonApi,handleTJApproveDocApi,getLinkTypeInfoByIdApi,queryFlowBycaseIdApi,getApprovePeopleByCaseTypeApi,
  } from "@/api/caseHandle";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        visible: false,
        caseInfo: "",
        approvalPeopleList: [],
        handleperson:{},
      };
    },
    inject: ["reload"],
    computed: {...mapGetters(['caseId','docId','docDataId','caseLinktypeId','docPdfStorageId','caseLinkName'])},
    methods: {
      showModal(data) {
        this.visible = true;
        // this.caseInfo = data;
        this.getApprovePeople();
      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
      },
      //获取审核人员
      async getApprovePeople() {
        let _this = this;
        let data = {
          caseBasicInfoId: this.caseId,
          docTypeId:this.docId,
          flag:'', //处罚流程 0 赔补偿流程1
        }
        //先判断流程，后获取人员
        let currentFlow = '';
        try{
          currentFlow = await queryFlowBycaseIdApi(this.caseId);
        }catch(err){
          this.$message('获取案件流程失败！')
        }
        if(currentFlow.data.flowUrl == 'commonGraphData' || currentFlow.data.flowUrl == 'commonGraphData_JX' || currentFlow.data.flowUrl == 'commonGraphData_QH' || currentFlow.data.flowUrl == 'commonGraphData_SC'){
          data.flag = 0;
        }else if(currentFlow.data.flowUrl == 'compensationGraphData'|| currentFlow.data.flowUrl == 'compensationGraphData_QH'){
          data.flag = 1;
        }
        console.log('获取审批人员传参',data); 
        
       getApprovePeopleByCaseTypeApi(data).then(
          res => {
            let data = res.data;
            console.log('审批人员',res.data)
        
            data.splice(0, 1);
            _this.approvalPeopleList = data;
            
          },
          err => {
            console.log(err);
          }
        );
      },

      async submitPdf() {
        let _this = this
        let huanjieData='';
        try{
          //判断是单文书环节还是文书
          huanjieData = await getLinkTypeInfoByIdApi(this.caseLinktypeId);
        }catch(err){
          _this.$message('判断环节是否生成pdf失败');
        }
        console.log('判断环节是否生成pdf',huanjieData);

        let cantSubmit = false;
        _this.approvalPeopleList.forEach((item,index)=>{
          let ids=[];
          if(item.approveUserVo.length == 0){
            cantSubmit = true;
            return
          }
          item.approveUserVo.forEach(user=>{
            ids.push(user.userId)
          })
          this.handleperson['userIds'+(index+1)] = ids.join(',');
        })

        if(cantSubmit){
          this.$message('请配置相关角色的用户！')
          return 
        }
        console.log('this.handleperson',this.handleperson)
        
        let data = {
          caseId: this.caseId,
          caseLinktypeId:this.caseLinktypeId,
          //单文书环节生成pdf后拿不到docDataId需要给它置空，此时前2个参数必须有值
          docId: huanjieData.data.isPdf == 0 ? '' : this.docDataId,
          storageId:this.docPdfStorageId,
          handlePerson:JSON.stringify(this.handleperson)
       }
        console.log('提交审批传的参数', data)
        try{
          await handleTJApproveDocApi(data)
          _this.$message({
              type: "success",
              message: "提交成功"
           });
           if(huanjieData.data.isPdf == 0){ //环节生成pdf
            _this.$router.push({
                  name: "case_handle_flowChart"
            });
          }else{  //1 环节不生成pdf
            // _this.$router.go(-2)
            _this.$router.push({
                  name: this.caseLinkName
            });
          }
        }catch(err){
          _this.$message('提交失败');
        }
        
        
      },
      //删除人员
      deleteCurrentUser(tag,tagKind){
        if(tagKind.approveUserVo.length == 1){
          this.$message('至少有一个审批人员！');
          return;
        }
        for(let item of this.approvalPeopleList){
          if(item.returnName == tagKind.returnName)
            item.approveUserVo.splice(tagKind.approveUserVo.findIndex(a=> a.userId == tag.userId), 1); 
        }
        // console.log('this.approvalPeopleList',this.approvalPeopleList)
      }
    }
  };
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
