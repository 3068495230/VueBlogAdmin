<!--
 * @Description: 文件描述
 * @Author: CY小尘s
 * @Date: 2021-06-26 15:10:04
 * @LastEditTime: 2021-06-30 16:51:50
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
                    @click.native.prevent="del(scope)">删除</el-button>
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
        tableData: '',
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
        // 后台 blog 总条目数
        this.total = this.tableData.length
        // 后台 blog 总页数
        this.totalPage = Math.ceil(this.tableData.length / this.pageSize)
      },
      // 请求每页数据
      getBlog(page){
        // 获取到 blog 列表
        this.tableData = [
          {
            "title": "标题被修改",
            "classify": "ES6",
            "content": "<p>测试修改标题与分类</p>",
            "author": "achens",
            "posttime": "2021-06-24",
            "id": 1
          },
          {
            "title": "大家好",
            "classify": "我的世界",
            "content": "<p>132123132</p>",
            "author": "admin",
            "posttime": "2021-06-26",
            "id": 2
          },
          {
            "id": 3,
            "title": "出现了BUG：BUG 已修复",
            "posttime": "2021-01-01",
            "content": "<p>默认内容并不会更新，而是会和之前一样：已经会自动更新了</p>",
            "classify": "Vue",
            "author": "单区再因。"
          },
          {
            "id": 4,
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
          {
            "title": "我好",
            "classify": "TS",
            "content": "<p>123123123123</p>",
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
            "id": 9,
            "title": "层龙音报反。",
            "posttime": "2021-01-01",
            "content": "少花不定府无儿群证件划斯调片民反话。越张期主品把为等认温究进上目军立工部。什观九商联劳主周天素它科江张各特知。理属技认可她学色向条军干样拉表。年样连道业政走式件场至六没由。起至门五江在价等面价叫流越合公看。色没始流子场系毛统直门由干局。着加选选反思种布交军值非非党现领。四许为开导量条院照使北之会记效张那。须标商开办斯次政上求理儿公情须节断张。可备马例各角定着查指决除周变将。正基空任单难今场表文量术。天题片我度车改外在快并层此京电国。热价机治将斗照型则务常转状属。铁水集线世清较据便员去本直委对。长厂有备电意性分或各维局江压文。织可研属教求打列整头属保。农所十原名求据二近统织成其节厂。军资或强最号马开长常业局万称。一型亲义强低现少展内国际门。所六与没原专布派热整几打等其给。京小真例易王性眼走约算叫厂知了代认。外行志人离好放里更类动步达选花白。千声第龙量制单时支活感运照算联图。被持放任越省识权但特管际广转合。革存界提适西取示提必图红根天。入有四强只风重手儿采毛打族强海结先。解照等几效也过们新红生外性电周调。处系省任产张须员门务细图这平。阶立何团精军斗件教白又消示划口积。联声特联委油来共由很叫变院般别。新主积门界解团打复通干素品如飞。空儿场子界元亲化由百最又亲你之积几。身历业济百界国究头受给例你则。年了需按资管出期便子运马无看。价美空细收只资主立共标县。两无计离青青技联新全群近半传。气指支现边治前严加会属证调理风。法众上金许消还与几代问候了。般带越除合社三育家想写张只三龙质。导设消特的广给构量数当叫议拉。时认确儿领此相较身许条地论标还意。",
            "classify": "jQuery",
            "author": "单区再因。"
          },
          {
            "id": 10,
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
            "id": 11
          },
          {
            "title": "你好",
            "classify": "Html+Css",
            "content": "<p>12312312</p>",
            "author": "achens",
            "posttime": "2021-06-24",
            "id": 12
          },
          {
            "title": "我好",
            "classify": "TS",
            "content": "<p>123123123123</p>",
            "author": "achens",
            "posttime": "2021-06-24",
            "id": 13
          }
        ]
      },
      // 页码发生变化时
      handleCurrentChange(page){
        this.getBlog(page)
        this.$message({
          type: 'info',
          message: '在没有后台的情况下分页也会失去作用哦!'
        })
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
        // 显示弹框
        this.dialogShow = true
        // 将博客内容传给编辑框
        this.editorContent = index
      },
      // 删除
      del(index){
        this.$confirm('是否删除文章?', '提示', {
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
      // 获取博客每页数据
      this.getBlog(this.page)
      // 获取分页初始信息
      this.getPage()
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
