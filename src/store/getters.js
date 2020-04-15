import { stat } from "fs";

const getters = {
  // common
  loading: state => state.loading,
  loadingTime: state => state.loadingTime,
  loadingType: state => state.loadingType,
  token: state => state.authToken,
  message: state => state.message,
  imgSrc: state => state.imgSrc,
  whiteList: state => state.whiteList,
  imgIp: state => state.imgIp,
  listPage: state => state.listPage,
  //案件办理
  caseId:state => state.caseHandle.caseId,
  docId: state => state.caseHandle.docId,
  caseApproval: state => state.caseHandle.caseApproval,
  clickArchiveCatalogue:state => state.caseHandle.clickArchiveCatalogue,
  archiveCatalogueList:state => state.caseHandle.archiveCatalogueList,
  openTab: state => state.openTab,

  //监管
  offSiteManageId: state => state.supervise.offSiteManageId,

};
export default getters;
