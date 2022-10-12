import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },

  {
    path: '/system',
    component: Layout,
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children:[
      {
        path: '/sysUserList',
        name: 'sysUserList',
        component: () => import('@/views/system/sysUserList.vue'),
        meta: { title: '员工管理', icon: 'table' }
      },
      {
        path: '/sysRoleList',
        name: 'sysRoleList',
        component: () => import('@/views/system/sysRoleList.vue'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: '/sysMenuList',
        name: 'sysMenuList',
        component: () => import('@/views/system/sysMenuList.vue'),
        meta: { title: '权限管理', icon: 'tree' }
      },
    ],
  },

  {
    path: '/house',
    component: Layout,
    alwaysShow: true,
    meta: { title: '房屋管理', icon: 'el-icon-s-help' },
    children:[
      {
        path: '/houseBuilding',
        name: 'houseBuilding',
        component: () => import('@/views/house/houseBuilding.vue'),
        meta: { title: '栋数管理', icon: 'table' }
      },
      {
        path: '/houseUnit',
        name: 'houseUnit',
        component: () => import('@/views/house/houseUnit.vue'),
        meta: { title: '单元管理', icon: 'table' }
      },
      {
        path: '/houseList',
        name: 'houseList',
        component: () => import('@/views/house/houseList.vue'),
        meta: { title: '房屋管理', icon: 'table' }
      },
    ],
  },
  {
    path: '/parkList',
    component: Layout,
    alwaysShow: true,
    meta: { title: '车位管理', icon: 'el-icon-money' },
    children:[
      {
        path: '/parkList',
        name: 'parkList',
        component: () => import('@/views/parkList/parkList.vue'),
        meta: { title: '车位管理', icon: 'table' }
      },
    ],
  },
  {
    path: '/liveUser',
    component: Layout,
    alwaysShow: true,
    meta: { title: '业主管理', icon: 'el-icon-s-grid' },
    children:[
      {
        path: '/liveUser',
        name: 'liveUser',
        component: () => import('@/views/liveUser/liveUser.vue'),
        meta: { title: '业主管理', icon: 'el-icon-s-data' }
      },
    ],
  },

  {
    path: '/charge',
    component: Layout,
    alwaysShow: true,
    meta: { title: '收费管理', icon: 'el-icon-s-open' },
    children:[
      {
        path: '/feePower',
        name: 'feePower',
        component: () => import('@/views/charge/feePower.vue'),
        meta: { title: '电费管理', icon: 'el-icon-picture' }
      },
      {
        path: '/feeWater',
        name: 'feeWater',
        component: () => import('@/views/charge/feeWater.vue'),
        meta: { title: '水费管理', icon: 'el-icon-s-data' }
      },
      {
        path: '/feePark',
        name: 'feePark',
        component: () => import('@/views/charge/feePark.vue'),
        meta: { title: '停车管理', icon: 'el-icon-s-order' }
      },
    ],
  },
  {
    path: '/complaint',
    component: Layout,
    alwaysShow: true,
    meta: { title: '投诉管理', icon: 'el-icon-s-open' },
    children:[
      {
        path: '/userComplaintList',
        name: 'userComplaintList',
        component: () => import('@/views/complaint/userComplaintList.vue'),
        meta: { title: '投诉列表', icon: 'el-icon-edit-outline' }
      },
      {
        path: '/myUserComplaint',
        name: 'myUserComplaint',
        component: () => import('@/views/complaint/myUserComplaint.vue'),
        meta: { title: '水费管理', icon: 'el-icon-menu' }
      },
    ],
  },
  {
    path: '/maintain',
    component: Layout,
    alwaysShow: true,
    meta: { title: '维修管理', icon: 'el-icon-picture-outline' },
    children:[
      {
        path: '/repairList',
        name: 'repairList',
        component: () => import('@/views/maintain/repairList.vue'),
        meta: { title: '维修列表', icon: 'el-icon-s-marketing' }
      },
      {
        path: '/myRepair',
        name: 'myRepair',
        component: () => import('@/views/maintain/myRepair.vue'),
        meta: { title: '我的维修', icon: 'el-icon-picture-outline ' }
      },
    ],
  },
  {
    path: '/noticeLists',
    component: Layout,
    alwaysShow: true,
    meta: { title: '公告管理', icon: 'el-icon-document-copy' },
    children:[
      {
        path: '/noticeList',
        name: 'noticeList',
        component: () => import('@/views/noticeLists/noticeList.vue'),
        meta: { title: '公告列表', icon: 'el-icon-s-marketing' }
      },
    ],
  },





  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
