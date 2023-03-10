import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import( /* webpackChunkName: "Login_home_welcome" */ '../views/Home.vue')
const Login = () => import(/* webpackChunkName: "Login_home_welcome" */ '../views/Login.vue')
const Welcome = () => import( /* webpackChunkName: "Login_home_welcome" */ '../views/Welcome.vue')
const District = () => import( /* webpackChunkName: "Cate_params" */ '../views/district/District.vue')
const Feedback= () => import( /* webpackChunkName: "Cate_params" */ '../views/feedback')
const Complaint = () => import( /* webpackChunkName: "Cate_params" */ '../views/complaint')
const Project = () => import( /* webpackChunkName: "Cate_params" */ '../views/project')
const Crawler = () => import( /* webpackChunkName: "Orders_report" */ '../views/crawler/Crawler.vue')
const ScriptTemp = () => import( /* webpackChunkName: "Orders_report" */ '../views/crawler/ScriptTemp.vue')
const Rule = () => import( /* webpackChunkName: "Orders_report" */ '../views/crawler/Rule.vue')
const Policy = () => import( /* webpackChunkName: "Orders_report" */ '../views/policy/Policy.vue')
Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login },
  {
  path: '/',
  component: Home,
  redirect: '/welcome',
  name: 'Home',
  children: [{
      path: '/welcome',
      component: Welcome,
      name: 'Welcome'
    },
    {
      path: '/district',
      component: District,
      name: 'District',
      redirect: '/complaint',
      children: [{
        path: '/complaint',
        component: Complaint,
        name: 'Complaint',
      },{
        path: '/project',
        component: Project,
        name: 'Project',
      },{
        path: '/feedback',
        component: Feedback,
        name: 'feedback',
      }
      ]
    },
    {
      path: '/crawler',
      component: Crawler,
      name: 'Crawler'
    },
    {
      path: '/scripttemp',
      component: ScriptTemp,
      name: 'ScriptTemp'
    },
    {
      path: '/rule',
      component: Rule,
      name: 'Rule'
    },
    {
      path: '/policy',
      component: Policy,
      name: 'Policy'
    },
  ]
}]
const router = new VueRouter({
  routes
})
//????????????????????????
// router.beforeEach((to, from, next) =>{
//   // ?????????????????????????????????????????????
//   if (to.path == '/login') return next()
//   // ???sessionStorage ????????????????????? token ???
//   const tokenStr = window.sessionStorage.getItem('token')
//   //?????? token???????????????????????????
//   if (!tokenStr) {
//     // window.alert("???????????????")
//     return next('/login')
//   }
//   next()
// })
export default router
