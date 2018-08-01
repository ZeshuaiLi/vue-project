import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import store from '../store'

// import Document from '@/components/Document'
// import Home from '@/view//tab/Home'
// import Login from '@/view/Login'
// import Tab from '@/view/tab/Tab'

// 修改为按需加载
const Document = () => import('@/components/Document')
// foo测试页面
const Foo = () => import('@/view/foo')
// get和set的测试页面
const getandset = () => import('@/view/Getandset')
const Home = () => import('@/view/tab/Home')
const Tab = () => import('@/view/tab/Tab')
// 空容器
const Layout = () => import('@/view/Layout')
// 首页
const Index = () => import('@/view/Index')
// 登录
const Login = () => import('@/view/Login')
// 绑定手机号
const Bind = () => import('@/view/Bind')
// 订单列表容器
const Quotation = () => import('@/view/Quotation')
// 订单列表
const Publish = () => import('@/view/order/list/Publish')
const NotInvolved = () => import('@/view/order/list/NotInvolved')
const Offer = () => import('@/view/order/list/Offer')
const All = () => import('@/view/order/list/All')
// 订单详情
const Detail = () => import('@/view/order/Detail')
// 复杂报价
const Complex = () => import('@/view/order/offer/Complex')
const Accessories = () => import('@/view/order/offer/Accessories')
const Other = () => import('@/view/order/offer/Other')
const Fabric = () => import('@/view/order/offer/Fabric')
// 简单报价
const Simple = () => import('@/view/order/offer/Simple')

const Swiper = () => import('@/view/order/Swiper')
const Size = () => import('@/view/order/Size')

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/foo',
      name: 'foo',
      component: Foo
    },
    {
      path: '/getandset',
      name: 'getandset',
      component: getandset
    },
    {
      path: '/doc',
      name: 'Document',
      component: Document
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: Quotation,
      redirect: '/quotation/offer',
      children: [
        {
          path: 'publish',
          name: 'publish',
          component: Publish
        },
        {
          path: 'not_involved',
          name: 'NotInvolved',
          component: NotInvolved
        },
        {
          path: 'offer',
          name: 'offer',
          component: Offer
        },
        {
          path: 'all',
          name: 'all',
          component: All
        }
      ]
    },
    {
      path: '/order',
      name: 'order',
      component: Layout,
      redirect: '/quotation/offer',
      children: [
        {
          path: 'detail',
          name: 'detail',
          component: Detail
        },
        {
          path: 'simple',
          name: 'simple',
          component: Simple
        },
        {
          path: 'complex',
          name: 'complex',
          component: Complex
        },
        {
          path: 'accessories',
          name: 'accessories',
          component: Accessories
        },
        {
          path: 'fabric',
          name: 'fabric',
          component: Fabric
        },
        {
          path: 'other',
          name: 'other',
          component: Other
        },
        {
          path: 'swiper',
          name: 'swiper',
          component: Swiper
        },
        {
          path: 'size',
          name: 'size',
          component: Size
        }
      ]
    },
    {
      path: '/',
      name: 'root',
      component: Layout,
      redirect: '/index'
    }
  ]
})
sync(store, router)
/* 切换页面增加loading状态 */
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
export default router
