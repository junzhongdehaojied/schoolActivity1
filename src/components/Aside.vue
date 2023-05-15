<template>
    <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
             background-color="rgb(48,65,86)"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse-transition="false"
             :collapse="isCollapse"
             router
    >
        <div style="height: 60px;line-height: 60px;text-align: center">
            <dl v-if="user.userLevel == 3">
                <img src="../assets/logo.png" alt="" style="width: 20px;position: relative;top: 5px;margin-right:5px ">
                <b style="color: white" v-show="logoTextShow">校园赛事活动管理系统</b>
            </dl>
            <dl v-else-if="user.userLevel == 1">
                <img src="../assets/logo.png" alt="" style="width: 20px;position: relative;top: 5px;margin-right:5px ">
                <b style="color: white" v-show="logoTextShow">用户界面</b>
            </dl>
        </div>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户界面</span>
            </template>

        </el-submenu>
        <div v-if="user.userLevel == 1">
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">主办方管理</span>
                </template>
                <el-menu-item index="/" >
                    <template slot="title">
                        <i class="el-icon-receiving"></i>
                        <span slot="title">管理</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/game" >
                    <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">活动资讯信息管理</span>
                    </template>
                </el-menu-item>
            </el-submenu>
        </div>
        <div v-if="user.userLevel == 3">
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">管理员管理界面</span>
                </template>
            </el-submenu>
        </div>
    </el-menu>
</template>

<script>
    export default {
        name: "Aside",
        props: {
            isCollapse: Boolean,
            logoTextShow: Boolean,

        },
        data(){
            return{
                user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :{}
            }
        },
    }
</script>

<style scoped>

</style>