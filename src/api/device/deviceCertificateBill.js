import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

//查询证件管理单
export function queryDeviceCertificateBill(data) {
    return request({
        url: "/device/certificate/bill/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//查询证件管理审批单
export function queryApproveBill(data) {
    return request({
        url: "/device/certificate/bill/listApprove",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//保存证件管理单
export function saveOrUpdateDeviceCertificateBill (data) {
    return request({
        url: "/device/certificate/bill/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    })
}
//根据ID查询证件管理单
export function findDeviceCertificateBillById (id) {
    return request({
        url: "/device/certificate/bill/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//删除证件管理单
export function deleteDeviceCertificateBillById(id) {
    return request({
        url: "/device/certificate/bill/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'DEVICE_HOST',
        cancelToken: setCancelSource()
    })
}
//获取证件号
export function getNo(oid) {
    return request({
        url: "/device/certificate/getNo/" +oid,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'DEVICE_HOST',
        cancelToken: setCancelSource()
    })
}
//检查证件号
export function checkNo(no,oid) {
    return request({
        url: "/device/certificate/checkNo/" +no+"/"+oid,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'DEVICE_HOST',
        cancelToken: setCancelSource()
    })
}
//提交证件管理单
export function commitBill (id) {
    return request({
        url: "/device/certificate/bill/commit/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//查询审批列表
export function listApproveInfo (id) {
    return request({
        url: "/device/certificate/bill/listApproveInfo/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        cancelToken: setCancelSource()
    });
}
//审批证件管理单
export function approveBill (data) {
    return request({
        url: "/device/certificate/bill/audit",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'DEVICE_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
    });
}

//获取文件流
export function getFileStreamByStorageIdApi(storageId) {
    return request({
      url: "/sys/file/getFileStreamByStorageId/"+storageId,
      method: "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'DEVICE_HOST',
      responseType:'blob',
      cancelToken: setCancelSource()
    });
  }