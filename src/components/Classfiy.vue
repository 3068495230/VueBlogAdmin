<template>
    <div class="classify">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="name"
                label="分类名称"
                width="120">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <el-button type="text" size="small">编辑</el-button>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <el-button type="text" size="small">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'Classfiy',
    data() {
      return {
        tableData: [{
          name: '王小虎'
        }, {
          name: '王小虎'
        }, {
          name: '王小虎'
        }, {
          name: '王小虎'
        }]
      }
    },
    methods: {
        getClassify(){
          this.$http.get('/classify').then(res => {
            const arr = []
            arr.push(res.data)
            console.log(arr)
            this.tableData = arr
          }, err => {
            console.log(err)
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

}
</style>
