<!--
 * @Description: 文件描述
 * @Author: CY小尘s
 * @Date: 2021-06-26 15:10:04
 * @LastEditTime: 2021-06-27 16:24:31
 * @LastEditors: 学习
-->
<template>
    <div class="blogList">
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
                prop="title"
                label="文章名"
                width="120"
                align="center">
            </el-table-column>
            <el-table-column
                prop="content"
                label="文章简介"
                width="200"
                :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者"
                width="120"
                align="center">
            </el-table-column>
            <el-table-column
                prop="posttime"
                label="发表日期"
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
    </div>
</template>

<script>
export default {
    name: 'blogList',
    data() {
      return {
        tableData: [
          {
            id: 1,
            title: '王小虎',
            content: 'nih12312312331221ao',
            author: 'wag',
            posttime: '2016-05-02'
          },
          {
            id: 1,
            title: '王小虎',
            content: 'nih12312312331221ao',
            author: 'wag',
            posttime: '2016-05-02'
          },
          {
            id: 1,
            title: '王小虎',
            content: 'nih12312312331221ao',
            author: 'wag',
            posttime: '2016-05-02'
          },
          {
            id: 1,
            title: '王小虎',
            content: 'nih12312312331221ao',
            author: 'wag',
            posttime: '2016-05-02'
          },
          {
            id: 1,
            title: '王小虎',
            content: 'nih12312312331221ao',
            author: 'wag',
            posttime: '2016-05-02'
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
      // 获取分页初始化数据
      getBlogList(){
        this.$http.get(`blog`).then(res => {
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
      this.getBlogList()
      this.getBlog(this.page)
    }
  }
</script>

<style lang="less" scoped>
.blogList{
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
