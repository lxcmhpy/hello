<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchPage">
            <div class="handlePart">
                <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="120px">
                    <!--查询字段-->
                    <div>
                        <div class="item">
                            <el-form-item label="单据类型" prop="billType">
                                <el-select v-model="queryForm.billType">
                                    <el-option
                                        v-for="item in billTypeList"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据号" prop="billNo">
                                <el-input v-model="queryForm.billNo"></el-input>
                            </el-form-item>
                            <el-form-item label="车牌号" prop="vehicleNumber">
                                <el-input v-model="queryForm.vehicleNumber"></el-input>
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
                                <el-button
                                    size="medium"
                                    class="commonBtn toogleBtn"
                                    :title="isShow? '点击收缩':'点击展开'"
                                    :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                                    @click="isShow = !isShow"/>
                            </el-form-item>
                            </div>
                        <div class="item" v-show="isShow">
                            <el-form-item label="申请日期">
                                <el-date-picker 
                                    style='width:240px' 
                                    :picker-options="pickerOptions" 
                                    unlink-panels 
                                    v-model="timeList"
                                    type="daterange" 
                                    range-separator="—" 
                                    value-format="yyyy-MM-dd" 
                                    format="yyyy-MM-dd" 
                                    start-placeholder="开始日期" 
                                    end-placeholder="结束日期"/>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="tablePart">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%;height:100%"
                        @row-click="showDataDetail"
                >
                    <el-table-column label="序号" width="70px" align="center">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <!--列表字段-->
                    <el-table-column prop="billNo" label="申请单号" width="200px" align="center"></el-table-column>
                    <el-table-column prop="billType" label="申请类型" width="120px" :formatter="formatBillType" align="center"></el-table-column>
                    <el-table-column prop="vehicleNumber" label="车牌号" width="120px" align="center"></el-table-column>
                    <el-table-column prop="useUnit" label="使用单位" align="center"></el-table-column>
                    <el-table-column prop="usePermitNumber" label="使用证号" width="200px" align="center"></el-table-column>
                    <el-table-column prop="billDate" label="申请日期" width="120px" align="center"></el-table-column>
                    <el-table-column prop="status" label="申请状态" width="120px" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status === 1"
                                style="color: #FF8000;"
                            >{{formatStatus(scope.row)}}</span>
                            <span
                                v-else-if="scope.row.status === 2"
                                style="color: #0074F5;"
                            >{{formatStatus(scope.row)}}</span>
                            <span
                                v-else-if="scope.row.status === 3"
                                style="color: #05C051;"
                            >{{formatStatus(scope.row)}}</span>
                            <span style="color: #E84241;" v-else>{{formatStatus(scope.row)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click.stop @click="showDataDetail(scope.row)">审核</el-button>
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
        </div>
    </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
    import { queryApproveBill,findDeviceCertificateBillById} from "@/api/device/deviceCertificateBill.js";
    import iLocalStroage from '@/common/js/localStroage';
    export default {
        data() {
            let _this = this;
            return {
                visible:false,
                queryForm: {
                    billType:'',
                    billNo:'',
                    vehicleNumber:'',
                    status:'',
                },
                userInfo:{},
                tableData: [], //表格数据
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                statusList:[
                    {id:1,label:'未申请'},
                    {id:2,label:'申请中'},
                    {id:3,label:'申请通过'},
                    {id:0,label:'申请未通过'},
                ],
                billTypeList:[
                    {id:'FZ',label:'发证申请'},
                    {id:'NS',label:'年审申请'},
                    {id:'GS',label:'挂失申请'},
                    {id:'ZX',label:'注销申请'},
                ],
                approveBillTypeList:[
                    {id:'FZ',label:'发证审批'},
                    {id:'NS',label:'年审审批'},
                    {id:'GS',label:'挂失审批'},
                    {id:'ZX',label:'注销审批'},
                ],
                isShow:false,
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
                timeList: ['', ''],
            };
        },
        components: {
        },
        methods: {
            formatStatus(row){
                let data = this.statusList.filter(p=>p.id==row.status)
                if(data && data.length>0){
                    return data[0].label
                }
                return ''
            },
            formatBillType(row){
                let data = this.billTypeList.filter(p=>p.id==row.billType)
                if(data && data.length>0){
                    return data[0].label
                }
                return ''
            },
            formatApproveBillType(row){
                let data = this.approveBillTypeList.filter(p=>p.id==row.billType)
                if(data && data.length>0){
                    return data[0].label
                }
                return ''
            },
            reset() {
                this.$refs["queryForm"].resetFields();
                this.timeList=['', '']
            },
            //表单筛选
            queryData(val) {
                this.queryForm.startBillDate = typeof this.timeList[0] == 'object' ? this.timeList[0].format('yyyy-MM-dd') : this.timeList[0];
                this.queryForm.endBillDate = typeof this.timeList[1] == 'object' ? this.timeList[1].format('yyyy-MM-dd') : this.timeList[1];
                this.currentPage=val
                this.queryForm.size=this.pageSize
                this.queryForm.current=this.currentPage
                let _this = this
                queryApproveBill(this.queryForm).then(res => {
                    _this.totalPage = res.data.total;
                    _this.tableData = res.data.records;
                });
            },
            //查看详情
            showDataDetail(row){
                this.findDeviceCertificateBillById(row)
            },
            findDeviceCertificateBillById(row){
                let _this = this
                findDeviceCertificateBillById(row.id).then(
                    res => {
                        let pdfId = ''
                        if(res.data.fileList){
                            res.data.fileList.forEach(p=>{
                                if(p.category == "执法装备证件单"){
                                }else{
                                    pdfId = p.storageId
                                }
                            })
                        }
                        res.data.fileList=[]
                        let status = ''
                        this.statusList.forEach(p=>{
                            if(p.id==res.data.status){
                                status = p.label
                            }
                        })
                        let routerData = {
                            billType: res.data.billType,
                            billTypeName:this.formatBillType({billType:res.data.billType}),
                            url: this.$route.name,
                            data:res.data,
                            isEdit:false,
                            isApprove:true,
                            status:status,
                            pdfId:pdfId,
                            tabTitle:this.formatApproveBillType({billType:res.data.billType}),
                        };
                        this.$router.push({ name: "applyManage", params: routerData });
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            //关闭弹窗的时候清除数据
            init(){
                this.queryData(1)
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryData(1);
            },
            //更换页码
            handleCurrentChange(val) {
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
.select-bussiness-type-dialog {
  >>> .el-dialog {
    min-width: 420px;
  }
  .bussiness-type-wrap{
      margin: auto 85px;
      >>>.el-button{
          margin-left: 0;
          margin-bottom: 24px;
          display: block;
          width: 100%;
      }
  }
}
</style>
