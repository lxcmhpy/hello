export default [
  //   {
  //   path: "/side",
  //   name: "side",
  //   meta: {
  //     title: "侧边条"
  //   },
  //   component: () => import("@/page/caseHandle/case/side.vue")
  // },

  {
    path: "/deleteEvidence",
    name: "deleteEvidence",
    meta: {
      title: "解除证据登记保存决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/deleteEvidence.vue")
  },
  {
    path: "/forceCorrect",
    name: "forceCorrect",
    meta: {
      title: "责令改正违法行为通知书"
    },
    component: () => import("@/page/caseHandle/case/modle/forceCorrect.vue")
  },
  {
    path: "/modle",
    name: "modle",
    meta: {
      title: "标准文书模板"
    },
    component: () => import("@/page/caseHandle/case/modle/modle.vue")
  },
  {
    path: "/othermodle",
    name: "othermodle",
    meta: {
      title: "询问笔录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/otherModle.vue")
  },
  {
    path: "/finishCaseReport",
    name: "finishCaseReport",
    meta: {
      title: "结案报告",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/finishCaseReport.vue")
  },
  {
    path: "/caseInvestig",
    name: "caseInvestig",
    meta: {
      title: "案件调查报告",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseInvestigReport.vue")
  },
  {
    path: "/caseDoc",
    name: "caseDoc",
    meta: {
      title: "调查类文书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDoc.vue")
  },
  {
    path: "/obtaineEvidenceForm",
    name: "obtaineEvidenceForm",
    meta: {
      title: "抽样取样凭证",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/obtaineEvidenceFormReport.vue")
  },
  {
    path: "/deliveryCertificate",
    name: "deliveryCertificate",
    meta: {
      title: "送达回证",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/deliveryCertificate.vue")
  },
  {
    path: "/establish",
    name: "establish",
    meta: {
      title: "立案登记表-pdf",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/unRecordCase/establish.vue")
  },
  {
    path: "/payStage",
    name: "payStage",
    meta: {
      title: "分期（延期）缴纳罚款通知书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/payStageDoc.vue")
  },
  {
    path: "/executAnnounce",
    name: "executAnnounce",
    meta: {
      title: "执行公告",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/executAnnounceDoc.vue")
  },
  //处罚执行
  {
    path: "/penaltyExecution",
    name: "penaltyExecution",
    meta: {
      title: "处罚执行",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/PenaltyExecutionForm.vue")
  },
  //行政处罚决定书
  {
    path: "/adminPunishe",
    name: "adminPunishe",
    meta: {
      title: "行政处罚决定书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/adminPunisheDecisionForm.vue")
  },
  //行政强制措施决定书
  {
    path: "/adminCoerciveMeasure",
    name: "adminCoerciveMeasure",
    meta: {
      title: "行政强制措施决定书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/adminCoerciveMeasureForm.vue")
  },
  //不予处罚
  {
    path: "/noPenalty",
    name: "noPenalty",
    meta: {
      title: "不予处罚",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/noPenalty.vue")
  },
  //当事人权利
  {
    path: "/partyRights",
    name: "partyRights",
    meta: {
      title: "当事人权利",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/partyRightsForm.vue")
  },
  //强制执行
  {
    path: "/forceExecute",
    name: "forceExecute",
    meta: {
      title: "强制执行",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/forceExecuteForm.vue")
  },
  //违法行为通知书
  {
    path: "/illegalActionForm",
    name: "illegalActionForm",
    meta: {
      title: "违法行为通知书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/illegalActionForm.vue")
  },
  //听证通知书(流程中)
  {
    path: "/hearingNoticePdf",
    name: "hearingNoticePdf",
    meta: {
      title: "听证通知书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/hearingNoticeDoc.vue")
  },
  //听证笔录(流程中)
  {
    path: "/hearingRecordePdf",
    name: "hearingRecordePdf",
    meta: {
      title: "听证笔录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/hearingRecordDoc.vue")
  },
  //案件总览
  {
    path: "/caseInfo",
    name: "caseInfo",
    meta: {
      title: "案件总览",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/waitDeal/caseInfo.vue")
  },
  {
    // path: '/flowChart/:id',
    path: '/flowChart',
    name: 'flowChart',
    meta: {
      title: '流程图',
      oneTab: true,
    },
    component: () => import("@/components/flowChart/flowChart.vue")
  },
  //行政处罚决定书
  {
    path: "/punishDecisionDoc",
    name: "punishDecisionDoc",
    meta: {
      title: "行政处罚决定书-doc",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/punishDecisionDoc.vue")
  },
  //勘验笔录-doc
  {
    path: "/inquestNotesDoc",
    name: "inquestNotesDoc",
    meta: {
      title: "勘验笔录-doc",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/inquestNotesDoc.vue")
  },
  //现场笔录-doc
  {
    path: "/sceneNotesDoc",
    name: "sceneNotesDoc",
    meta: {
      title: "现场笔录-doc",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/sceneNotesDoc.vue")
  },
  {
    path: "/inforCollect",
    name: "inforCollect",
    meta: {
      title: "信息采集",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/unRecordCase/inforCollection.vue")
  },
  {
    path: "/myPDF",
    name: "myPDF",
    meta: {
      title: "pdf",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/myPDF.vue")
  },
  {
    path: "/viewPDF",
    name: "viewPDF",
    meta: {
      title: "pdf展示"
    },
    component: () => import("@/components/htmlExportPDF/viewPDF.vue")
  },
  // -----------------信息查验start----------------
  {
    path: "/checkHome",
    name: "checkHome",
    meta: {
      title: "信息查验首页"
    },
    component: () => import("@/page/checkInfo/checkHome.vue")
  },
  {
    path: "/transportWorker",
    name: "transportWorker",
    meta: {
      title: "道路运输从业人员"
    },
    component: () => import("@/page/checkInfo/transportWorker.vue")
  },
  {
    path: "/commercialVehicle",
    name: "commercialVehicle",
    meta: {
      title: "营运车辆"
    },
    component: () => import("@/page/checkInfo/commercialVehicle.vue")
  },
  {
    path: "/industry",
    name: "industry",
    meta: {
      title: "经营业户"
    },
    component: () => import("@/page/checkInfo/industry.vue")
  },
  {
    path: "/vehicleLine",
    name: "vehicleLine",
    meta: {
      title: "客运线路标志牌"
    },
    component: () => import("@/page/checkInfo/vehicleLine.vue")
  },
  {
    path: "/crewCertificates",
    name: "crewCertificates",
    meta: {
      title: "船员适任证查验"
    },
    component: () => import("@/page/checkInfo/crewCertificates.vue")
  },

  {
    path: "/shipCertificates",
    name: "shipCertificates",
    meta: {
      title: "国内（国际）船舶查询"
    },
    component: () => import("@/page/checkInfo/shipCertificates.vue")
  },
  // -----------------信息查验end----------------
  {
    path: "/archiveCover",
    name: "archiveCover",
    meta: {
      title: "归档"
    },
    component: () => import("@/page/caseHandle/waitArchive/archiveCover.vue")
  },
  {
    path: "/archiveCatalogueDetail",
    name: "archiveCatalogueDetail",
    meta: {
      title: "卷宗目录详情"
    },
    component: () => import("@/page/caseHandle/waitArchive/archiveCatalogueDetail.vue")
  },
  {
    path: "/addTransfer",
    name: "addTransfer",
    meta: {
      title: "新增移送"
    },
    component: () => import("@/page/caseHandle/cooperateCases/addPage.vue")
  },
  {
    path: "/addSelect",
    name: "addSelect",
    meta: {
      title: "新增移送"
    },
    component: () => import("@/page/caseHandle/cooperateCases/selectPage.vue")
  },
  {
    path: "/cooperateDentails",
    name: "cooperateDentails",
    meta: {
      title: "移送：案号"
    },
    component: () => import("@/page/caseHandle/cooperateCases/cooperateDentails.vue")
  },
  {
    path: "/addCopyTwo",
    name: "addCopyTwo",
    meta: {
      title: "新增抄告"
    },
    component: () => import("@/page/caseHandle/cooperateCases/addCopyTwo.vue")
  },
  {
    path: "/addCopyOne",
    name: "addCopyOne",
    meta: {
      title: "新增抄告"
    },
    component: () => import("@/page/caseHandle/cooperateCases/addCopyOne.vue")
  },
  {
    path: "/caseCopyDentails",
    name: "caseCopyDentails",
    meta: {
      title: "抄告：案号"
    },
    component: () => import("@/page/caseHandle/cooperateCases/caseCopyDentails.vue")
  },
  // -----------------长软start----------------
  {
    path: "/evidenceListDoc",
    name: "evidenceListDoc",
    meta: {
      title: "证据登记保存清单"
    },
    component: () => import("@/page/caseHandle/case/modle/evidenceListDoc.vue")
  },
  {
    path: "/prolongAdminCompulsoryDoc",
    name: "prolongAdminCompulsoryDoc",
    meta: {
      title: "延长行政强制措施期限通知书"
    },
    component: () => import("@/page/caseHandle/case/modle/prolongAdminCompulsoryDoc.vue")
  },
  {
    path: "/removeAdminCoerciveMeasureDoc",
    name: "removeAdminCoerciveMeasureDoc",
    meta: {
      title: "解除行政强制措施决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/removeAdminCoerciveMeasureDoc.vue")
  },
  //解除（延长）行政强制措施
  {
    path: "/removeOrPrelong",
    name: "removeOrPrelong",
    meta: {
      title: "解除（延长）行政强制措施决定"
    },
    component: () => import("@/page/caseHandle/case/coerciveMeasureDoc.vue")
  },
  {
    path: "/importantCaseTeamDissDoc",
    name: "importantCaseTeamDissDoc",
    meta: {
      title: "重大案件集体讨论记录"
    },
    component: () => import("@/page/caseHandle/case/modle/importantCaseTeamDissDoc.vue")
  },
  {
    path: "/hearingNoticeDoc",
    name: "hearingNoticeDoc",
    meta: {
      title: "听证通知书"
    },
    component: () => import("@/page/caseHandle/case/modle/hearingNoticeDoc.vue")
  },
  {
    path: "/hearingRecordeDoc",
    name: "hearingRecordeDoc",
    meta: {
      title: "听证笔录"
    },
    component: () => import("@/page/caseHandle/case/modle/hearingRecordDoc.vue")
  },
  {
    path: "/spotAdmPunishDecisionDoc",
    name: "spotAdmPunishDecisionDoc",
    meta: {
      title: "当场行政处罚决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/spotAdmPunishDecisionDoc.vue")
  },
  {
    path: "/remindLetterDoc",
    name: "remindLetterDoc",
    meta: {
      title: "催告书"
    },
    component: () => import("@/page/caseHandle/case/modle/remindLetterDoc.vue")
  },
  {
    path: "/enforceInsteadDoc",
    name: "enforceInsteadDoc",
    meta: {
      title: "代履行决定书-pdf"
    },
    component: () => import("@/page/caseHandle/case/modle/enforceInsteadDoc.vue")
  },
  {
    path: "/enforceDecideDoc",
    name: "enforceDecideDoc",
    meta: {
      title: "行政强制执行决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/enforceDecideDoc.vue")
  },
  {
    path: "/enforceDoc",
    name: "enforceDoc",
    meta: {
      title: "中止（终结、恢复）行政强制执行通知书-pdf"
    },
    component: () => import("@/page/caseHandle/case/modle/enforceDoc.vue")
  },
  {
    path: "/importantCaseTeamDissDoc",
    name: "importantCaseTeamDissDoc",
    meta: {
      title: "重大案件集体讨论记录"
    },
    component: () => import("@/page/caseHandle/case/modle/importantCaseTeamDissDoc.vue")
  },
  //lv:start
  {
    path: "/handleRecordForm",
    name: "handleRecordForm",
    meta: {
      title: "操作记录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/handleRecordForm.vue")
  },
  {
    path: "/evidenceForm",
    name: "evidenceForm",
    meta: {
      title: "证据目录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/evidenceForm.vue")
  },
  {
    path: "/documentForm",
    name: "documentForm",
    meta: {
      title: "文书列表",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/documentForm.vue")
  },
  {
    path: "/deliverReceiptForm",
    name: "deliverReceiptForm",
    meta: {
      title: "送达回证",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/deliverReceiptForm.vue")
  },
  {
    path: "/testPdf",
    name: "testPdf",
    meta: {
      title: "测试pdf",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/testPdf.vue")
  },

  //---------------长软end------------
  {
    path: "/electronicFileDetail",
    name: "electronicFileDetail",
    meta: {
      title: "卷宗详情",
    },
    component: () => import("@/page/caseHandle/electronicCaseFile/electronicFileDetail.vue")
  },
  {
    path: "/caseCenter-overWeightCase",
    name: "caseCenter-overWeightCase",
    meta: {
      title: "超限案件列表",
    },
    component: () => import("@/page/caseCenter/myWaitDeal/overWeightCase.vue")
  },
  {
    path: "/caseCenter-transferAndRegisterCase",
    name: "caseCenter-transferAndRegisterCase",
    meta: {
      title: "转立案列表",
    },
    component: () => import("@/page/caseCenter/partyWaitDeal/transferAndRegisterCase.vue")
  },
  {
    path: "/caseCenter-dealNotes",
    name: "caseCenter-dealNotes",
    meta: {
      title: "处置说明组件",
    },
    component: () => import("@/components/cluesReview/dealNotes.vue")
  },
  {
    path: "/caseCenter-dealProgress",
    name: "caseCenter-dealProgress",
    meta: {
      title: "执行情况组件",
    },
    component: () => import("@/components/cluesReview/dealProgress.vue")
  },
  {
    path: "/caseCenter-evidencePackage",
    name: "caseCenter-evidencePackage",
    meta: {
      title: "证据包组件",
    },
    component: () => import("@/components/cluesReview/evidencePackage.vue")
  },
  {
    path: "/caseCenter-evidenceTransfer",
    name: "caseCenter-evidenceTransfer",
    meta: {
      title: "转办证据组件",
    },
    component: () => import("@/components/cluesReview/evidenceTransfer.vue")
  },
  {
    path: "/caseCenter-otherEnclosure",
    name: "caseCenter-otherEnclosure",
    meta: {
      title: "其他附件组件",
    },
    component: () => import("@/components/cluesReview/otherEnclosure.vue")
  },
]
