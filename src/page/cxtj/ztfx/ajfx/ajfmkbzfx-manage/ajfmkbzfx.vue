<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
               value-format="yyyyMM" @change="select"
               style="width:400px"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <div id="chartColumn" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      ajfmkbzfx,
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value1:"",
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      data1:[],
      data2:[]
    };
    
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: "罚没款分布图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: this.data1
          //  ["公路路政",
          //   "道路运政",
          //   "水路运政",
          //   "航道行政",
          //   "港口行政",
          //   "海事行政",
          //   "工程质量监督",
          //   "其他",
          //   "综合执法",]
        },
        series: [
          {
            name: "",
            type: "pie", 
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data2,
            // [
            //    { value: 20, name: "公路路政" },
            //   { value: 30, name: "道路运政" },
            //   { value: 40, name: "水路运政" },
            //   { value: 10, name: "航道行政" },
            //   { value: 30, name: "港口行政" },
            //   { value: 20, name: "海事行政" },
            //   { value: 10, name: "工程质量监督" },
            //   { value: 30, name: "其他" },
            //   { value: 20, name: "综合执法" },
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
   //查询-----------------------------------------------------------------------------------------------------
    search(start,end) {    
      let data = {
       start:start,
       end:end
      };
      ajfmkbzfx(data).then(res => { 
         if(res.length!=0){
           res.forEach(item =>{
         this.data1.push(item[0]);
         this.data2.push( { value: item[1]==null?0:item[1], name:item[0] })
        
         });
         }              
            this.drawLine();
       
      });
      err => {
        console.log(err);
      };
    },
    select(val){
      if(val!=null){
        this.data1=[];
        this.data2=[];
        this.search(val[0],val[1]);
      }
     
     }
  },
  mounted() {
    this.data1=[];
    this.data2=[];
    this.search(202001,202012);
  },
  created() {
   
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
