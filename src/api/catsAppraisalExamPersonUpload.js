import Vue from "vue";

let vm = new Vue();


import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

// 根据条件分页查询人员列表
export function findPykhStaffByPage (data) {
  return request({
    url: "/pykh/staff/findPykhStaffByPage",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

export function findListVoByBatch (data) {
  return request({
    url: "/pykh/pykhBatch/findListVoByBatch",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

export function findAllDepartment (data) {
  return request({
    url: "system/sys/organ/findAllDepartment/"+data,
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: null,
    cancelToken: setCancelSource()
  })
}

export  function  importPerson(data)  {
  return  request({
    url:  "/pykh/excel/importPerson",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}


export function addOrUpdatePykhStaff (data) {
  return request({
    url: "/pykh/staff/addOrUpdatePykhStaff",
    method: "POST",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    data: vm.$qs.stringify(data),
    cancelToken: setCancelSource()
  })
}

export function deletePykhStaff (data) {
  return request({
    url: "/pykh/staff/deletePykhStaff/"+data,
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: null,
    cancelToken: setCancelSource()
  })
}

// 随机抽取
export function randomSamplingStaffByPage (oId,batchId) {
  return request({
    url: "/pykh/randomSampling/randomSamplingStaffByPage/"+oId+"/"+batchId,
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: null,
    cancelToken: setCancelSource()
  })
}

//省级提交最终人员(剩下未抽取到的人员id)
export function submitProStaff (data) {
  return request({
    url: "/pykh/randomSampling/submitProStaff",
    method: "get",
    showloading: false,
    baseUrlType:'CAPTCHA_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}
