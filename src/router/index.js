import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect:"/home",
    children: [
      {path: 'home' , name: '管理界面', component: () => import('../views/Home.vue'),},
      {path: 'user' , name: '用户管理', component: () => import('../views/User.vue'),},
      {path: 'person' , name: '个人信息', component: () => import('../views/Person.vue'),},
      {path: 'game' , name: '活动咨询管理', component: () => import('../views/Game'),},
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to,from,next) =>{
  localStorage.setItem("currentPathName",to.name)//设置读取路由名称，为了在Header组件中使用
  store.commit("setPath") //触发store的数据更新
  next()  //放行路由
})

export default router
