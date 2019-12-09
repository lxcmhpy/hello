import request from "@/js/request";
import { setCancelSource } from "@/js/cancelToken";
import Vue from "vue";
let vm = new Vue();
/**
 * 管理员登录
 * method: 'post','get'
 * @param {*} params.account  必填 账号
 * @param {*} params.password  必填  密码
 */
export function loginInApi(params) {
  
  let data = vm.$qs.stringify({
    username: params.username,
    password: params.password,
    code: params.code,
    captchaId: params.captchaId
  })
  console.log(data)
  return request({
    url: "/catsic/login",
    method: "POST",
    data:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//获取验证吗
export function getCaptchaApi() {
  return request({
    url: "/catsic/common/captcha/getcaptcha",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

// 验证码渲染图片接口
export const drawCodeImage = "/catsic/common/captcha/draw/"


//获取菜单
export function getMenuApi() {
  return request({
    url: "/catsic/sys/permission/getMenuList",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
    
  });
}


// 退出
export function loginOutApi() {
  return request({
    url: "/chat/loginOut",
    method: "post",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
