<!--用户注册-->
<template>
    <div class="wrapper">
        <div style="margin: 100px auto;background-color: #fff;width: 350px;height: 470px;padding: 20px;border-radius: 10px">
            <div style="margin: 20px 0;text-align: center;font-size: 24px"><b>注 册</b></div>
            <el-form :model="user" :rules="rules" ref="userForm">
                <el-form-item prop="userName">
                    <el-input placeholder="请输入账号" size="medium" style="margin: 5px 0" prefix-icon="el-icon-user" v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input placeholder="请输入密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.userPassword"></el-input>
                </el-form-item>
                <el-form-item prop="comfirmPassword">
                    <el-input placeholder="请确认密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.comfirmPassword"></el-input>
                </el-form-item>
                <el-form-item prop="userPhone">
                    <el-input placeholder="请输入电话" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.userPhone"></el-input>
                </el-form-item>
                <el-form-item prop="userAge">
                    <el-input placeholder="请输入年龄" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.userAge"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0;text-align: right">
                    <el-button type="primary" size="small" autocomplete="off" @click="login">确定</el-button>
                    <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/login')">返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                user:{
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    userPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
                    ],comfirmPassword: [
                        {required: true, message: '请确认密码', trigger: 'blur'},
                        {min: 4, max: 20, message: "和密码一致", trigger: 'blur'}
                    ],userPhone: [
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {min: 11, max: 11, message: '11位的电话号码', trigger: 'blur'}
                    ],userAge: [
                        {required: true, message: '请输入年龄', trigger: 'blur'},
                        {min: 1, max: 3, message: '在1~100岁之间', trigger: 'blur'}
                    ],
                },
            }
        },
        methods:{
            login(){
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        if(this.user.userPassword !== this.user.comfirmPassword){
                            this.$message.success("两次输入的密码不一致")
                            return false
                        }
                        this.request.post("/user/register",this.user).then(res => {
                            if(res.code === '200'){
                                this.$message.success("注册成功")
                            }else{
                                this.$message.error(res.msg)
                            }
                        })
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .wrapper{
        height: 100vh;
        background-image: linear-gradient(to bottom right,#FC466B,#3F5EFB);
        overflow: hidden;
    }
</style>