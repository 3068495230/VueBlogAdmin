<!--
 * @Description: 文件描述
 * @Author: CY小尘s
 * @Date: 2021-06-26 15:10:04
 * @LastEditTime: 2021-07-04 11:40:03
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
                width="70"
                align="center">
            </el-table-column>
            <el-table-column
                prop="title"
                label="文章名"
                width="200"
                align="center">
            </el-table-column>
            <el-table-column
                prop="classify"
                label="分类"
                width="100"
                align="center">
            </el-table-column>
            <el-table-column
                prop="content"
                label="文章简介"
                width="200"
                show-overflow-tooltip>
                <!-- 使用插槽显示内容，将 html 标签解析 -->
                <template slot-scope="scope">
                  <div v-html="scope.row.content"></div>
                </template>
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
                    @click.native.prevent="del(scope.row)">删除</el-button>
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
      <el-dialog title="编辑博客" center :append-to-body='true' :lock-scroll="false" :visible.sync="dialogShow" width="800px">
        <editorDialog v-if="dialogShow" :editorContent="editorContent"></editorDialog>
      </el-dialog>

    </div>
</template>

<script>
import editorDialog from './editorDialog.vue'

export default {
    name: 'blogList',
    components: {
      editorDialog,
    },
    data() {
      return {
        // 默认数据
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
        pageSize: 10,
        // 控制弹框是否显示
        dialogShow: false,
        // 传给编辑框的文章内容
        editorContent: ''
      }
    },
    methods: {
      // 获取分页初始化数据
      getPage(){
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
        this.getBlog(page)
      },
      // 获取下一页数据
      next(page){
        this.getBlog(page)
      },
      // 进入编辑文章
      editor(index){
        // 获取当前权限
        let permissions = sessionStorage.getItem('permissions')
        // 判断是否有权限进行操作
        if(permissions != 2){
            this.$message({
                type: 'error',
                message: '无权限操作！'
            })
            return false
        }
        // 显示弹框
        this.dialogShow = true
        // 将博客内容传给编辑框
        this.editorContent = index
      },
      // 删除
      del(index){
        // 获取当前权限
        let permissions = sessionStorage.getItem('permissions')
        // 判断是否有权限进行操作
        if(permissions != 2){
            this.$message({
                type: 'error',
                message: '无权限操作！'
            })
            return false
        }
        this.$confirm('是否删除文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 发送删除请求
          this.$http.delete(`blog/${index.id}`).then(res => {
            // 删除完成后刷新页面
            location.reload()
          }, err => {
            console.log(err)
          })
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
      // 获取博客每页数据
      this.getBlog(this.page)
    }
  }
</script>

<style lang="less" scoped>
.blogList{
  width: 1010px;
  .el-tabs{
    width: 1010px;
    .el-table{
      width: 1010px;
      /deep/ .el-table__body-wrapper{
        width: 1010px;
      }
      // 使用深度选择器
      /deep/ td{
        padding: 0px;
        height: 50px;
        line-height: 50px;
      }
      // 文章简介超出时显示省略号
      /deep/ td p, div{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .el-pagination.is-background{
      margin: 15px 0px 0px 0px;
    }
  }
}
</style>
