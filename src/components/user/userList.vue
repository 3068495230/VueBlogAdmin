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
        // 页数为 1 时是否隐藏分页
        hidePage: false,
        // 总条目数
        total: 96,
        // 总页数
        totalPage: 100,
        // 当前页数
        page: 1,
        // 每页显示数
        pageSize: 10
      }
    },
    methods: {
      // 获取 用户 列表
      getUserList(){
        this.$http.get('user').then(res => {
          // 后台 blog 总条目数
          this.total = res.data.length
          // 后台 blog 总页数
          this.totalPage = Math.ceil(res.data.length / this.pageSize)
        }, err => {
          console.log(err)
        })
      },
      // 请求每页数据
      getBlog(page){
        this.$http.get(`/blog?_page=${page}&_limit=${this.pageSize}`).then(res => {
          // 获取到 blog 列表
          this.tableData = res.data
        }, err => {
          console.log(err)
        })
      },
      // 页码发生变化时
      handleCurrentChange(page){
        this.getBlog(page)
      },
      // 获取上一页数据
      prev(page){
        console.log('上一页', page, page - 1)
        this.getBlog(page)
      },
      // 获取下一页数据
      next(page){
        console.log('下一页', page, page + 1)
        this.getBlog(page)
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
