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
            // 后台用户信息
            this.userState = [
                {
                    "title": "用户总数",
                    "number": 119,
                    "icon": "el-icon-cherry"
                },
                {
                    "title": "今日新增",
                    "number": 76,
                    "icon": "el-icon-apple"
                },
                {
                    "title": "昨日新增",
                    "number": 43,
                    "icon": "el-icon-grape"
                }
            ]
            // 后台博客信息
            this.blogState = [
                {
                    "title": "文章总数",
                    "number": 219,
                    "icon": "el-icon-milk-tea"
                },
                {
                    "title": "今日新增",
                    "number": 23,
                    "icon": "el-icon-cold-drink"
                },
                {
                    "title": "昨日新增",
                    "number": 12,
                    "icon": "el-icon-coffee"
                }
            ]
        },
        // 获取图表数据
        getEcharts(){
            // 获取用户图标数据
            this.userEcharts = [
                454,
                564,
                656,
                745,
                851
            ]
            // 获取博客图标数据
            this.blogEcharts = [
                357,
                791,
                489,
                143,
                645
            ]
            // 获取分类图标数据
            this.classifyEcharts = {
                "jQuery": 12,
                "Html+Css": 32,
                "javaScript": 56,
                "Es": 89
            }
            // 表明数据已经都获取完毕，可以开始渲染数据了
            this.flag = true
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
        // 获取最新博客
        getNewBlog(){
            this.newBlog = [
                {
                "title": "标题被修改",
                "classify": "ES6",
                "content": "<p>测试修改标题与分类</p>",
                "author": "achens",
                "posttime": "2021-06-24",
                "id": 7
                },
                {
                "title": "大家好",
                "classify": "我的世界",
                "content": "<p>132123132</p>",
                "author": "admin",
                "posttime": "2021-06-26",
                "id": 8
                },
                {
                "id": 0,
                "title": "出现了BUG：BUG 已修复",
                "posttime": "2021-01-01",
                "content": "<p>默认内容并不会更新，而是会和之前一样：已经会自动更新了</p>",
                "classify": "Vue",
                "author": "单区再因。"
                },
                {
                "id": 1,
                "title": "目个运教易。",
                "posttime": "2021-07-28",
                "content": "张次花常格国育内反候传点力响现再节。明家于社之思老及飞面好具增性日发。第制总话近就作二设化己真体值者。说到增叫料际常布这划价器们生究些。然矿系阶包什业之整计层律带史飞联连。为斗会叫品实会后拉长原能不物革。际状花报当低开级中根区办每。连就山程手年联程好使水验结因片。群记技厂周结织其历型照象的层己发。其不特相果分议断取每战选指她放。身林适长万府比热动长角群多所群。可十程当水压江别场准矿条从况图确林。提与音法专大明放我品手子才。进打进事结叫力五众究规明强。什级精原个何条区者斯近年七县何圆。用且由车己周细性书由中日总间断或指。手斗流口备由领京南群该写观无方。响需包铁状参要自属质群题体教级。作更物做头事引计精求改给周。部文委并接值选容主得满出必度年用导。具处须任着类计拉眼合议片证果机军场真。阶而状很两自身写反具车只只都府始养。阶海统世响整科主确群派场。提构走切共五门标会建半总几权放。习本你识一风土包商重林消。最后至标十我统太证级去应新只命。非地重要广引更数明度动们白权展。持立示见查解响品没风同片劳。头好立引个如书派细群米确毛。存身通取律型住好而得流些千带先心。白已今水物数段加直里石权。开米经任次些布方火中只技别无军天单都。名们级海克矿装又度以斯别毛热。当民工约间中向气断王解争。反持片酸至党山指打平率前层又收。周史名立书标细里党题克而六。得千南多科铁难议在切社府向至面。元三十南计自线半物厂几回及几压。何农团类置进群当作细土接规人。为把六造水们基里从体验江张根较。易却光受前产八党院领矿气山。亲达断度统府备约王许革组引则把色。般他样研类报越情公易产二龙后都心。且王内十权便心矿机流照传光今。传段六先将名般道通西龙越极。写走根一场持手她品命质院四同证越。影出会保效个金列过活速厂然。志层说达出白置过五华设起。认满新林于县验角却断离今位。等明准四响时比时证得细共层。近今进这取导住领院料九复根义权图。约里风声决社车装已一风感边。王住更除律难式音放战积热。与美每年片几想研验小月照北直义现照。流儿山儿存商头具派了上手体民干。积等设地子开克对并解应人叫改长。你世究分看消斗第利把做海万回领带果。受务许少设八红维大世便过。业个阶高万度之拉得取最况其二。通别流美条对片整九与名又。保包好联极且今京备门确品。以对得物成上于报地采院热听米三。路着思光标给下平始存特命产。外素实先律员把在因生应低育力。率清开青根命及难建个五明。米关展县事当者政义反表会品看样保。儿去石书马除南被放此十大了。以而解铁美知技提了前感多品情加细离。走接集民很号联史书往节加一着。两战关热每效利且结是般眼改写。里张放只性想风出号它养多义北收。始那学术记之则事如出织分出。采基验入发状火热据八南再天界九验连活。红说应起况专事西千开商调。称向压关革府红风制图更专论矿其合干色。最共标后养三候很信构价易出育。色活现引题响北连几深强复。了计清日花但济通至采认响只需低直手。位出光间队林党低来例般布感圆。置之风才电已决府圆养行照。可反热次火指华门放张类原果持发。近素接内深什通用要子公百调马四全。不状改光与被片器步得十有。么目在关般战生命层两料响节际参采话段。见并从身资日家机除什生他验已石放名。年电气线器北产实建话观上开机。各革合心入在报高五红行克江。记济王较民看出两只周理该。养年来究关化说青时低层圆还手后家。儿亲们矿风她路受技马酸压况系于。育给为定布样非三今情当个题员。包最门少面局军状全从说常满。组门把速规可路精好收光决。向才技海金这带建提按算布音特少。花好回作界两志可量连和路话己再。响省先方它现观山政何且却并深里机光。美身知持原时住件利第强等千或被。",
                "classify": "jQUery",
                "author": "美着此身维。"
                },
                {
                "title": "hello world",
                "classify": "ES",
                "content": "<p>123123131</p>",
                "author": "achens",
                "posttime": "2021-06-24",
                "id": 5
                },
                {
                "title": "你好",
                "classify": "Html+Css",
                "content": "<p>12312312</p>",
                "author": "achens",
                "posttime": "2021-06-24",
                "id": 6
                },
            ]
        },
        // 点击观看博客
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
        // 延迟加载 Echarts 图表
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
        // 获取最新博客
        this.getNewBlog()
        // 将原待办事项赋予过滤待办事项过滤器
        this.TodoListFilter = this.TodoList
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