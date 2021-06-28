<template>
    <div class="index">
        <!-- 数据信息 -->
        <div class="admin-data">
            <!-- 个人卡片 -->
            <div class="user">
                <div class="top">
                    achens 后台系统
                </div>
                <div class="bottom">
                    <el-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <p>欢迎您，{{ userName }}</p>
                    <p>当前时间：{{ time }}</p>
                </div>
            </div>
            <!-- 后台数据展示 -->
            <div class="msg">
                <!-- 用户数据 -->
                <el-row :gutter="20">
                    <el-col :span="8" style="padding: 0px;" v-for="(item, key) in userState" :key="key">
                        <el-card :body-style="{ padding: '0px' }">
                            <i :class="item.icon"></i>
                            <div>
                                <p class="title">{{ item.title }}</p>
                                <p class="number">{{ item.number }}</p>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 文章数据 -->
                <el-row :gutter="20">
                    <el-col :span="8" style="padding: 0px;" v-for="(item, key) in blogState" :key="key">
                        <el-card :body-style="{ padding: '0px' }">
                            <i :class="item.icon"></i>
                            <div>
                                <p class="title">{{ item.title }}</p>
                                <p class="number">{{ item.number }}</p>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 图表信息 -->
        <div class="echarts-adta" v-if="flag">
            <!-- user 数据 -->
            <div id="user-data"></div>
            <!-- blog 数据 -->
            <div id="blog-data"></div>
            <!-- 分类数据 -->
            <div id="classify-data"></div>
        </div>
        <!-- 待办列表与最新文章 -->
        <div class="todo-new">
            <div class="todoList">
                <el-card>
                    <div slot="header">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="addItem()">添加事项</el-button>
                    </div>
                    <!-- 待办事项列表 -->
                    <ul>
                        <li v-for="(item, key) in TodoListFilter" :key="key">
                            <el-checkbox v-model="item.check">
                                <span>{{ item.name }}</span>
                            </el-checkbox>
                            <el-button type="text" @click="removeItem(key)">删除</el-button>
                        </li>
                    </ul>
                    <!-- 完成状态 -->
                    <p>剩余{{ number }}条未完成</p>
                    <!-- 切换展示状态 -->
                    <el-button-group>
                        <el-button :type="TodoListStatus == 'all'? 'primary' : '' " icon="el-icon-sugar" @click="filter('all')">显示全部</el-button>
                        <el-button :type="TodoListStatus == 'done'? 'primary' : '' " icon="el-icon-dessert" @click="filter('done')">显示已完成</el-button>
                        <el-button :type="TodoListStatus == 'undone'? 'primary' : '' " icon="el-icon-ice-cream" @click="filter('undone')">显示未完成</el-button>
                    </el-button-group>
                </el-card>
            </div>
            <div class="newData">
                <el-card>
                    <div slot="header">
                        <span>最新博客</span>
                    </div>
                    <ul>
                        <li v-for="(item, key) in newBlog" :key="key">
                            <p @click="blog()">{{ item.title }}</p>
                            <time>{{ item.posttime }}</time>
                        </li>
                    </ul>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
// 引入公有函数 time
import date from '../assets/js/time'
// 引入 Echarts 图表
import * as echarts from 'echarts'

