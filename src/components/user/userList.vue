<template>
    <div class="userList">
      <el-tabs type="border-card">
        <el-tab-pane label="博客列表">
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
                :show-overflow-tooltip='true'>
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
                <el-button type="text" size="small">编辑</el-button>
            </el-table-column>
            <el-table-column
                label="操作"
                width="70"
                align="center">
                <el-button type="text" size="small">删除</el-button>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData.length"
            :page-size="20"
            :hide-on-single-page="hidePage">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'userList',
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: '王小虎',
            content: 'nih12312312331221ao',
            date: '2016-05-02'
          },
          {
            id: 2,
            name: '王小虎',
            content: 'nihao',
            date: '2016-05-02'
          },
          {
            id: 3,
            name: '王小虎',
            content: 'nihao',
            date: '2016-05-02'
          },
          {
            id: 4,
            name: '王小虎',
            content: 'nihao',
            date: '2016-05-02'
          }
        ],
        // 控制隐藏分页
        hidePage: false
      }
    },
    methods: {
      // 获取 blog 列表
      getUserList(){
        this.$http.get('user').then(res => {
          this.tableData = res.data
          console.log(this.tableData.length)
        }, err => {
          console.log(err)
        })
      }
    },
    mounted(){
      this.getUserList()
    }
  }
</script>

<style lang="less" scoped>
.userList{
  .el-tabs{
    .el-table{
      width: 1000px;
      /deep/ .el-table__body-wrapper{
        width: 1000px;
      }
    }
    .el-pagination.is-background{
      margin: 15px 0px 0px 0px;
    }
  }
}
</style>
