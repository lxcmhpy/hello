<template>
  <div class="searchAndpageBox" id="roleBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
          <el-form-item label="环节名称">
            <el-input v-model="searchForm.name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="案件类型">
            <el-select v-model="searchForm.remark" clearable filterable placeholder="请选择">
              <el-option
                v-for="(res) in caseTypeList"
                :key="res.id"
                :label="res.programType==='0' ?'一般程序'+'：'+res.typeName:'简易程序'+'：'+res.typeName"
                :value="res.programType==='0' ?'一般程序'+'：'+res.typeName:'简易程序'+'：'+res.typeName"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="searchForm.remark" clearable placeholder="请输入环节名称"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="getBannerSearch"
            >查询</el-button>
             <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addBanner">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" :index="showIndex" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="linkName" label="环节名称" align="center"></el-table-column>
        <el-table-column prop="mainLinkName" label="所属大环节" align="center"></el-table-column>
        <el-table-column prop="docTypeName" label="PDF对应文书" align="center"></el-table-column>
        <el-table-column prop="remark" label="所属案件类型" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <div style="width:160px">
              <el-button type="text" @click.stop @click="editBanner(scope.row)">修改</el-button>
              <el-button type="text" @click.stop @click="deleteBanner(scope.row)">删除</el-button>
              <el-button type="text" @click.stop @click="bindDoc(scope.row)">绑定文书</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
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
    <addEditBanner ref="addEditBannerRef"></addEditBanner>
    <linkDocList ref="linkDocListRef"></linkDocList>
  </div>
</template>
<script>
import addEditBanner from "./addEditBanner";
import linkDocList from "./linkDocList";
export default {
  data() {
    return {
      tableData: [], //表格数据
      caseTypeList: [],
      searchForm: {
        name: "",
        remark: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  components: {
    addEditBanner,
    linkDocList
  },
  inject: ["reload"],
  methods: {
    bindDoc(row) {
      this.$refs.linkDocListRef.showModal(row);
    },
    //编辑环节
    editBanner(row) {
      this.$refs.addEditBannerRef.showModal(2, row);
    },
    //删除环节
    deleteBanner(row) {
      this.$confirm("确认删除该环节?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteBanner", row.id).then(
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
        .catch(() => {});
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getBanner();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBanner();
    },
    // 查询
    getBannerSearch() {
      this.currentPage = 1;
      this.getBanner();
    },
    //获取环节
    getBanner() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        linkName: this.searchForm.name,
        remark: this.searchForm.remark
      };
      let _this = this;
      this.$store.dispatch("getBannerList", data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加环节
    addBanner() {
      let sort = this.totalPage;
      this.$refs.addEditBannerRef.showModal(0, sort);
    },
    //重置
    resetSearch(){
      this.searchForm={};
      this.getBanner();
    },
    //查询案件类型列表
    getCaseType() {
      this.$store.dispatch("getCaseTypeList", 0).then(
        //查询案件类型列表(启用)
        res => {
          if (res.code === 200) {
            this.caseTypeList = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showIndex(index){
      return (this.currentPage-1)*this.pageSize+index+1;
    }
  },
  mounted() {
    this.getCaseType();
  },
  created() {
    this.getBanner();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
