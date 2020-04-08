import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters

import api from './api/api'
Vue.prototype.$api = api

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

//  全局组件之间通信
Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue()        // 巴士

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = true

import global_info from './api/Global'
Vue.prototype.GLOBAL = global_info;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted:function(){//解决跳转到新页面不默认固定在顶部的bug
    this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
  },
  data: {
    eventHub: new Vue()
  }
})


