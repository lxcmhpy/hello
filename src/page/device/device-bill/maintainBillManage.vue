<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage">
            <div class="handlePart">
                <el-form :inline="true" ref="deviceBillForm" :model="queryForm" label-width="70px">
                    <!--查询字段-->
                    <el-form-item label="单据状态" prop="status">
                        <el-select v-model="queryForm.status">
                            <el-option
                                v-for="item in statusList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单据号" prop="billNo">
                        <el-input v-model="queryForm.billNo"></el-input>
                    </el-form-item>
                    <el-form-item label="单据日期" prop="billDate">
                        <el-date-picker v-model="queryForm.billDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="报修单位" prop="useUnit">
                        <elSelectTree
                            ref="queryFormUseUnitTreeObj"
                            :options="organList"
                            :accordion="true"
                            :props="orgTreeProps"
                            style="width:200px" 
                            :filterable="true"
                            @getValue="queryFormUseUnitClick">
                        </elSelectTree>
                        <el-input style="display:none" v-model="queryForm.useUnit"></el-input>
                    </el-form-item>

                    <el-form-item style="margin-top:1px; margin-left: 15px;">
                        <el-button 
                            title="搜索"
                            class="commonBtn searchBtn"
                            size="medium"
                            icon="iconfont law-sousuo" 
                            @click="queryData(1)"/>
                        <el-button 
                            title="重置"
                            class="commonBtn searchBtn"
                            size="medium"
                            icon="iconfont law-zhongzhi"
                            @click="reset"/>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableHandle" style="margin-bottom: 10px;">
                <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addData">新增</el-button>
            </div> 
            <div class="tablePart">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%;height:100%"
                        @row-click="showDataDetail"
                >
                    <el-table-column label="序号" width="70px">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <!--列表字段-->
                    <el-table-column prop="billNo" label="单号" width="160" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" width="70px" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status === '已完成'"
                                style="color: #05C051;"
                            >{{scope.row.status}}</span>
                            <span style="color: #999999;" v-else>{{scope.row.status}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="billDate" label="单据日期" width="120px" align="center"></el-table-column>
                    <el-table-column prop="useUnit" label="报修单位" align="center"></el-table-column>
                    <el-table-column prop="userId" label="报修人" width="120px" align="center"></el-table-column>
                    <el-table-column prop="createName" label="处理人" width="200px" align="center"></el-table-column>
                    <el-table-column label="操作" width="160" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click.stop @click="showDataDetail(scope.row)">查看</el-button>
                            <el-button v-if="scope.row.status=='维修中'" type="text" @click.stop @click="handleConfirm(scope.row)">维修完成</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paginationBox" v-if="tableData.length > 0">
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
            <el-dialog :title="title"
                        :visible.sync="visible"
                        top="5vh"
                        width="75%"
                        @close="closeDialog"
                        :close-on-click-modal="false">
                <el-form
                        :model="addForm"
                        ref="addForm"
                        :rules="rules"
                        label-width="120px"
                        class="allotment-form" >
                        <!--卡片字段-->
                        <el-row :gutter="20">
                        <el-col :span="12">
                        <el-form-item label="报修单位" prop="useUnit">
                            <elSelectTree
                                ref="addFormUseUnitTreeObj"
                                :options="organList"
                                :value="addForm.useUnit"
                                :accordion="true"
                                :props="orgTreeProps"
                                style="width: 100%;"
                                :filterable="true"
                                :disabled="this.formReadOnly"
                                @getValue="addFormUseUnitClick">
                            </elSelectTree>
                            <el-input style="display:none" v-model="addForm.useUnit"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="报修人" prop="userId">
                            <el-select v-model="addForm.userId" style="width: 100%;" :disabled="this.formReadOnly">
                                <el-option
                                    v-for="item in userList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="单据日期" prop="billDate">
                            <el-date-picker v-model="addForm.billDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;" :readonly="true"></el-date-picker>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="处理人" prop="operator">
                            <el-input v-model="addForm.createName" style="width: 100%;" :readonly="true"></el-input>
                        </el-form-item>
                        </el-col>
                        </el-row>
                        <el-form-item label="备注" prop="note">
                            <el-input
                                type="textarea"
                                v-model="addForm.note"
                                :autosize="{ minRows: 2, maxRows: 3}"
                                :readonly="this.formReadOnly"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <div class="upload-device-image">
                            <el-upload
                                action="#"
                                accept=".jpg, .png"
                                class="device-uploader"
                                :http-request="saveImageFile"
                                :on-remove="deleteFile"
                                :disabled="this.formReadOnly"
                                :show-file-list="false"
                                :on-change="changeDeviceImage"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="device-img" />
                                <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
                            </el-upload>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div class="tableHandle" style="margin-bottom: 10px;" v-if="!this.formReadOnly">
                        <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addDevice">新增装备</el-button>
                        <el-button type="info" size="medium" icon="el-icon-delete-solid"  @click="deleteDevice">删除装备</el-button>
                    </div> 
                    <div class="tablePart">
                        <el-table
                            :data="itemList"
                            ref="deviceTable"
                            stripe
                        >
                            <el-table-column type="selection" width="40" align="center"></el-table-column>
                            <el-table-column label="序号" width="70px">
                                <template slot-scope="scope">
                                    {{scope.$index+1}}
                                </template>
                            </el-table-column>
                            <!--列表字段-->
                            <el-table-column prop="code" label="装备编码" width="120px" align="center"></el-table-column>
                            <el-table-column prop="name" label="装备名称" align="center"></el-table-column>
                            <el-table-column prop="deviceType" label="装备类型" align="center"></el-table-column>
                            <el-table-column prop="brand" label="品牌型号" width="120px" align="center"></el-table-column>
                            <el-table-column prop="useUnit" label="使用单位" align="center"></el-table-column>
                            <el-table-column prop="storageLocation" label="存放位置" width="120px" align="center"></el-table-column>
                        </el-table>
                    </div>
                <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button @click="saveOrUpdate('addForm')"  type="primary" class="btn-custom" >
                        <span>确 定</span>
                    </el-button>
                </div>
            </el-dialog>
            <!-- 选择装备 -->
            <SelectEquipment ref="selectEquipmentRef" @addItemList="addItemList" />
        </div>
    </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
    import { 
        queryDeviceBill,
        findDeviceBillById,
        saveOrUpdateDeviceBill,
        deleteDeviceBillById,
        updateStatus
    } from "@/api/device/deviceBill.js";
    import {
        tree,
        getDataList,
        upload,
        deleteFileById
    } from "@/api/device/device.js";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    import iLocalStroage from '@/common/js/localStroage';
    import SelectEquipment from '@/page/device/components/selectEquipment';
    export default {
        data() {
            return {
                visible:false,
                deviceVisable:false,
                formReadOnly:false,
                orgTreeProps: {
                    label: "label",
                    value: "id"
                },
                queryForm: {
                    billType:'WX',
                    billDate:'',
                    billNo:'',
                    useUnit:'',
                    status:''
                },
                addForm:{
                },
                rules: {
                    userId: [
                        {required: true, message: "请输入报修人", trigger: "blur"}
                    ],
                    useUnit: [
                        {required: true, message: "请输入报修单位", trigger: "blur"}
                    ],
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                title:"新增维修单",
                userList:[],
                organList:[],
                statusList:[{id:'维修中',label:'维修中'},{id:'已完成',label:'已完成'}],
		        deviceList:[],
                itemList:[],
                imageUrl: '',
            };
        },
        components: {
            elSelectTree,
            SelectEquipment
        },
        methods: {
            changeDeviceImage(file, fileList){
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            saveImageFile (param) {
                var fd = new FormData()
                fd.append("file", param.file);
                fd.append("category", '装备维修图片');
                fd.append("fileName", param.file.name);
                if(this.addForm.storageId){
                    fd.append("storageId", this.addForm.storageId);
                    fd.append('caseId', this.addForm.id)//传记录id
                }else{
                    fd.append('caseId', param.file.name+new Date().getTime())//传记录id
                }
                let _this = this
                upload(fd).then(
                    res => {
                        _this.addForm.storageId = res.data[0].storageId
                    },
                    error => {
                        console.log(error)
                    }
                );
            },
            //删除附件
            deleteFile(file, fileList){
                let _this = this
                deleteFileById(file.storageId).then(res=>{
                },err=>{
                    console.log(err)
                })
            },
            addDevice(){
                let _this = this
                this.$refs.addForm.validateField('useUnit',valid => {
                    if (valid=="") {
                        _this.$refs.selectEquipmentRef.showModal(this.queryForm.billType,this.addForm.useUnit);
                    }
                 })
            },
            addItemList(rows){
                rows.forEach(p=>this.itemList.push(p))
            },
            deleteDevice(){
                if(this.$refs.deviceTable.selection.length>0){
                    let _this = this
                    this.$refs.deviceTable.selection.forEach(p => {
                        let index = _this.itemList.findIndex(item=>item.id===p.id);
                        _this.itemList.splice(index,1)
                    });
                }else{
                    this.$message({
                        type: "error",
                        message:"请选择需要删除的装备"
                    });
                    return;
                }
            },
            async getUserDataList(pid){
                let res = await getDataList(pid,'user')
                this.userList=res.data
            },
            async getSelfTree(){
                let res = await tree(this.userInfo.organId,'organ')
                this.organList=res.data
            },
            queryFormUseUnitClick(val) {
                this.$refs.queryFormUseUnitTreeObj.$children[0].handleClose();
                this.queryForm.useUnit  = val
            },
            addFormUseUnitClick(val) {
                if(val!=null){
                    this.$refs.addFormUseUnitTreeObj.$children[0].handleClose();
                    this.$set(this.addForm,'useUnit',val)
                    this.getUserDataList(val)
                    this.$set(this.addForm,'userId','')
                    this.itemList=[]
                }
            },
            saveOrUpdate(formName){
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if(_this.itemList.length==0){
                            _this.$message({
                                type: "error",
                                message:"请选择装备!"
                            });
                            return;
                        }
                        _this.addForm.itemList = _this.itemList
                        saveOrUpdateDeviceBill(_this.addForm).then(
                            res => {
                                _this.$message({
                                    type: "success",
                                    message:"保存成功!"
                                });
                                _this.visible = false;
                                _this.queryData(1);
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    }
                });
            },
            reset() {
                this.$refs["deviceBillForm"].resetFields();
                if(this.$refs.queryFormUseUnitTreeObj){
                    this.$refs.queryFormUseUnitTreeObj.clearHandle()
                }
            },
            //表单筛选
            queryData(val) {
                this.queryForm.size=this.pageSize
                this.queryForm.current=this.currentPage
                let _this = this
                queryDeviceBill(this.queryForm).then(res => {
                    _this.totalPage = res.data.total;
                    _this.tableData = res.data.records;
                });
            },
            //新增
            addData() {
                if(this.$refs.addFormUseUnitTreeObj){
                    this.$refs.addFormUseUnitTreeObj.clearHandle()
                }
                this.getUserDataList(this.userInfo.organId)
                this.addForm = {
                    createId:this.userInfo.id,
                    createName:this.userInfo.nickName,
                    billType:'WX',
                    status:'维修中',
                    billDate:new Date().format('yyyy-MM-dd'),
                    useUnit:this.userInfo.organId
                }
		        this.itemList=[]
                this.imageUrl=''
                this.title="新增维修"
                this.formReadOnly = false
                this.visible = true
            },
            //编辑
            handleEdit(index, row) {
                this.title="修改维修"
                this.findDeviceBillById(row)
                this.formReadOnly = false
            },
            async handleConfirm(row){
                let res = await updateStatus(row.id,'已完成')
                this.$message({type: "success",message: "维修完成!"})
                this.queryData(1)
            },
            //查看详情
            showDataDetail(row){
                this.title="维修"
                this.findDeviceBillById(row)
                this.formReadOnly = true
            },
            findDeviceBillById(row){
                let _this = this
                this.imageUrl=''
                findDeviceBillById(row.id).then(
                    res => {
                        _this.addForm = res.data
                        _this.itemList = res.data.itemList
                        _this.addForm.itemList = []
                        _this.visible=true
                        if(_this.addForm.useUnit){
                            _this.getUserDataList(_this.addForm.useUnit)
                        }else{
                            _this.userList=[]
                        }
                        if(_this.addForm.storageId){
                            _this.$util.com_getDeviceFileStream(_this.addForm.storageId).then(res=>{
                                _this.imageUrl = res
                            });
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            // 表格id删除
            deleteRecord(row) {
                let _this = this
                this.$confirm("确认删除该维修?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    deleteDeviceBillById(row.id).then(
                        res => {
                            if(res.data==true){
                                _this.$message({type: "success",message: "删除成功!"});
                                _this.queryData(1)
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
            //关闭弹窗的时候清除数据
            closeDialog() {
                this.visible = false;
                this.$refs["addForm"].resetFields();
            },
            init(){
                this.queryData(1)
                this.getSelfTree()
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryData(1);
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryData(val);
            },
        },
        mounted() {
            this.userInfo = iLocalStroage.gets("userInfo");
            this.init()
        },
        created() {
        }
    };
</script>
<style lang="scss">
    @import "@/assets/css/systemManage.scss";
</style>
<style lang="scss" scoped>
.allotment-form {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
  }
  .upload-device-image {
    width: 176px;
    height: 96px;
    margin-top: 12px;
    border: 1px dashed #a3a3a3;
    .device-uploader {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 96px;
      font-size: 28px;
      >>> .el-upload {
        width: 100%;
        .device-img {
          display: block;
          width: 176px;
          height: 96px;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        margin-left: 0px;
        text-align: center;
        line-height:0px;
        }
    }
  }
}
</style>
