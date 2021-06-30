<template>
    <div class="userList">
      <el-tabs type="border-card">
        <el-tab-pane label="用户列表">
          <el-table
            :data="tableData"
            border
            >
            <el-table-column
                prop="id"
                label="id"
                width="50"
                align="center">
            </el-table-column>
            <el-table-column
                prop="name"
                label="用户名"
                width="120"
                align="center">
            </el-table-column>
            <el-table-column
                prop="account"
                label="账号"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="password"
                label="密码"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="250"
                align="center">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="permissions"
                label="权限"
                width="100"
                align="center">
                <!-- 使用插槽显示权限系进行 -->
                <template slot-scope="scope">
                  <p>{{ scope.row.permissions == 0 ? '超级管理员' : scope.row.permissions == 1 ? '管理员'  : '普通用户'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="注册日期"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                width="70"
                align="center">
                <template slot-scope="scope">
                  <el-button type="text"
                    @click.native.prevent="editor(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="70"
                align="center">
                <template slot-scope="scope">
                  <el-button type="text"
                    @click.native.prevent="del(scope)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :page-size="pageSize"
            :hide-on-single-page="hidePage"
            :current-page="page"
            :total="total"
            :page-count="totalPage"
            @current-change="handleCurrentChange"
            @prev-click="prev(page)"
            @next-click="next(page)">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>

      <!-- 弹框 -->
      <el-dialog title="编辑用户信息" center :append-to-body='true' :lock-scroll="false" :visible.sync="dialogShow" width="800px">
        <editorDialog v-if="dialogShow" :editorContent="editorContent"></editorDialog>
      </el-dialog>

    </div>
</template>

<script>
// 引入编辑用户信息框
import editorDialog from './editorDialog.vue'

export default {
    name: 'userList',
    components: {
      editorDialog
    },
    data() {
      return {
        // 表格默认内容
        tableData: '',
        // 页数为 1 时是否隐藏分页
        hidePage: false,
        // 总条目数
        total: 96,
        // 总页数
        totalPage: 100,
        // 当前页数
        page: 1,
        // 每页显示数
        pageSize: 10,
        // 控制弹框是否显示
        dialogShow: false,
        // 传给编辑框的用户信息
        editorContent: ''
      }
    },
    methods: {
      // 获取分页初始化数据
      getPage(){
        // 后台 用户 总条目数
        this.total = 3
        // 后台 用户 总页数
        this.totalPage = Math.ceil(3 / 10)
      },
      // 请求每页数据
      getUser(page){
        // 获取到用户列表
        this.tableData =  [
          {
            "id": 0,
            "name": "admin",
            "account": "admin",
            "password": "123456",
            "email": "3068495230@qq.com",
            "phone": "13873478699",
            "date": "2021-6-28",
            "permissions": 0
          },
          {
            "id": 1,
            "name": "achens",
            "account": "achens",
            "email": "266858594@qq.com",
            "phone": "15572986968",
            "password": 3068495230,
            "date": "2021-6-28",
            "permissions": 1
          },
          {
            "id": 2,
            "name": "一切无所谓",
            "account": "1115894132",
            "password": "123456",
            "email": "115892630@qq.com",
            "phone": "18873427078",
            "date": "2021-6-28",
            "permissions": 2
          }
        ]
      },
      // 页码发生变化时
      handleCurrentChange(page){
        this.getUser(page)
      },
      // 获取上一页数据
      prev(page){
        this.getUser(page)
      },
      // 获取下一页数据
      next(page){
        this.getUser(page)
      },
      // 进入编辑用户
      editor(index){
        // 显示弹框
        this.dialogShow = true
        // 将用户信息传给编辑框
        this.editorContent = index
      },
      // 删除
      del(index){
        this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 删除
          this.tableData.splice(index.$index, 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    mounted(){
      // 获取分页初始信息
      this.getPage()
      // 获取用户每页数据
      this.getUser(this.page)
    }
  }
</script>

<style lang="less" scoped>
.userList{
  width: 1290px;
  .el-tabs{
    width: 1290px;
    .el-table{
      width: 1290px;
      /deep/ .el-table__body-wrapper{
        width: 1290px;
      }
      // 使用深度选择器
      /deep/ td{
        padding: 0px;
        height: 50px;
        line-height: 50px;
      }
    }
    .el-pagination.is-background{
      margin: 15px 0px 0px 0px;
    }
  }
}
</style>
