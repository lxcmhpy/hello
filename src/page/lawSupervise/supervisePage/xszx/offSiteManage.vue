<template>
  <!-- 非现场治超列表 -->
  <keep-alive>
    <div class="com_searchAndpageBoxPadding">
      <div class="com_searchPage_top">
        <!-- <ul class="com_searchPage_tab">
            <li v-for="(item, index) in processStatus" :class="{'active': index === tabActiveValue}"  :key="index" @click="activeAndSearch(item,index)">{{item.value}}</li>
        </ul> -->
        <!-- @tab-click="activeAndSearch" -->
        <el-tabs v-model="tabActiveValue" :stretch="true" @tab-click="search(1)">
          <el-tab-pane v-for="(item, index) in processStatus" :key="index.toString()" :name="item.value">
            <span slot="label">
              <el-badge :value="item.num">
                {{item.value}}
              </el-badge>
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="searchAndpageBox toggleBox">
        <!-- <iframe src="http://172.16.170.54:9332/9,105b6779dca4#toolbar=0#" width="900px" height="1000px" style="background:white;"></iframe> -->
        <!-- <object>
            <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1200px !important;" name="plugin" id="plugin"
            src="http://172.16.170.54:9332/9,105b6779dca4#palette='white|white'#" type="application/pdf" internalinstanceid="29">
        </object> -->
        
        <div class="orgin">
        <div class="orgin_left">
          <!-- <el-button type="primary" size="medium" @click="getAllOrganDialog()">
            <i class="iconfont law-submit-o f12"></i> 预警推送
          </el-button>
          <el-button v-if="tabActiveValue == '已审核'" type="primary" size="medium" @click="routerTransferManage">
            <i class="iconfont law-submit-o f12"></i> 转办
          </el-button> -->
          <el-dialog class="mini-dialog-title" title="预警推送" :visible.sync="yjVisible" :show-close="false" :close-on-click-modal="false" width="800px">
            <el-form :model="form" ref="form" class="checkSearchForm" label-width="120px">
              <p>推送信息</p>
              <div class="invalidinfo main_box">
                <table class="table_style">
                  <tr>
                    <td class="color_ff" width="60px">
                      执法机构
                    </td>
                    <td>
                      <el-popover placement="bottom" trigger="click" v-model="visiblePopover">
                        <div class="departOrUserTree" style="width:426px">
                          <div class="treeBox">
                            <el-tree class="filter-tree" :data="organData" :props="defaultProps" node-key="id" :filter-node-method="filterNode" :default-expanded-keys="defaultExpandedKeys" @node-expand="nodeExpand" ref="tree" @node-click="handleNodeClick1">
                              <span class="custom-tree-node" slot-scope="{ node,data }">
                                <span>
                                  <i :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"></i>
                                  <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
                                </span>
                              </span>
                            </el-tree>
                          </div>
                        </div>
                        <el-input v-model="form.lane" style="width:100%" slot="reference" placeholder="请选择执法机构"></el-input>
                      </el-popover>
                    </td>
                  </tr>
                  <tr>
                    <td class="color_ff">
                      相关说明
                    </td>
                    <td width="260px">
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.load">
                      </el-input>
                    </td>
                  </tr>
                </table>
              </div>
              <p>预警信息(4条)</p>
              <div class="tablePart" style="padding-top:0px">
                <el-table :data="tableData" stripe highlight-current-row  style="width: 100%;height:100%;">
                  <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                  <el-table-column prop="checkTime" label="检测时间" align="center" width="100"></el-table-column>
                  <el-table-column prop="siteName" label="执法点" align="center"></el-table-column>
                  <el-table-column prop="lane" label="车牌号" align="center"></el-table-column>
                  <el-table-column prop="vehicleNumber" label="车货总质量" align="center" width="120">
                  </el-table-column>
                  <el-table-column prop="totalWeight" label="超重" align="center"></el-table-column>
                  <el-table-column prop="overload" label="超限率" align="center"></el-table-column>
                </el-table>
              </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="yjVisible=false">确认</el-button>
              <el-button @click="yjVisible = false">取消</el-button>
            </span>
          </el-dialog>
        </div>
        <div class=" " :class="{'autoHeight':isShow}">
          <el-form :inline="true" :model="form" label-width="70px" ref="offsiteManageform">
            <el-form-item label="检测站点" prop="siteName">
              <el-input v-model="form.siteName" placeholder="回车可直接查询" @keyup.enter.native="search(1)"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="vehicleColor">
              <el-select v-model="form.vehicleColor" placeholder="请选择">
                <el-option v-for="item in vehicleColorList" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
              <el-form-item class="cars">
              <el-input v-model="form.vehicleNumber" placeholder="请输入车牌号" @keyup.enter.native="search(1)"></el-input>
              </el-form-item>
            </el-form-item>
            <!-- <el-form-item label=" " label-width="0px" prop="vehicleNumber">
              
            </el-form-item> -->
            <el-form-item label="超限率" prop="overload">
              <!-- <el-input v-model="form.overload" placeholder="回车可直接查询" @keyup.enter.native="search(1)"></el-input> -->
              <el-select v-model="form.overload" placeholder="请选择">
                <el-option v-for="item in cxlList" :key="item.id" :label="item.name" :value="item.sort"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-collapse-transition>
              <div :class="{'ransition-box':true}"> -->
                <el-form-item label="过检时间">
                  <el-date-picker style='width:240px' :picker-options="pickerOptions" unlink-panels v-model="timeList" type="daterange" range-separator="—" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">

                  </el-date-picker>
                </el-form-item>
              <!-- </div>
            </el-collapse-transition> -->
            <div class="orgin_bottom" >&nbsp;
              <el-button type="primary" size="medium" icon="el-icon-search" @click="search(1)"></el-button>
              <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="reset('offsiteManageform')"></el-button>
            </div>
            <!-- <div style="display:inline-block ">
              <el-button size="medium" class="commonBtn " title="搜索" icon="iconfont law-sousuo" @click="search(1)"></el-button>
              <el-button size="medium" class="commonBtn " title="重置" icon="iconfont law-zhongzhi" @click="reset('offsiteManageform')"></el-button>
            </div> -->
          </el-form>
          
        </div>
        </div>
        <div class="tablePart">
          <el-table :data="tableData" stripe highlight-current-row  style="width: 100%;height:100%;" @row-click="handleNodeClick">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="checkTime" sortable label="检测时间" align="center" width="105"></el-table-column>
            <el-table-column prop="siteName" label="检测站点名称" align="center"></el-table-column>
            <el-table-column prop="lane" label="车道" width="50" align="center"></el-table-column>
            <el-table-column label="车牌号" align="center" width="120">
              <template slot-scope="scope">
                <div class="otherColor" :class="vehicleColorObj[scope.row.vehicleColor]">
                  <div class="border">
                    {{scope.row.vehicleNumber}}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="totalWeight" sortable label="车货总质量（t）" width="160" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.totalWeight/1000>100" style="color:red">{{scope.row.totalWeight/1000}}</span>
                <span v-else>{{scope.row.totalWeight/1000}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="approvedLoad" sortable label="限重（t）" width="120" align="center">
              <template slot-scope="scope">
                {{scope.row.approvedLoad/1000}}
              </template>
            </el-table-column>
            <el-table-column prop="overweight" sortable label="超重（t）" width="120" align="center">
              <template slot-scope="scope">
                {{scope.row.overweight/1000}}
              </template>
            </el-table-column>
            <el-table-column prop="overload" sortable label="超限率（%）" width="130" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.overload>100" style="color:red">{{scope.row.overload}}</span>
                <span v-else>{{scope.row.overload}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="important" label="重点监管" width="120" align="center">
              <template slot-scope="scope">
                {{scope.row.important=='是'?scope.row.important:'/'}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paginationBox">
          <div v-if="total/form.size > 1">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.current" background :page-sizes="[10, 20, 30, 40]" :page-size="form.size" layout="prev, pager, next,sizes,jumper" :total="total"></el-pagination>
          </div>
          <div class="noMore" v-else>没有更多了</div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
<script>
import { queryListPage, findAllDrawerById, getCountStatus, queryAlarmVehiclePage } from '@/api/lawSupervise.js';
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  inject: ["reload"],
  data() {
    let _this = this;
    return {
      selectCurrentTreeName: "",
      defaultExpandedKeys: [],
      organData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          if (minDate) {
            _this.$set(_this.timeList, 0, minDate);
          }
          let max = new Date(maxDate ? maxDate : minDate);
          max.setHours(23);
          max.setMinutes(59);
          max.setSeconds(59);
          _this.$set(_this.timeList, 1, max);
        }
      },
      yjVisible: false,
      vehicleColorList: null,
      cxlList: null,
      // pageSize: 10, //pagesize
      form: {
        siteName: '',
        vehicleColor: '',
        vehicleNumber: '',
        overload: '',
        status: '',
        current: 1, //当前页
        size: 10, //每页显示条数
        lane: ''
        // checkEndTime: '',
        // checkStartTime: ''
      },
      total: 0, // 总条数
      timeList: ['', ''],
      processStatus: [{
        value: '待审核',
        num: ''
      }, {
        value: '审核中',
        num: ''
      }, {
        value: '已审核',
        num: ''
      }, {
        value: '已转办',
        num: ''
      }, {
        value: '无效信息',
        num: ''
      }],
      tabActiveValue: '待审核',
      isShow: false,
      tableData: [],
      vehicleColorObj: {
        '黑色': 'vehicle-black',
        '白色': 'vehicle-white',
        '黄色': 'vehicle-yellow',
        '红色': 'vehicle-red',
        '蓝色': 'vehicle-blue',
        '绿色': 'vehicle-green',
        '灰色': 'vehicle-gray',
        '渐变绿': 'vehicle-gradient-green',
        '黄绿色': 'vehicle-yelloe-green',
      },
      visiblePopover: false
    }
  },
  methods: {
    handleNodeClick1(data) {
      console.log(data);
      //   this.selectCurrentTreeName = data.label;
      //   this.currentOrganId = data.id;
      this.form.lane = data.label;
      this.visiblePopover = false;
      //   this.getSelectOrgan(this.currentOrganId);
    },
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.defaultExpandedKeys.push(res.data[0].id);
          _this.selectCurrentTreeName = _this.selectCurrentTreeName
            ? _this.selectCurrentTreeName
            : res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
          console.log(_this.defaultExpandedKeys);
          console.log(_this.organData);
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
          _this.getSelectOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    getAllOrganDialog() {
      this.getAllOrgan('root');
      this.yjVisible = true;
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    search(val,isCreate) {

      this.form.checkStartTime = typeof this.timeList[0] == 'object' ? this.timeList[0].format('yyyy-MM-dd HH:mm:ss') : this.timeList[0];
      this.form.checkEndTime = typeof this.timeList[1] == 'object' ? this.timeList[1].format('yyyy-MM-dd HH:mm:ss') : this.timeList[1];
      this.form.status = this.tabActiveValue;
      this.form.current = val;
      let _this = this;
      // debugger;
      if (this.tabActiveValue === '待审核') {
        queryAlarmVehiclePage(_this.form).then(
          res => {
            /* if(isCreate){
              _this.getCountStatus()
            } */
            _this.tableData = res.data.records;
            _this.total = res.data.total;
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return
          }
        )
      } else {
        queryListPage(_this.form).then(
          res => {
            _this.tableData = res.data.records;
            _this.total = res.data.total;
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return
          }
        )
      }
    },
    findAllDrawerById(data, obj) {
      let _this = this
      new Promise((resolve, reject) => {
        findAllDrawerById(data).then(
          res => {
            // resolve(res)
            _this[obj] = res.data
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return
          }
        )
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields();
      this.form.vehicleNumber=''
      this.timeList=['', '']
      let _this=this
      this.pickerOptions= {
        
        onPick: ({ maxDate, minDate }) => {
          if (minDate) {
            _this.$set(_this.timeList, 0, minDate);
          }
          let max = new Date(maxDate ? maxDate : minDate);
          max.setHours(23);
          max.setMinutes(59);
          max.setSeconds(59);
          _this.$set(_this.timeList, 1, max);
        }
      }
    },
    routerDetail(row) {
      // this.$store.commit('setOffSiteManageId', row.id);
      this.$router.push({
        name: 'law_supervise_offSiteDetail',
        params: {
          offSiteManageId: row.id
        }
      })
    },
    routerEvidenceDetail(row) {
      // this.$store.commit('setOffSiteManageId', row.id);
      this.$router.push({
        name: 'law_supervise_evidenceDetail',
        params: {
          offSiteManageId: row.id
        }
      })
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.form.size = val;
      this.search(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.search(val);
    },
    routerInvalidCueDetail(row) {
      // this.$store.commit('setOffSiteManageId', item.id);
      this.$router.push({
        name: 'law_supervise_invalidCueDetail',
        params: {
          offSiteManageId: row.id
        }
      })
    },
    routerExamineDetail(row, status, tabTitle) {
      // this.$store.commit('setOffSiteManageId', item.id);
      this.$router.push({
        name: 'law_supervise_examineDoingDetail',
        params: {
          status: status,
          tabTitle: tabTitle,
          offSiteManageId: row.id
        }
      })
    },
    routerExamineDoingDetail(row, status, tabTitle) {
      // this.$store.commit('setOffSiteManageId', item.id);
      this.$router.push({
        name: 'law_supervise_examineDoingDetail',
        params: {
          status: status,
          tabTitle: tabTitle,
          offSiteManageId: row.id
        }
      })
    },
    routerTransferDetail(row) {
      // this.$store.commit('setOffSiteManageId',  item.id);
      this.$router.push({
        name: 'law_supervise_transferDetail',
        params: {
          offSiteManageId: row.id
        }
      })
    },
    routerTransferManage() {
      this.$router.push({
        name: 'law_supervise_transferManage',
      })
    },
    handleNodeClick(data) {
      //    if(this.tabActiveValue == )
      switch (data.status) {
        case undefined: this.routerExamineDoingDetail(data, '0', '线索详情'); break;
        case '无效信息': this.routerInvalidCueDetail(data); break;
        case '审核中': this.routerExamineDoingDetail(data, '1', '线索详情'); break;
        case '已转办': this.routerTransferDetail(data); break;
        case '已审核': this.routerExamineDetail(data, '3', '线索详情'); break;
      }
    },
    getCountStatus() {
      let _this = this;
      new Promise((resolve, reject) => {
        getCountStatus().then(
          res => {
            // resolve(res)
            // _this[obj] = res.data
            res.data.forEach((item, i) => {
              let _index = _.findIndex(_this.processStatus, (chr) => {
                return chr.value === item.STATUS;
              })
              // debugger;
              if (_index > -1) {
                _this.processStatus[_index].num = item.COUNT;
              }
            })
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return
          }
        )
      })
    }
  },
  created() {
    if(this.$route.params.siteName!== undefined){
      this.form.siteName = this.$route.params.siteName
    }
    if(this.$route.params.tabActiveValue!== undefined){
      this.tabActiveValue = this.$route.params.tabActiveValue
    }
    this.search(1,true);
    this.findAllDrawerById(BASIC_DATA_SYS.cxl, 'cxlList');
    this.findAllDrawerById(BASIC_DATA_SYS.vehicleColor, 'vehicleColorList');
  },
  mounted() {

  }
}
</script>
<style lang="scss"  scoped>
  .orgin{
    display: flex;
  }
  .orgin_left{
    margin-left: 0px;
    margin-right: 80px;
    display: flex;
    height: fit-content;
  }
  .cars{
    margin-left: -5px;
  }
  .orgin_bottom{
    display:inline-block; 
    margin-top:6px; 
  }
</style>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
