import store from '@/store/index.js';

export default [

{
    path: "/assistInvestgation",
    name: "case_handle_assistInvestgation",
    meta: {
      title: "协助调查函"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/assistInvestigation_JX.vue")
  },
  {
    path: "/inspectionRecord",
    name: "case_handle_inspectionRecord",
    meta: {
      title: "检查记录"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/inspectionRecord_JX.vue")
  },
  {
    path: "/establish_JX",
    name: "case_handle_establish_JX",
    meta: {
      title: "立案登记表——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/form/establish_JX.vue")
  },
  {
    path: "/evidenceRegApprovalForm",
    name: "case_handle_evidenceRegApprovalForm",
    meta: {
      title: "证据登记保存审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/evidenceRegApprovalForm.vue")
  },
  {
    path: "/audioEvidenceRecord",
    name: "case_handle_audioEvidenceRecord",
    meta: {
      title: "视听资料（电子数据）证据记录单"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/audioEvidenceRecord.vue")
  },
  {
    path: "/removeEvidenceRegApprovalForm",
    name: "case_handle_removeEvidenceRegApprovalForm",
    meta: {
      title: "解除证据登记保存审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/removeEvidenceRegApprovalForm.vue")
  },
  {
    path: "/adminCoerciveMeasureApproval",
    name: "case_handle_adminCoerciveMeasureApproval",
    meta: {
      title: "行政强制措施审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/adminCoerciveMeasureApproval.vue")
  },
]