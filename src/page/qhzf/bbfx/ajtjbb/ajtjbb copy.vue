<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <el-row>
        <el-col :span="6">
          <div>
            <el-tree
              :data="organData"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="organTree"
              highlight-current
            ></el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">

          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              value-format="yyyyMM"
               style="width:400px"
            ></el-date-picker>
          </el-form-item>
          
          <el-form-item label=" " label-width="13px">
            <el-button size="medium" icon="iconfont law-sousuo" @click="select()">查询</el-button>
          </el-form-item>

          <el-form-item label=" " label-width="13px">
                        <el-button size="medium" icon="el-icon-setting" v-popover:popover4  @click="lineSelect()">列过滤</el-button>
          </el-form-item>

        </el-form>
      </div>
       <div class="tablePart">
         <el-popover
          ref="popover4"
          placement="right"
          width="200"
          trigger="click">
          <el-checkbox-group v-model="checkboxVal" v-show="showSelect">
            <el-checkbox label="新增案件量" style="display:block;">
              新增案件量
            </el-checkbox>
            <el-checkbox label="总案件量" style="display:block;">
              总案件量
            </el-checkbox>
            <el-checkbox label="公路" style="display:block;">
              公路
            </el-checkbox>
            <el-checkbox label="道路" style="display:block;">
              道路
            </el-checkbox>
            <el-checkbox label="水路" style="display:block;">
              水路
            </el-checkbox>
            <el-checkbox label="航道" style="display:block;">
              航道
            </el-checkbox>
            <el-checkbox label="港口" style="display:block;">
              港口
            </el-checkbox>
            <el-checkbox label="质监" style="display:block;">
              质监
            </el-checkbox>
            <el-checkbox label="海事" style="display:block;">
              海事
            </el-checkbox>
            <el-checkbox label="综合执法" style="display:block;">
              综合执法
            </el-checkbox>
            <el-checkbox label="其他" style="display:block;">
              其他
            </el-checkbox>
            <el-checkbox label="总结案量" style="display:block;">
              总结案量
            </el-checkbox>
            <el-checkbox label="结案率" style="display:block;">
              结案率
            </el-checkbox>
          </el-checkbox-group>
          </el-popover>
    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="jgmc" label="机构名称" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
        <!-- <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="jgmc" label="机构名称" align="center"></el-table-column>
          <el-table-column prop="xzajl" label="新增案件量" align="center"></el-table-column>
          <el-table-column prop="zajl" label="总案件量" align="center"></el-table-column>
          <el-table-column prop="gl" label="公路" align="center"></el-table-column>
          <el-table-column prop="dl" label="道路" align="center"></el-table-column>
          <el-table-column prop="sl" label="水路" align="center"></el-table-column>
          <el-table-column prop="hd" label="航道" align="center"></el-table-column>
          <el-table-column prop="gk" label="港口" align="center"></el-table-column>
          <el-table-column prop="zj" label="质监" align="center"></el-table-column>
          <el-table-column prop="hs" label="海事" align="center"></el-table-column>
          <el-table-column prop="zhzf" label="综合执法" align="center"></el-table-column>
          <el-table-column prop="qt" label="其他" align="center"></el-table-column>
          <el-table-column prop="zjal" label="总结案量" align="center"></el-table-column>
          <el-table-column prop="jal" label="结案率" align="center"></el-table-column>
        </el-table> -->
      </div>
        </el-col>
      </el-row>
    

      
    </div>
  </div>
</template>


<script>
import {
      zajl,zjal,zfmlajsl
    } from '@/api/fxyp.js'
