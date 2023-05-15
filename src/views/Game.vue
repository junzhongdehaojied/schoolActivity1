<template>
    <el-container style="min-height: 200vh">
        <el-header>
            <!--搜索框-->
            <div style="margin: 10px 0">
                <el-input style="width: 200px" placeholder="请输入比赛ID" suffix-icon="el-icon-user" v-model="userName"></el-input>
                <el-input style="width: 200px" placeholder="请输入比赛名称" suffix-icon="el-icon-timer" class="ml-5" v-model="userAge"></el-input>
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
        </el-header>
        <el-main>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="date"
                        label="比赛ID"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="比赛"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Game",
        data(){
            return{
                user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :{},
                tableData: [{
                    date: '01',
                    name: '乒乓球',
                }, {
                    date: '02',
                    name: '羽毛球',
                }, ]
            }
        },
        methods:{
            handleClick(row) {
                console.log(row);
            }
        },
    }
</script>

<style scoped>

</style>