// import Layout from '@/page/lagout/mainLagout' //Layout 是架构组件，不在后台返回，在文件里单独引入
// import MainContent from '@/components/mainContent'
//
// export default [
//   {
//     name: "xboot",
//     title: "系统管理",
//     path: "/main",
//     component: Layout,
//     children: [
//       {
//         name: "sys",
//         showAlways: true,
//         meta: {
//           title: "基本管理"
//         },
//         path: "/sys",
//         component: MainContent,
//         children: [
//           {
//             name: "user-manage",
//             title: "用户管理",
//             path: "/user-manage",
//             meta: {
//               title: "用户管理",
//             },
//             component: () => import("@/page/login/login.vue")
//           },
//           {
//             "id": "40238597734928384",
//             "createTime": "2018-08-10 15:06:10",
//             "name": "department-manage",
//             "showAlways": true,
//             "type": 0,
//             "title": "部门管理",
//             "path": "department-manage",
//             "icon": "md-git-branch",
//             "buttonType": null,
//             "parentId": "5129710648430592",
//             "description": null,
//             "sortOrder": 1.2,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "部门管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "5129710648430599",
//             "createTime": null,
//             "name": "log-manage",
//             "showAlways": true,
//             "type": 0,
//             "title": "日志管理",
//             "path": "log-manage",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "5129710648430592",
//             "description": null,
//             "sortOrder": 1.5,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "日志管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "5129710648430594",
//             "createTime": "2018-06-04 19:02:35",
//             "name": "role-manage",
//             "showAlways": true,
//             "type": 0,
//             "title": "角色管理",
//             "path": "role-manage",
//             "icon": "md-contacts",
//             "buttonType": null,
//             "parentId": "5129710648430592",
//             "description": null,
//             "sortOrder": 1.6,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "角色管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "5129710648430595",
//             "createTime": "2018-06-04 19:02:37",
//             "name": "menu-manage",
//             "showAlways": false,
//             "type": 0,
//             "title": "菜单权限管理",
//             "path": "menu-manage",
//             "icon": "md-menu",
//             "buttonType": null,
//             "parentId": "5129710648430592",
//             "description": null,
//             "sortOrder": 1.7,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "菜单权限管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "75002207560273920",
//             "createTime": "2018-11-14 13:24:21",
//             "name": "dict",
//             "showAlways": true,
//             "type": 0,
//             "title": "数据字典",
//             "path": "dict",
//             "icon": "md-bookmarks",
//             "buttonType": null,
//             "parentId": "5129710648430592",
//             "description": null,
//             "sortOrder": 1.8,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "数据字典",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "58480609315524608",
//             "createTime": "2018-09-29 23:13:24",
//             "name": "organ-manage",
//             "showAlways": true,
//             "type": 0,
//             "title": "机构管理",
//             "path": "organ-manage",
//             "icon": "ios-settings-outline",
//             "buttonType": null,
//             "parentId": "5129710648430592",
//             "description": null,
//             "sortOrder": 1.9,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "机构管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "8b55d67d61fa03b568b194d1bd446dd7",
//             "createTime": "2020-03-09 07:27:52",
//             "name": "违法行为法律法规管理",
//             "showAlways": true,
//             "type": 0,
//             "title": "违法行为法律法规管理",
//             "path": "casecause",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "5129710648430592",
//             "description": null,
//             "sortOrder": 2,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "违法行为法律法规管理",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": 1
//       },
//       {
//         "id": "67027338952445952",
//         "createTime": "2018-10-23 13:15:03",
//         "name": "product-template",
//         "showAlways": true,
//         "type": 0,
//         "title": "执法办案配置",
//         "path": "/product-template",
//         "component": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "icon": "md-ribbon",
//         "buttonType": null,
//         "parentId": "125909152017944576",
//         "description": null,
//         "sortOrder": 4,
//         "status": 0,
//         "url": null,
//         "menuGroup": "系统",
//         "children": [
//           {
//             "id": "67027909637836800",
//             "createTime": "2018-10-23 13:17:19",
//             "name": "banner",
//             "showAlways": true,
//             "type": 0,
//             "title": "环节管理",
//             "path": "banner",
//             "icon": "md-book",
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.1,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "环节管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "67042515441684480",
//             "createTime": "2018-10-23 14:15:22",
//             "name": "product",
//             "showAlways": true,
//             "type": 0,
//             "title": "案件类型管理",
//             "path": "product",
//             "icon": "md-pricetags",
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.2,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "案件类型管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "67082402312228864",
//             "createTime": "2018-10-23 16:53:53",
//             "name": "category",
//             "showAlways": true,
//             "type": 0,
//             "title": "案件流程管理",
//             "path": "category",
//             "icon": "md-apps",
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.3,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "案件流程管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "67083402312228864",
//             "createTime": null,
//             "name": "lawCategory",
//             "showAlways": true,
//             "type": 0,
//             "title": "执法门类管理",
//             "path": "lawCategory",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.4,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "执法门类管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "67084402312228864",
//             "createTime": null,
//             "name": "docType",
//             "showAlways": true,
//             "type": 0,
//             "title": "文书管理",
//             "path": "docType",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.5,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "文书管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "fae695eeb6981e95a7e0104294a9999c",
//             "createTime": "2020-03-09 10:03:15",
//             "name": "案件编号管理",
//             "showAlways": true,
//             "type": 0,
//             "title": "案件编号管理",
//             "path": "caseNumber",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.6,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "案件编号管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "8756482797376bfb8f64e6a417344da2",
//             "createTime": "2020-03-09 10:16:48",
//             "name": "送达回证管理",
//             "showAlways": true,
//             "type": 0,
//             "title": "送达回证管理",
//             "path": "repit",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.7,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "送达回证管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "5eca1abaa06dabd06f8e65d1313c2037",
//             "createTime": "2020-03-09 10:18:11",
//             "name": "绑定属性管理",
//             "showAlways": true,
//             "type": 0,
//             "title": "绑定属性管理",
//             "path": "bind",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "67027338952445952",
//             "description": null,
//             "sortOrder": 4.8,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "绑定属性管理",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": 1
//       },
//       {
//         "id": "85ea8a2013a14eb488d2244e11331093",
//         "createTime": "2019-12-24 13:53:00",
//         "name": "test",
//         "showAlways": true,
//         "type": 0,
//         "title": "测试",
//         "path": "test2",
//         "icon": "icon-1",
//         "buttonType": "add",
//         "parentId": "125909152017944576",
//         "description": null,
//         "sortOrder": null,
//         "status": 0,
//         "url": null,
//         "menuGroup": "系统",
//         "children": [
//           {
//             "id": "05ca1b3f340454be5cc286dd630b9213",
//             "createTime": "2020-02-19 15:00:14",
//             "name": "md-jgbc",
//             "showAlways": true,
//             "type": 0,
//             "title": "机构补充",
//             "path": "user-orgSupplee",
//             "icon": "md-test",
//             "buttonType": null,
//             "parentId": "85ea8a2013a14eb488d2244e11331093",
//             "description": null,
//             "sortOrder": 1.1,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "机构补充",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": null,
//         "meta": {
//           "title": "测试",
//           "permTypes": ""
//         }
//       },
//       {
//         "id": "1d03f76fb6ce0e58413029c1d57780d2",
//         "createTime": "2020-04-02 09:39:35",
//         "name": "personSysManage",
//         "showAlways": true,
//         "type": 0,
//         "title": "人员系统管理",
//         "path": "/person",
//         "component": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "icon": "ios-settings",
//         "buttonType": null,
//         "parentId": "125909152017944576",
//         "description": null,
//         "sortOrder": null,
//         "status": 0,
//         "url": null,
//         "menuGroup": null,
//         "children": [
//           {
//             "id": "64aedc36f17100d525f5dbfdcaca2b67",
//             "createTime": "2020-04-02 09:56:32",
//             "name": "paramManage",
//             "showAlways": true,
//             "type": 0,
//             "title": "人员参数管理",
//             "path": "person-param",
//             "icon": "md-cart1",
//             "buttonType": null,
//             "parentId": "1d03f76fb6ce0e58413029c1d57780d2",
//             "description": null,
//             "sortOrder": 1,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "人员参数管理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "6a7679bfff7e956535b63316938905ba",
//             "createTime": "2020-04-02 09:58:41",
//             "name": "md-cart1",
//             "showAlways": true,
//             "type": 0,
//             "title": "人员岗位管理",
//             "path": "person-station",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "1d03f76fb6ce0e58413029c1d57780d2",
//             "description": null,
//             "sortOrder": 2,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "人员岗位管理",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": null
//       }
//     ],
//     "permTypes": null,
//     "expand": true,
//     "checked": false,
//     "selected": false,
//     "plevel": 0
//   },
//   {
//     "id": "127995258721013760",
//     "createTime": "2019-04-09 18:59:49",
//     "name": "doc",
//     "showAlways": true,
//     "type": -1,
//     "title": "行政检查",
//     "path": "/main",
//     "component": {
//       "name": "mainLagout",
//       "components": {
//         "headMenu": {
//           "name": "",
//           "computed": {},
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/headMenu.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "subLeftMenu": {
//           "name": "backSubmenu",
//           "props": {},
//           "computed": {},
//           "methods": {},
//           "watch": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "beforeCreate": [
//             null,
//             null
//           ],
//           "__file": "src/components/subLeftMenu.vue",
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "tabsMenu": {
//           "name": "",
//           "computed": {
//             "activeIndex": {}
//           },
//           "methods": {},
//           "watch": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/tabsMenu.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "mainContent": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         }
//       },
//       "computed": {},
//       "inject": [
//         "reload"
//       ],
//       "methods": {},
//       "watch": {},
//       "staticRenderFns": [],
//       "_compiled": true,
//       "beforeCreate": [
//         null,
//         null
//       ],
//       "__file": "src/page/lagout/mainLagout.vue",
//       "beforeDestroy": [
//         null
//       ]
//     },
//     "icon": "md-document1",
//     "buttonType": null,
//     "parentId": null,
//     "description": null,
//     "sortOrder": 1,
//     "status": 0,
//     "url": "admin",
//     "menuGroup": "系统",
//     "children": [],
//     "permTypes": null,
//     "expand": true,
//     "checked": false,
//     "selected": false,
//     "plevel": 0
//   },
//   {
//     "id": "127996320085446656",
//     "createTime": "2019-04-09 19:04:02",
//     "name": "caseHandle",
//     "showAlways": true,
//     "type": -1,
//     "title": "案件办理",
//     "path": "/main",
//     "component": {
//       "name": "mainLagout",
//       "components": {
//         "headMenu": {
//           "name": "",
//           "computed": {},
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/headMenu.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "subLeftMenu": {
//           "name": "backSubmenu",
//           "props": {},
//           "computed": {},
//           "methods": {},
//           "watch": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "beforeCreate": [
//             null,
//             null
//           ],
//           "__file": "src/components/subLeftMenu.vue",
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "tabsMenu": {
//           "name": "",
//           "computed": {
//             "activeIndex": {}
//           },
//           "methods": {},
//           "watch": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/tabsMenu.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "mainContent": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         }
//       },
//       "computed": {},
//       "inject": [
//         "reload"
//       ],
//       "methods": {},
//       "watch": {},
//       "staticRenderFns": [],
//       "_compiled": true,
//       "beforeCreate": [
//         null,
//         null
//       ],
//       "__file": "src/page/lagout/mainLagout.vue",
//       "beforeDestroy": [
//         null
//       ]
//     },
//     "icon": "md-phone-portrait1",
//     "buttonType": null,
//     "parentId": null,
//     "description": null,
//     "sortOrder": 2,
//     "status": 0,
//     "url": null,
//     "menuGroup": "系统",
//     "children": [
//       {
//         "id": "241fa147d93ac1aaa3929a003e252ab7",
//         "createTime": "2019-12-25 09:52:45",
//         "name": "myCase",
//         "showAlways": true,
//         "type": 0,
//         "title": "我的案件",
//         "path": "/myCase",
//         "component": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "icon": null,
//         "buttonType": null,
//         "parentId": "127996320085446656",
//         "description": null,
//         "sortOrder": 1,
//         "status": 0,
//         "url": "/case/doc/caseBasicInfo/queryCaseBasicInfoListPage",
//         "menuGroup": "系统",
//         "children": [
//           {
//             "id": "cbd8d26a004f8621393b0c87c4d6d416",
//             "createTime": "2019-12-25 10:17:51",
//             "name": "waiDeal",
//             "showAlways": true,
//             "type": 0,
//             "title": "待办理",
//             "path": "waitDeal",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "241fa147d93ac1aaa3929a003e252ab7",
//             "description": null,
//             "sortOrder": 1,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": 2,
//             "meta": {
//               "title": "待办理",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "915c8aee8c76d318b2f88da80e93c840",
//             "createTime": "2019-12-25 14:19:47",
//             "name": "unRecordCase",
//             "showAlways": true,
//             "type": 0,
//             "title": "未立案",
//             "path": "unRecordCase",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "241fa147d93ac1aaa3929a003e252ab7",
//             "description": null,
//             "sortOrder": 2,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "未立案",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "6055bd2dbb8f51b296dd17bab5f12000",
//             "createTime": "2019-12-25 14:33:28",
//             "name": "guidang",
//             "showAlways": true,
//             "type": 0,
//             "title": "待归档",
//             "path": "waitArchive",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "241fa147d93ac1aaa3929a003e252ab7",
//             "description": null,
//             "sortOrder": 3,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "待归档",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "c9c51218c2c9146f514d7cb5a92ff1d6",
//             "createTime": "2019-12-25 15:05:14",
//             "name": "approveIng",
//             "showAlways": true,
//             "type": 0,
//             "title": "审批中",
//             "path": "approveIng",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "241fa147d93ac1aaa3929a003e252ab7",
//             "description": null,
//             "sortOrder": 4,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "审批中",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "80b5dad3cdb23e4629b3a5a341b35597",
//             "createTime": "2019-12-25 15:07:20",
//             "name": "case",
//             "showAlways": true,
//             "type": 0,
//             "title": "文书",
//             "path": "caseHandle",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "241fa147d93ac1aaa3929a003e252ab7",
//             "description": null,
//             "sortOrder": null,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "文书",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": 1
//       },
//       {
//         "id": "172bf7b4888650025228cd53472fa880",
//         "createTime": "2019-12-31 15:02:22",
//         "name": "approvalCenter",
//         "showAlways": true,
//         "type": 0,
//         "title": "审批中心",
//         "path": "/approvalCenter",
//         "component": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "icon": null,
//         "buttonType": "add,enable,other",
//         "parentId": "127996320085446656",
//         "description": null,
//         "sortOrder": 2,
//         "status": 0,
//         "url": null,
//         "menuGroup": "系统",
//         "children": [
//           {
//             "id": "8c1454a283dbe465b3c1cd74aad0e94d",
//             "createTime": "2019-12-31 15:05:26",
//             "name": "myApproval",
//             "showAlways": true,
//             "type": 0,
//             "title": "待我审批",
//             "path": "myApproval",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "172bf7b4888650025228cd53472fa880",
//             "description": null,
//             "sortOrder": 1,
//             "status": 0,
//             "url": null,
//             "menuGroup": "系统",
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "待我审批",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": null
//       },
//       {
//         "id": "935d0e37363735a2289db4d849e1e787",
//         "createTime": "2020-03-16 14:18:08",
//         "name": "cooperateCases",
//         "showAlways": true,
//         "type": 0,
//         "title": "协同办案",
//         "path": "/cooperateCases",
//         "component": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "icon": null,
//         "buttonType": null,
//         "parentId": "127996320085446656",
//         "description": null,
//         "sortOrder": 3,
//         "status": 0,
//         "url": null,
//         "menuGroup": null,
//         "children": [
//           {
//             "id": "5bfaec953388b42f033c97eb4192f3e4",
//             "createTime": "2020-03-16 14:21:44",
//             "name": "copyCase",
//             "showAlways": true,
//             "type": 0,
//             "title": "案件抄告",
//             "path": "copyCase",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "935d0e37363735a2289db4d849e1e787",
//             "description": null,
//             "sortOrder": 1,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "案件抄告",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "64cb50234fff06e6b2dd1e22f666d19f",
//             "createTime": "2020-03-16 14:32:06",
//             "name": "caseTransfer",
//             "showAlways": true,
//             "type": 0,
//             "title": "移交移送",
//             "path": "caseTransfer",
//             "icon": null,
//             "buttonType": null,
//             "parentId": "935d0e37363735a2289db4d849e1e787",
//             "description": null,
//             "sortOrder": 2,
//             "status": 0,
//             "url": null,
//             "menuGroup": null,
//             "children": [],
//             "permTypes": null,
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": null,
//             "meta": {
//               "title": "移交移送",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": null
//       },
//       {
//         "id": "8fb965de748c6b38fdfc4b4f19157330",
//         "createTime": "2020-03-26 11:03:25",
//         "name": "electronicCaseFile",
//         "showAlways": true,
//         "type": 0,
//         "title": "电子案卷",
//         "path": "/electronicCaseFile",
//         "icon": null,
//         "buttonType": null,
//         "parentId": "127996320085446656",
//         "description": null,
//         "sortOrder": 4,
//         "status": 0,
//         "url": null,
//         "menuGroup": null,
//         "children": [],
//         "permTypes": null,
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": null,
//         "meta": {
//           "title": "电子案卷",
//           "permTypes": ""
//         }
//       }
//     ],
//     "permTypes": null,
//     "expand": true,
//     "checked": false,
//     "selected": false,
//     "plevel": 0
//   },
//   {
//     "id": "316",
//     "createTime": "2019-04-04 00:50:22",
//     "name": "lawSupervise",
//     "showAlways": true,
//     "type": -1,
//     "title": "执法监管",
//     "path": "/main",
//     "component": {
//       "name": "mainLagout",
//       "components": {
//         "headMenu": {
//           "name": "",
//           "computed": {},
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/headMenu.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "subLeftMenu": {
//           "name": "backSubmenu",
//           "props": {},
//           "computed": {},
//           "methods": {},
//           "watch": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "beforeCreate": [
//             null,
//             null
//           ],
//           "__file": "src/components/subLeftMenu.vue",
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "tabsMenu": {
//           "name": "",
//           "computed": {
//             "activeIndex": {}
//           },
//           "methods": {},
//           "watch": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/tabsMenu.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "mainContent": {
//           "name": "",
//           "methods": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "__file": "src/components/mainContent.vue",
//           "beforeCreate": [
//             null
//           ],
//           "beforeDestroy": [
//             null
//           ]
//         }
//       },
//       "computed": {},
//       "inject": [
//         "reload"
//       ],
//       "methods": {},
//       "watch": {},
//       "staticRenderFns": [],
//       "_compiled": true,
//       "beforeCreate": [
//         null,
//         null
//       ],
//       "__file": "src/page/lagout/mainLagout.vue",
//       "beforeDestroy": [
//         null
//       ]
//     },
//     "icon": "md-home1",
//     "buttonType": "",
//     "parentId": "",
//     "description": "",
//     "sortOrder": 0,
//     "status": 0,
//     "url": "",
//     "menuGroup": "系统",
//     "children": [
//       {
//         "id": "31601",
//         "createTime": "2020-03-09 04:15:19",
//         "name": "lawSupervise",
//         "showAlways": true,
//         "type": 0,
//         "title": "可视化监管",
//         "path": "lawSupervise",
//         "icon": "md-home1",
//         "buttonType": "",
//         "parentId": "316",
//         "description": "",
//         "sortOrder": 1,
//         "status": 0,
//         "url": "",
//         "menuGroup": "系统",
//         "children": [
//           {
//             "id": "3160103",
//             "createTime": "2020-03-09 04:15:19",
//             "name": "lawSupervise",
//             "showAlways": true,
//             "type": 0,
//             "title": "执法监管首页",
//             "path": "lawSupervise",
//             "icon": "md-home1",
//             "buttonType": "",
//             "parentId": "31601",
//             "description": "",
//             "sortOrder": 2,
//             "status": 0,
//             "url": "",
//             "menuGroup": "",
//             "children": [],
//             "permTypes": "",
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": "",
//             "meta": {
//               "title": "执法监管首页",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "3160101",
//             "createTime": "2020-03-09 04:15:19",
//             "name": "teamStrength",
//             "showAlways": true,
//             "type": 0,
//             "title": "队伍力量",
//             "path": "teamStrength",
//             "icon": "md-home1",
//             "buttonType": "",
//             "parentId": "31601",
//             "description": "",
//             "sortOrder": 2,
//             "status": 0,
//             "url": "",
//             "menuGroup": "",
//             "children": [],
//             "permTypes": "",
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": "",
//             "meta": {
//               "title": "队伍力量",
//               "permTypes": ""
//             }
//           },
//           {
//             "id": "3160102",
//             "createTime": "2020-03-09 04:15:19",
//             "name": "offSiteDetectionOverload",
//             "showAlways": true,
//             "type": 0,
//             "title": "非现场治超检测",
//             "path": "offSiteDetectionOverload",
//             "icon": "md-home1",
//             "buttonType": "",
//             "parentId": "31601",
//             "description": "",
//             "sortOrder": 2,
//             "status": 0,
//             "url": "",
//             "menuGroup": "",
//             "children": [],
//             "permTypes": "",
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": "",
//             "meta": {
//               "title": "非现场治超检测",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": "",
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": "",
//         "meta": {
//           "title": "可视化监管",
//           "permTypes": ""
//         }
//       },
//       {
//         "id": "31602",
//         "createTime": "2020-03-09 04:15:19",
//         "name": "clueManage",
//         "showAlways": true,
//         "type": 0,
//         "title": "线索中心",
//         "path": "clueManage",
//         "component": {
//           "name": "mainLagout",
//           "components": {
//             "headMenu": {
//               "name": "",
//               "computed": {},
//               "methods": {},
//               "staticRenderFns": [],
//               "_compiled": true,
//               "__file": "src/components/headMenu.vue",
//               "beforeCreate": [
//                 null
//               ],
//               "beforeDestroy": [
//                 null
//               ]
//             },
//             "subLeftMenu": {
//               "name": "backSubmenu",
//               "props": {},
//               "computed": {},
//               "methods": {},
//               "watch": {},
//               "staticRenderFns": [],
//               "_compiled": true,
//               "beforeCreate": [
//                 null,
//                 null
//               ],
//               "__file": "src/components/subLeftMenu.vue",
//               "beforeDestroy": [
//                 null
//               ]
//             },
//             "tabsMenu": {
//               "name": "",
//               "computed": {
//                 "activeIndex": {}
//               },
//               "methods": {},
//               "watch": {},
//               "staticRenderFns": [],
//               "_compiled": true,
//               "__file": "src/components/tabsMenu.vue",
//               "beforeCreate": [
//                 null
//               ],
//               "beforeDestroy": [
//                 null
//               ]
//             },
//             "mainContent": {
//               "name": "",
//               "methods": {},
//               "staticRenderFns": [],
//               "_compiled": true,
//               "__file": "src/components/mainContent.vue",
//               "beforeCreate": [
//                 null
//               ],
//               "beforeDestroy": [
//                 null
//               ]
//             }
//           },
//           "computed": {},
//           "inject": [
//             "reload"
//           ],
//           "methods": {},
//           "watch": {},
//           "staticRenderFns": [],
//           "_compiled": true,
//           "beforeCreate": [
//             null,
//             null
//           ],
//           "__file": "src/page/lagout/mainLagout.vue",
//           "beforeDestroy": [
//             null
//           ]
//         },
//         "icon": "md-home1",
//         "buttonType": "",
//         "parentId": "316",
//         "description": "",
//         "sortOrder": 1,
//         "status": 0,
//         "url": "",
//         "menuGroup": "系统",
//         "children": [
//           {
//             "id": "33160201",
//             "createTime": "2020-03-09 04:15:19",
//             "name": "offSiteManage",
//             "showAlways": true,
//             "type": 0,
//             "title": "非现场治超列表",
//             "path": "offSiteManage",
//             "icon": "md-home1",
//             "buttonType": "",
//             "parentId": "31602",
//             "description": "",
//             "sortOrder": 2,
//             "status": 0,
//             "url": "",
//             "menuGroup": "",
//             "children": [],
//             "permTypes": "",
//             "expand": true,
//             "checked": false,
//             "selected": false,
//             "plevel": "",
//             "meta": {
//               "title": "非现场治超列表",
//               "permTypes": ""
//             }
//           }
//         ],
//         "permTypes": "",
//         "expand": true,
//         "checked": false,
//         "selected": false,
//         "plevel": ""
//       }
//     ]
//   }
// ]
