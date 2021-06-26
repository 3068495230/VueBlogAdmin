<template>
    <div class="classify">
        <!-- 添加分类 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="classifyName">
              <el-input v-model.trim="ruleForm.classifyName"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="add('ruleForm')">添加分类</el-button>
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
                width="158">
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
                    @click.native.prevent="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        getClassify(){
          this.$http.get('/classify').then(res => {
            const arr = []
            for(let i in res.data){
              arr.push({id: res.data[i].id ,name: res.data[i].name})
            }
            this.tableData = arr
          }, err => {
            console.log(err)
          })
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
          const data = {
            name: this.ruleForm.classifyName
          }
          this.$http.post('classify', data).then(res => {
            // 清空表单内容
            this.$refs[formName].resetFields()
            // 获取最新分类信息
            this.getClassify()
          }, err => {
            console.log(err)
          })
        },
        // 编辑分类
        editor(index){
          this.$prompt('编辑分类', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
            }).then((value) => {
                this.$message({
                  type: 'success',
                  message: '已成功修改'
                })
                // 取得输入的值
                const data = {
                  name: value.value
                }
                // 发送修改请求
                this.$http.put(`classify/${index.id}`, data).then(res => {
                  // 修改完成后获取最新数据
                  this.getClassify()
                }, err => {
                  console.log(err)
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
            // 发送删除请求
            this.$http.delete(`classify/${index.id}`).then(res => {
              // 获取最新分类信息
              this.getClassify()
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
    margin: 10px 0px 0px 20px;
  }
  // 使用深度选择器
  /deep/ td{
    padding: 0px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
