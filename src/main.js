import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from  './store/index'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
//创建事件总线
Vue.prototype.$bus = new Vue()
Vue.use(toast)
//解决移动动300s延迟
FastClick.attach(document.body)
//图片懒加载
Vue.use(LazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
