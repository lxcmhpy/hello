<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" style="overflow: hidden;">
      <div class="handlePart" style="margin-left:0">
        <div class="search toggleBox btn-style" style="width: 100%;">
          <div
            class="handlePart caseHandleSearchPart"
            :class="isShow ? 'autoHeight' : 'aaa'"
            style="width：100%;margin-left:-6px;right: 0;"
          >
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item label-width="0">
                <el-button
                  size="medium"
                  class="commonBtn searchBtn"
                  type="primary"
                  @click="handleClickAdd"
                  >添加记录</el-button
                >
              </el-form-item>
              <el-form-item label="业务类型" prop="checkType">
                <el-select v-model="searchForm.checkType" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in domainList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处置状态" prop="fileStatus">
                <el-select v-model="searchForm.fileStatus" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in statusList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车牌号" prop="vehicleShipId">
                <el-input
                  v-model="searchForm.vehicleShipId"
                  placeholder="请输入车牌号"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="search-btns">
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="搜索"
                icon="iconfont law-sousuo"
                @click="getTableData()"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="重置"
                icon="iconfont law-zhongzhi"
                @click="resetForm('searchForm')"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn toogleBtn"
                :title="isShow ? '点击收缩' : '点击展开'"
                :icon="isShow ? 'iconfont law-top' : 'iconfont law-down'"
                @click="isShow = !isShow"
              >
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="tablePart" style="clear: both;">
        <el-table :data="recordList" stripe style="width: 100%" height="100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="55"
          ></el-table-column>
          <!-- <el-table-column prop="vehicleShipId" label="车牌号" align="center"></el-table-column> -->
          <el-table-column label="车牌号" align="center" width="120">
            <template slot-scope="scope">
              <div
                class="otherColor"
                :class="vehicleColorObj[scope.row.vehicleIdColor]"
              >
                <div class="border">
                  {{ scope.row.vehicleShipId }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="checkType"
            label="类型"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="firstCheckStation"
            label="检测站"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="totalWeight"
            label="初检车货总重"
            align="center"
            sortable
          ></el-table-column>
          <el-table-column
            prop="firstCheckTime"
            label="初检时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="overRatio"
            label="初检超载率"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              {{
                scope.row.overRatio &&
                scope.row.overRatio != "0%" &&
                scope.row.overRatio != "%"
                  ? scope.row.overRatio
                  : ""
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="overRatio2"
            label="复检超限率"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              {{
                scope.row.overRatio2 &&
                scope.row.overRatio2 != "0%" &&
                scope.row.overRatio2 != "%"
                  ? scope.row.overRatio2
                  : ""
              }}
            </template>
          </el-table-column>
          <el-table-column prop="fileStatus" label="处置状态" align="center">
            <template slot-scope="scope">
              {{fileStatusMap[scope.row.fileStatus]}}
              <!-- {{ scope.row.fileStatus == 0 ? "进行中" : "待归档" }} -->
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="paginationBox">
          <div v-if="total > 10">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.current" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="form.size"></el-pagination>
          </div>
          <div class="noMore" v-else>没有更多了</div>
        </div> -->
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
      <el-dialog
        title="添加超限超载记录"
        :visible.sync="dialogVisible"
        width="424px"
      >
        <ul class="notice-icon-list">
          <li
            v-for="(item, index) in checkList"
            :key="index"
            @click="handleClickAddType(item.label)"
          >
            <i class="iconfont" :class="item.iconName" :style="item.color"></i
            ><br />
            <span class="icon-dec-text">{{ item.label }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  getPcQueryCarInfoApi,
  changeFileStatus,
  delDocumentById,
  getDictListDetailByNameApi
} from "@/api/inspection";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fileStatusMap:{
        0:'进行中',
        1:'待归档',
        2:'已归档',
      },
      recordList: [],
      total: 0,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      //业务类型
      domainList: [
        { name: "全部", value: 0 },
        { name: "路警联合", value: 1 },
        { name: "绿通车", value: 2 },
        { name: "危化品", value: 3 },
        { name: "大件许可", value: 14 },
        { name: "不足1吨", value: 5 },
        { name: "特种车", value: 6 }
      ],
      //处置状态
      statusList: [
        { name: "全部", value: 3 },
        { name: "进行中", value: 0 },
        { name: "待归档", value: 1 },
        { name: "已归档", value: 2 }
      ],

      //超限类型
      checkList: [
        { label: "特种车", iconName: "law-btn_te", color: "color:#4382e6" },
        { label: "绿通车", iconName: "law-btn_lv", color: "color:#23aa98" },
        { label: "危化车", iconName: "law-btn_v", color: "color:#e65b59" },
        { label: "不足1t", iconName: "law-btn_1t", color: "color:#00bbe8" },
        { label: "路警联合", iconName: "law-btn_luj", color: "color:#4573d0" },
        { label: "大件许可", iconName: "law-btn_daj", color: "color:#009fff" }
      ],
      //车牌颜色
      vehicleColorObj: {
        黑色: "vehicle-black",
        白色: "vehicle-white",
        黄色: "vehicle-yellow",
        红色: "vehicle-red",
        蓝色: "vehicle-blue",
        绿色: "vehicle-green",
        灰色: "vehicle-gray",
        渐变绿: "vehicle-gradient-green",
        黄绿色: "vehicle-yelloe-green"
      },

      searchForm: {
        vehicleShipId: "", //车牌号
        fileStatus: 3,
        checkType: ""
      },
      isShow: false,
      dialogVisible: false,
      typerule: {
        type: [{ required: true, message: "请选择记录类型", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 查看
    handleView(item) {
      this.$router.push({
        name: "inspection_overWeightForm"
      });
      this.$store.commit("set_inspection_fileId", item.id);
      this.$store.commit("set_inspection_OverWeightId", item.id);
      this.$store.commit("set_inspection_OverWeight_add", false);
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getTableData();
    },

    // 获取列表数据
    getTableData() {
      this.recordList = [];
      let data = {
        checkType: this.searchForm.checkType,
        fileStatus: this.searchForm.fileStatus,
        vehicleShipId: this.searchForm.vehicleShipId,
        current: this.currentPage,
        size: this.pageSize
      };
      if (this.searchForm.fileStatus == 3) {
        data.fileStatus = "";
      }
      getPcQueryCarInfoApi(data).then(
        res => {
          if (res.code == 200) {
            this.recordList = res.data.records;
            this.totalPage = res.data.total;
          }
        },
        error => {}
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },

    // 点击--添加
    handleClickAdd() {
      this.dialogVisible = true;
    },

    //新建
    handleClickAddType(label) {
      console.log(" -> label", label);
      // debugger;
      if (label == "路警联合") {
        this.$store.commit("set_inspection_OverWeightId", "");
        console.log("aaaaaaaaaa", this.inspectionOverWeightId);
        this.$router.push({
          name: "inspection_overWeightForm"
        });
        this.$store.commit("set_inspection_OverWeight_add", true);
      }
    }
  },
  computed: {
    ...mapGetters(["inspectionOverWeightId"])
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>
<style lang="scss" src="@/assets/css/cluesReview.scss"></style>
<style lang="scss">
.btn-style {
  .el-button {
    background: #4573d0;
    color: white;
  }
}
</style>
