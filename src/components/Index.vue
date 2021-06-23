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
            <!-- 用户数据 -->
            <div class="msg">
                <el-row :gutter="20">
                    <el-col :span="8" style="padding: 0px;">
                        <el-card :body-style="{ padding: '0px' }">
                            <i class="el-icon-user"></i>
                            <div>
                                <p>用户总数</p>
                                <p class="msg">{{  }}</p>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 文章数据 -->
                <el-row :gutter="20">
                    <el-col :span="8" style="padding: 0px;">
                        <el-card :body-style="{ padding: '0px' }">
                            <i class="el-icon-tickets"></i>
                            <div>
                                <p>文章总数</p>
                                <p class="msg">{{  }}</p>
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
            userName: sessionStorage.getItem('username'),
            time: date.newDate(true),
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

        // 获取图表数据
        
        // user 图表数据
        userData(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('user-data'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'user 增长'
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
                    text: 'blog 增长'
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
                            {value: 1048, name: '搜索引擎'},
                            {value: 735, name: '直接访问'},
                            {value: 580, name: '邮件营销'},
                            {value: 484, name: '联盟广告'},
                            {value: 300, name: '视频广告'}
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
                        width: 260px;
                        height: 95px;
                        i{
                            display: block;
                            width: 20%;
                            height: 95px;
                            background-color: rgb(64, 158, 255);
                            float: left;
                            text-align: center;
                            line-height: 95px;
                            color: white;
                        }
                        div{
                            width: 80%;
                            height: 90px;
                            text-align: left;
                            padding: 10px 0px 0px 65px;
                            p{
                                font-size: 19px;
                                color: black;
                            }
                            p.msg{
                                font-size: 21px;
                                font-weight: 700;
                                color: rgb(64, 158, 255);
                                margin: 10px 0px 0px 0px;
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