<template>
  <div class="propery-dialog">
    <el-dialog
      title="案件信息"
      :visible.sync="caseVisible"
      @close="caseVisible = false"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-row style="height:32px;line-height:32px;margin: -10px 0 10px 0;">
        <span style="font-size:16px;">关联案件：</span>
        <el-tag
          v-for="(tag,index) in multipleSelection"
          :key="index"
          closable
          @close="onDelete(tag,index)"
          style="margin-left:3px;"
        >{{tag.caseNumber}}</el-tag>
      </el-row>
      <!-- <el-divider></el-divider> -->
      <div>
        <div>
          <el-form :model="searchForm" ref="searchForm" class="caseSearchForm">
            <el-row>
              <el-col :span="3">
                <el-form-item label-width="0">
                  <span style="font-size:16px;">选择案件：</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="案号" label-width="60px">
                  <el-input v-model="searchForm.caseNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="当事人/单位" label-width="110px">
                  <el-input v-model="searchForm.party"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="违法行为" label-width="90px">
                  <el-input v-model="searchForm.caseCauseName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="0">
                  <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="tablePart table_tr_overflow">
          <el-table
            ref="caseTable"
            :data="tableData"
            stripe
            style="width: 100%"
            highlight-current-row
            height="300px"
          >
            <el-table-column type="selection" width="55">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.selected"
                  @change="handleSelectionChange(scope.row,scope.$index)"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
            <el-table-column prop="name" label="当事人/单位" align="center" width="150"></el-table-column>
            <el-table-column prop="caseCauseName" label="违法行为" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                  <span>{{scope.row.caseCauseName}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="caseType" label="案件类型" align="center" width="100"></el-table-column>
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
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="caseVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCaseData()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="财物处理"
      :visible.sync="propertyVisible"
      @close="propertyVisible = false"
      :close-on-click-modal="false"
      width="600px"
    >
      <div>
        <el-form ref="handleForm" :model="dispose" label-width="90px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="处理方式">
                <el-radio-group v-model="dispose.disposeWay">
                  <el-radio
                    v-for="(item,index) in handleWayList"
                    :key="index"
                    :label="item"
                  >{{item}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <el-form-item label>
                <el-radio v-model="other" label="其他">其他</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-if="other=='其他'">
              <el-form-item label>
                <el-input v-model="dispose.disposeWay"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="dispose.disposeRemark" maxlength="30"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="propertyVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleWayData()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { findCaseListApi } from "@/api/propertyManage";

export default {
  data() {
    return {
      searchForm: {
        caseNumber: "",
        party: "",
        caseCauseName: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      hideSomeSearch: true,
      caseVisible: false,
      propertyVisible: false,
      dispose: {
        disposeWay: "",
        disposeRemark: "",
        disposePersonId: "",
        disposePerson: "",
      },
      other: "",
      caseData: "",
      isSaveLink: "",
      caseLinktypeId: "",
      handleWayList: ["封存", "扣押", "退回当事人", "移交法院", "销毁"],
      multipleSelection: [],
      selectedData: [],
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    handleSelectionChange(row, index) {
      debugger;
      // this.multipleSelection.push(row);
      // this.$set(this.tableData,index,row);
      let flag = this.multipleSelection.findIndex(
        (element) => element.id == row.id
      );
      if (flag != -1) {
        this.multipleSelection.splice(flag, 1);
      } else {
        this.multipleSelection.push(row);
      }
      this.$set(this.tableData, index, row);
    },
    //获取机构下数据
    async getCaseList2(searchData) {
      let data = searchData;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      data.flag = 5;
      let res = await findCaseListApi(data);
      this.setTableState(res.data.records);
      this.total = res.data.total;
      // this.tableData = res.data.records;
      // this.getCaseList(data);
    },
    //获取列表中的数据  未立案 审批中  待办理
    async getCaseList(params) {
      let data = params;
      let res = await this.$store.dispatch("queryCaseBasicInfoListPage", data);
    },
    setTableState(data) {
      if (data) {
        let _this = this;
        data.forEach((item, index) => {
          item.name = item.party ? item.party : item.partyName;
          let flag = _this.multipleSelection.findIndex(
            (element) => element.id == item.id
          );
          if (flag !== -1) {
            item.selected = true; //不可勾选
            _this.$set(_this.multipleSelection, flag, item);
          } else {
            item.selected = false; //可勾选
          }
        });
        this.tableData = data;
      } else {
        this.tableData = [];
      }
    },
    setRowState(row) {
      let _this = this;
      this.tableData.find;
      this.tableData.find((item) => {
        if (row.id == item.id) {
          item.selected = row.selected; //不可勾选
        }
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCaseList2({});
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseList2({});
    },
    onDelete(row, i) {
      this.multipleSelection.splice(i, 1);
      let _this = this;
      this.tableData.find((element, index) => {
        if (element.id == row.id) element.selected = false;
        _this.$set(this.tableData, index, element);
      });
    },
    showModal(type, data) {
      if (type === "case") {
        this.caseVisible = true;
        if (data.length > 0 && data[0].caseID) {
          this.multipleSelection = [];
          for (let i = 0; i < data[0].caseID.length; i++) {
            this.multipleSelection.push({
              id: data[0].caseID[i],
              caseNumber: data[0].caseNumber[i],
              propertyId: data[0].id,
            });
          }
        }

        this.getCaseList2({});
      } else {
        this.other = "";
        this.dispose.disposeRemark = "";
        this.dispose.disposeWay = "";
        this.propertyVisible = true;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog(type) {
      if (type === "case") {
        this.caseVisible = false;
      } else {
        this.propertyVisible = false;
      }
    },
    searchEmit() {
      this.getCaseList2(this.searchForm);
    },
    handleCaseData() {
      this.$emit("handle-case-data", this.multipleSelection);
      this.closeDialog("case");
    },

    handleWayData() {
      if (!this.dispose.disposeWay) {
        this.$message({ type: "error", message: "请选择处理方式" });
        return;
      }
      this.$emit("handle-way-data", this.dispose);
      this.closeDialog("way");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
<style lang="scss" scoped src="@/assets/css/propertyManage.scss"></style>