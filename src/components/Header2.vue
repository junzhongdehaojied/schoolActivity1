<!--主界面头部-->
<template>
    <div style="line-height: 60px;display: flex">
        <div style="flex :1;margin-top: 10px">
            <router-link to="/main" style="padding-top: 40px" onclick="this.mainout">
                首页
            </router-link>
        </div>
        <el-dropdown type="flex" justify="end">
            <div style="width: 150px; cursor: pointer;right: 50px">
                <h2 v-if="user.userName == null">
                    <router-link to="/login" >
                        登录
                    </router-link>
                </h2>
                <h3 v-else-if="user.userName != null">
                    <el-dropdown style="display: inline-block">
                        <div style="display: inline-block">
                            <img :src="user.userPicture" alt="" referrerpolicy="no-referrer"
                                 style="width: 30px;border-radius: 50%;position: relative;top:10px;right: 5px">
                            <span>{{user.userName}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center">
                            <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                                <router-link to="/person">个人信息</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                                <span style="text-decoration: none " @click="logout">退出</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </h3>
            </div>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "Header2",
        data(){
            return{
                user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):{},
            }
        },
        methods:{
            logout(){
                localStorage.removeItem("user")
                this.$message.success("退出成功")
            },
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    .router-link-active {
        text-decoration: none;
    }
</style>