export default {
    name: 'Index',
    data(){
        return{
            // 获取当前登录账户名
            userName: sessionStorage.getItem('name'),
            // 获取当前时间
            time: date.newDate(true),
            // 获取后台用户数据
            userState: '',
            // 获取后台文章数据
            blogState: '',
            // 控制图表是否渲染
            flag: false,
            // 获取后台用户图表数据
            userEcharts: '',
            // 获取后台文章图表数据
            blogEcharts: '',
            // 获取后台分类图表数据
            classifyEcharts: '',
            // 待办事项列表数据
            TodoList: [
                {name: '123', check: true},
                {name: '456', check: true},
                {name: '789', check: false},
                {name: '123', check: true},
                {name: '456', check: false},
                {name: '123', check: true},
                {name: '789', check: false},
                {name: '123', check: false},
                {name: '456', check: false},
                {name: '789', check: true}
            ],
            // 待办事项筛选结果
            TodoListFilter: '',
            // 待办事项展示状态
            TodoListStatus: 'all',
            // 最新文章数据
            newBlog: ''
        }
    },
    computed: {
        number: function(){
            return this.TodoList.filter((value) => value.check === false).length
        }
    },
    methods:{
        // 更新当前时间
        setTime(){
            setInterval(() => {
                this.time = date.newDate(true)
            }, 1000);
        },
        // 获取后台数据
        getState(){
            this.$http.get('/state').then(res => {
                this.userState = res.data.user
                this.blogState = res.data.blog
            }, err => {
                console.log(err)
            })
        },
        // 获取图表数据
        getEcharts(){
            this.$http.get('/echarts').then(res => {
                this.userEcharts = res.data.userData
                this.blogEcharts = res.data.blogData
                this.classifyEcharts = res.data.classifyData
                this.flag = true
            }, err => {
                console.log(err)
            })
        },
        // user 图表数据
        userData(data){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('user-data'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '用户增长'
                },
                xAxis: {
                    type: 'category',
                    data: ["22", '23', '24', '25', '26']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: data,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: 'rgb(64, 158, 255)'
                    },
                }]
            })
        },
        // blog 图表数据
        blogData(data){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('blog-data'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '博客增长'
                },
                xAxis: {
                    type: 'category',
                    data: ["22", '23', '24', '25', '26']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: data,
                    type: 'bar',
                    itemStyle: {
                        color: 'rgb(64, 158, 255)'
                    },
                }]
            })
        },
        // classify 图表数据
        classifyData(data){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('classify-data'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '文章分类占比',
                    subtext: '分类比例',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '分类占比',
                        type: 'pie',
                        radius: '65%',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },
        // 添加 TodoList 项
        addItem(){
            this.$prompt('请输入内容', '提示', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
            }).then((value) => {
                if(value.value == null){
                    return false
                }
                this.$message({
                    type: 'success',
                    message: '已添加代办事项'
                })
                // 添加待办项
                this.TodoList.push({name: value.value, check: false})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消添加'
                })
            })
        },
        // 删除 TodoList 项
        removeItem(item){
            this.TodoList.splice(item, 1)
        },
        // 对展示项进行筛选
        filter(screening){
            // 更改展示按钮
            this.TodoListStatus = screening
            if(screening == 'done'){
                this.TodoListFilter = this.TodoList.filter(value => value.check == true)
                return
            }else if(screening == 'undone'){
                this.TodoListFilter = this.TodoList.filter(value => value.check == false)
                return
            }
            // 如果不是 done、undone，亦或者传进来了其他参数，都直接输出全部
            this.TodoListFilter = this.TodoList.filter(value => value)
        },
        // 获取最新文章
        getNewBlog(){
            this.$http.get('blog?_sort=posttime&_order=desc&_start=1&_limit=3').then(res => {
                this.newBlog = res.data
            }, err => {
                console.log(err)
            })
        },
        // 点击观看文章
        blog(){
            this.$message({
                type: 'success',
                message: '还木有连接前端页面哦~无法跳转到前端进行文章查看~'
            })
        }
    },
    created(){
        // 定时刷新,获取最新时间
        this.setTime()
        // 获取后台数据
        this.getState()
        this.getEcharts()
    },
    mounted(){
        // 进行延迟加载 Echarts 图表
        setTimeout(() => {
            if(this.flag == true){
                // ECharts 图表展示
                this.userData(this.userEcharts)
                this.blogData(this.blogEcharts)
                // 声明一个数组存放获取到的文章分类信息
                const classifyData = []
                // 使用 for in 遍历出数据
                for(let name in this.classifyEcharts){
                    let value = this.classifyEcharts[name]
                    classifyData.push({name, value})
                }
                this.classifyData(classifyData)
            }else{
                console.log('还未获取到数据', this.flag)
            }
        }, 500)
        this.getNewBlog()
        //
        this.TodoListFilter = this.TodoList
        console.log(this.TodoListFilter)
    }
}
</script>

