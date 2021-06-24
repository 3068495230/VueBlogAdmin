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
        <div class="echarts-adta">
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
                        <span>Todo List</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加事项</el-button>
                    </div>
                    <div>
                        <el-checkbox v-model="checked">123</el-checkbox>
                        <span>删除</span>
                    </div>
                    <div>
                        <el-button>显示全部</el-button>
                        <el-button>显示已完成</el-button>
                        <el-button>显示未完成</el-button>
                    </div>
                </el-card>
            </div>
            <div class="newData">
                <el-card>
                    <div slot="header">
                        <span>最新消息</span>
                    </div>
                    <div>
                        <p>123</p>
                        <time>2021/6/23</time>
                    </div>
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
            // 获取后台用户图表数据
            userEcharts: '',
            // 获取后台文章图表数据
            blogEcharts: '',
            // 获取后台分类图表数据
            classifyEcharts: '',
            // 多选框数据
            checked: true
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
                console.log(this.userEcharts)
                this.blogEcharts = res.data.blogData
                this.classifyEcharts = res.data.classifyData
            }, err => {
                console.log(err)
            })
        },
        // user 图表数据
        userData(){
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
                    data: [12, 33, 4, 25, 55],
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: 'rgb(64, 158, 255)'
                    },
                }]
            })
        },
        // blog 图表数据
        blogData(){
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
                    data: [120, 200, 150, 80, 70],
                    type: 'bar',
                    itemStyle: {
                        color: 'rgb(64, 158, 255)'
                    },
                }]
            })
        },
        // classify 图表数据
        classifyData(){
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
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: 1048, name: 'jQUery'},
                            {value: 735, name: 'JavaScript'},
                            {value: 580, name: 'Vue'},
                            {value: 484, name: 'PHP+MySql'},
                            {value: 300, name: 'HTML+CSS'}
                        ],
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
    },
    mounted(){
        // 定时刷新数据
        this.setTime()
        // 获取后台数据
        this.getState()
        this.getEcharts()
        // ECharts 图表展示
        this.userData()
        this.blogData()
        this.classifyData()
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
        // justify-content: left;
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
            width: 100%;
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
                            width: 25%;
                            height: 95px;
                            background-color: rgb(64, 158, 255);
                            float: left;
                            text-align: center;
                            line-height: 95px;
                            color: white;
                        }
                        div{
                            width: 75%;
                            height: 90px;
                            text-align: left;
                            padding: 10px 0px 0px 65px;
                            margin: 0px 0px 0px 30px;
                            p.title{
                                font-size: 17px;
                                color: gray;
                            }
                            p.number{
                                font-size: 47px;
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
        width: 100%;
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
        display: flex;
        justify-content: space-around;
        // 待办事项
        .todoList{
            width: 49%;
        }
        // 最新消息
        .newData{
            width: 49%;
        }
    }
}
</style>