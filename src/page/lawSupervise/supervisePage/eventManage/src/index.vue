<template>
  <div class="eventManage">

    <!-- 表单 -->
    <el-form :inline="true" :model="form" class="eventManage-form">
      <el-form-item label="事件名称" prop="eventName">
        <el-input clearable v-model="form.eventName" placeholder="输入事件名称"></el-input>
      </el-form-item>
      <el-form-item label="是否重点事件" prop="isemphasis">
        <el-select v-model="form.isemphasis" clearable placeholder="请选择">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件状态" prop="state">
        <el-select v-model="form.state" clearable placeholder="请选择">
          <el-option label="全部" value="2,3,4,5"></el-option>
          <el-option label="待指派" :value="2"></el-option>
          <el-option label="已指派待处理" :value="3"></el-option>
          <el-option label="处理中" :value="4"></el-option>
          <el-option label="处理完毕" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件时间" prop="eventDate">
        <el-date-picker
          @change="handleEventDate"
          :editable="false"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="eventDate"
          size="small"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-top:1px; margin-left: 15px;">
        <el-button
                title="搜索"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
                @click="handleFind"/>
        <el-button
                title="重置"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-zhongzhi"
                @click="handleReset"/>
    </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <div class="eventManage-buttonList">
      <el-button @click="addEvent" type="primary" icon="el-icon-plus" size="small">新增事件</el-button>
    </div>

    <!-- 表格 -->
    <div class="eventManage-table">
      <el-table
        @row-dblclick="handleDetails"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          type="index"
          width="50"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="eventName"
          label="事件名称">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          prop="eventDescribe"
          label="事件描述">
        </el-table-column>
        <el-table-column
          align="center"
          prop="eventDate"
          label="事件时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="是否重点事件">
          <template slot-scope="scope">
            <span>{{ scope.row.isemphasis ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="事件状态">
          <template slot-scope="scope">
            <span>
              {{
                scope.row.state === 1 ? '待上报'
                  : scope.row.state === 2 ? '待指派'
                    : scope.row.state === 3 ? '已指派待处理'
                      : scope.row.state === 4 ? '处理中'
                        : scope.row.state === 5 ? '处理完毕' : null
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="eventDate"
          label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state===2"
              size="mini"
              type="text"
              @click="handleAssigned(scope.$index, scope.row)">指派</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDetails(scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.state===1"
              size="mini"
              type="text"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页条 -->
    <div class="eventManage-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 8, 10, 20, 30, 40]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 详情和新增弹窗 -->
    <Dialog :title="title" :config="config" ref="dialog" />

    <!-- 指派弹窗 -->
    <DialogAssigned :config="config" ref="dialogAssigned" @successDialogAssigned="successDialogAssigned" @handleOpen="handleOpen" />
  </div>
</template>

<script>
import Dialog from "./dialog.vue";
import DialogAssigned from "./dialogAssigned.vue";
import store from "../store.js";
export default {
  mixins: [store],
  provide() {
    return {
      page: this
    }
  },
  components: {
    Dialog,
    DialogAssigned
  },
  data() {
    return {
      config: {
        treeOptions: [],
        peopleOptions: []
      },
      title: "", // 弹出框标题
      currentPage: 1,
      total: 0, // 总条数
      eventDate: '',
      form: {
        current: 1, // 当前页
        size: 8, // 每页显示条数
        eventName: '',
        state: '',
        isemphasis: '',
        startDate: '', // 开始时间
        endDate: '', // 结束时间
      },
      tableData: []
    }
  },
  methods: {
    /**
     * 指派成功时的回调
     */
    successDialogAssigned() {
      this.initPage()
    },

    /**
     * 打开指派弹窗时的回调, 获取机构数据
     */
    handleOpen() {
      this.getTree()
    },

    /**
     * 页面初始化
     */
    initPage() {
      let params = { current:1, size:8 }
      this.getData(params)
    },

    /**
     * 更改每页显示条数时
     */
    handleSizeChange(val) {
      this.form.size = val
      this.getData(this.form)
      console.log(`每页 ${val} 条`);
    },

    /**
     * 当前页码变动时触发
     */
    handleCurrentChange(val) {
      this.form.current = val
      this.getData(this.form)
      console.log(`当前页: ${val}`);
    },

    /**
     * 选择时间
     */
    handleEventDate(val) {
      // 如果没选择日期时间或者日期时间被清空了，则清除表单时间
      if(val) {
        this.form.startDate = val[0]
        this.form.endDate = val[1]
      } else {
        this.form.startDate = ""
        this.form.endDate = ""
      }
    },

    /**
     * 查询
     */
    handleFind() {
      this.getData(this.form)
    },

    /**
     * 重置
     */
    handleReset() {
      this.eventDate = ''
      this.form.eventName = ''
      this.form.isemphasis = ''
      this.form.startDate = ''
      this.form.endDate = ''
      this.getData(this.form)
    },

    /**
     * 指派
     */
    handleAssigned(index, row) {
      // 打开指派弹窗
      this.$refs.dialogAssigned.dialogAssignedVisible = true
      this.$refs.dialogAssigned.form.state = row.state
      this.$refs.dialogAssigned.form.id = row.id
      if(row.disposeOrgan){
        this.getPerson(row.disposeOrgan)
        this.$refs.dialogAssigned.form.disposeOrgan = row.disposeOrgan
        if(row.disposePerson){
          this.$refs.dialogAssigned.form.disposePerson = JSON.parse(row.disposePerson)
        }
      }
    },

    /**
     * 新增事件
     */
    addEvent() {
      this.title = "新增事件"
      // 打开弹窗
      this.$refs.dialog.dialogFormVisible = true
      // 启用表单
      this.$refs.dialog.disabled = false
      this.$refs.dialog.hasLatitudeAndLongitude = false
      this.config.peopleOptions=[]
    },

    /**
     * 详情
     */
    handleDetails(row) {
      this.title = "事件详情"
      // 打开弹窗
      this.$refs.dialog.dialogFormVisible = true
      // 禁用表单
      this.$refs.dialog.disabled = true
      // 获取数据
      this.getDetails(row.id)
    },

    /**
     * 编辑
     */
    handleUpdate(row) {
      this.title = "编辑事件"
      this.$refs.dialog.form.id = row.id
      // 获取数据
      this.getDetails(row.id)
      // 打开弹窗
      this.$refs.dialog.dialogFormVisible = true
      // 启用表单
      this.$refs.dialog.disabled = false
    },

    /**
     * 删除行
     */
    handleDelete(row) {
      this.deleteEvent({id: row.id})
    },
  },
  created() {
    this.initPage()
  }
}
</script>

<style lang="scss">
.eventManage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
  background: #FFFFFF;
  &-buttonList {
    display: flex;
    justify-content: flex-start;
  }
  &-table {
    margin-top: 30px;
  }
  &-pagination {
    margin: 10px 0 20px 0;
    text-align: right;
  }
}
</style>
