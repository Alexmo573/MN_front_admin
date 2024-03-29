import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import axios from 'axios'
import ElementUI from 'element-ui'
// 进度条
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
// 配置请求根路径
// axios.defaults.baseURL = 'http://47.96.121.235:8080/'
axios.defaults.baseURL = 'http://47.96.121.235:8080/'
// axios请求拦截器，请求头必须含有 Authorization ,在 request 拦截器中，展示进度条 Nprogress.start()
axios.interceptors.request.use(config => {
 // NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在 response 拦截器中，隐藏进度条 Nprogress.done()
axios.interceptors.response.use(config => {
 // NProgress.done()
  return config
})
// 将axios挂载在vue实例上
Vue.prototype.$http = axios;
Vue.use(ElementUI)
// 挂载到vue原型链上
Vue.prototype.axios = axios
Vue.config.productionTip = false

let comData = new Vue();//定义一个空的Vue实例
Vue.prototype.$comData=comData
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
