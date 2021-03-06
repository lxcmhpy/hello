import * as types from "../mutation-types";
import Vue from "vue";
const vm = new Vue(); //vm等同于this

import { getCaptchaApi, loginInApi, resetPasswordApi, getMenuApi, loginOutApi, getCapImgSrcApi } from "@/api/login";
import {
    getAllOrganApi, getSelectOrganApi, addOrganApi, getOrganDetailApi, deleteOrganApi, hasOrganNameApi, getCurrentAndNextOrganApi,
    getRolesApi, addRoleApi, deleteRoleApi, editRoleApi, getRoleBindMenuApi, roleBindMenuApi, getRoleBindOrganApi, roleBindOrganApi, getOrganBindRoleApi,
    getDepartmentsApi, getDepartmentsNoPageApi, addDepartmentApi, hasDepartmentNameApi, deleteDepartmentApi,
    getAllMenuListApi, getTreePermissionApi, addPermissionApi, deletePermissionApi,
    getDictListApi, getDictListDetailApi, getAllDictListDetailApi, addDictApi, deleteDictApi,
    getUserListApi, addUserApi, updateUserApi, getUserdeleteApi, getUserdeletesApi, getUserresetApi, getUserallApi, getloglistApi, userBindRoleApi, queryUserBindRoleApi,
    getCaseTypesApi,addOrUpdateCaseTypeApi,deleteCaseTypeApi,getAllFlowApi,getRoadLcDeployApi,addOrUpdateRoadLcDeployApi,saveLawOfficelApi,getRouteListApi,addOrUpdateRouteApi,deleteRouteApi,
    getSectionListApi,addOrUpdateSectionApi,deleteSectionApi,deleteRoadLcDeployApi,getCountryApi,getDrawerListApi,countryTreeApi,getAllGroupOrganApi,getDataListApi,
    uploadApi,deleteFileByIdApi,hasUsernameApi
} from "@/api/system";

import { getLawCategoryListApi, getBannerListApi,addOrEditBannerApi, deleteBannerApi } from "@/api/caseDeploy";

