<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <caseListSearch
        ref="archiveCaseSearch"
        @showSomeSearch="showSomeSearch"
        @getinfobycondition="getinfobycondition"
        :caseState="'waitArchive'"
      ></caseListSearch>
      <div class="tablePart">
        <el-table
          :data="tableData_offline"
          stripe
          style="width: 100%"
          height="100%"
          highlight-current-row
        >
          <el-table-column prop="caseNumber" label="案号" align="center" width="100"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="100"></el-table-column>
          <el-table-column prop="party" label="当事人/单位" align="center" width="150"></el-table-column>
          <el-table-column prop="illegalFacts" label="违法行为" align="center"></el-table-column>
          <el-table-column prop="isUploadCase" label="是否上传卷宗" align="center" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.isUploadCase==0?"已上传":"未上传"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="acceptTime" label="受案时间" align="center" width="110"></el-table-column>
          <el-table-column prop="endTime" label="结案时间" align="center" width="110"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" width="150">
              <el-button
                size="small"
                type="text"
                style="float:left;"
                @click="Edit_linepdf(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="text"
                style="float:left;"
                @click="Delete_linepdf(scope.$index, scope.row)"
              >删除</el-button>
              <el-upload
                class="upload-demo"
                action
                :http-request="file=>saveFile_pdf1(file,scope.row)"
                :before-upload="beforeupload_linepdf"
                :show-file-list="false"
                accept=".pdf"
                :multiple="true"
                :limit="30"
                :file-list="fileList_pdf"
              >
                <el-button size="small" style="margin-left:5px;float:left;" type="text">上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-if="tableData_offline.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageSizeChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalss"
        ></el-pagination>
      </div>
    </div>
    <div v-if="addpdf_page">
      <el-dialog title="编辑线下案卷" :visible.sync="addpdf_page" width="32%">
        <div>
          <el-form ref="addpdf_form" :model="addpdf_form" :rules="rules" label-width="100px">
            <el-form-item label="案号" prop="caseNumber">
              <el-input v-model="addpdf_form.caseNumber" style="width:350px;"></el-input>
            </el-form-item>
            <el-form-item label="车/船号" prop="vehicleShipId">
              <el-input v-model="addpdf_form.vehicleShipId" style="width:350px;"></el-input>
            </el-form-item>
            <el-form-item label="当事人单位" prop="party">
              <el-input v-model="addpdf_form.party" style="width:350px;"></el-input>
            </el-form-item>
            <el-form-item label="违法行为" prop="illegalFacts">
              <el-input v-model="addpdf_form.illegalFacts" style="width:350px;"></el-input>
            </el-form-item>
            <el-form-item label="受案时间">
              <el-date-picker
                style="width:350px;"
                v-model="addpdf_form.acceptTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结案时间">
              <el-date-picker
                style="width:350px;"
                v-model="addpdf_form.endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="案件类型">
              <el-input v-model="addpdf_form.caseType" style="width:350px;"></el-input>
            </el-form-item>
            <el-form-item label="案卷上传">
              <el-upload
                class="upload-demo"
                action
                :http-request="saveFile_pdf2"
                :on-remove="Remove_linepdf"
                :before-upload="beforeupload_linepdf"
                :show-file-list="true"
                accept=".pdf"
                :multiple="true"
                :limit="30"
                :file-list="fileList"
                :on-preview="preview_pdf"
              >
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addpdf_page = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addpdf_form')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { uploadCommon, deleteFileByIdApi } from "@/api/upload";
import iLocalStroage from "@/common/js/localStroage";
import {
  getSelectoffline,
  addofflinefile,
  deleteofflinebyid,
} from "@/api/offlinefiles";
import moment from "moment";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearchofflinefiles";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalss: 0, //总页数
      fileList: [],
      addpdf_form: {
        acceptTime: "",
        endTime: "",
        caseNumber: "",
        caseType: "",
        createTime: "",
        id: "",
        illegalFacts: "",
        isUploadCase: "",
        party: "",
        vehicleShipId: "",
        path: "",
      },
      rules: {
        caseNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        vehicleShipId: [{ required: true, message: "请输入", trigger: "blur" }],
        party: [{ required: true, message: "请输入", trigger: "blur" }],
        illegalFacts: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addpdf_page: false,
      fileList_pdf: [],
      tableData: [],
      tableData_offline: [],
      hideSomeSearch: true,
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
  },
  methods: {
    preview_pdf(file){
      for (let i = 0; i < this.fileList.length; i++) {
        if(file.name == this.fileList[i].name){
            window.open(this.fileList[i].url);
        }       
      }
    },
    submitForm(addpdf_form) {
      this.$refs[addpdf_form].validate((valid) => {
        if (valid) {
          this.addpdf_form.isUploadCase = this.fileList.length > 0 ? 0 : 1;
          let pathss = [];
          console.log("edit_submitForm", this.fileList);
          for (let y = 0; y < this.fileList.length; y++) {
            pathss.push(
              this.fileList[y].name + "/" + this.fileList[y].storageId
            );
          }
          this.addpdf_form.path = pathss.join("_");
          console.log(this.addpdf_form);
          addofflinefile(this.addpdf_form).then(
            (res) => {
              console.log("res", res);
              if (res.code === 200) {
                this.$message({ type: "success", message: "编辑成功" });
                this.getArchiveCase();
                this.addpdf_form.acceptTime = "";
                this.addpdf_form.caseNumber = "";
                this.addpdf_form.caseType = "";
                this.addpdf_form.illegalFacts = "";
                this.addpdf_form.party = "";
                this.addpdf_form.vehicleShipId = "";
                this.addpdf_page = false;
              }
            },
            (error) => {
              this.$message({ type: "error", message: "编辑失败" });
              console.log(error);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    Edit_linepdf(index, row) {
      this.fileList = [];
      this.addpdf_page = true;
      console.log(row);
      this.addpdf_form=row;
      if (row.path != "" && row.path != null) {
        let paths = row.path.split("_");
        for (let i = 0; i < paths.length; i++) {
          this.fileList.push({
            name: paths[i].substring(0, paths[i].indexOf("/")),
            url:
              JSON.parse(localStorage.getItem("CURRENT_BASE_URL")).PDF_HOST +
              paths[i].substring(paths[i].indexOf("/") + 1),
            storageId: paths[i].substring(paths[i].indexOf("/") + 1),
          });
        }
      }
      console.log("this.fileList", this.fileList);
    },
    Delete_linepdf(index, row) {
      deleteofflinebyid(row.id).then(
        (res) => {
          console.log("res", res);
          if (res.code === 200 && res.data === 1) {
            this.getArchiveCase();
            this.$message({ type: "success", message: "删除成功" });
          }
        },
        (error) => {
          this.$message({ type: "error", message: "删除失败" });
          console.log(error);
        }
      );
      let paths = row.path.split("_");
      for (let t = 0; t < paths.length; t++) {
        this.delete_pdfs(paths[t].substring(paths[t].indexOf("/") + 1), false);
      }
    },
    delete_pdfs(id, mes) {
      deleteFileByIdApi(id).then(
        (res) => {
          if (mes) {
            this.$message({ type: "success", message: "文件已移除" });
          }
          console.log("删除pdf，文件");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //：http-request 上传文件
    saveFile_pdf1(param, row) {
      console.log(param, row);
      var fda = new FormData();
      fda.append("file", param.file);
      fda.append("category", "卷宗档案-线下案卷");
      fda.append("categoryAccurate", "线下案卷");
      fda.append("fileName", param.file.name);
      fda.append("status", "线下pdf卷宗");
      fda.append("caseId", param.file.name + new Date().getTime()); //传记录id
      fda.append("docId", param.file.name + new Date().getTime()); //传记录id
      fda.append("userId", JSON.parse(localStorage.getItem("userInfo")).id);
      console.log("fda", fda.values());
      uploadCommon(fda).then(
        (res) => {
          if (res.code == 200) {
            this.$message({ type: "success", message: "上传成功" });
            console.log("table列表上传", res);
            let storageIds = "";
            if (row.path == "" || row.path == null) {
              storageIds = res.data[0].fileName + "/" + res.data[0].storageId;
            } else {
              storageIds =
                row.path +
                "_" +
                res.data[0].fileName +
                "/" +
                res.data[0].storageId;
            }
            let adf = {
              id: row.id,
              path: storageIds,
              isUploadCase: 0,
            };
            console.log("adf", adf);
            addofflinefile(adf).then(
              (res) => {
                this.getArchiveCase();
              },
              (error) => {
                this.$message({ type: "error", message: "添加失败" });
                console.log(error);
              }
            );
          }
        },
        (error) => {
          this.$message({ type: "error", message: "上传失败" });
          console.log(error);
        }
      );
    },
    //：http-request 上传文件
    saveFile_pdf2(param) {
      console.log("param", param);
      var fda = new FormData();
      fda.append("file", param.file);
      fda.append("category", "卷宗档案-线下案卷");
      fda.append("categoryAccurate", "线下案卷");
      fda.append("fileName", param.file.name);
      fda.append("status", "线下pdf卷宗");
      fda.append("caseId", param.file.name + new Date().getTime()); //传记录id
      fda.append("docId", param.file.name + new Date().getTime()); //传记录id
      fda.append("userId", JSON.parse(localStorage.getItem("userInfo")).id);
      console.log("fda", fda.values());
      uploadCommon(fda).then(
        (res) => {
          this.fileList.push({
            name: res.data[0].fileName,
            storageId: res.data[0].storageId,
            url:
              JSON.parse(localStorage.getItem("CURRENT_BASE_URL")).PDF_HOST +
              res.data[0].storageId,
          });
          this.$message({ type: "success", message: "上传成功" });
          console.log("编辑上传", this.fileList);
        },
        (error) => {
          this.$message({ type: "error", message: "上传失败" });
          console.log(error);
        }
      );
    },
    //上传文件前
    beforeupload_linepdf(file) {
      console.log("file.type", file.type);
      const isJPG = file.name.lastIndexOf(".pdf") != -1;
      if (!isJPG) {
        this.$message.error("上传文件只能是 pdf 格式!");
      }
      return isJPG;
    },
    //移除文件
    Remove_linepdf(file, fileList) {
      console.log(file);
      for (let k = 0; k < this.fileList.length; k++) {
        if (this.fileList[k].storageId == file.storageId) {
          this.fileList.splice(k, 1);
        }
      }
      this.delete_pdfs(file.storageId, true);
    },
    //获取已归档的数据
    getArchiveCase(searchData) {
      let dat = {
        current: this.currentPage,
        size: this.pageSize,
      };
      getSelectoffline(dat).then(
        (res) => {
          this.tableData_offline = res.data.records;
          this.pageSize = res.data.size;
          this.currentPage = res.data.current;
          this.totalss = res.data.total;
          console.log(this.totalss);
          console.log("resdhk", res);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //
    getinfobycondition(val) {
      console.log("valll", val);
      this.tableData_offline = val.tableData_offline;
      this.pageSize = val.pageSize;
      this.currentPage = val.currentPage;
      this.totalss = val.totalss;
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getArchiveCase();
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getArchiveCase();
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
  },
  created() {
    this.getArchiveCase();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>

