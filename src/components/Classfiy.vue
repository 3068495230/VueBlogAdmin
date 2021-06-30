<template>
    <div class="classify">
        <!-- 添加分类 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="classifyName">
              <el-input v-model.trim="ruleForm.classifyName"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="add('ruleForm')">添加分类</el-button>
        <el-tabs type="border-card">
          <el-tab-pane label="分类列表">
            <!-- 分类表格 -->
            <el-table
                :data="tableData"
                border
                style="width: 345px">
                <!-- 分类id -->
                <el-table-column
                    prop="id"
                    label="id"
                    width="45"
                    align="center">
                </el-table-column>
                <!-- 分类名 -->
                <el-table-column
                    prop="name"
                    label="分类名称"
                    width="158"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="70"
                    align="center">
                    <!-- 编辑按钮，使用插槽将对应行的数据信息传过去 -->
                    <template slot-scope="scope">
                      <el-button type="text" size="small"
                        @click.native.prevent="editor(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="70"
                    align="center">
                    <!-- 删除按钮，使用插槽将对应行的数据信息传过去 -->
                    <template slot-scope="scope">
                      <el-button type="text" size="small"
                        @click.native.prevent="del(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'Classfiy',
    data() {
      return {
        // 表单数据
        ruleForm: {
          // 分类名称
          classifyName: ''
        },
        // 渲染数据
        tableData: [],
        // 效验信息
        rules: {
          classifyName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
        // 获取分类信息
        getClassify(){
            this.tableData = [
              {
                "name": "Vue",
                "id": 1
              },
              {
                "name": "ES6",
                "id": 2
              },
              {
                "name": "TS",
                "id": 3
              },
              {
                "name": "Webpack",
                "id": 4
              },
              {
                "name": "PHP",
                "id": 5
              },
              {
                "name": "MySql",
                "id": 6
              },
              {
                "name": "HTML",
                "id": 7
              },
              {
                "name": "CSS",
                "id": 8
              },
              {
                "name": "ｕｎｉ．ａｐｐｓ",
                "id": 9
              },
              {
                "name": "ES",
                "id": 10
              }
            ]
        },
        // 添加分类
        add(formName){
          if(this.ruleForm.classifyName == ''){
            this.$message({
              message: '内容不能为空！',
              type: 'error'
            })
            return false
          }
          // 添加
          this.tableData.push({id: this.tableData.length , name: this.ruleForm.classifyName})
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          // 清空表单内容
          this.$refs[formName].resetFields()
        },
        // 编辑分类
        editor(index){
          this.$prompt('编辑分类', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
            }).then((value) => {
                this.$message({
                  type: 'info',
                  message: 'dev 分支没有后台是无法修改的哦！'
                })
            }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消修改'
                })
            })
        },
        // 删除分类
        del(index){
          this.$confirm('是否删除分类?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
      this.getClassify()
    }
  }
</script>

<style lang="less" scoped>
.classify{
  .demo-ruleForm{
    width: 400px;
    display: inline-block;
    margin: 0px 10px 0px 0px;
  }
  .el-table{
    margin: 0px 0px 0px 20px;
  }
  // 使用深度选择器
  /deep/ td{
    padding: 0px;
    height: 50px;
    line-height: 50px;
  }
}
</style>