const system = {
    state: {
        menu: '',
        activeIndexSto: '',
        headActiveNav:'', //当前选中的header
        btnlawId:'', //当前法规id
        systemTitle:'', //系统标题
        showZHZFPT:false, //是否显示‘综合执法平台’
    },
    mutations: {
        SET_MENU(state, data) {
            state.menu = data;
        },
        //设置选中的tab
        SET_ACTIVE_INDEX_STO (state, data) {
            state.activeIndexSto = data;
        },
        //设置当前法规id
        SET_BTNLAW_ID (state, data) {
            state.btnlawId = data;
        },
        set_systemTitle(state, data) {
            state.systemTitle = data;
        },
        setShowZHZFPT(state, data) {
            state.showZHZFPT = data;
        },

    },
    actions: {
        //获取验证码
        getCaptcha() {
            return new Promise((resolve, reject) => {
                getCaptchaApi().then(
                    res => {
                        console.log('验证码', res);
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取验证码图片
        getCapImgSrc({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCapImgSrcApi(data).then(
                    res => {
                        console.log('验证码', res);
                        resolve(res);
                    },
                    error => {
                        console.log(error)
                        reject(error);
                    })
            })
        },

        // 用户名登录
        loginIn({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginInApi(userInfo)
                    .then(
                        response => {
                                console.log("loginIn response", response);
                                commit(types.SET_AUTHTOKEN, response.access_token); //token
                                resolve(response);
                        },
                        error => {
                            reject(error);
                        }
                    )
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        // 修改密码
        resetPassword({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                resetPasswordApi(userInfo)
                    .then(
                        response => {
                            console.log(" resetPassword response", response);
                            commit(types.SET_AUTHTOKEN, response.data); //token
                            // Cookies.set("menu", "customerService");
                            resolve(response);
                        },
                        error => {
                            reject(error);
                        }
                    )
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        //获取菜单
        getMenu() {
            return new Promise((resolve, reject) => {
                getMenuApi().then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //设置选中的侧边栏slide
        setActiveSlide({ commit }, data) {
            commit(types.SET_SLIDEMENU, data);
        },
        //添加tab
        addTabs({ commit }, data) {
            commit(types.ADD_TABS, data);
        },
        //删除tab
        deleteTabs({ commit }, data) {
            commit(types.DELETE_TABS, data);
        },
        // 替换标签：index:位置，num：个数，data:元素
        replaceTabs ({ commit }, data) {
            commit(types.REPLACE_TABS, data);
        },
        //删除所有的tab
        deleteAllTabs({ commit }) {
            commit(types.DELETE_ALLTABS);
        },
        //按照title删除tab
        deleteTabsByTitle({ commit }, data) {
            commit(types.DELETE_TABS_BY_TITLE,data);
        },
        addWhiteList({ commit }, val) {
            commit(types.SET_WHITELIST, val);
        },
        reduceWhiteList({ commit }, val) {
            commit(types.EDIT_WHITELIST, val);
        },
        resetWhiteList({ commit }) {
            commit(types.RESET_WHITELIST);
        },



        changePage({ commit }, page) {
            commit(types.SET_LISTPAGE, page);
        },

        //获取所有机构
        getAllOrgan() {
            return new Promise((resolve, reject) => {
                getAllOrganApi().then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取选中所有机构
        getSelectOrgan({ commit }, data) {
            return new Promise((resolve, reject) => {
                getSelectOrganApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //添加机构
        addOrgan({ commit }, data) {
            return new Promise((resolve, reject) => {
                addOrganApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //机构详情
        getOrganDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                getOrganDetailApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除机构
        deleteOrgan({ commit }, data) {
            return new Promise((resolve, reject) => {
                deleteOrganApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //验证机构名称是否重复
        hasOrganName({ commit }, data) {
            return new Promise((resolve, reject) => {
                hasOrganNameApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取角色列表
        getRoles({ commit }, data) {
            return new Promise((resolve, reject) => {
                getRolesApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //添加角色
        addRole({ commit }, data) {
            return new Promise((resolve, reject) => {
                addRoleApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除角色
        deleteRole({ commit }, data) {
            return new Promise((resolve, reject) => {
                deleteRoleApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //修改角色
        editRole({ commit }, data) {
            return new Promise((resolve, reject) => {
                editRoleApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取角色下绑定的菜单
        getRoleBindMenu({ commit }, data) {
            return new Promise((resolve, reject) => {
                getRoleBindMenuApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //角色绑定菜单权限
        roleBindMenu({ commit }, data) {
            return new Promise((resolve, reject) => {
                roleBindMenuApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取角色下绑定的机构
        getRoleBindOrgan({ commit }, data) {
            return new Promise((resolve, reject) => {
                getRoleBindOrganApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //角色绑定机构
        roleBindOrgan({ commit }, data) {
            return new Promise((resolve, reject) => {
                roleBindOrganApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //查询机构下绑定的角色
        getOrganBindRole({ commit }, data) {
            return new Promise((resolve, reject) => {
                getOrganBindRoleApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取机构下的部门
        getDepartments({ commit }, data) {
            return new Promise((resolve, reject) => {
                getDepartmentsApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取机构下的所有部门  没有分页
        getDepartmentsNoPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                getDepartmentsNoPageApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //添加部门
        addDepartment({ commit }, data) {
            return new Promise((resolve, reject) => {
                addDepartmentApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //验证机构名称是否重复
        hasDepartmentName({ commit }, data) {
            return new Promise((resolve, reject) => {
                hasDepartmentNameApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取本机构及它的下级机构
        getCurrentAndNextOrgan({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCurrentAndNextOrganApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },




        //用户管理  获取用户列表
        getUserList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getUserListApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //用户管理  新增  修改 数据
        //  saveOrUpdateUserInfo({ commit }, data) {
        //   return new Promise((resolve,reject)=>{
        //     saveOrUpdateUserInfo(data).then(
        //       res=>{
        //         resolve(res);
        //       },
        //       error=>{
        //         reject(error);
        //       })
        //   })
        // },
        //新增用户
        addUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                addUserApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //修改用户
        updateUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                updateUserApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },


        //用户管理  修改数据
        // updateUserInfo({ commit }, data) {
        //   return new Promise((resolve,reject)=>{
        //     updateUserInfo(data).then(
        //       res=>{
        //         resolve(res);
        //       },
        //       error=>{
        //         reject(error);
        //       })
        //   })
        // },
        //用户管理 id删除数据
        getUserdelete({ commit }, data) {
            return new Promise((resolve, reject) => {
                getUserdeleteApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //用户管理 批量删除数据
        getUserdeletes({ commit }, data) {
            return new Promise((resolve, reject) => {
                getUserdeletesApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },


        //用户管理 密码初始化
        getUserreset({ commit }, data) {
            return new Promise((resolve, reject) => {
                getUserresetApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //验证用户名是否重复
        hasUsername({ commit }, data) {
            return new Promise((resolve, reject) => {
                hasUsernameApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //用户绑定角色
        userBindRole({ commit }, data) {
            return new Promise((resolve, reject) => {
                userBindRoleApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //查询用户绑定角色
        queryUserBindRole({ commit }, data) {
            return new Promise((resolve, reject) => {
                queryUserBindRoleApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //日志管理
        getloglist({ commit }, data) {
            return new Promise((resolve, reject) => {
                getloglistApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
      //转执法人员
      saveLawOfficel({ commit }, data) {
            return new Promise((resolve, reject) => {
              saveLawOfficelApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },














        //删除部门
        deleteDepartment({ commit }, data) {
            return new Promise((resolve, reject) => {
                deleteDepartmentApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //获取所有菜单
        getAllMenuList() {
            return new Promise((resolve, reject) => {
                getAllMenuListApi().then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取权限树
        getTreePermission() {
            return new Promise((resolve, reject) => {
                getTreePermissionApi().then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取数据字典列表
        getDictList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getDictListApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //添加数据字典
        addDict({ commit }, data) {
            return new Promise((resolve, reject) => {
                addDictApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除字典
        deleteDict({ commit }, data) {
            return new Promise((resolve, reject) => {
                deleteDictApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取字典值详情
        getDictListDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                getDictListDetailApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取所有字典值详情
        getAllDictListDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllDictListDetailApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取字典值详情
        async getDictListDetailTb({ commit }, data) {
            return await getDictListDetailApi(data);
        },
        //添加部门
        addPermission({ commit }, data) {
            return new Promise((resolve, reject) => {
                addPermissionApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除菜单
        deletePermission({ commit }, data) {
            return new Promise((resolve, reject) => {
                deletePermissionApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //获取执法门类列表
        getLawCategoryList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getLawCategoryListApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },


        //获取环节列表
        getBannerList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getBannerListApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //删除环节
        deleteBanner({ commit }, data) {
            return new Promise((resolve, reject) => {
              deleteBannerApi(data).then(
                res => {
                  resolve(res);
                },
                error => {
                  reject(error);
                })
            })
          },
        // 新增或修改环节
        addOrEditBanner({ commit }, data) {
            return new Promise((resolve, reject) => {
              addOrEditBannerApi(data).then(
                res => {
                  resolve(res);
                },
                error => {
                  reject(error);
                })
            })
          },

        //获取案件类型列表
        getCaseTypes({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCaseTypesApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //添加或修改案件类型
        addOrUpdateCaseType({ commit }, data) {
            return new Promise((resolve, reject) => {
                addOrUpdateCaseTypeApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //删除案件类型
        deleteCaseType({ commit }, data) {
            return new Promise((resolve, reject) => {
                deleteCaseTypeApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //获取所有流程
        getAllFlow(data) {
            console.log('getdata',data)
            return new Promise((resolve, reject) => {
                getAllFlowApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },
        //获取路产配置列表
        getRoadLcDeploy({ commit }, data) {
            return new Promise((resolve, reject) => {
                getRoadLcDeployApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

        //添加或修改路产配置信息
        addOrUpdateRoadLcDeploy({ commit }, data) {
            return new Promise((resolve, reject) => {
                addOrUpdateRoadLcDeployApi(data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    })
            })
        },

      //获取路产配置列表
      getRouteList({ commit }, data) {
        return new Promise((resolve, reject) => {
          getRouteListApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

      //添加或修改路线信息
      addOrUpdateRoute({ commit }, data) {
        return new Promise((resolve, reject) => {
          addOrUpdateRouteApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

      //删除路线
      deleteRoute({ commit }, data) {
        return new Promise((resolve, reject) => {
          deleteRouteApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

      //获取路段列表
      getSectionList({ commit }, data) {
        return new Promise((resolve, reject) => {
          getSectionListApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

      //添加或修改路段信息
      addOrUpdateSection({ commit }, data) {
        return new Promise((resolve, reject) => {
          addOrUpdateSectionApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

      //删除路段
      deleteSection({ commit }, data) {
        return new Promise((resolve, reject) => {
          deleteSectionApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

      //删除路产配置
      deleteRoadLcDeploy({ commit }, data) {
        return new Promise((resolve, reject) => {
          deleteRoadLcDeployApi(data).then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            })
        })
      },

      //获取行政区划
      getCountry({ commit }, data) {
        return new Promise((resolve, reject) => {
            getCountryApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
      },
      //行政区划树
      getCountryTree({ commit }, data) {
        return new Promise((resolve, reject) => {
            countryTreeApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
      },
      //批量查询抽屉表
      getDrawerList({ commit }, data) {
        return new Promise((resolve, reject) => {
            getDrawerListApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
      },
      //获取所有机构
      getAllGroupOrgan({ commit }, data) {
        return new Promise((resolve, reject) => {
            getAllGroupOrganApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
      },
      //获取下拉列表
      getDataList({ commit }, data) {
        return new Promise((resolve, reject) => {
            getDataListApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
      },
      //文件上传
      upload({ commit }, data) {
        return new Promise((resolve, reject) => {
            uploadApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
      },
      //根据主键ID删除附件
      deleteFileById({ commit }, data) {
        return new Promise((resolve, reject) => {
            deleteFileByIdApi(data).then(
                res => {
                    resolve(res);
                },
                error => {
                    reject(error);
                })
        })
      },
    }

}
export default system
