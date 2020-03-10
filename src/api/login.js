import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
let vm = new Vue();
/**
 * 管理员登录
 * method: 'post','get'
 * @param {*} params.account  必填 账号
 * @param {*} params.password  必填  密码
 */
// export function loginInApi(params) {

//   let data = vm.$qs.stringify({
//     username: params.username,
//     password: params.password,
//     code: params.code,
//     captchaId: params.captchaId
//   })
//   console.log(data)
//   return request({
//     url: "/login",
//     method: "POST",
//     contentType: 'multipart/form-data',
//     data:data,
//     showloading: true,
//     baseUrlType:1,
//     cancelToken: setCancelSource()
//   });
// }

export function loginInApi(params) {

  let data = vm.$qs.stringify({
    username: params.username,
    password: params.password,
    grant_type:'password'
  })
  console.log(data)
  return request({
    url: "/auth/oauth/token",
    method: "POST",
    data:data,
    // auth:{
    //   username: 'catsic',
    //   password: 'catsic'
    // },
    headers: {
      'Authorization': 'Basic Y2F0c2ljOmNhdHNpYw=='
    },
    showloading: true,
    baseUrlType:1,
    cancelToken: setCancelSource()
  });
}





//修改密码
export function resetPasswordApi(params) {

  let data = vm.$qs.stringify({
    username: params.username,
    nickName: params.nickName,
    enforceNo: params.enforceNo,
  })
  console.log(data)
  return request({
    url: "/sys/user/resetPassWord",
    method: "POST",
    contentType: 'multipart/form-data',
    data:data,
    showloading: false,
    baseUrlType:1,
    cancelToken: setCancelSource()
  });
}

//获取验证吗
export function getCaptchaApi() {
  return request({
    url: "/common/captcha/getcaptcha",
    method: "get",
    showloading: false,
    baseUrlType:1,
    cancelToken: setCancelSource()
  });
}

// 验证码渲染图片接口
// export const drawCodeImage = "/catsic/common/captcha/draw/"
export function getCapImgSrcApi(captchaId) {
  console.log('captchaId',captchaId)
  return request({
    url: "/common/captcha/draw/"+captchaId,
    method: "get",
    showloading: false,
    baseUrlType:1,
    responseType: 'arraybuffer',
    cancelToken: setCancelSource()
  });
}

//获取菜单
export function getMenuApi() {
  return request({
    url: "/sys/permission/getTreePermission",
    method: "get",
    baseUrlType:1,
    showloading: false,
    cancelToken: setCancelSource()

  });
}


// 退出
export function loginOutApi() {
  return request({
    url: "/loginOut",
    method: "post",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
