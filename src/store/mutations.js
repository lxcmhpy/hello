import * as types from "./mutation-types";
import Cookies from "@/common/js/cookies";
import Vue from "vue";
import { getToken, setToken } from "@/common/js/auth";
/**
 * mutation是一个对象，封装多个mutation操作
 * 可以接收两个参数state和提交的payload
 * @type {{}}
 */
const mutations = {
  // common
  [types.COM_LOADING_STATUS](state, status) {
    state.loading = status;
  },
  //设置loading time
  [types.COM_LOADINGTIME](state, time) {
    state.loadingTime = time;
  },
  [types.COM_LOADING_TYPE](state, type) {
    state.loadingType = type;
  },
  //设置token
  [types.SET_AUTHTOKEN](state, token) {
    setToken("TokenKey", token, 110);
    state.authToken = token;
  },
  //设置侧边栏默认选中active
  [types.SET_SLIDEMENU](state, name) {
    state.activeSlideMenu = name;
  },
  // 添加tab
  [types.ADD_TABS](state, data) {
    console.log('state.openTab',state.openTab)
    state.openTab.push(data);
  },
  // 删除tab
  [types.DELETE_TABS](state, name) {
    let index = 0;
    for (let option of state.openTab) {
      if (option.name === name) {
        break;
      }
      index++;
    }
    state.openTab.splice(index, 1);
  },
  // 替换tab
  [types.REPLACE_TABS](state, data) {
      debugger;
    state.openTab.splice(data.index, data.num, data.data);
  },
  //删除所有的tabs
  [types.DELETE_ALLTABS](state) {
    // state.openTab = [];
    state.openTab = [{route: "/index",name: "case_handle_home_index",title: "案件办理首页"}];
  },
  // 设置当前激活的tab
  [types.SET_ACTIVE_INDEX](state, name) {
    state.activeIndex = name;
  },
  [types.SET_ACTIVE_INDEX_STO](state, name) {
    state.activeIndexSto = name;
  },
  [types.set_Head_Active_Nav](state,name){
    state.system.headActiveNav = name;
  },
  setActiveSlideMenu(state,name){
    state.activeSlideMenu = name;
  },
  setCaseNumber(state,name){
    state.caseHandle.caseNumber = name;
  },
  //更改tab title
  changeOneTabName(state,data){
    state.openTab[data.tabIndex].title = data.title;
  },






  [types.USERNAME](state, name) {
    Cookies.set("username", name); //退出浏览器过期
    state.username = name;
  },


  [types.SET_IMGSRC](state, imgSrc) {
    state.imgSrc = imgSrc;
  },

  [types.SET_WHITELIST](state, whiteListItem) {
    let addIndex=state.whiteList.indexOf(whiteListItem);
    if(addIndex==-1) state.whiteList.push(whiteListItem);
  },
  [types.EDIT_WHITELIST](state, reducewhiteListItem) {
    console.log(reducewhiteListItem);
    let reduceIndex=state.whiteList.indexOf(reducewhiteListItem);
    if(reduceIndex>-1) state.whiteList.splice(reduceIndex,1);
  },
  [types.RESET_WHITELIST](state) {
    state.whiteList=[];
  },
  [types.SET_APIHISTORYLIST](state, list) {
    if (list && list.length > 0) {
      let objApi = {};
      for (let i = 0; i < list.length; i++) {
        objApi[list[i].name] = list[i];
      }
      state.apiHistoryList = Object.assign({}, objApi);
    } else {
      state.apiHistoryList = {};
    }
  },
  [types.SET_LISTPAGE](state,page){
    state.listPage = page;
  }
};

export default mutations;
