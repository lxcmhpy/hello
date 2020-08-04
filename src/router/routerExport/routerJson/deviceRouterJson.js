import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
    {
        path: "/deviceTypeManagment",
        name: "deviceTypeManagment",
        meta: {
          title: "装备类型管理"
        },
        component: () => import("@/page/device/device-type/deviceTypeManagment.vue")
    },
    {
        path: "/deviceInventoryManage",
        name: "deviceInventoryManage",
        meta: {
          title: "库存管理"
        },
        component: () => import("@/page/device/device-inventory/deviceInventoryManage.vue")
    },
    {
        path: "/userdBillManage",
        name: "userdBillManage",
        meta: {
          title: "配发(领用)管理"
        },
        component: () => import("@/page/device/device-bill/userdBillManage.vue")
    },
    {
        path: "/maintainBillManage",
        name: "maintainBillManage",
        meta: {
          title: "维修管理"
        },
        component: () => import("@/page/device/device-bill/maintainBillManage.vue")
    },
    {
        path: "/transferBillManage",
        name: "transferBillManage",
        meta: {
          title: "调拨管理"
        },
        component: () => import("@/page/device/device-bill/transferBillManage.vue")
    },
    {
        path: "/invalidBillManage",
        name: "invalidBillManage",
        meta: {
          title: "报废管理"
        },
        component: () => import("@/page/device/device-bill/invalidBillManage.vue")
    },
    {
        path: "/recoveryBillManage",
        name: "recoveryBillManage",
        meta: {
          title: "回收管理"
        },
        component: () => import("@/page/device/device-bill/recoveryBillManage.vue")
    }
]
