<template>
  <div>
    <div class="route_top route_shadow">
      <div class="center_content" style="margin-top: 20px;">
        <span class="title">路线管理</span>
      </div>
      <div class="search">
        <el-form :inline="true" :model="dicSearchForm" ref="dicSearchForm">
          <el-form-item label="路线编号：" prop="routeName">
            <el-input v-model="dicSearchForm.routeName" placeholder="输入路线编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="getRouteListSearch"
            >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-refresh-right"
              @click="reset('dicSearchForm')"
            >重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addOrUpdateRoute">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table
          :data="routeData"
          highlight-current-row
          @current-change="handleCurrentRow"
          stripe
          style="width: 100%; height:100%"
        >
          <el-table-column type="index" align="center">
            <template slot="header">序号</template>
          </el-table-column>
          <el-table-column prop="routeName" label="路线编号" align="center"></el-table-column>
          <el-table-column prop="routeMileage" label="里程" align="center"></el-table-column>
          <el-table-column prop="routeLevel" label="公路行政级别" align="center"></el-table-column>
          <!--<el-table-column prop="routeGrade" label="公路等级" align="center"></el-table-column>-->
          <el-table-column prop="startingPoint" label="起始地点" align="center"></el-table-column>
          <el-table-column prop="enddingPoint" label="结束地点" align="center"></el-table-column>
          <el-table-column label="起点桩号" align="center">
            <el-table-column prop="startingPileNumberK" label="K" width="80" align="center"></el-table-column>
            <el-table-column prop="startingPileNumberM" label="M" width="80" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="结束桩号" align="center">
            <el-table-column prop="enddingPileNumberK" label="K" width="80" align="center"></el-table-column>
            <el-table-column prop="enddingPileNumberM" label="M" width="80" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="routeNote" label="备注(路线名称)" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editRoadRoute(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteRoute(scope.row)">删除</el-button>
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
      <addOrUpdateRoute ref="addOrUpdateRouteRef"></addOrUpdateRoute>
    </div>
    <div class="route_bottom route_shadow">
      <div class="center_content" style="margin-top: 20px;">
        <span class="title">路段管理</span>
      </div>
      <div class="search">
        <el-form :inline="true" :model="dicSearchForm2" ref="dicSearchForm2">
          <el-form-item label="路段名称：" prop="sectionName">
            <el-input v-model="dicSearchForm2.sectionName" placeholder="输入路段名称"></el-input>
          </el-form-item>
          <el-form-item label="不包含下级机构">
            <el-checkbox v-model="dicSearchForm2.choseFlag"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="getSectionListSearch"
            >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-refresh-right"
              @click="reset2('dicSearchForm2')"
            >重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-plus"
              @click="addOrUpdateSection"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table :data="sectionData" stripe style="width: 100%; height:100%">
          <el-table-column type="index" align="center">
            <template slot="header">序号</template>
          </el-table-column>
          <el-table-column prop="organName" label="管理机构名称" align="center"></el-table-column>
          <el-table-column prop="routeName" label="所属路线" align="center"></el-table-column>
          <el-table-column prop="sectionName" label="路段名称" align="center"></el-table-column>
          <el-table-column prop="routeGrade" label="公路等级" align="center"></el-table-column>
          <el-table-column label="起点桩号" align="center">
            <el-table-column prop="startingPileK" label="K" width="80" align="center"></el-table-column>
            <el-table-column prop="startingPileM" label="M" width="80" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="结束桩号" align="center">
            <el-table-column prop="enddingPileK" label="K" width="80" align="center"></el-table-column>
            <el-table-column prop="enddingPileM" label="M" width="80" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="startingPoint" label="起始地点" align="center"></el-table-column>
          <el-table-column prop="enddingPoint" label="结束地点" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editSection(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteSection(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage2"
        ></el-pagination>
      </div>
      <addOrUpdateSection ref="addOrUpdateSectionRef"></addOrUpdateSection>
    </div>
  </div>
</template>
<script>
import addOrUpdateRoute from "./addOrUpdateRoute";
import addOrUpdateSection from "./addOrUpdateSection";
export default {
  data() {
    return {
      dicSearchForm: {
        routeName: "",
      },
      dicSearchForm2: {
        sectionName: "",
        choseFlag: false,
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentPage2: 1, //当前页
      pageSize2: 10, //pagesize
      totalPage2: 0, //总页数
      routeData: [],
      sectionData: [],
      currentRow: null,
    };
  },
  components: {
    addOrUpdateRoute,
    addOrUpdateSection,
  },
  inject: ["reload"],
  methods: {
    deleteRoute(row) {
      // debugger
      let data = {
        routeName: row.routeName,
      };
      let _this = this;
      this.$store.dispatch("getSectionList", data).then(
        (res) => {
          console.log("路段列表", res);
          if (res.data.records.length > 0) {
            _this.$message({
              message: "请先解除路段绑定再删除路线！",
              type: "warning",
              center: true,
            });
          } else {
            _this
              .$confirm("确认删除该路线么?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                _this.$store.dispatch("deleteRoute", row.id).then(
                  (res) => {
                    _this.$message({
                      type: "success",
                      message: "删除成功!",
                    });
                    _this.reload();
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              })
              .catch(() => {});
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteSection(id) {
      this.$confirm("确认删除该路段么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteSection", id).then(
            (res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reload();
            },
            (err) => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    handleCurrentRow(val) {
      this.currentRow = val;
    },
    //编辑路线信息
    editRoadRoute(row) {
      this.$refs.addOrUpdateRouteRef.showModal(2, row);
    },
    addOrUpdateRoute() {
      this.$refs.addOrUpdateRouteRef.showModal(0, "");
    },

    addOrUpdateSection() {
      if (this.currentRow == null) {
        this.$message({
          message: "请先选择路线",
          type: "warning",
          center: true,
        });
      } else {
        this.$refs.addOrUpdateSectionRef.showModal(0, this.currentRow);
      }
    },

    //编辑路段信息
    editSection(row) {
      this.$refs.addOrUpdateSectionRef.showModal(2, row);
    },

    getRouteListSearch() {
      this.currentPage = 1;
      this.getRouteList();
    },

    getSectionListSearch() {
      this.currentPage2 = 1;
      this.getSectionList();
    },

    getRouteList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        routeName: this.dicSearchForm.routeName,
      };
      let _this = this;
      this.$store.dispatch("getRouteList", data).then(
        (res) => {
          console.log("路线列表", res);
          _this.routeData = res.data.records;
          _this.totalPage = res.data.total;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getSectionList() {
      let data = {
        current: this.currentPage2,
        size: this.pageSize2,
        sectionName: this.dicSearchForm2.sectionName,
        choseFlag: this.dicSearchForm2.choseFlag,
      };
      let _this = this;
      this.$store.dispatch("getSectionList", data).then(
        (res) => {
          console.log("路段列表", res);
          _this.sectionData = res.data.records;
          _this.totalPage2 = res.data.total;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getRouteList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRouteList();
    },
    //更改每页显示的条数
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.currentPage2 = 1;
      this.getSectionList();
    },
    //更换页码
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.getSectionList();
    },
    //重置路线
    reset(resetForm) {
      this.$refs[resetForm].resetFields();
      this.getRouteList();
    },
    //重置路段
    reset2(resetForm) {
      this.$refs[resetForm].resetFields();
      this.getSectionList();
    },
  },
  created() {
    this.getRouteList();
    this.getSectionList();
  },
};
</script>
<style type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.title {
  height: 65px;
  font-size: 18px;
  font-weight: 600;
  color: rgba(32, 35, 43, 1);
}
.route_top {
  padding: 22px;
}
.route_bottom {
  padding: 22px;
}
.route_shadow {
  margin-top: 22px;
  -webkit-box-shadow: 0 6px 4px 0 rgba(94, 137, 181, 0.1);
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
