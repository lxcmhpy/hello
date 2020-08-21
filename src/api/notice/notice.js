import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import {
  setCancelSource
} from "@/common/js/cancelToken";

// 加载公示信息列表
export function findNoticeByPage(data) {
  return request({
    url: "/notice/zfdt/list",
    method: "get",
    showloading: false,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

// 新增、编辑
export function saveOrUpdateNotice(data) {
  return request({
    url: "/notice/zfdt/saveOrUpdate",
    method: "post",
    showloading: false,
    baseUrlType: 'NOTICE_HOST',
    params: data,
    cancelToken: setCancelSource()
  })
}

// 通过Id查询
export function findNoticeById(id) {
  return request({
    url: "/notice/zfdt/findById/" + id,
    method: "get",
    showloading: false,
    baseUrlType: 'NOTICE_HOST',
    cancelToken: setCancelSource()
  })
}

// 通过Id查询
export function deleteNoticeById(id) {
  return request({
    url: "/notice/zfdt/deleteById/" + id,
    method: "get",
    showloading: false,
    baseUrlType: 'NOTICE_HOST',
    cancelToken: setCancelSource()
  })
}
