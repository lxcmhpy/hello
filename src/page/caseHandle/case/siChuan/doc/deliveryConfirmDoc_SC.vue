<template>
  <div class="main">
    <div class="print_box">
      <div id="deliveryConfirmDoc_SC-print" class="print_info" style="height:auto">
        <el-form
          :rules="rules"
          ref="docForm"
          :inline-message="true"
          :inline="true"
          :model="docData"
        >
          <div class="doc_topic">送达地址确认书</div>
          <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td>案号</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="caseNumber"
                  :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.caseNumber"
                    v-bind:class="{ over_flow:docData.caseNumber.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['caseNumber'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td>案由</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="caseName"
                  :rules="fieldRules('caseName',propertyFeatures['caseName'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.caseName"
                    v-bind:class="{ over_flow:docData.caseName.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['caseName'])"
                  ></el-input>
                  <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
                </el-form-item>
              </td>
            </tr>

            <tr>
              <td>当事人</td>
              <td colspan="7" class="color_DBE4EF">
                <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
                  <el-input
                    type="textarea"
                    v-model="docData.party"
                    v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['party'])"
                  ></el-input>
                  <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
                </el-form-item>
              </td>
            </tr>
            
            <tr>
              <td>
                <p>告知</p>
                <p>事项</p>
              </td>
              <td colspan="7" class="color_DBE4EF">
                <p>
                  1．为便于当事人及时收到交通运输行政执法文书，保证行政执法程序顺利进行，
                  当事人应当如实提供确切的送达地址或电子送达方式。委托代理人签署本确认书的，视为当事人确认。
                </p>
                <p>
                 2.当事人拒绝提供自己的送达地址的，以在交通运输审批、公安机关车辆登记管理等
                 业务办理系统中记录的地址为送达地址。没有上述地址的，自然人依其户籍登记中的
                 住所地或者经常居住地为送达地址；法人或者其他组织以其工商登记或者其他依法登
                 记、备案中的住所地为送达地址。
                </p>
                <p>
                 3．为提高送达效率，根据《中华人民共和国民事诉讼法》，最高人民法院《关于进一
                 步加强民事送达工作的若干意见》的规定，在当事人同意的情况下，我们将按规定采
                 用电子方式送达除《行政处罚决定书》、《行政强制措施决定书》、《行政强制执行决定
                 书》以外的法律文书。无论是否接受电子送达，均应提供联系手机号码。
                </p>
                <p>
                 4．确认的送达地址或电子送达方式适用于调查取证、违法行为告知、作出处罚决定、
                 执行处罚决定等全过程。送达地址如有变更，应当及时书面告知执法机构变更后的送
                 达地址或电子送达方式。
                </p>
                <p>
                  5．如果当事人及其代理人提供的地址或联系方式不准确，或者不及时告知变更后的
                  地址或联系方式，或者受送达人的委托代理人、指定代收人拒绝签收使法律文书无法
                  送达或未及时送达，当事人将自行承担由此可能产生的法律后果。
                </p>
              </td>
            </tr>
            <tr>
              <td rowspan="5">
                <p>送达</p>
                <p>地址</p>
                <p>及</p>
                <p>方式</p>
              </td>
              <td>收件人</td>
              <td class="color_DBE4EF" colspan="2">
                <el-form-item
                  prop="receiver"
                  :rules="fieldRules('receiver',propertyFeatures['receiver'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.receiver"
                    v-bind:class="{ over_flow:docData.receiver.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['receiver'])"
                  ></el-input>
                </el-form-item>
              </td>
              <td>与当事人关系</td>
              <td colspan="3" class="color_DBE4EF" id="checkStyle">
                <el-form-item
                  prop="withPartyRelation"
                  :rules="fieldRules('withPartyRelation',propertyFeatures['withPartyRelation'])"
                >
                  <el-checkbox-group @change="choosePeo" :max="1" v-model="docData.withPartyRelation">
                    <el-checkbox label="1">本人</el-checkbox>
                    <el-checkbox label="2">代理人</el-checkbox>
                    <el-checkbox label="3">其他代收人</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>证件类型</td>
              <td class="color_DBE4EF" colspan="2">
                <el-form-item prop="certificateType" :rules="fieldRules('certificateType',propertyFeatures['certificateType'],'',isParty)">
                  <el-select ref="certificateType" v-model="docData.certificateType" :disabled="fieldDisabled(propertyFeatures['certificateType'])">
                    <el-option v-for="item in credentialType" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>证件号码</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="certificateNumber"
                  :rules="fieldRules('certificateNumber',propertyFeatures['certificateNumber'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.certificateNumber"
                    v-bind:class="{ over_flow:docData.certificateNumber.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['certificateNumber'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <p>电子送达</p>
                <p>方式</p>
                <p>（可多选）</p>
              </td>
              <td colspan="6" class="color_DBE4EF">
                <p>
                  <el-form-item label="是否接受电子送达：" prop="isAcceptElDel">
                    <el-checkbox-group :max="1" @change="test" v-model="docData.isAcceptElDel">
                      <el-checkbox label="4">是</el-checkbox>
                      <el-checkbox label="5">否</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </p>
                <el-form-item prop="eleDeliveryType">
                  <el-checkbox-group v-model="docData.eleDeliveryType">
                    <p>
                      <el-checkbox label="6">手机（电子送达必选）</el-checkbox>
                    </p>
                    <p>
                      <el-checkbox label="7">电子邮箱：</el-checkbox>
                      <el-form-item
                        prop="email"
                        :rules="fieldRules('email',propertyFeatures['email'])"
                      >
                        <el-input
                          type="textarea"
                          v-model="docData.email"
                          v-bind:class="{ over_flow:docData.email.length>14?true:false }"
                          :autosize="{ minRows: 1, maxRows: 3}"
                          :maxlength="nameLength"
                          style="width:180px;"
                          placeholder="\"
                          :disabled="fieldDisabled(propertyFeatures['email'])"
                        ></el-input>
                      </el-form-item>
                    </p>
                    <p>
                      <el-checkbox label="8">传真：</el-checkbox>
                      <el-form-item prop="fax" :rules="fieldRules('fax',propertyFeatures['fax'])">
                        <el-input
                          type="textarea"
                          v-model="docData.fax"
                          v-bind:class="{ over_flow:docData.fax.length>14?true:false }"
                          :autosize="{ minRows: 1, maxRows: 3}"
                          :maxlength="nameLength"
                          style="width:180px;"
                          placeholder="\"
                          :disabled="fieldDisabled(propertyFeatures['fax'])"
                        ></el-input>
                      </el-form-item>
                      </p>
                      <p>
                      <el-checkbox label="9">其他：</el-checkbox>
                      <el-form-item
                        prop="other"
                        :rules="fieldRules('other',propertyFeatures['other'])"
                      >
                        <el-input
                          type="textarea"
                          v-model="docData.other"
                          v-bind:class="{ over_flow:docData.other.length>14?true:false }"
                          :autosize="{ minRows: 1, maxRows: 3}"
                          :maxlength="nameLength"
                          style="width:180px;"
                          placeholder="\"
                          :disabled="fieldDisabled(propertyFeatures['other'])"
                        ></el-input>
                      </el-form-item>
                    </p>
                  </el-checkbox-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <p>邮寄地址</p>
              </td>
              <td colspan="6" class="color_DBE4EF">
                <el-form-item
                  prop="postAddress"
                  :rules="fieldRules('postAddress',propertyFeatures['postAddress'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.postAddress"
                    v-bind:class="{ over_flow:docData.postAddress.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    maxlength="50"
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['postAddress'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td  colspan="2">手机号码（必填）</td>
              <td colspan="3" class="color_DBE4EF">
                <el-form-item
                  prop="mobile"
                  :rules="fieldRules('mobile',propertyFeatures['mobile'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.mobile"
                    v-bind:class="{ over_flow:docData.mobile.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['mobile'])"
                  ></el-input>
                  <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
                </el-form-item>
              </td>
              <td>邮编</td>
              <td class="color_DBE4EF">
                <el-form-item
                  prop="zipCode"
                  :rules="fieldRules('zipCode',propertyFeatures['zipCode'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.zipCode"
                    v-bind:class="{ over_flow:docData.zipCode.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['zipCode'])"
                  ></el-input>
                  <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <p>受送</p>
                <p>达人</p>
                <p>确认</p>
              </td>
              <td colspan="7" class="color_DBE4EF table_seal">
                <p>
                 我已阅读（听明白）本确认书的告知事项及法律后果，本人填写的送达地址信息准确无误，承诺遵守告知事项并承担由此产生的法律后果。
                </p>
                <div class="pdf_seal">
                  <span>受送达人（签名或盖章）：{{docData.adminOpinion}}</span>
                  <br />
                  <p>
                    <el-form-item prop="adminSign" class="pdf_datapick">
                      <el-date-picker
                        v-model="docData.adminSign"
                        type="date"
                        format="yyyy年MM月dd日"
                        placeholder="    年  月  日"
                        value-format="yyyy-MM-dd"
                        @blur="starttime"
                      ></el-date-picker>
                    </el-form-item>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>备注</p>
              </td>
              <td colspan="7" class="color_DBE4EF">
                <el-form-item
                  prop="notes"
                  :rules="fieldRules('notes',propertyFeatures['notes'])"
                >
                  <el-input
                    v-model="docData.notes"
                    maxLength="500"
                    placeholder="/"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
      <casePageFloatBtns
        :formOrDocData="formOrDocData"
        @saveData="saveData"
      ></casePageFloatBtns>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { findCaseAllBindPropertyApi } from "@/api/caseHandle";

// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    // overflowInput
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  components: {
    casePageFloatBtns
  },
  data() {
    var validateArr = (rule, value, callback) => {
      if (this.docData.correctWay[0] == "2" && !value) {
        return callback(new Error("责令改正日期不能为空"));
      }
      callback();
    };
    var validateAcceptElDel = (rule, value, callback) => {
      if (this.docData.isAcceptElDel[0] == "4" && value.resLength==0) {
        return callback(new Error("电子送达方式不能为空"));
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      isOverflow: false,
      isOverLine: false,
      isParty: true,
      docData: {
        caseNumber: "",
        caseName: "",
        party: "",
        partyTel: "",
        partyZipCode: "",
        partyAddress: "",
        partyIdNo: "",
        partyIdType: "",
        receiver: "",
        isAcceptElDel: [],
        withPartyRelation: ["1"], 
        certificateType: "",
        certificateNumber: "",
        eleDeliveryType: [],
        mobile: "",
        weChat: "",
        email: "",
        fax: "",
        other: "",
        deliveryWay: [],
        postAddress: "",
        zipCode: "",
        adminOpinion: "",
        adminSign: "",
        staffSign: "",
        notes:"",
      },
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        party: [{ required: true, message: "当事人不能为空", trigger: "blur" }],
        receiver: [
          { required: true, message: "收件人不能为空", trigger: "blur" }
        ],
        isAcceptElDel: [
          { required: true, message: "是否接受送达不能为空", trigger: "change" }
        ],
        withPartyRelation: [
          { required: true, message: "与当事人关系不能为空", trigger: "change" }
        ],
        certificateType: [
          { required: true, message: "证件类型不能为空", trigger: "blur" }
        ],
        certificateNumber: [
          { required: true, message: "证件号不能为空", trigger: "blur" }
        ],
        eleDeliveryType: [
          { validator: validateAcceptElDel, trigger: "change" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        deliveryWay: [
          { required: true, message: "送达方式不能为空", trigger: "change" }
        ],
        withPartyRelation: [
          { required: true, message: "与当事人关系不能为空", trigger: "change" }
        ],
      },
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      handleType: "", // 0 暂存  1  提交
      //证件类型
      credentialType: [
        {id: "0", value: "身份证"},
        {id: "1", value: "护照"}
      ],
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
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
        pageDomId: "deliveryConfirmDoc_SC-print"
      },
      needDealData: true,
      propertyFeatures: "" //字段属性配置
    };
  },
  computed: {
    ...mapGetters(["caseId"]),
    defaultStartTime() {
      let a = new Date();
      return a.getHours() + ":" + a.getMinutes() + ":" + "00";
    },
    enforceEndTimeRange() {
      console.log();
      let b = "10:00:00";
      if (this.enforceStartTime) {
        // alert(111);
        b = this.enforceStartTime.split(" ")[1];
      }

      return b + " - 23:59:59";
    }
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  components: {
    // overflowInput,
    casePageFloatBtns
  },
  methods: {
    starttime(){
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(this.docData.adminSign) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.adminSign = '';
      }
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      // this.printContent()
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    choosePeo(){
      if(this.docData.withPartyRelation[0] == '1'){
        this.docData.certificateNumber = this.docData.partyIdNo;
        this.docData.certificateType = this.docData.partyIdType;
        this.docData.mobile = this.docData.partyTel;
        this.docData.zipCode = this.docData.partyZipCode;
        this.docData.postAddress = this.docData.partyAddress
      }else{
        this.docData.certificateNumber = "";
        this.docData.certificateType = "";
        this.docData.mobile = "";
        this.docData.zipCode = "";
        this.docData.postAddress = "";
      }
    },
    //设置案件来源
    getDataAfter() {
      if (this.docData.isAcceptElDel == '') {
        this.docData.isAcceptElDel =["5"];
      }
      if (this.docData.withPartyRelation == '') {
        this.docData.withPartyRelation =[];
      }
      if (this.docData.eleDeliveryType == '') {
        this.docData.eleDeliveryType =[];
      }
      if (this.docData.deliveryWay == '') {
        this.docData.deliveryWay =[];
      }
      console.log('this.docData.deliveryWay',this.docData.deliveryWay)
      this.choosePeo();
    },
    test(val){
      console.log("111111111122222222",val);
      console.log("666666666666999999",this.docData.isAcceptElDel)
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
   
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">

.espacle {
  textarea {
    min-height: 114px !important;
    line-height: 25px !important;
    // margin-top:-4px !important;
    text-indent: 0px !important;
  }
}
#checkStyle {
  .el-checkbox {
    margin-right: 0px;
  }
}
#deliveryConfirmDoc_SC-print {
  height: 1220px;
  .overflow_lins_style .span_bg {
    display: block;
  }
  .overflow_lins_style .overflow_lins .overflow_lins_textarea {
    width: calc(100% - 10px);
    top: 0;
  }
  .illegalFactsTip {
    text-align-last: auto;
  }
  #scenetimeBox .is-required .el-input__inner::-webkit-input-placeholder {
    color: #000;
  }
  .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
    white-space: normal;
    line-height: 23px;
    text-indent: 0;
  }
  .dataTimeReplaceBox {
    position: relative;
    height: 35px;
    .el-form-item__content .el-date-editor--datetime {
      opacity: 0;
      position: absolute;
      z-index: 2;
    }
    .replaceTime {
      position: absolute;
      top: 0;
      left: 10px;
    }
  }
  #noteDesCon {
    .overflow_lins_textarea {
      padding-top: 4px;
      textarea {
        line-height: 24px !important;
      }
    }
    span.overflow_lins_textarea {
      line-height: 24px;
    }
    .span_bg {
      box-sizing: border-box;
      margin: 4px 0;
      height: 20px;
    }
  }
}
</style>
