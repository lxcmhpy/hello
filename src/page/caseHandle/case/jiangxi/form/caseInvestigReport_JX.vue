<template>
  <div class="print_box printNumbers_box" id="caseInvestJX-print" style="width:790px; margin:0 auto;">
    <el-form
      :rules="rules"
      ref="caseInvestiForm"
      :inline-message="true"
      :inline="true"
      :model="formData"
      :disabled="disableWhenApproval"
    >
      <div class="print_info" style = "height: 1600px">
        <div class="doc_topic">案件调查报告</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <table class="print_table caseReportJX" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>案由</td>
            <td colspan="7" class="color_DBE4EF">
              <el-form-item
                prop="caseName"
                :rules="fieldRules('caseName',propertyFeatures['caseName'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.caseName"
                  v-bind:class="{ over_flow:formData.caseName.length>14?true:false }"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :disabled="fieldDisabled(propertyFeatures['caseName'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>立案</p>
              <p>时间</p>
            </td>
            <td colspan="7" class="color_DBE4EF">
              <el-form-item
                prop="acceptTime"
                :rules="fieldRules('acceptTime',propertyFeatures['acceptTime'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.acceptTime"
                  v-bind:class="{ over_flow:formData.acceptTime && formData.acceptTime.length>14?true:false }"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :disabled="fieldDisabled(propertyFeatures['acceptTime'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="6">
              <p class="center_similar">当</p>
              <p class="center_similar">事</p>
              <p class="center_similar">人</p>
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td class="color_DBE4EF" colspan="4">
              <el-form-item
                prop="partyIdNo"
                :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo && formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress && formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyTel"
                  v-bind:class="{ over_flow:formData.partyTel && formData.partyTel.length>4?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="11"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyName"
                  v-bind:class="{ over_flow:formData.partyName && formData.partyName.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="30"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>地址</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitAddress"
                  v-bind:class="{ over_flow:formData.partyUnitAddress && formData.partyUnitAddress.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="30"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitTel"
                  v-bind:class="{ over_flow:formData.partyUnitTel && formData.partyUnitTel.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="30"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyManager"
                  v-bind:class="{ over_flow:formData.partyManager && formData.partyManager.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="30"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item
                prop="socialCreditCode"
                :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.socialCreditCode"
                  v-bind:class="{ over_flow:formData.socialCreditCode && formData.socialCreditCode.length>25?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="11"
                  placeholder="/"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:100px">
            <td colspan="2">
              <p>案件调查</p>
              <p>经过及违</p>
              <p>法事实</p>
            </td>
            <td colspan="7" class="color_DBE4EF">
              <el-form-item
                prop="illegalFact"
                :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.illegalFact"
                  v-bind:class="{ over_flow:formData.illegalFact && formData.illegalFact.length>30?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}"
                  maxlength="300"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr @click="handleAdd">
            <td :rowspan="formData.evidenceList.length+1">
              <p>证据</p>
              <p>材料</p>
              <p>清单</p>
            </td>
            <td>序号</td>
            <td colspan="2" class="aprotd">证据材料名称</td>
            <td>规格</td>
            <td>数量</td>
            <td colspan="3" class="aprotd">备注</td>
          </tr>
          <tr v-for="(item,index) in formData.evidenceList" :key="index" @click="handleAdd">
            <td>{{item.resNo}}</td>
            <td colspan="2" class="aprotd">{{item.name}}</td>
            <td colspan="1">{{item.des}}</td>
            <td colspan="1">{{item.num}}</td>
            <td colspan="3" class="aprotd">{{item.note}}</td>
          </tr>
          <tr style="height:180px">
            <td colspan="2">
              <p>承办人意</p>
              <p>见</p>
            </td>
            <td colspan="7" class="aprotd">
              <el-form-item prop="lawOfficeOpinions">
                <el-input
                  type="textarea"
                  v-model="formData.lawOfficeOpinions"
                  v-bind:class="{ over_flow:formData.lawOfficeOpinions && formData.lawOfficeOpinions.length>33?true:false }"
                  :rows="5"
                ></el-input>
              </el-form-item>
              <div class="pdf_seal" style="white-space:nowrap; width:auto;">
                <p>
                  签名：{{formData.lawOfficeName||' '}}
                </p>
                <p style="text-align: right;">
                  <el-form-item prop="lawOfficeApprovalTime" class="pdf_datapick">
                    <el-date-picker
                      v-model="formData.lawOfficeApprovalTime"
                      format="yyyy年MM月dd日"
                      placeholder="    年  月  日"
                      clear-icon="el-icon-circle-close"
                      value-format="yyyy-MM-dd"
                      @blur="starttime"
                    ></el-date-picker>
                  </el-form-item>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p>承办机构</p>
              <p>审核意见</p>
            </td>
            <td colspan="7" class="aprotd">
              <p class="approveDiv">{{formData.approveOpinions}}</p>
              <div class="pdf_seal" style="white-space:nowrap; width:auto;margin-top:140px;">
                <p>签名：{{formData.approvePeo||' '}}</p>
                <p>{{formData.approveTime||' 年 月 日 '}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p>行政机关</p>
              <p>负责人意</p>
              <p>见</p>
            </td>
            <td colspan="7" class="aprotd">
              <p class="approveDiv">{{formData.secondApproveOpinions}}</p>
              <div class="pdf_seal" style="white-space:nowrap; width:auto;margin-top:140px;">
                <p>签名：{{formData.secondApprovePeo||' '}}</p>
                <p>{{formData.secondApproveTime||' 年 月 日 '}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">备注</td>
            <td colspan="7" class="color_DBE4EF">
              <el-form-item prop="note" :rules="fieldRules('note',propertyFeatures['note'])">
                <el-input
                  type="textarea"
                  v-model="formData.note"
                  v-bind:class="{ over_flow:formData.note && formData.note.length>14?true:false }"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :disabled="fieldDisabled(propertyFeatures['note'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </div>
    </el-form>
    <!-- 添加弹出框 -->
    <el-dialog
      title="证据材料名称清单"
      append-to-body
      :visible.sync="addVisible"
      width="60%"
      v-loading="addLoading"
    >
      <div>
        <div class="fullscreen">
          <el-form ref="addResFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column prop="resNo" label="序号" align="center">
                 <template slot-scope="scope">
                  <span>{{++scope.$index}}</span>
                </template>
              </el-table-column>
              <el-table-column label="证据材料名称" align="center">
                <template slot-scope="scope">
                  <el-input maxlength="15" v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="des" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.des" placeholder>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="num" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.num" :min="1" label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <el-input maxlength="10" v-model="scope.row.note"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    icon="el-icon-circle-close"
                    circle
                    @click="deleteRes(scope.row)"
                    class="evdence-form"
                    style="border-radius:50px"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              icon="el-icon-circle-plus-outline"
              circle
              type="info"
              @click="addTableData"
              style="margin-left: 50%;margin-top: 10px;"
            ></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
          <el-button size="medium" type="primary" @click="addResSure('addResFormRef')">确 定</el-button>
          <el-button size="medium" @click="addVisible=false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns
      :pageDomId="'caseInvestJX-print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
    <!--  显示证据材料 -->
    <investigRpEvidence ref="investigRpEvidenceRef" @sendToReportEmit="receiverEviden"></investigRpEvidence>
    <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="goToPfd"></approvalDialog>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import showApprovePeople from "@/page/caseHandle/components/showApprovePeople";
import approvalDialog from "@/page/caseHandle/components/approvalDialog";
import investigRpEvidence from "@/page/caseHandle/components/investigRpEvidence";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      formData: {
        caseNumber: "",
        caseName: "",
        acceptTime: "",
        staff: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyManager: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        socialCreditCode: "",
        illegalFact: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        // thirdApproveOpinions: "",
        // thirdApprovePeo: "",
        // thirdApproveTime: "",
        evidenceList: [], //证据材料
        lawOfficeOpinions: "",
        lawOfficeName: "",
        lawOfficeApprovalTime: "",
        note: ""
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: this.BASIC_DATA_JX.caseInvestig_JX_caseLinktypeId,
        //文书数据
        formData: "",
        status: ""
      },
      handleType: 0,
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        staff: [
          { required: true, message: "案件调查人员不能为空", trigger: "blur" }
        ],
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        // partySex: [
        //   { required: true, message: "当事人性别不能为空", trigger: "blur" }
        // ],
        // partyAge: [
        //   { required: true, message: "当事人年龄不能为空", trigger: "blur" }
        // ],
        partyAddress: [
          { required: true, message: "当事人住址不能为空", trigger: "blur" }
        ],
        // occupation: [
        //   { required: true, message: "当事人职业不能为空", trigger: "blur" }
        // ],
        partyName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法定代表人不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "单位联系方式不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        illegalFact: [
          { required: true, message: "请输入案件调查经过", trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "社会信用代码不能为空", trigger: "blur" }
        ],
        partyIdNo: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyTel: [
          {
            required: true,
            message: "当事人联系电话不能为空",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ]
      },
      // 大写
      punishMoneyCapital: "",
      confiscateThingCapital: "",
      approval: this.$route.params.isApproval ? true : false, //   是否是审批人员进入
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "caseInvestJX-print"
      },
      options: [
        {value: "1", label: " "},
        {value: "2",label: "份"},
        {value: "3",label: "套"},
        {value: "4",label: "个"},
        {value: "5",label: "件"},
        {value: "6",label: "张"},
      ],
      huanjieAndDocId: this.BASIC_DATA_JX.caseInvestig_JX_huanjieAndDocId, //案件调查报告的文书id
      approvalOver: false, //审核完成
      nameLength: 10,
      sexLength: 2,
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      adressLength: 23,
      isParty: true,
      originalData: "",
      needDealData: true,
      disableWhenApproval: false,
      propertyFeatures: "" //字段属性配置
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns,
    investigRpEvidence,
    caseSlideMenu
  },
  methods: {
    starttime(){
      console.log('案发时间=='+this.formData.lasj)
      if (Date.parse(this.formData.lawOfficeApprovalTime) < Date.parse(this.formData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.formData.lawOfficeApprovalTime = '';
      }
    },
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //保存表单数据
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "caseInvestiForm", true);
    },
    goToPfd() {
      //提交pdf 显示pdf页
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.approvalOver = true;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        true
      );
    },
    isApproval() {
      //只有审核按钮
      if (this.$route.params.isApproval) {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        this.disableWhenApproval = true;
      }
    },
    showEvidence() {
      if (!this.disableWhenApproval)
        this.$refs.investigRpEvidenceRef.showModal(this.formData.evidenceList);
    },
    //执法人员审核意见带入
    showLawOfficeOpion() {
      if (!this.disableWhenApproval)
        this.$refs.showLawOfficerOpionRef.showModal();
    },
    //证据列表弹窗传来的证据
    receiverEviden(data) {
      console.log("data", data);
      this.formData.evidenceList = data;
    },
    handleAdd(resNo, row) {
      let tableArr = []
      this.formData.evidenceList.forEach(item => {
        if(item.resNo!= ""){
          tableArr.push(item)
        }
      });
     this.tableDatas = JSON.parse(JSON.stringify(tableArr));
      this.addVisible = true;
      if (this.tableDatas.length == 0) {
        this.tableDatas.push({ resNo: 1, num: 1 });
      }
    },
    //删除一行证据
    deleteRes(row) {
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].resNo > row.resNo) {
          this.tableDatas[i].resNo = this.tableDatas[i].resNo - 1;
        }
      }
      this.tableDatas.splice(row.resNo - 1, 1);
      this.formData.evidenceList.splice(row.resNo - 1, 1);
      this.formData.evidenceList.push({resNo: "", name: "", num: "", des: "", note: ""})
    },
    //确定添加
    addResSure(formName) {
      let canAdd = true;
      if (this.tableDatas.length > 0){
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (!this.tableDatas[i].name || !this.tableDatas[i].des) {
            this.$message({
              message: "证据名称或规格不能为空！",
              type: "warning"
            });
            canAdd = false;
            break;
          }
        }
        if(canAdd){
          this.tableDatas.forEach((item,index,arr) => {
            item.resNo = index+1
            this.formData.evidenceList[index] = this.tableDatas[index]
          });
          this.addVisible = false;
        }
      }
    },
    //添加一行数据
    addTableData() {
      let length = this.tableDatas.length;
      if (length == 6) {
        this.$message({
          message: "最多输入六行！",
          type: "warning"
        });
        return;
      }
      if (length == 0) {
        this.tableDatas.push({ resNo: 1, amount: 1 });
      } else {
        this.tableDatas.push({
          resNo: Number(this.tableDatas[length - 1].resNo) + 1,
          num: 1,
          note: ""
        });
      }
    },
    //对原始数据做一下处理
    getDataAfter() {
      if (!this.formData.evidenceList.length) {
        this.formData.evidenceList = [
          {resNo: "", name: "", num: "", des: "", note: "" },
          {resNo: "", name: "", num: "", des: "", note: "" },
          {resNo: "", name: "", num: "", des: "", note: "" },
          {resNo: "", name: "", num: "", des: "", note: "" },
          {resNo: "", name: "", num: "", des: "", note: "" },
          {resNo: "", name: "", num: "", des: "", note: "" }
        ];
      }
    }
  },
  created() {
    this.setFormData();
    this.isApproval();
  }
};
</script>

<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
// @import "@/assets/css/documentForm.scss";
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
<style scoped>
.caseReportJX tr td {
  text-align: center;
  text-align-last: center;
}
.apro {
  display: inline-block;
  border-bottom: 1px solid;
  min-width: 60px;
  width: auto;
  height: 29px;
  vertical-align: middle;
}
.aprotd {
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
}
</style>
