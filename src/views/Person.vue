<!--用户更改个人信息-->
<template>
    <el-card style="width: 500px;">
        <el-form label-width="80px" size = "small">
            <el-form-item label="用户ID">
                <el-input v-model="form.userId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户手机">
                <el-input v-model="form.userPhone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户年龄">
                <el-input v-model="form.userAge" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户等级">
                <el-input v-model="form.userLevel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "Person",
        data(){
            return{
                form:{},
                user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :{}
            }
        },
        created() {
            this.request.get("/user/userName/" + this.user.userName).then(res => {
                if(res.code === '200'){
                    this.form = res.data
                }
            })
        },
        methods:{
            save(){
                this.request.post("/user",this.form).then(res => {
                    if(res.data){
                        this.$message.success("保存成功")
                    }else {
                        this.$message.error("保存失败")
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>