// import bindOrgan from "../../../sys/role-manage/bindOrgan";
const defaultFormThead = ['新增案件量', '总案件量',
// '公路', '道路',
// '水路', '航道','港口', '质监','海事', '综合执法',
'其他','总结案量','结案率']
export default {
  data() {
    return {
      key: 1, // table key
      formTheadOptions: ['新增案件量', '总案件量','公路', '道路',
'水路', '航道','港口', '质监','海事', '综合执法','其他','总结案量','结案率'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead, // 默认表头
      value3: "",
      value2: "",
      value1: "",
      showSelect:false,
      checked: true,
      currentPage: 1, //当前页
       organData: [],
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [
        {
          jgmc: "西宁市交通运输局",
          新增案件量:'0',
          总案件量:'31',
          公路:'0',
          道路:'13',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'15',
          综合执法:'0',
          其他:'0',
          总结案量:'18',
          结案率:'58.06%',

        },
        {
          jgmc: "海东市交通运输局",
          新增案件量:'0',
          总案件量:'104',
          公路:'13',
          道路:'82',
          水路:'0',
          航道:'0',
          港口:'0',
          质监:'0',
          海事:'9',
          综合执法:'0',
          其他:'0',
          总结案量:'88',
          结案率:'84.62%',

        },
        {
          jgmc: "海北交通运输局",
          新增案件量:'0',
          总案件量:'53',
          公路:'49',
          道路:'4',
          水路:'0',
          航道:'0',
          港口:'0',
          质监:'0',
          海事:'0',
          综合执法:'0',
          其他:'0',
          总结案量:'49',
          结案率:'92.45%',

        },
        {
          jgmc: "海西交通运输局",
          新增案件量:'0',
          总案件量:'28',
          公路:'24',
          道路:'4',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'0',
          综合执法:'0',
          其他:'0',
          总结案量:'66',
          结案率:'64.29%',

        },
       {
          jgmc: "果洛交通运输局",
          新增案件量:'0',
          总案件量:'107',
          公路:'52',
          道路:'54',
          水路:'1',
          航道:'0',
          港口:'0',
          质监:'0',
          海事:'0',
          综合执法:'0',
          其他:'0',
          总结案量:'33',
          结案率:'73.33%',

        },
        {
          jgmc: "黄南交通运输局",
          新增案件量:'0',
          总案件量:'31',
          公路:'0',
          道路:'13',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'15',
          综合执法:'0',
          其他:'0',
          总结案量:'108',
          结案率:'81.2%',

        },
       {
          jgmc: "海南交通运输局",
          新增案件量:'0',
          总案件量:'31',
          公路:'0',
          道路:'13',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'15',
          综合执法:'0',
          其他:'0',
          总结案量:'76',
          结案率:'69.16%',

        }, {
          jgmc: "玉树交通运输局",
          新增案件量:'0',
          总案件量:'31',
          公路:'0',
          道路:'13',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'15',
          综合执法:'0',
          其他:'0',
          总结案量:'76',
          结案率:'69.16%',

        },
      ],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      isShow: false
    };
  },
   watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲
    }
  },
  methods: {
    lineSelect(){
      this.showSelect=!this.showSelect;
    },
    //获取机构
    getOrgan() {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.organData = res.data;
          // _this.getRoleBindOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
   
    // 自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 ) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      } else {
        return "background:#ffffff;";
      }
    },
  //查询-----------------------------------------------------------------------------------------------------------
  //总案件量
  search1(start,end){
    let data = {
       start:start,
       end:end
      };
      zajl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
         if(map['西宁市交通运输局']==undefined){
           this.tableData[0].总案件量=0;
         }else{
           this.tableData[0].总案件量=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].总案件量=0;
         }else{
           this.tableData[1].总案件量=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].总案件量=0;
         }else{
           this.tableData[2].总案件量=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].总案件量=0;
         }else{
           this.tableData[3].总案件量=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].总案件量=0;
         }else{
           this.tableData[4].总案件量=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].总案件量=0;
         }else{
           this.tableData[5].总案件量=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].总案件量=0;
         }else{
           this.tableData[6].总案件量=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){ 
           this.tableData[7].总案件量=0;
         }else{
           this.tableData[7].总案件量=map['玉树交通运输局'];
         }
    
      });
      err => {
        console.log(err);
      };
    },
  //总结案量
  search2(start,end){
    let data = {
       start:start,
       end:end
      };
      zjal(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
         if(map['西宁市交通运输局']==undefined){
           this.tableData[0].总结案量=0;
           this.tableData[0].结案率=0.00+'%';
         }else{
           this.tableData[0].总结案量=map['西宁市交通运输局'];
           this.tableData[0].结案率=map['西宁市交通运输局']/this.this.tableData[0].总案件量;
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].总结案量=0;
           this.tableData[1].结案率=0.00+'%';
         }else{
           this.tableData[1].总结案量=map['海东市交通运输局'];
            this.tableData[1].结案率=map['海东市交通运输局']/this.this.tableData[1].总案件量;
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].总结案量=0;
           this.tableData[2].结案率=0.00+'%';
         }else{
           this.tableData[2].总结案量=map['海北交通运输局'];
           this.tableData[2].结案率=map['海北交通运输局']/this.this.tableData[2].总案件量;
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].总结案量=0;
           this.tableData[3].结案率=0.00+'%';
         }else{
           this.tableData[3].总结案量=map['海西交通运输局'];
           this.tableData[3].结案率=map['海西交通运输局']/this.this.tableData[3].总案件量;
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].总结案量=0;
           this.tableData[4].结案率=0.00+'%';
         }else{
           this.tableData[4].总结案量=map['果洛交通运输局'];
           this.tableData[4].结案率=map['果洛交通运输局']/this.this.tableData[4].总案件量;
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].总结案量=0;
           this.tableData[5].结案率=0.00+'%';
         }else{
           this.tableData[5].总结案量=map['黄南交通运输局'];
           this.tableData[5].结案率=map['黄南交通运输局']/this.this.tableData[5].总案件量;
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].总结案量=0;
           this.tableData[6].结案率=0.00+'%';
         }else{
           this.tableData[6].总结案量=map['海南交通运输局'];
           this.tableData[6].结案率=map['海南交通运输局']/this.this.tableData[6].总案件量;
         }
          if(map['玉树交通运输局']==undefined){
           this.tableData[7].总结案量=0;
           this.tableData[7].结案率=0.00+'%';
         }else{
           this.tableData[7].总结案量=map['玉树交通运输局'];
           this.tableData[7].结案率=map['玉树交通运输局']/this.this.tableData[6].总案件量;
         }
    
      });
      err => {
        console.log(err);
      };
    },
    //查询-----------------------------------------------------------------------------------------------------
