
import Vue from "vue";
let vm = new Vue();

import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

export function getZfjgLawSupervise(data) {
  return request({
    url: "/zfjg/list",
    method: "get",
    params:data,
    showloading: false,
    // loadingType:'loadFull',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

export function getBySiteId(sitedId) {
    return request({
      url: "/zfjg/superviseVehicle/findBySiteId/" + sitedId,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
}
// 详情：第二步骤
export function findWeighingRecord(name) {
    return request({
      url: "/zfjg/superviseVehicle/findWeighingRecord/" + name,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
}
// 获取状态
export function getCountStatus () {
    return request({
        url: "/zfjg/superviseVehicle/countStatus",
        method: "get",
        showloading: false,
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
export function getById(type,id) {
    return request({
      url: "/zfjg/findById/" + type+ '/'+id,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
  }
  export function getDetailById(id) {
    return request({
      url: "/zfjg/superviseVehicle/findById/" + id,
      method: "get",
      showloading: false,
    //   loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
  }
  export function getKeyDetailById(id) {
    return request({
      url: "/zfjg/keyVehicle/findById/" + id,
      method: "get",
      showloading: false,
    //   loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
  }

//   /zfjg/superviseVehicle/findWeighingRecord/{name}
  export function queryListPage(data) {
    return request({
      url: "/zfjg/superviseVehicle/queryListPage",
      method: "get",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
  }
  export function findAllDrawerById (data) {
    return request({
      url: "/system/sys/drawer/findAllDrawerById/" +data,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
  }
  //   /zfjg/superviseVehicle/findWeighingRecord/{name}
  export function overWeightCaseList(data) {
    return request({
      url: "/zfjg/overrunCase/queryOverrunCasePage",
      method: "get",
      params: data,
      showloading: false,
      baseUrlType:  'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    });
  }

  // 监管获取机构
//   export function getOrganTree (id) {
//     return request({
//         url: "/zfjg/organ/organTree/"+id,
//         method: "get",
//         showloading: false,
//         baseUrlType:  'CAPTCHA_HOST',
//         cancelToken: setCancelSource()
//     });
//   }
  // 监管获取机构
  export function getOrganTree (data) {
    return request({
        // url: "/zfjg/queryLike",
        url: "/zfjg/sysOrgan/queryLike",
        // url: '/system/sys/organ/findOrganPositionTreeByCurrUser',
        method: "get",
        params: data,
        showloading: false,
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
  }
  // 获取机构树
  export function organTreeByCurrUser(){
    return request({
        // url: "/zfjg/queryLike",
        url: "/zfjg/sysOrgan/findOrganPositionTreeByCurrUser",
        // url: '/system/sys/organ/findOrganPositionTreeByCurrUser',
        method: "get",
        // params: data,
        showloading: false,
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
  }

  // 获取机构树
  export function organSysTreeByCurrUser(){
    return request({
        // url: "/zfjg/queryLike",
        url: "/system/sys/organ/findOrganPositionTreeByCurrUser",
        // url: '/system/sys/organ/findOrganPositionTreeByCurrUser',
        method: "get",
        // params: data,
        showloading: false,
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
  }

  // 重点监管-车辆列表
  export function getVehicleList (data) {
    return request({
        url: "/zfjg/keyVehicle/queryKeyVehiclePage",
        method: "get",
        showloading: false,
        baseUrlType:  'CAPTCHA_HOST',
        params: data,
        cancelToken: setCancelSource()
      })
  }

// 监管-线索管理-保存
export function saveAndUpdate (data) {
    return request({
        url: "/zfjg/superviseVehicle/saveAndUpdate",
        method: "post",
        showloading: true,
        baseUrlType:  'CAPTCHA_HOST',
        data:  vm.$qs.stringify(data),
        cancelToken: setCancelSource()
      })
}
// 监管--线索管理--查询--待办
export function queryAlarmVehiclePage (data) {
    return request({
        url: "/zfjg/alarmVehicle/queryAlarmVehiclePage",
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        params: data,
        cancelToken: setCancelSource()
      })
}
export function findAlarmVehicleById (data) {
    return request({
        url: "/zfjg/alarmVehicle/findById/" + data,
        method: "get",
        showloading: false,
        baseUrlType:  'CAPTCHA_HOST',
        // params: data,
        cancelToken: setCancelSource()
      })
}
// 转立案
export function transerCase (id) {
    return request({
        url: "/zfjg/superviseVehicle/transferCase/" + id,
        method: "get",
        showloading: true,
        baseUrlType:  'CAPTCHA_HOST',
        // params: data,
        cancelToken: setCancelSource()
      })
}

export function queryDeviceListPage(data) {
  return request({
    url: "/zfjg/lawDevice/queryLawDevicePage",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
export function findDeviceById (id,typeCode) {
  return request({
    url: "/zfjg/lawDevice/findById/" +id+"/"+typeCode,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
export function saveOrUpdateDevice (data) {
  return request({
      url: "/zfjg/lawDevice/saveOrUpdate",
      method: "post",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      data:  vm.$qs.stringify(data),
      cancelToken: setCancelSource()
    })
}
export function deleteDeviceById (id,typeCode) {
  return request({
      url: "/zfjg/lawDevice/deleteById/" +id+"/"+typeCode,
      method: "get",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    })
}
// 文件上传
export  function  upload(data)  {
  return  request({
    url:  "/zfjg/sys/file/uploadCommon",
    method:  "POST",
    data: data,
    contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}
//根据主键ID删除附件
export function deleteFileByIdApi(fileId) {
  return  request({
    url:  "/zfjg/sys/file/delete/"+fileId,
    method:  "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}

export function findImageByCaseId(id) {
  return  request({
    url:  "/zfjg/sys/file/findImageByCaseId/"+id,
    method:  "GET",
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
  });
}
export function queryDeviceTypeAll(data) {
  return request({
    url: "/zfjg/lawDeviceType/queryDeviceTypeAll",
    method: "get",
    params: data,
    showloading: true,
    loadingType:'loadPart',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
export function saveOrUpdateDeviceType (data) {
  return request({
      url: "/zfjg/lawDeviceType/saveOrUpdate",
      method: "post",
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      data:  vm.$qs.stringify(data),
      cancelToken: setCancelSource()
    })
}
export function findDeviceTypeById (id) {
  return request({
    url: "/zfjg/lawDeviceType/findById/" +id,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
export function findDeviceTypeByName (name) {
  return request({
    url: "/zfjg/lawDeviceType/findByName/" +name,
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
export function findDeviceTypeNewCode () {
  return request({
    url: "/zfjg/lawDeviceType/findNewCode",
    method: "get",
    showloading: true,
    loadingType:'loadPart',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
export function getSiteById(id) {
  return request({
    url: "/zfjg/lawSite/findById/" + id,
    method: "get",
    showloading: false,
  //   loadingType:'loadPart',
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}

export function getFileByCaseId(data) {
  return  request({
    url:  "/zfjg/sys/file/findByCaseId/"+ data.caseId,
    method:  "GET",
    params: data,
    // contentType: 'multipart/form-data;',
    showloading: true,
    loadingType:'loadPart',
    cancelToken:  setCancelSource(),
    // responseType: 'blob'
  });
}
export function getCountry(data) {
  return request({
    url: "/zfjg/country/listByPcode/" + data,
    method: "get",
    showloading: false,
    baseUrlType:  'CAPTCHA_HOST',
    cancelToken: setCancelSource()
  });
}
//获取本机构及下级机构
export  function  getCurrentAndNextOrganApi()  {
    return  request({
      url:  "/zfjg/sysOrgan/organTreeByCurrUser",
      method:  "get",
      showloading: true,
      loadingType:'loadPart',
      cancelToken:  setCancelSource()
    });
  }

export function findImageListByWorkNo(id,workNo){
    return request({
        url: "/zfjg/alarmVehicle/findImageListByWorkNo/" + id+"/"+workNo,
        method: "get",
        showloading: false,
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
      });
}  

//查询重点企业
export function queryEmphasisEnterprise(data) {
    return request({
        url: "/zfjg/emphasis/enterprise/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//保存重点企业
export function saveOrUpdateEmphasisEnterprise (data) {
    return request({
        url: "/zfjg/emphasis/enterprise/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        data:  data,
        cancelToken: setCancelSource()
    })
}
//根据ID查询重点企业
export function findEmphasisEnterpriseById (id) {
    return request({
        url: "/zfjg/emphasis/enterprise/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//删除重点企业
export function deleteEmphasisEnterpriseById(id) {
    return request({
        url: "/zfjg/emphasis/enterprise/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}

//查询重点车辆
export function queryEmphasisVehicle(data) {
    return request({
        url: "/zfjg/emphasis/vehicle/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//保存重点车辆
export function saveOrUpdateEmphasisVehicle (data) {
    return request({
        url: "/zfjg/emphasis/vehicle/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        data:  data,
        cancelToken: setCancelSource()
    })
}
//根据ID查询重点车辆
export function findEmphasisVehicleById (id) {
    return request({
        url: "/zfjg/emphasis/vehicle/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//删除重点车辆
export function deleteEmphasisVehicleById(id) {
    return request({
        url: "/zfjg/emphasis/vehicle/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
//查询重点人员
export function queryEmphasisPerson(data) {
    return request({
        url: "/zfjg/emphasis/person/list",
        method: "get",
        params: data,
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//保存重点人员
export function saveOrUpdateEmphasisPerson (data) {
    return request({
        url: "/zfjg/emphasis/person/saveOrUpdate",
        method: "post",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        data:  data,
        cancelToken: setCancelSource()
    })
}
//根据ID查询重点人员
export function findEmphasisPersonById (id) {
    return request({
        url: "/zfjg/emphasis/person/findById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:  'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    });
}
//删除重点人员
export function deleteEmphasisPersonById(id) {
    return request({
        url: "/zfjg/emphasis/person/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}
//警翼拉流接口
export function getPeVideoUrl(id) {
    return request({
        url: "/zfjg/peState/findUrlById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
}

//获取文件流
export function getZfjgFileStreamByStorageId(storageId) {
    return request({
      url: "/zfjg/sys/file/getFileStreamByStorageId/"+storageId,
      method: "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'CAPTCHA_HOST',
      responseType:'blob',
      cancelToken: setCancelSource()
    });
  }

  //江西根据时间同步称重数据
  export function collectVehicleWeightEntry(startTime,endTime) {
    return  request({
      url:  "/hcr/hcr/collectVehicleWeightEntry/"+startTime+"/"+endTime,
      method:  "GET",
      showloading: true,
      baseUrlType:  'CAPTCHA_HOST',
      loadingType:'loadPart',
      cancelToken:  setCancelSource(),
    });
  }

  //删除设备类型
  export function deleteDeviceTypeById(id) {
    return request({
        url: "/zfjg/lawDeviceType/deleteById/" +id,
        method: "get",
        showloading: true,
        loadingType:'loadPart',
        baseUrlType:'CAPTCHA_HOST',
        cancelToken: setCancelSource()
    })
 }
  
 //批量删除设备
export function deleteDeviceByIds(data) {
    return request({
      url: "/zfjg/lawDevice/deleteByIds",
      method: "post",
      showloading: true,
      data: data,
      baseUrlType: 'CAPTCHA_HOST',
      loadingType: 'loadPart',
      cancelToken: setCancelSource()
    })
  }
 //根据机构id查询站点
export function findDueryFixedSitePage(data) {
    return request({
      url: "zfjg/lawDevice/queryFixedSitePage",
      method: "get",
      params: data,
      showloading: true,
      loadingType:'loadPart',
      baseUrlType:'CAPTCHA_HOST',
      cancelToken: setCancelSource()
    })
  }