<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage toggleBox">
        <div class="handlePart">
          <el-form :inline="true" ref="deviceTypeForm" :model="formInline" label-width="120px">
                <el-form-item label="站点类型名称" prop="name">
                    <el-input v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" icon="el-icon-search" @click="getDataList(1)">查询</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="reset">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addData">新增</el-button>
                </el-form-item>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            resizable
            border
            style="width: 100%;height:100%"
            @row-click="showDataDetail"
          >
            <el-table-column label="序号" width="70px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="站点类型名称"></el-table-column>
            <el-table-column prop="code" label="站点类型编号"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <div style="width:160px">
                    <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
                    <el-button type="text" @click.stop @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button type="text" @click.stop @click="handleDelete(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog :title="title"
          custom-class="leftDialog"
          :visible.sync="visible"
          top="0"
          width="40%"
          @close="closeDialog"
          :close-on-click-modal="false">
          <el-form 
            :model="addForm" 
            ref="addForm" 
            :rules="rules"
            label-width="150px"
            class="addOrganClass" >
            <div class="part">
              <el-row>
                <el-form-item label="站点类型名称" prop="name">
                  <el-input v-model="addForm.name" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="站点类型编号" prop="code">
                  <el-input v-model="addForm.code" style="width: 100%;" readonly></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="站点定位类型" prop="locationType">
                  <el-select v-model="addForm.locationType" style="width: 100%;" :disabled="this.formReadOnly">
                      <el-option
                        v-for="item in locationTypeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="备注">
                  <el-input v-model="addForm.note" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                </el-form-item>
              </el-row>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button @click="addOrUpdate('addForm')"  type="primary" class="btn-custom" >
              <span>确 定</span>
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
import { 
    queryDeviceTypeAll,
    findDeviceTypeById,
    saveOrUpdateDeviceType,
    findDeviceTypeByName,
    findDeviceTypeNewCode,
    deleteDeviceTypeById
} from "@/api/lawSupervise.js";
import iLocalStroage from '@/common/js/localStroage';
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    data() {
      return {
        visible:false,
        formReadOnly:false,
        formInline: {
          name: ""
        },
        addForm:{
        },
        rules: {
            code: [
                {required: true, message: "请输入站点类型编号", trigger: "blur"}
            ],
            name: [
                {required: true, message: "请输入站点类型名称", trigger: "blur"},
            ],
            locationType: [
                {required: true, message: "请输入站点定位类型", trigger: "blur"},
            ]
        },
        tableData: [], //表格数据
        title:"新增站点类型",
        locationTypeData: [{value: 0, label: '地理位置信息'}, {value: 1, label: '路桩路段位置信息'}],
      };
    },
    components: {
    },
    methods: {
      addOrUpdate(formName){
        let _this = this
        this.$refs[formName].validate(valid => {
          if (valid) {
            findDeviceTypeByName(_this.addForm.name).then(
              res => {
                if(res.data && res.data.id != _this.addForm.id){
                   _this.$message({
                    type: "error",
                    message:"该名称已存在!"
                  });
                }else {
                  saveOrUpdateDeviceType(_this.addForm).then(
                    res => {
                      _this.$message({
                        type: "success",
                        message:"保存成功!"
                      });
                      _this.visible = false;
                      _this.getDataList(1);
                    },
                    err => {
                      console.log(err);
                    }
                  );
                }
              },
              err => {
                console.log(err);
              }
            );
          }
        });
      },
      reset() {
        this.$refs["deviceTypeForm"].resetFields();
      },
      //表单筛选
      getDataList() {
        let data = {
          name: this.formInline.name,
        };
        let _this = this
        queryDeviceTypeAll(data).then(res => {
          _this.tableData = res.data;
        });
        err => {
          console.log(err);
        };
      },
      //新增
      addData() {
        this.addForm = {};
        let _this = this;
        this.title="新增站点类型"
        findDeviceTypeNewCode().then(
          res => {
            _this.addForm.code = res.data
            _this.visible=true
            _this.formReadOnly=false
          },
          err => {
            console.log(err);
          }
        );
      },
      // 表格编辑
      handleEdit(index, row) {
        this.title="修改站点类型"
        this.findDeviceTypeById(row)
        this.formReadOnly = false
      },
      //删除
      handleDelete(row){
        let _this = this
        this.$confirm("确认删除该站点类型?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            deleteDeviceTypeById(row.id).then(
              res => {
                if(res.data==true){
                  _this.$message({type: "success",message: "删除成功!"});
                  _this.getDataList(1)
                }else{
                   _this.$message({type: "error",message: "删除失败!"});
                }
              },
              err => {
                console.log(err);
              }
            );
          })
          .catch(() => {
          });
      },
      //查看详情
      showDataDetail(row){
        this.title="站点类型"
        this.findDeviceTypeById(row)
        this.formReadOnly = true
      },
      findDeviceTypeById(row){
        let _this = this
        findDeviceTypeById(row.id).then(
          res => {
            _this.addForm = res.data
            _this.visible=true
            
          },
          err => {
            console.log(err);
          }
        );
      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
        this.$refs["addForm"].resetFields();
      },
    },
    mounted() {
      this.userInfo = iLocalStroage.gets("userInfo");
      this.getDataList();
    },
    created() {
    }
  };
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
