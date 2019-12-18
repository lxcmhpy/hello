import request from "@/js/request";
import { setCancelSource } from "@/js/cancelToken";
import Vue from "vue";
let vm = new Vue();


//获取用户下的所有机构
export function getAllOrganApi() {
    return request({
      url: "/sys/organ/organTreeByCurrUser",
      method: "get",
      showloading: true,
      cancelToken: setCancelSource()
    });
}

//获取选中机构下的机构
export function getSelectOrganApi(data) {
  return request({
    url: "/sys/organ/queryOrganPage",
    method: "get",
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//新增机构
export function addOrganApi(data) {
  let addOrganForm={
    id:data.id,
    name:data.name,
    pidName: data.pidName,
    pid:data.pid,
    code: data.code,
    organType: data.organType,
    accessToAuthority: data.accessToAuthority,
    organNature: data.organNature,
    isIndependentEnforce: data.isIndependentEnforce,
    address: data.address,
    zipCode: data.zipCode,
    telephone: data.telephone,
    contactor: data.contactor,
    fundingSource: data.fundingSource,
    legalBasis: data.legalBasis,
    mainPowers: data.mainPowers
  };
  let data2 = vm.$qs.stringify(addOrganForm);
  return request({
    url: "/sys/organ/saveOrUpdateOrgan",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//机构详情
export function getOrganDetailApi(data) {
  return request({
    url: "/sys/organ/findById/"+data.id,
    method: "get",
    // params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//删除机构
export function deleteOrganApi(data) {
  return request({
    url: "/sys/organ/delete/"+data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//验证机构名称是否重复
export function hasOrganNameApi(name) {
  return request({
    url: "/sys/organ/findByName/"+name,
    method: "get",
    showloading: false,
    cancelToken: setCancelSource()
  });
}

//获取角色列表
export function getRolesApi() {
  return request({
    url: "/sys/role/all",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//新增角色
export function addRoleApi(data) {
  let data2 = vm.$qs.stringify(data);
  return request({
    url: "/sys/role/add",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//删除角色
export function deleteRoleApi(data) {
  return request({
    url: "/sys/role/delete",
    method: "get",
    params:{id:data},
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//修改角色
export function editRoleApi(data) {
  let params = {
    id:data.id,
    name:data.name,
    description:data.description
  }
  let data2 = vm.$qs.stringify(params);
  return request({
    url: "/sys/role/update",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//获取角色下已经绑定的菜单
export function getRoleBindMenuApi(data) {
  return request({
    url: "/sys/role/queryRoleMenu",
    method: "get",
    params:{roleId:data},
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//获取角色下已经绑定的机构
export function getRoleBindOrganApi(data) {
  return request({
    url: "/sys/role/queryRoleOrgan",
    method: "get",
    params:{roleId:data},
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//角色绑定菜单
export function roleBindMenuApi(data) {
  let params = {
    roleId:data.roleId,
    permissionIds:data.permissionIds.join(',')
  }
  return request({
    url: "/sys/role/bindMenu",
    method: "get",
    params:params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//角色绑定机构
export function roleBindOrganApi(data) {
  let params = {
    roleId:data.roleId,
    organIds:data.organIds.join(',')
  }
  console.log(params);
  return request({
    url: "/sys/role/bindOrgan",
    method: "get",
    params:params,
    showloading: true,
    cancelToken: setCancelSource()
  });
}


//获取选中机构下的部门
export function getDepartmentsApi(data) {
  console.log('部门',data);
  return request({
    url: "/sys/department/list",
    method: "get",
    params:data,
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//新增 修改 部门
export function addDepartmentApi(data) {
  let departmentForm={
    id:data.id,
    name:data.name,
    oid:data.oid,
    sortOrder:data.sortOrder,
    status:data.status == true ? 0 : 1
  };
  console.log(departmentForm)
  let data2 = vm.$qs.stringify(departmentForm);
  return request({
    url: "/sys/department/saveOrUpdateDepartment",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//删除部门
export function deleteDepartmentApi(data) {
  console.log('删除部门',data);
  return request({
    url: "/sys/department/delete/"+data,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}