//执法门类案件数量
  search3(zfml,start,end){
    let data = {
        zfml:zfml,
       start:start,
       end:end
      };
      var name='';
      if(zfml=='公路路政'){
        zfmlajsl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
         if(map['西宁市交通运输局']==undefined){
           this.tableData[0].公路=0;
         }else{
           this.tableData[0].公路=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].公路=0;
         }else{
           this.tableData[1].公路=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].公路=0;
         }else{
           this.tableData[2].公路=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].公路=0;
         }else{
           this.tableData[3].公路=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].公路=0;
         }else{
           this.tableData[4].公路=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].公路=0;
         }else{
           this.tableData[5].公路=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].公路=0;
         }else{
           this.tableData[6].公路=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){
           this.tableData[7].公路=0;
         }else{
           this.tableData[7].公路=map['玉树交通运输局'];
         }
    
      });
      }
      if(zfml=='道路运政'){
       zfmlajsl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
         if(map['西宁市交通运输局']==undefined){
           this.tableData[0].道路=0;
         }else{
           this.tableData[0].道路=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].道路=0;
         }else{
           this.tableData[1].道路=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].道路=0;
         }else{
           this.tableData[2].道路=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].道路=0;
         }else{
           this.tableData[3].道路=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].道路=0;
         }else{
           this.tableData[4].道路=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].道路=0;
         }else{
           this.tableData[5].道路=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].道路=0;
         }else{
           this.tableData[6].道路=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){
           this.tableData[7].道路=0;
         }else{
           this.tableData[7].道路=map['玉树交通运输局'];
         }
    
      });
      }
      if(zfml=='水路运政'){
      zfmlajsl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
         if(map['西宁市交通运输局']==undefined){
           this.tableData[0].水路=0;
         }else{
           this.tableData[0].水路=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].水路=0;
         }else{
           this.tableData[1].水路=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].水路=0;
         }else{
           this.tableData[2].水路=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].水路=0;
         }else{
           this.tableData[3].水路=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].水路=0;
         }else{
           this.tableData[4].水路=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].水路=0;
         }else{
           this.tableData[5].水路=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].水路=0;
         }else{
           this.tableData[6].水路=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){
           this.tableData[7].水路=0;
         }else{
           this.tableData[7].水路=map['玉树交通运输局'];
         }
     
    
      });
      }
      if(zfml=='航道行政'){
        zfmlajsl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
         if(map['西宁市交通运输局']==undefined){
           this.tableData[0].航道=0;
         }else{
           this.tableData[0].航道=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].航道=0;
         }else{
           this.tableData[1].航道=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].航道=0;
         }else{
           this.tableData[2].航道=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].航道=0;
         }else{
           this.tableData[3].航道=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].航道=0;
         }else{
           this.tableData[4].航道=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].航道=0;
         }else{
           this.tableData[5].航道=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].航道=0;
         }else{
           this.tableData[6].航道=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){
           this.tableData[7].航道=0;
         }else{
           this.tableData[7].航道=map['玉树交通运输局'];
         }
     
    
      });
      }
      if(zfml=='港口行政'){
        zfmlajsl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
        if(map['西宁市交通运输局']==undefined){
           this.tableData[0].港口=0;
         }else{
           this.tableData[0].港口=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].港口=0;
         }else{
           this.tableData[1].港口=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].港口=0;
         }else{
           this.tableData[2].港口=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].港口=0;
         }else{
           this.tableData[3].港口=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].港口=0;
         }else{
           this.tableData[4].港口=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].港口=0;
         }else{
           this.tableData[5].港口=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].港口=0;
         }else{
           this.tableData[6].港口=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){
           this.tableData[7].港口=0;
         }else{
           this.tableData[7].港口=map['玉树交通运输局'];
         }
     
    
      });
      }
      if(zfml=='海事行政'){
        zfmlajsl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
          if(map['西宁市交通运输局']==undefined){
           this.tableData[0].海事=0;
         }else{
           this.tableData[0].海事=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].海事=0;
         }else{
           this.tableData[1].海事=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].海事=0;
         }else{
           this.tableData[2].海事=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].海事=0;
         }else{
           this.tableData[3].海事=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].海事=0;
         }else{
           this.tableData[4].海事=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].海事=0;
         }else{
           this.tableData[5].海事=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].海事=0;
         }else{
           this.tableData[6].海事=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){
           this.tableData[7].海事=0;
         }else{
           this.tableData[7].海事=map['玉树交通运输局'];
         }
     
    
      });
      }
      if(zfml=='工程质量监督'){
        zfmlajsl(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
         if(map['西宁市交通运输局']==undefined){
           this.tableData[0].质监=0;
         }else{
           this.tableData[0].质监=map['西宁市交通运输局'];
         }
         if(map['海东市交通运输局']==undefined){
           this.tableData[1].质监=0;
         }else{
           this.tableData[1].质监=map['海东市交通运输局'];
         }
         if(map['海北交通运输局']==undefined){
           this.tableData[2].质监=0;
         }else{
           this.tableData[2].质监=map['海北交通运输局'];
         }
         if(map['海西交通运输局']==undefined){
           this.tableData[3].质监=0;
         }else{
           this.tableData[3].质监=map['海西交通运输局'];
         }
         if(map['果洛交通运输局']==undefined){
           this.tableData[4].质监=0;
         }else{
           this.tableData[4].质监=map['果洛交通运输局'];
         }
         if(map['黄南交通运输局']==undefined){
           this.tableData[5].质监=0;
         }else{
           this.tableData[5].质监=map['黄南交通运输局'];
         }
         if(map['海南交通运输局']==undefined){
           this.tableData[6].质监=0;
         }else{
           this.tableData[6].质监=map['海南交通运输局'];
         }
         if(map['玉树交通运输局']==undefined){
           this.tableData[7].质监=0;
         }else{
           this.tableData[7].质监=map['玉树交通运输局'];
         }
     
    
      });
      }
      
      
      err => {
        console.log(err);
      };
    },
    
    select(){
      console.log(this.organData);
      console.log(this.value1);
      if(this.value1!=''){
        var v=this.value1;
        this.search1(v[0],v[1]);
        this.search2(v[0],v[1]);
        this.search3('公路路政',v[0],v[1]);
        this.search3('道路运政',v[0],v[1]);
        this.search3('水路运政',v[0],v[1]);
        this.search3('航道行政',v[0],v[1]);
        this.search3('港口行政',v[0],v[1]);
        this.search3('海事行政',v[0],v[1]);
        this.search3('工程质量监督',v[0],v[1]);
      }
      
    }
  },
  
  mounted() {
    this.search1(202001,202012);
    this.search2(202001,202012);
    this.search3('公路路政',202001,202012);
    this.search3('道路运政',202001,202012);
    this.search3('水路运政',202001,202012);
    this.search3('航道行政',202001,202012);
    this.search3('港口行政',202001,202012);
    this.search3('海事行政',202001,202012);
    this.search3('工程质量监督',202001,202012);
    this.getOrgan();
  },
  created() {
 
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