<style lang="less" scoped>
.index{
    // 数据信息
    .admin-data{
        width: 100%;
        height: auto;
        display: flex;
        // 用户卡片
        .user{
            width: 240px;
            height: 200px;
            margin-right: 18px;
            // 上半部分样式
            .top{
                width: 240px;
                height: 80px;
                background-color: rgb(64, 158, 255);
                color: white;
                line-height: 60px;
                text-align: center;
            }
            // 下半部分样式
            .bottom{
                width: 240px;
                height: 120px;
                text-align: center;
                box-shadow: 0px 0px 5px gray;
                // 头像样式
                .el-avatar.el-avatar--circle{
                    position: relative;
                    top: -35px;
                    img{
                        border-radius: 50%;
                    }
                }
                // 文本样式
                p{
                    position: relative;
                    top: -25px;
                    font-size: 13px;
                    margin-bottom: 7px;
                }
            }
        }
        // 数据卡片
        .msg{
            .el-row{
                width: 100%;
                height: 95px;
                margin: 0px;
                margin-bottom: 10px;
                display: flex;
                .el-col{
                    width: 100%;
                    height: 95px;
                    box-shadow: 0px 0px 5px gray;
                    float: left;
                    margin: 0px 10px 0px 0px;
                    .el-card.is-always-shadow{
                        width: 100%;
                        height: 95px;
                        font-size: 23px;
                        i{
                            display: block;
                            width: 78px;
                            height: 95px;
                            background-color: rgb(64, 158, 255);
                            float: left;
                            text-align: center;
                            line-height: 95px;
                            color: white;
                        }
                        div{
                            width: 215px;
                            height: 90px;
                            text-align: left;
                            padding: 10px 0px 0px 65px;
                            margin: 0px 0px 0px 30px;
                            p.title{
                                font-size: 13px;
                                color: gray;
                            }
                            p.number{
                                font-size: 37px;
                                font-weight: 700;
                                color: rgb(64, 158, 255);
                            }
                        }
                    }
                }
            }
        }
    }
    // 图表信息
    .echarts-adta{
        width: 1200px;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 10px 0px 0px 0px;
        #user-data{
            width: 350px;
            height: 350px;
        }
        #blog-data{
            width: 350px;
            height: 350px;
        }
        #classify-data{
            width: 350px;
            height: 300px;

        }
    }
    // 待办事项与最新消息
    .todo-new{
        width: 1200px;
        // 待办事项
        .todoList{
            width: 590px;
            height: auto;
            float: left;
            margin: 0px 10px 0px 0px;
            .el-card.is-always-shadow{
                .el-card__body{
                    ul{
                        li{
                            border-bottom: 1px solid gray;
                            .el-checkbox{
                                margin: 0px 10px 2px 0px;
                            }
                        }
                    }
                    p{
                        font-size: 13px;
                        float: left;
                        line-height: 60px;
                    }
                    .el-button-group{
                        margin: 10px 0px 0px 10px;
                    }
                }
            }
        }
        // 最新消息
        .newData{
            width: 590px;
            height: auto;
            float: left;
            .el-card.is-always-shadow{
                .el-card__body{
                    ul{
                        li{
                            border-bottom: 1px solid gray;
                            padding: 0px 0px 10px 0px;
                            p{
                                margin: 0px 0px 2px 0px;
                                cursor: pointer;
                                color: rgb(64, 158, 255);
                            }
                            p:hover{
                                opacity: 0.7;
                            }
                            time{
                                font-size: 13px;
                                color: gray;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>