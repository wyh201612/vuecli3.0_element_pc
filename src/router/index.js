import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注意：子菜单仅在route children.length>=1时出现
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置了no redirect，则noredirect将不会在breadcrumb中重定向
 * name:'router-name'             该名称由<keep alive>使用（必须设置！！！！）
 * meta : {
    title: 'title'               在侧边栏和面包屑中显示的名称（推荐集）
    auth: true                   是否需要登陆才能访问
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    meta: { title: '黄金商城-404',auth: false }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    meta: { title: '黄金商城-401',auth: false }
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'login',
        component: () => import('@/views/login/index'),
        meta: { title: '黄金商城-登陆',auth: false }
      },
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'home',
        meta: { title: '黄金商城-首页',auth: false }
      },
      {
        path: 'goldShop',
        component: () => import('@/views/goldShop/index'),
        name: 'goldShop',
        meta: { title: '黄金商城-黄金商城',auth: false }
      },
      {
        path: 'goldShopDetail',
        component: () => import('@/views/goldShopDetail/index'),
        name: 'goldShopDetail',
        meta: { title: '黄金商城-商品详情',auth: false }
      },
      {
        path: 'myAccount',
        component: () => import('@/views/myAccount/index'),
        name: 'myAccount',
        meta: { title: '黄金商城-我的账户',auth: true },
        children: [
          {
            path: 'accountIinfo',
            component: () => import('@/views/accountIinfo/index'),
            meta: { title: '黄金商城-账户信息',auth: true }
          },
          {
            path: 'myOrderList',
            component: () => import('@/views/myOrderList/index'),
            meta: { title: '黄金商城-我的订单',auth: true }
          },
          {
            path: 'myBank',
            component: () => import('@/views/myBank/index'),
            meta: { title: '黄金商城-我的银行卡',auth: true }
          },
          {
            path: 'myAddress',
            component: () => import('@/views/myAddress/index'),
            meta: { title: '黄金商城-我的地址',auth: true }
          },
        ]
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/orderDetail/index'),
        name: 'orderDetail',
        meta: { title: '黄金商城-订单详情',auth: true }
      },
      {
        path: 'orderConfirmation',
        component: () => import('@/views/orderConfirmation/index'),
        name: 'orderConfirmation',
        meta: { title: '黄金商城-订单确认',auth: true }
      },
      {
        path: 'aboutUs',
        component: () => import('@/views/aboutUs/index'),
        name: 'aboutUs',
        meta: { title: '黄金商城-品牌故事',auth: false }
      },
      {
        path: 'contactUs',
        component: () => import('@/views/contactUs/index'),
        name: 'contactUs',
        meta: { title: '黄金商城-联系我们',auth: false }
      },
      {
        path: 'downloadApp',
        component: () => import('@/views/downloadApp/index'),
        name: 'downloadApp',
        meta: { title: '黄金商城-下载app',auth: false }
      },
      {
        path: 'cart',
        component: () => import('@/views/cart/index'),
        name: 'cart',
        meta: { title: '黄金商城-购物车',auth: true }
      },
      {
        path: 'payResult',
        component: () => import('@/views/payResult/index'),
        name: 'payResult',
        meta: { title: '黄金商城-支付结果',auth: true }
      },
      {
        path: 'news',
        component: () => import('@/views/news/index'),
        name: 'news',
        meta: { title: '黄金商城-消息',auth: true }
      },
      
    ]
  },
]


const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
