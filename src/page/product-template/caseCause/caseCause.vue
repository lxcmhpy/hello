<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="caseCauseForm" label-width="130px"  ref="caseCauseForm">
            <el-form-item label="业务领域" prop="cateId">
              <el-select v-model="caseCauseForm.cateId" placeholder="请选择"  style="width:260px;" >
                <el-option v-for="item in lawCateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="违法行为内容" prop="content">
                <el-input v-model="caseCauseForm.content" placeholder="回车可直接查询" @keyup.enter.native="getCaseCauseList(1)" style="width:260px;"></el-input>
            </el-form-item>
              <el-form-item label="违法行为编号" prop="number">
                <el-input v-model="caseCauseForm.number" placeholder="回车可直接查询" @keyup.enter.native="getCaseCauseList(1)" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label=" " label-width="13px">
                <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="getCaseCauseList(1)"></el-button>
                <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                <el-button size="medium" class="commonBtn addBtn" title="新增违法行为" icon="iconfont law-adduser" @click="addCaseCause"></el-button>
              </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
        <el-table-column prop="category" label="业务领域" align="center" min-width="12%"></el-table-column>
        <el-table-column prop="strNumber" label="违法行为代码" align="center" min-width="12%"></el-table-column>
        <el-table-column prop="strContent" label="违法行为内容" align="left" min-width="52%"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" min-width="20%">
          <template slot-scope="scope">
            <el-button type="text" @click="bindlawRegulations(scope.row)">绑定法条</el-button>
            <el-button type="text" @click="detailCaseCause(scope.row)">详情</el-button>
            <el-button type="text" @click="editCaseCause(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteCaseCause(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox" v-show="totalPage">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            background
            :page-sizes="[10, 20, 30, 40]"
            layout="prev, pager, next,sizes,jumper"
            :total="totalPage"
        ></el-pagination>
        </div>
         <addCaseCause ref="addCaseCauseRef" @uploadaaa="getCaseCauseList()"></addCaseCause>
         <bindlawRegulations ref="bindlawRegulationsRef" @uploadaaa="getCaseCauseList()"></bindlawRegulations>
         <lawRegulationsDetail ref="lawRegulationsDetailRef" @uploadaaa="getCaseCauseList()"></lawRegulationsDetail>
  </div>
</div>
</template>

<script>
import {getCaseCauseListApi,deleteCaseCauseByIdApi} from "@/api/system";
import { getIndustryCategoryApi} from "@/api/caseHandle.js";
import addCaseCause from "./addCaseCause";
import bindlawRegulations from "./bindlawRegulations";
import lawRegulationsDetail from "./lawRegulationsDetail";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [],
      lawCateList:[],
      caseCauseForm: {
        cateId: "",
        content: "",
        number: "",
      },
      isShow: false
    };
  },
  components: {
    addCaseCause,
    bindlawRegulations,
    lawRegulationsDetail
  },
  inject: ["reload"],
  methods: {
    //新增违法行为界面
     addCaseCause(){
      let data={
            id:'',
            leng:this.tableData.length
      }
      this.$refs.addCaseCauseRef.showModal(0, data);
    },
    //绑定法条界面
    bindlawRegulations(val){
      let data={
            causeId:val.id,
            leng:this.tableData.length
      }
      this.$refs.bindlawRegulationsRef.showModal(data);
    },
    //表单筛选
    getCaseCauseList(val) {
      this.currentPage = val
      let data = {
        strContent: this.caseCauseForm.content,
        strNumber: this.caseCauseForm.number,
        categoryId: this.caseCauseForm.cateId,
        current: this.currentPage,
        size: this.pageSize
      };
      let _this = this
      getCaseCauseListApi(data).then(
        res => {
            _this.tableData = res.data.records;
            _this.totalPage = res.data.total;
        });
        err => {
            console.log(err);
        };
    },
    // 违法行为重置
    reset() {
      this.$refs["caseCauseForm"].resetFields();
      this.getCaseCauseList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCaseCauseList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getCaseCauseList(val);
    },
    //获取执法门类
    getEnforceLawType() {
      // let _this = this
      // this.$store.dispatch("getEnforceLawType", "1").then(
      //   res => {
      //     _this.lawCateList = res.data;
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
      let dataCate = {};
      getIndustryCategoryApi(dataCate).then(res => {
        console.log("业务领域",res.data);
       this.lawCateList = res.data;
      }, err => {
        console.log(err);
      });
    },
    detailCaseCause(data){
      this.$refs.lawRegulationsDetailRef.showModal(data);
    },
    // 表格编辑
    editCaseCause(row) {
      let newRow =JSON.parse(JSON.stringify(row));
      console.log("123",newRow);
      this.$refs.addCaseCauseRef.showModal(2,newRow);
    },
    deleteCaseCause(id){
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteCaseCauseByIdApi(id).then(
            res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.reload();
            },
            err => {
              console.log(err);
            }
          );

      })
      
    }
  },

  created() {
    this.getCaseCauseList();
    this.getEnforceLawType();
  },
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
