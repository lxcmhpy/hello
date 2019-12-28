import request from "@/js/request";
import { setCancelSource } from "@/js/cancelToken";
import Vue from "vue";
let vm = new Vue();

//获取执法门类
export function getEnforceLawTypeApi(organId) { 
  return request({
    url: "/sys/lawCategory/findLawCateByOrganId/"+organId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//获取案件类型
export function getCaseTypeApi(data) { 
    let params={
      programType:data.programType,
      organId:"1",
      cateId:data.cateId
    }
    return request({
      url: "/sys/lawCategory/queryLawCateOrganType",
      method: "get",
      params:params,
      showloading: true,
      cancelToken: setCancelSource()
    });
}
//获取行业类别
export function getIndustryCategoryApi(data) { 
    let params = {
      pid:data
    }
    return request({
      url: "/sys/lawCategory/getLawCategoryListVo",
      method: "get",
      showloading: true,
      params:params,
      cancelToken: setCancelSource()
    });
}
//根据执法门类行业类别 查询违法行为
export function getIllegaActApi(data) { 
    console.log(data);
    return request({
      url: "/sys/bnslawCause/findCaseCauseByPage",
      method: "get",
      params:data,
      showloading: true,
      cancelToken: setCancelSource()
    });
}

//添加或修改案件基本信息
export function saveOrUpdateCaseBasicInfoApi(data) { 
  console.log(data);
  
  let  data2  =  vm.$qs.stringify(data);
  console.log(data2);
  return request({
    url: "/doc/caseBasicInfo/saveOrUpdateCaseBasicInfo",
    method: "post",
    data:data2,
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//根据违法行为id查询绑定的法条
export function findLawRegulationsByCauseIdApi(causeId) { 
  console.log(causeId);
  return request({
    url: "/sys/bnslawCause/findLawRegulationsByCauseId/"+causeId,
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}

//查询自由裁量标准
export function findJudgFreedomListApi() { 
  return request({
    url: "/sys/bnslawCause/findDiscretionListByForm",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}
//查询机构下的执法人员
export function findLawOfficerListApi() { 
  return request({
    url: "/sys/lawOfficer/listPage",
    method: "get",
    showloading: true,
    cancelToken: setCancelSource()
  });
}