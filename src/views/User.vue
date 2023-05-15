<!--管理员系统里的用户栏-->
<template>
    <div>
        <!--搜索框-->
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入用户" suffix-icon="el-icon-user" v-model="userName"></el-input>
            <el-input style="width: 200px" placeholder="请输入用户年龄" suffix-icon="el-icon-timer" class="ml-5" v-model="userAge"></el-input>
            <el-input style="width: 200px" placeholder="请输入用户等级" suffix-icon="el-icon-notebook-2" class="ml-5" v-model="userLevel"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定批量删除这些数据吗？"
                    @confirm="delBatch"
            >
                <el-button type="danger" slot = "reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
            <el-upload action="http://localhost:9090/user/import" :show-file-list="false"  :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
            </el-upload>
            <el-button type="primary" class="ml-5" @click="exp">导出 <i class="el-icon-top"></i></el-button>
        </div>

        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="userId" label="用户ID" width="140">
            </el-table-column>
            <el-table-column prop="userName" label="用户姓名" width="120">
            </el-table-column>
            <el-table-column prop="userPhone" label="用户手机">
            </el-table-column>
            <el-table-column prop="userAge" label="用户年龄">
            </el-table-column>
            <el-table-column prop="userLevel" label="用户等级">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="warning" @click="hadnleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.userId)"
                    >
                        <el-button type="danger" slot = "reference">删除 <i class="el-icon-remove-outline"></i> </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "User",
    data(){
        return{
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            userName: "",
            userId: "",
            userAge: "",
            userPhone: "",
            userLevel: "",
            form: {},
            dialogFormVisible: false,
            multipleSelection: [],
            headerBg: 'headerBg'
        }
    },
    created() {
        //  请求分页查询数据
        this.load()
    },
    methods:{
        load(){
            this.request.get("/user/page",{
                params:{
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    userName: this.userName,
                    userAge: this.userAge,
                    userLevel: this.userLevel
                }
            }).then(res => {

                this.tableData =  res.data.records
                this.total = res.data.total
            })
        },
        save(){
            this.request.post("/user",this.form).then(res => {
                if(res.data){
                    this.$message.success("保存成功")
                    this.dialogFormVisible = false
                    this.load()
                }else {
                    this.$message.error("保存失败")
                }
            })
        },
        reset(){
            this.userName = ""
            this.userAge = ""
            this.userLevel = ""
            this.load()
        },
        hadnleEdit(row){
            this.form = Object.assign({},row)
            this.dialogFormVisible = true
        },
        del(userId){
            this.request.delete("/user/" + userId).then(res => {
                if(res.data){
                    this.$message.success("删除成功")
                    this.load()
                }else {
                    this.$message.error("删除失败")
                }
            })
        },
        handleSelectionChange(val){
            console.log(val)
            this.multipleSelection = val

        },
        delBatch(){
            let userIds = this.multipleSelection.map(v => v.userId) // 把对象保存纯ID数组
            this.request.post("/user/del/batch",userIds).then(res => {
                if(res.data){
                    this.$message.success("批量删除成功")
                    this.load()
                }else {
                    this.$message.error("批量删除失败")
                }
            })
        },
        handleAdd(){
            this.dialogFormVisible = true
            this.form = {}
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize
            this.load()
        },
        handleCurrentChange(pageNum){
            this.pageNum = pageNum
            this.load()
        },
        exp(){
            window.open("http://localhost:9090/user/export")
            this.$message.success("导出成功")
        },
        handleExcelImportSuccess(){
            this.$message.success("导入成功")
            this.load()
        },
    }
}
</script>

<style scoped>
    .headerBg{
        background-color: #ccc!important;
    }
</style>