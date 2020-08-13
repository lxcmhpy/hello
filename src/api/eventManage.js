import  request  from  "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

/**
 * 查询
 */
export function findData (data) {
  return request({
    url: "http://192.168.1.8:8090/event/manage/list",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    params: data,
    cancelToken: setCancelSource()
  })
}

/**
 * 指派
 */
export function assigned (data) {
  return request({
    url: "http://192.168.1.8:8090/event/manage/zhipai",
    method: "post",
    showloading: false,
    data: data,
    cancelToken: setCancelSource()
  })
}

/**
 * 新增、编辑
 */
export function addUpdate (data) {
  return request({
    url: "http://192.168.1.8:8090/event/manage/saveOrUpdate",
    method: "post",
    showloading: false,
    data: data,
    cancelToken: setCancelSource()
  })
}

/**
 * 删除
 */
export function deleteById (data) {
  return request({
    url: "http://192.168.1.8:8090/event/manage/deleteById",
    method: "get",
    showloading: false,
    params: data,
    cancelToken: setCancelSource()
  })
}

// 文件上传
export function upload(data)  {
  return request({
    url: "/zfjg/sys/file/uploadCommon",
    method: "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource(),
  });
}
