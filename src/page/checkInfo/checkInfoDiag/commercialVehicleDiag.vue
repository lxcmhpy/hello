<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
    append-to-body
  >
    <el-form :model="yyclForm" ref="yyclForm" class="yyclForm">
        <div align="center">
            <table class="tg">
                <tr>
                    <td class="tg-0lax" colspan="8">车辆信息</td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2" style="width:225px;">车辆号码</td>
                    <td class="tg-cly1" colspan="2" style="width:225px;">{{yyclForm.VehicleNo}}</td>
                    <td class="tg-y93n" colspan="2" style="width:225px;">车辆颜色代码</td>
                    <td class="tg-cly1" colspan="2" style="width:225px;">{{yyclForm.PlateColorCode}}</td>
                </tr>
               <tr>
                    <td class="tg-y93n" colspan="2">道路运输证字</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.TransCertificateWord}}</td>
                    <td class="tg-y93n" colspan="2">道路运输证号</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.TransCertificateCode}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2">车辆类型代码</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.VehicleTypeCode}}</td>
                    <td class="tg-y93n" colspan="2">车辆状况（车辆营运状态）</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.BusinessStateCode}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2">经营范围</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.BusinessScopeDesc}}</td>
                    <td class="tg-0pky" colspan="2">  </td>
                    <td class="tg-cly1" colspan="2"></td>
                </tr>
                 <tr>
                    <td class="tg-y93n" colspan="2">车辆识别VIN码</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.Vin}}</td>
                    <td class="tg-y93n" colspan="2">车辆燃料类型</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.FuelType}}</td>
                </tr>
                 <tr>
                    <td class="tg-y93n" colspan="2">发证机构</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.TransCertificateGrantOrgan}}</td>
                    <td class="tg-y93n" colspan="2">车籍地行政区域代码</td>
                    <td class="tg-cly1" colspan="2"></td>
                </tr>
                 <tr>
                    <td class="tg-y93n" colspan="2">车辆核定载客位</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.ApproveSeat}}</td>
                    <td class="tg-y93n" colspan="2">总质量</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.ApproveTon}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n" style="width:110px;">车辆车长</td>
                    <td class="tg-cly1" colspan="2" style="width:220px;">{{yyclForm.VehicleLength}}</td>
                    <td class="tg-y93n" style="width:110px;">车辆车宽</td>
                    <td class="tg-cly1" style="width:110px;">{{yyclForm.VehicleWidth}}</td>
                     <td class="tg-y93n" colspan="2" style="width:220px;">车辆车高</td>
                    <td class="tg-cly1" style="width:110px;">{{yyclForm.VehicleHigh}}</td>
                </tr>
                 <tr>
                    <td class="tg-y93n" colspan="2">有效期起</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.CertificateBeginDate}}</td>
                    <td class="tg-y93n" colspan="2">有效期止</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.CertificateExpireDate}}</td>
                </tr>
                <tr>
                  <td class="tg-y93n" colspan="2">客车类型与等级</td>
                  <td class="tg-cly1" colspan="2">{{yyclForm.BusType}}</td>
                  <td class="tg-y93n" colspan="2">发动机</td>
                  <td class="tg-cly1" colspan="2">{{yyclForm.EngineNo}}</td>
                </tr>
              <tr>
                <td class="tg-y93n" colspan="2">车辆厂牌型号</td>
                <td class="tg-cly1" colspan="2">{{yyclForm.Model}}</td>
                <td class="tg-cly1" colspan="2"></td>
                <td class="tg-cly1" colspan="2"></td>
              </tr>
                 <tr>
                    <td class="tg-0lax" colspan="8">企业信息</td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2">业户信息ID</td>
                    <td class="tg-cly1" colspan="2"></td>
                    <td class="tg-y93n" colspan="2">省级行政区划代码</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.ProvinceCode}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2">经营许可证字</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.LicenseWord}}</td>
                    <td class="tg-y93n" colspan="2">经营许可证号</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.LicenseCode}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2">有效期起</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.ValidBeginDate}}</td>
                    <td class="tg-y93n" colspan="2">有效期止</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.ExpireDate}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2">经营状态</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.OperatingStatus}}</td>
                    <td class="tg-y93n" colspan="2">经营业户名称</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.OwnerName}}</td>
                </tr>
                 <tr>
                    <td class="tg-y93n" colspan="2">企业组织机构代码</td>
                    <td class="tg-cly1" colspan="2"></td>
                    <td class="tg-y93n" colspan="2">经营业户所在地行政区划代码</td>
                    <td class="tg-cly1" colspan="2"></td>
                </tr>
                 <tr>
                    <td class="tg-y93n" colspan="2">负责人姓名</td>
                    <td class="tg-cly1" colspan="2"></td>
                    <td class="tg-y93n" colspan="2">经营类型</td>
                    <td class="tg-cly1" colspan="2"></td>
                </tr>
                 <tr>
                    <td class="tg-y93n" colspan="2">发证机关</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.TransCertificateGrantOrgan}}</td>
                    <td class="tg-y93n" colspan="2">核发日期</td>
                    <td class="tg-cly1" colspan="2"></td>
                </tr>
                <tr>
                    <td class="tg-y93n" colspan="2">经营范围</td>
                    <td class="tg-cly1" colspan="2">{{yyclForm.BusinessScopeCode_owner}}</td>
                    <td class="tg-cly1" colspan="2"></td>
                    <td class="tg-cly1" colspan="2"></td>
                </tr>
            </table>
        </div>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      yyclForm: {
      },
      dialogTitle: "",
    };
  },
  methods: {
    commercialVehicleSee(data) {
      this.visible = true;
      this.dialogTitle = "车辆详情";
      this.yyclForm = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["yyclForm"].resetFields();
    },
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:16px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:center;vertical-align:center;height: 25px;}
.tg .tg-0lax{background:#99ff66;border-color:inherit;font-size:20px;text-align:left;vertical-align:center;height: 30px;}
.tg .tg-title{background:gray;text-align:center;vertical-align:center;height: 30px;}
.tg .tg-cly1{text-align:center;vertical-align:middle;height: 25px;}
.tg .tg-y93n{background-color:#c0c0c0;text-align:center;vertical-align:middle;height: 25px;}
</style>
