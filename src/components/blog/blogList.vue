<template>
    <div class="blogList">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="120">
            </el-table-column>
            <el-table-column
                fixed
                prop="date"
                label="注册日期"
                width="150">
            </el-table-column>
            <el-table-column
                label="操作"
                width="70">
                <el-button type="text" size="small">编辑</el-button>
            </el-table-column>
            <el-table-column
                label="操作"
                width="70">
                <el-button type="text" size="small">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'blogList',
    data() {
      return {
        tableData: [{
          name: '王小虎',
          sex: '男',
          date: '2016-05-02'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          sex: '男'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          sex: '男'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          sex: '男'
        }]
      }
    },
    methods: {
        
    },
  }
</script>

<style lang="less" scoped>

</style>
