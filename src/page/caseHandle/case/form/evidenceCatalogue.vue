<template v-if="caseInfo">
<div>
  <el-dialog
    custom-class="leftDialog leftDialog2 archiveCatalogueBox evidenceCatalogueBox"
    :visible.sync="visible"
    @close="closeDialog"
    :top="fatherCom==='inforCollection' ? '95px':'33px'"
    width="405px"
    :modal="false"
    :show-close="false"
    :append-to-body="true"
  >
    <template slot="title">
        <div class="catalogueTitle">
            证据目录
        </div>
    </template>
    <div class="a">
        <el-table bordercolor="black" width="100%" cellspacing="0" :data="eviList">
            <el-table-column prop="evPath" align="center">
              <template slot-scope="scope">
          　　　　<img v-if="scope.row.evType=='照片'" :src="scope.row.myFileUrl" width="200" height="120" @click="evidenceDetail(scope.row)"/>
          　　　　<video v-if="scope.row.evType=='音视频'" :src="scope.row.myFileUrl" width="200" height="120" @click="evidenceDetail(scope.row)"></video>
                 <iframe v-if="scope.row.evName=='非现场执法电子证据单.pdf'" class="print_info" :src="scope.row.myFileUrl" frameborder="0"></iframe>
                 <div v-if="scope.row.evType=='其他附件'" @click="evidenceDetail(scope.row)" style="text-align: center;">
                    <div style="line-height: 25px"><i class="el-icon-document" style="font-size:20px;"></i> &nbsp;{{scope.row.evName}}</div>
                 </div>
          　　</template>
            </el-table-column>
        </el-table>
    </div>
    <div
      :style="fatherCom==='inforCollection' ? 'margin-top: -80px':'margin-top: -35px'"
      style="text-align:center">
      <span slot="footer" class="dialog-footer">
        <el-upload
          class="upload-demo"
          :http-request="saveFile"
          :on-change="uploadChange"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          >
          <el-button size="small" type="primary" @click="hidden" v-show="!caseApproval && !IsLawEnforcementSupervision">上传证据</el-button>
        </el-upload>
      </span>
    </div>
  </el-dialog>
  <evidenceDetail ref="evidenceDetailRef"></evidenceDetail>

  <evidenceUploadSuccess ref="evidenceUploadSuccessRef" @getEvidenceEmit="getEviList"></evidenceUploadSuccess>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import evidenceDetail from "./evidenceDetail";
import evidenceUploadSuccess from "./evidenceUploadSuccess";
import iLocalStroage from "@/common/js/localStroage.js";
import {
 uploadEvApi,
 findFileByIdApi,
 uploadEvdence
} from "@/api/upload";
import {
  getEvidenceApi,
} from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      eviList:[],
      evfile:"",
      fileLength:'',
      form: {
        id: "",
        caseId: "",
        evName: "",
        evType: "",
        status: 0,//默认为有效证据
        fileId: "",
        remark: "",
        file: null,
        docId: "",
        category: "",
        userId: ""
      },
      getData:false,

    };
  },
  inject: ["reload"],
  props: {
    fatherCom: {
      type: String,
      default: ""
    }
  },
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId","caseApproval",'IsLawEnforcementSupervision']) },
  components: {
        evidenceDetail,
        evidenceUploadSuccess
    },
  methods: {
    hidden(){
      this.visible = false;
    },
    showModal() {
      console.log('show');

      this.visible = true;
      console.log(this.visible);
      if(!this.getData)  this.getEviList();

    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //查询证据列表
    async getEviList() {
      this.getData = true;
        let data = {
            caseId:this.caseId,
            // evName:this.evidenceForm.evName,
            // evType:this.evidenceForm.evType,
            status:'0',  //查询有效的证据
            // current: this.currentPage,
            // size: this.pageSize
            category:'证据'
        };
        console.log("证据目录参数",data);
        let _this = this
        // this.$store.dispatch("getEvidence", data).then(res => {
        //     _this.eviList = res.data.records;
        //     console.log("111",_this.eviList);
        //     this.$emit("getEvidenceEmit");
        // });

      let getEvidenceRes = await getEvidenceApi(data);
      for(let eviListItem of getEvidenceRes.data.records){
          eviListItem.myFileUrl = await this.$util.com_getFileStream(eviListItem.evPath)
      }
      this.eviList = getEvidenceRes.data.records;
      this.$emit("getEvidenceEmit");



    },
    //显示证据详情
    evidenceDetail(data){
        console.log("证据详情",data)
        this.$refs.evidenceDetailRef.showModal(data);
    },
    saveFile(param) {
      console.log("333",param);
      (this.form.file = param.file),
      (this.form.caseId = this.caseId),
      (this.form.docId = "000"),
      (this.form.category = "证据"),
      (this.form.userId = iLocalStroage.gets("userInfo").id),
      (this.form.evName = param.file.name);
      (this.form.evType = param.file.type);
      this.insertEvi();
      console.log("333",param);
    },
    //插入证据
    insertEvi(id){
      var fd = new FormData();
      fd.append("file", this.form.file);
      fd.append("caseId", this.form.caseId);
      fd.append("objectId", this.form.docId);
      fd.append("category", this.form.category);
      fd.append("userId", this.form.userId);
      fd.append("evName", this.form.evName);
      // fd.append("evType", this.form.evType);
      fd.append("status", this.form.status);
      fd.append("remark", this.form.remark);
      fd.append("fileId", this.form.fileId);
      // fd.append("id", this.form.id);

      //给证据类型赋值
      let fileType= this.$util.getFileType(this.form.file.name);
      console.log('给证据类型赋值',fileType);
      this.$set(this.form,'evType')
      if(fileType == 'image'){ //图片
        this.form.evType = '照片'
      }else if(fileType == 'video' || fileType == 'radio'){
        this.form.evType = '音视频'
      }else{
        this.form.evType = '其他附件'
      }
      fd.append("evType", this.form.evType);


      let _this = this
      uploadEvdence(fd).then(res => {
        console.log("1111111",res);

        if (res.code == 200){
          this.$refs.evidenceUploadSuccessRef.showModal(this.fileLength);
          _this.addVisible = false;
          // _this.currentPage = 1;
          _this.getEviList();
        }else{
          _this.$message.error('出现异常，添加失败！');
        }
      });
    },
    uploadChange(file,fileList){
      this.fileLength = fileList.length;
    }
  },
  mounted () {

       let class1 =  document.getElementsByClassName("evidenceCatalogueBox");
      let class2 = class1[0].parentNode;
      class2.style.right = '60px';
      class2.style.top = '60px';
      class2.style.overflow = 'hidden';
  }
};
</script>

