<!--面包屑-->
<template>
  <el-container style="min-height: 100vh">

    <el-aside width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgba(0 21 41 0.35)">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"></Aside>
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc;">
        <Header :collapse-btn-class="collapseBtnClass" :collapse= "collapse"/>
      </el-header>

      <el-main>
<!--        表示当前页面的子路由会在router-view中展示-->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import Aside from "../components/Aside";
import Header from "../components/Header";
import User from "./User";

export default {
  name: 'Home',
  components: {Aside,Header,User},
  data(){
    return{
      msg: "hello",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
    }
  },

  methods:{
    collapse(){ //  点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if(this.isCollapse) {//收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
       }else {//展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },

  }
}
</script>

<style>

</style>