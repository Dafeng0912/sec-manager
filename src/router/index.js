import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    redirect:'/dashboard',
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/evaluation',
    component: Layout,
    children: [
      {
        path: 'evaluation',
        name: 'Evaluation',
        component: () => import('@/views/evaluation/index'),
        meta: { title: '企业评价', icon: 'form' }
      }
    ]
  },

  {
    path: '/chart',
    component: Layout,
    children: [
      {
        path: 'chart',
        name: 'Chart',
        component: () => import('@/views/chart/index'),
        meta: { title: '评论图表', icon: 'clipboard' }
      }
    ]
  },

   // 用户管理
   {
    path: '/usermanager',
    parentId: 1,
    name: 'usermanager',
    // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    redirect: 'noredirect',
    component: Layout,
    meta: {
      // roles: ['admin', 'editor'], 设置该路由进入的权限，支持多个权限叠加
      title: '用户组管理',
      icon: 'example',
      noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    },
    children: [
      // user管理
      {
        path: 'user',
        name: 'user',
        component: Layout,
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'people' }
      },
      // 角色管理
      {
        path: 'role',
        component: () => import('@/views/role/index'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'theme',
          noCache: true
        }
      },
      // 权限管理
      {
        path: 'permission',
        component: () => import('@/views/permission/index'),
        name: 'permission',
        meta: {
          title: '权限管理',
          icon: 'eye',
          noCache: true
        }
      },
    ]
  },

  // 信息维护
  {
    path: '/info',
    parentId: 1,
    component: Layout,
    redirect: 'noredirect',
    name: 'info',
    meta: {
      title: '信息维护',
      icon: 'table'
    },
    // 合作企业
    children: [
      {
        path: 'corporate',
        name: 'corporate',
        component: () =>
          import('@/views/corporate/index'),
        meta: {
          title: '合作企业',
          icon: 'guide'
        }
      },
      // 合作学校
      {
        path: 'school',
        name: 'school',
        component: () =>
          import('@/views/school/index'),
        meta: {
          title: '合作学校',
          icon: 'education'
        },
      },
      // 时间轴
      {
        path: 'admission',
        name: 'admission',
        component: Layout,
        component: () => import('@/views/admission/index'),
        meta: {
          title: '流程管理',
          icon: 'star'
        }
      },

      // 通知管理
      // {
      //   path: 'natification',
      //   name: 'natification',
      //   component: Layout,
      //   component: () => import('@/views/natification/index'),
      //   meta: {
      //     title: '通知管理',
      //     icon: 'tab'
      //   },
      // },
    ]
  },

  // 评价管理
  {
    path: '/evaluate',
    component: Layout,
    parentId: 1,
    redirect: 'noredirect',
    name: 'evaluate',
    meta: {
      title: '评价管理',
      icon: 'nested'
    },
    // 评价记录管理
    children: [
      {
        path: 'record',
        component: () => import('@/views/record/index'),
        name: 'record',
        meta: {
          title: '评价记录管理',
          icon: 'nested'
        }
      },
      // 评价指标管理
      {
        path: '/norm',
        component: () => import('@/views/norm/index'),
        name: 'norm',
        meta: { title: '评价指标管理', icon: 'nested', noCache: true }
      }
    ]
  },

  // 前台页面
  {
    path: '/front',
    name: 'Front',
    component: () => import('@/fronts/school'),
    meta: {
          title: '去往前台',
          icon: 'tab'
        },
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },


  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
