import echarts from "echarts";
import {caseQueryMore, personQueryMore} from '@/api/analysis/analysisManage.js'
import { nextTick } from "vuedraggable";

let distrcit =  "../../../../static/json/map/district.json";

export function JxMap(mapData,tip) {
    let jiangxi = "../../../../static/json/map/data-1518338017111-rJK1gtpUM.json";
    let yingtan = "../../../../static/json/map/data-1518338860057-By447tpLf.json";
    let yichun = "../../../../static/json/map/data-1518338852969-Hy677KTIf.json";
    let xinyu = "../../../../static/json/map/data-1518338838010-SyAzQYTIf.json";
    let shangrao = "../../../../static/json/map/data-1518338829670-H1UfQYa8G.json";
    let pingxiang = "../../../../static/json/map/data-1518338823093-HkyMQtpUf.json";
    let nanchang = "../../../../static/json/map/data-1518338805373-S1Temta8G.json";
    let jiujiang = "../../../../static/json/map/data-1518338799987-S1deQFTLz.json";
    let jingdezhen = "../../../../static/json/map/data-1518338783915-HJOJXtaLf.json";
    let jian = "../../../../static/json/map/data-1518338772507-BJnAMKTIz.json";
    let ganzhou = "../../../../static/json/map/data-1518338763250-S17RfKpLM.json";
    let fuzhou = "../../../../static/json/map/data-1518338684239-S1EFGtp8f.json";

    let apiType = ''
    console.log(tip)
    if(tip === '案件数量') {
      apiType = caseQueryMore
    } else {
      apiType = personQueryMore
    }

    echarts.extendsMap = function (id, opt) {
      // 实例
      var chart = this.init(document.getElementById("map"));

      var curGeoJson = {};
      var cityMap = {
        "南昌市": nanchang,
        "景德镇市": jingdezhen,
        "萍乡市": pingxiang,
        "九江市": jiujiang,
        "新余市": xinyu,
        "鹰潭市": yingtan,
        "赣州市": ganzhou,
        "吉安市": jian,
        "宜春市": yichun,
        "抚州市": fuzhou,
        "上饶市": shangrao
      };
      var geoCoordMap = {
        '南昌市': [115.89, 28.48],
        '景德镇市': [117.28, 29.09],
        '萍乡市': [113.93, 27.41],
        '九江市': [115.97,29.51],
        '新余市': [114.81, 27.72],
        '鹰潭市': [117.12, 28.10],
        '赣州市': [115.04, 25.67],
        '吉安市': [115.05, 26.88],
        '宜春市': [114.41, 28.03],
        '抚州市': [116.45, 27.79],
        '上饶市': [117.92, 28.22]
      };
      var levelColorMap = {
        '1': 'rgba(241, 109, 115, .8)',
        '2': 'rgba(255, 235, 59, .7)',
        '3': 'rgba(147, 235, 248, 1)'
      };

      var defaultOpt = {
        mapName: 'china',     // 地图展示
        goDown: false,        // 是否下钻
        bgColor: '#404a59',   // 画布背景色
        activeArea: [],       // 区域高亮,同echarts配置项
        data: [],
        // 下钻回调(点击的地图名、实例对象option、实例对象)
        callback: function (name, option, instance) {
        }
      };
      if (opt) opt = this.util.extend(defaultOpt, opt);

      // 层级索引
      var name = [opt.mapName];
      var idx = 0;
      var pos = {
        leftPlus: 115,
        leftCur: -10,
        left: 38,
        top: 40
      };

      var line = [[0, 0], [8, 11], [0, 22]];
      // style
      var style = {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: '#eee',
        lineColor: 'rgba(147, 235, 248, .8)'
      };

      var handleEvents = {
        /**
         * i 实例对象
         * o option
         * n 地图名
         **/
        resetOption: function (i, o, n) {
          var breadcrumb = this.createBreadcrumb(n);

          var j = name.indexOf(n);
          var l = o.graphic.length;
          if (j < 0) {
            o.graphic.push(breadcrumb);
            o.graphic[0].children[0].shape.x2 = 145;
            o.graphic[0].children[1].shape.x2 = 145;
            if (o.graphic.length > 2) {
              for (var x = 0; x < opt.data.length; x++) {
                if (n === opt.data[x].name + '市') {
                  o.series[0].data = handleEvents.initSeriesData([opt.data[x]]);
                  break;
                } else o.series[0].data = [];
              }
            }
            ;
            name.push(n);
            idx++;
          } else {
            o.graphic.splice(j + 2, l);
            if (o.graphic.length <= 2) {
              o.graphic[0].children[0].shape.x2 = 60;
              o.graphic[0].children[1].shape.x2 = 60;
              o.series[0].data = handleEvents.initSeriesData(opt.data);
            }
            ;
            name.splice(j + 1, l);
            idx = j;
            pos.leftCur -= pos.leftPlus * (l - j - 1);
          }
          ;

          o.geo.map = n;
          o.geo.zoom = 0.4;
          i.clear();
          i.setOption(o);
          this.zoomAnimation();
          opt.callback(n, o, i);
        },

        /**
         * name 地图名
         **/
        createBreadcrumb: function (name) {
          var cityToPinyin = {
            "南昌市": "nanchang",
            "景德镇市": "jingdezhen",
            "萍乡市": "pingxiang",
            "九江市": "jiujiang",
            "新余市": "xinyu",
            "鹰潭市": "yingtan",
            "赣州市": "ganzhou",
            "吉安市": "jian",
            "宜春市": "yichun",
            "抚州市": "fuzhou",
            "上饶市": "shangrao"
          };
          var breadcrumb = {
            type: 'group',
            id: name,
            left: pos.leftCur + pos.leftPlus,
            top: pos.top + 5,
            children: [{
              type: 'polyline',
              left: -90,
              top: -5,
              shape: {
                points: line
              },
              style: {
                stroke: '#fff',
                key: name
                // lineWidth: 2,
              },
              onclick: function () {
                var name = this.style.key;
                handleEvents.resetOption(chart, option, name);
              }
            }, {
              type: 'text',
              left: -68,
              top: 'middle',
              style: {
                text: name,
                textAlign: 'center',
                fill: style.textColor,
                font: style.font
              },
              onclick: function () {
                var name = this.style.text;
                handleEvents.resetOption(chart, option, name);
              }
            }, {
              type: 'text',
              left: -68,
              top: 10,
              style: {

                name: name,
                text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',
                textAlign: 'center',
                fill: style.textColor,
                font: '12px "Microsoft YaHei", sans-serif',
              },
              onclick: function () {
                // console.log(this.style);
                var name = this.style.name;
                handleEvents.resetOption(chart, option, name);
              }
            }]
          }

          pos.leftCur += pos.leftPlus;

          return breadcrumb;
        },

        // 设置effectscatter
        initSeriesData: function (data) {
          let temp = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              temp.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value, data[i].level)
              });
            }
          }
          ;
          return temp;
        },

        zoomAnimation: function () {
          var count = null;
          var zoom = function (per) {
            if (!count) count = per;
            count = count + per;
            console.log(per,count);
            chart.setOption({
              geo: {
                zoom: count
              }
            });
            if (count < 1) window.requestAnimationFrame(function () {
              zoom(0.2);
            });
          };
          window.requestAnimationFrame(function () {
            zoom(0.2);
          });
        }
      };

      var option = {
        // backgroundColor: opt.bgColor,
        graphic: [{
          type: 'group',
          left: pos.left,
          top: pos.top - 4,
          children: [{
            type: 'line',
            left: 0,
            top: -20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 60,
              y2: 0
            },
            style: {
              stroke: style.lineColor,
            }
          }, {
            type: 'line',
            left: 0,
            top: 20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 60,
              y2: 0
            },
            style: {
              stroke: style.lineColor,
            }
          }]
        }, {
          id: name[idx],
          type: 'group',
          left: pos.left + 2,
          top: pos.top - 8,
          children: [{
            type: 'polyline',
            left: 90,
            top: -12,
            shape: {
              points: line
            },
            style: {
              stroke: 'transparent',
              key: name[0]
            },
            onclick: function () {
              var name = this.style.key;
              handleEvents.resetOption(chart, option, name);
            }
          }, {
            type: 'text',
            left: 0,
            top: 'left',
            style: {
              text: name[0] === '江西' ? '江西省' : name[0],
              textAlign: 'left',
              fill: style.textColor,
              font: style.font
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, '江西');
            }
          }, {
            type: 'text',
            left: 0,
            top: 20,
            style: {
              text: 'JIANGXI',
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif',
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, '江西');
            }
          }]
        }],
        tooltip: {
          show:true,
          trigger: 'item',
          backgroundColor: 'rgba(166, 200, 76, 0.82)',
          borderColor: '#FFFFCC',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: function(params, ticket, callback) {
            console.log(params);

            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[2];
            res = "<span style='color:#fff;'>" + name + "</span><br/>"+tip+'：' + value;
            return res;
          }
        },
        geo: {
          map: opt.mapName,
          // roam: true,
          zoom: 1,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          },
          regions: opt.activeArea.map(function (item) {
            if (typeof item !== 'string') {
              return {
                name: item.name,
                itemStyle: {
                  normal: {
                    areaColor: item.areaColor || '#389BB7'
                  }
                },
                label: {
                  normal: {
                    show: item.showLabel,
                    textStyle: {
                      color: '#fff'
                    }
                  }
                }
              }
            } else {
              return {
                name: item,
                itemStyle: {
                  normal: {
                    borderColor: '#91e6ff',
                    areaColor: '#389BB7'
                  }
                }
              }
            }
          })
        },
        series: [{
          type: 'effectScatter',
          coordinateSystem: 'geo',
          // symbol: 'diamond',
          showEffectOn: 'render',
          rippleEffect: {
            period: 15,
            scale: 6,
            brushType: 'fill'
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: function (params) {
                return levelColorMap[params.value[3]];
              },
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: handleEvents.initSeriesData(opt.data)
        }]
      };

      chart.setOption(option);
      // 添加事件
      chart.on('click', function (params) {
        var _self = this;
        if (opt.goDown && params.name !== name[idx]) {
          if (cityMap[params.name]) {
            var url = cityMap[params.name];
            $.get(url, function (response) {
              curGeoJson = response;
              echarts.registerMap(params.name, response);
              handleEvents.resetOption(_self, option, params.name);
            });
          }
        }
      });

      chart.setMap = function (mapName) {
        var _self = this;
        if (mapName.indexOf('市') < 0) mapName = mapName + '市';
        var citySource = cityMap[mapName];
        if (citySource) {
          var url = './map/' + citySource + '.json';
          $.get(url, function (response) {
            curGeoJson = response;
            echarts.registerMap(mapName, response);
            handleEvents.resetOption(_self, option, mapName);
          });
        }
        // handleEvents.resetOption(this, option, mapName);
      };

      return chart;
    };
    $.getJSON(jiangxi, function (geoJson) {
      echarts.registerMap('江西', geoJson);
      var myChart = echarts.extendsMap('chart-panel', {
        bgColor: '#154e90', // 画布背景色
        mapName: '江西',    // 地图名
        goDown: true,       // 是否下钻
        // 下钻回调
        callback: function(name, option, instance){
          let theMap = {
            "南昌市": nanchang,
            "景德镇市": jingdezhen,
            "萍乡市": pingxiang,
            "九江市": jiujiang,
            "新余市": xinyu,
            "鹰潭市": yingtan,
            "赣州市": ganzhou,
            "吉安市": jian,
            "宜春市": yichun,
            "抚州市": fuzhou,
            "上饶市": shangrao
          }
          mapData.map(mapDataItem => {
            if(name === mapDataItem.name) {
              // 获取json数据，得到每个县的坐标
              if(theMap[name]) {
                var url = distrcit;
                $.get(url, function (response) {
                  const params = {
                    id: mapDataItem.id,
                    type: "district"
                  }
                  // 获取县级数据
                  apiType(params).then(res => {
                    if(res.code === 200) {
                      res.data.mapdata.map(item => {
                        response.eara.map(countyItem => {
                          if(countyItem.name === item.name) {
                            option.series[0].data.push({
                              name: item.name,
                              value: [countyItem.longitude,countyItem.latitude,item.value,countyItem.level]
                            })
                          }
                        })
                      })
                      option.geo.zoom = 1;
                      myChart.setOption(option)
                    }
                  })
                })
              }
            }
          })
        },
        // 数据展示
        data: mapData
      });
    })

}
export function NxMap(mapData,tip) {
  let ningxia = "../../../../static/json/map/ningxia.json";
  let guyuan = "../../../../static/json/map/guyuan.json";
  let shizuishan = "../../../../static/json/map/shizuishan.json";
  let wuzhong = "../../../../static/json/map/wuzhong.json";
  let yinchuan = "../../../../static/json/map/yinchuan.json";
  let zhongwei = "../../../../static/json/map/zhongwei.json";

  echarts.extendsMap = function (id, opt) {
    // 实例
    var chart = this.init(document.getElementById("map"));

    var curGeoJson = {};
    var cityMap = {
      "固原市": guyuan,
      "石嘴山市": shizuishan,
      "吴忠市": wuzhong,
      "银川市": yinchuan,
      "中卫市": zhongwei
    };
    var geoCoordMap = {
      '固原市': [106.241101,36.019984],
      '银川市': [106.237921,38.49314],
      '中卫市': [105.196754199, 37.5211241916],
      '吴忠市': [106.208254199, 37.9935610029],
      '石嘴山市': [106.379337202, 39.0202232836]
    };
    var levelColorMap = {
      '1': 'rgba(241, 109, 115, .8)',
      '2': 'rgba(255, 235, 59, .7)',
      '3': 'rgba(147, 235, 248, 1)'
    };

    var defaultOpt = {
      mapName: 'china',     // 地图展示
      goDown: false,        // 是否下钻
      bgColor: '#404a59',   // 画布背景色
      activeArea: [],       // 区域高亮,同echarts配置项
      data: [],
      // 下钻回调(点击的地图名、实例对象option、实例对象)
      callback: function (name, option, instance) {
      }
    };
    if (opt) opt = this.util.extend(defaultOpt, opt);

    // 层级索引
    var name = [opt.mapName];
    var idx = 0;
    var pos = {
      leftPlus: 115,
      leftCur: -10,
      left: 38,
      top: 40
    };

    var line = [[0, 0], [8, 11], [0, 22]];
    // style
    var style = {
      font: '18px "Microsoft YaHei", sans-serif',
      textColor: '#eee',
      lineColor: 'rgba(147, 235, 248, .8)'
    };

    var handleEvents = {

      resetOption: function (i, o, n) {
        var breadcrumb = this.createBreadcrumb(n);

        var j = name.indexOf(n);
        var l = o.graphic.length;
        if (j < 0) {
          o.graphic.push(breadcrumb);
          o.graphic[0].children[0].shape.x2 = 145;
          o.graphic[0].children[1].shape.x2 = 145;
          if (o.graphic.length > 2) {
            for (var x = 0; x < opt.data.length; x++) {
              if (n === opt.data[x].name + '市') {
                o.series[0].data = handleEvents.initSeriesData([opt.data[x]]);
                break;
              } else o.series[0].data = [];
            }
          }
          ;
          name.push(n);
          idx++;
        } else {
          o.graphic.splice(j + 2, l);
          if (o.graphic.length <= 2) {
            o.graphic[0].children[0].shape.x2 = 60;
            o.graphic[0].children[1].shape.x2 = 60;
            o.series[0].data = handleEvents.initSeriesData(opt.data);
          }
          ;
          name.splice(j + 1, l);
          idx = j;
          pos.leftCur -= pos.leftPlus * (l - j - 1);
        }
        ;

        o.geo.map = n;
        o.geo.zoom = 0.4;
        i.clear();
        i.setOption(o);
        this.zoomAnimation();
        opt.callback(n, o, i);
      },

      createBreadcrumb: function (name) {
        var cityToPinyin = {
          "固原市": 'guyuan.json',
          "石嘴山市": 'shizuishan',
          "吴忠市": 'wuzhong',
          "银川市": 'yinchuan',
          "中卫市": 'zhongwei'
        };
        var breadcrumb = {
          type: 'group',
          id: name,
          left: pos.leftCur + pos.leftPlus,
          top: pos.top + 5,
          children: [{
            type: 'polyline',
            left: -90,
            top: -5,
            shape: {
              points: line
            },
            style: {
              stroke: '#fff',
              key: name
              // lineWidth: 2,
            },
            onclick: function () {
              var name = this.style.key;
              handleEvents.resetOption(chart, option, name);
            }
          }, {
            type: 'text',
            left: -68,
            top: 'middle',
            style: {
              text: name,
              textAlign: 'center',
              fill: style.textColor,
              font: style.font
            },
            onclick: function () {
              var name = this.style.text;
              handleEvents.resetOption(chart, option, name);
            }
          }, {
            type: 'text',
            left: -68,
            top: 10,
            style: {

              name: name,
              text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif',
            },
            onclick: function () {
              // console.log(this.style);
              var name = this.style.name;
              handleEvents.resetOption(chart, option, name);
            }
          }]
        }

        pos.leftCur += pos.leftPlus;

        return breadcrumb;
      },

      // 设置effectscatter
      initSeriesData: function (data) {
        var temp = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            temp.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value, data[i].level)
            });
          }
        }
        ;
        return temp;
      },

      zoomAnimation: function () {
        var count = null;
        var zoom = function (per) {
          if (!count) count = per;
          count = count + per;
          // console.log(per,count);
          chart.setOption({
            geo: {
              zoom: count
            }
          });
          if (count < 1) window.requestAnimationFrame(function () {
            zoom(0.2);
          });
        };
        window.requestAnimationFrame(function () {
          zoom(0.2);
        });
      }
    };

    var option = {
      // backgroundColor: opt.bgColor,
      graphic: [{
        type: 'group',
        left: pos.left,
        top: pos.top - 4,
        children: [{
          type: 'line',
          left: 0,
          top: -20,
          shape: {
            x1: 0,
            y1: 0,
            x2: 60,
            y2: 0
          },
          style: {
            stroke: style.lineColor,
          }
        }, {
          type: 'line',
          left: 0,
          top: 20,
          shape: {
            x1: 0,
            y1: 0,
            x2: 60,
            y2: 0
          },
          style: {
            stroke: style.lineColor,
          }
        }]
      }, {
        id: name[idx],
        type: 'group',
        left: pos.left + 2,
        top: pos.top - 8,
        children: [{
          type: 'polyline',
          left: 90,
          top: -12,
          shape: {
            points: line
          },
          style: {
            stroke: 'transparent',
            key: name[0]
          },
          onclick: function () {
            var name = this.style.key;
            handleEvents.resetOption(chart, option, name);
          }
        }, {
          type: 'text',
          left: 0,
          top: 'left',
          style: {
            text: name[0] === '宁夏' ? '宁夏' : name[0],
            textAlign: 'left',
            fill: style.textColor,
            font: style.font
          },
          onclick: function () {
            handleEvents.resetOption(chart, option, '宁夏');
          }
        }, {
          type: 'text',
          left: 0,
          top: 20,
          style: {
            text: 'NINGXIA',
            textAlign: 'center',
            fill: style.textColor,
            font: '12px "Microsoft YaHei", sans-serif',
          },
          onclick: function () {
            handleEvents.resetOption(chart, option, '宁夏');
          }
        }]
      }],
      tooltip: {
        show:true,
        trigger: 'item',
        backgroundColor: 'rgba(166, 200, 76, 0.82)',
        borderColor: '#FFFFCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        formatter: function(params, ticket, callback) {
          console.log(params);

          //根据业务自己拓展要显示的内容
          var res = "";
          var name = params.name;
          var value = params.value[2];
          res = "<span style='color:#fff;'>" + name + "</span><br/>"+tip+'：' + value;
          return res;
        }
      },
      geo: {
        map: opt.mapName,
        // roam: true,
        zoom: 1,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [{
                offset: 0,
                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            shadowColor: 'rgba(128, 217, 248, 1)',
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        },
        regions: opt.activeArea.map(function (item) {
          if (typeof item !== 'string') {
            return {
              name: item.name,
              itemStyle: {
                normal: {
                  areaColor: item.areaColor || '#389BB7'
                }
              },
              label: {
                normal: {
                  show: item.showLabel,
                  textStyle: {
                    color: '#fff'
                  }
                }
              }
            }
          } else {
            return {
              name: item,
              itemStyle: {
                normal: {
                  borderColor: '#91e6ff',
                  areaColor: '#389BB7'
                }
              }
            }
          }
        })
      },
      series: [{
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // symbol: 'diamond',
        showEffectOn: 'render',
        rippleEffect: {
          period: 15,
          scale: 6,
          brushType: 'fill'
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: function (params) {
              return levelColorMap[params.value[3]];
            },
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: handleEvents.initSeriesData(opt.data)
      }]
    };

    chart.setOption(option);
    // 添加事件
    chart.on('click', function (params) {
      var _self = this;
      if (opt.goDown && params.name !== name[idx]) {
        if (cityMap[params.name]) {
          var url = cityMap[params.name];
          $.get(url, function (response) {
            curGeoJson = response;
            echarts.registerMap(params.name, response);
            handleEvents.resetOption(_self, option, params.name);
          });
        }
      }
    });

    chart.setMap = function (mapName) {
      var _self = this;
      if (mapName.indexOf('市') < 0) mapName = mapName + '市';
      var citySource = cityMap[mapName];
      if (citySource) {
        var url = './map/' + citySource + '.json';
        $.get(url, function (response) {
          curGeoJson = response;
          echarts.registerMap(mapName, response);
          handleEvents.resetOption(_self, option, mapName);
        });
      }
      // handleEvents.resetOption(this, option, mapName);
    };

    return chart;
  };

  $.getJSON(ningxia, function (geoJson) {
    echarts.registerMap('宁夏', geoJson);
    var myChart = echarts.extendsMap('chart-panel', {
      bgColor: '#154e90', // 画布背景色
      mapName: '宁夏',    // 地图名
      goDown: true,       // 是否下钻
      // 下钻回调
      callback: function(name, option, instance){
        let theMap = {
          "固原市": guyuan,
          "石嘴山市": shizuishan,
          "吴忠市": wuzhong,
          "银川市": yinchuan,
          "中卫市": zhongwei
        }
        mapData.map(mapDataItem => {
          if(name === mapDataItem.name) {
            // 获取json数据，得到每个县的坐标
            if(theMap[name]) {
            //   var url = theMap[name];
            var url = distrcit;
              $.get(url, function (response) {
                const params = {
                  id: mapDataItem.id,
                  type: "district"
                }
                // 获取县级数据
                apiType(params).then(res => {
                    if(res.code === 200) {
                      res.data.mapdata.map(item => {
                        response.eara.map(countyItem => {
                          if(countyItem.name === item.name) {
                            option.series[0].data.push({
                              name: item.name,
                              value: [countyItem.longitude,countyItem.latitude,item.value,countyItem.level]
                            })
                          }
                        })
                      })
                    option.geo.zoom = 1;
                    myChart.setOption(option)
                  }
                })
              })
            }
          }
        })
      },
      // 数据展示
      data: mapData
    });
  })
}
export function GsMap(mapData,tip) {
  let gansu = "../../../../static/json/map/gansu.json";
  let jiuquan = "../../../../static/json/map/jiuquan.json";
  let zhangye = "../../../../static/json/map/zhangye.json";
  let jinchang = "../../../../static/json/map/jinchang.json";
  let wuwei = "../../../../static/json/map/wuwei.json";
  let baiyin = "../../../../static/json/map/baiyin.json";
  let lanzhou = "../../../../static/json/map/lanzhou.json";
  let linixa = "../../../../static/json/map/linixa.json";
  let gannan = "../../../../static/json/map/gannan.json";
  let longnan = "../../../../static/json/map/longnan.json";
  let tianshui = "../../../../static/json/map/tianshui.json";
  let pingliang = "../../../../static/json/map/pingliang.json";
  let qingyang = "../../../../static/json/map/qingyang.json";
  let dingxi = "../../../../static/json/map/dingxi.json";

  echarts.extendsMap = function (id, opt) {
    // 实例
    var chart = this.init(document.getElementById("map"));

    var curGeoJson = {};
    var cityMap = {
      "张掖市": zhangye,
      "酒泉市": jiuquan,
      "金昌市": jinchang,
      "武威市": wuwei,
      "白银市": baiyin,
      "兰州市": lanzhou,
      "临夏回族自治州": linixa,
      "甘南藏族自治州": gannan,
      "陇南市": longnan,
      "天水市": tianshui,
      "平凉市": pingliang,
      "庆阳市": qingyang,
      "定西市": dingxi
    };
    var geoCoordMap = {
      "张掖市": [100.457638,38.938348],
      "酒泉市": [98.496578,39.737059],
      "金昌市": [102.186611,38.51409],
      "武威市": [102.632931,37.938003],
      "白银市": [104.17651,36.547466],
      "兰州市": [103.833187,36.069394],
      "临夏回族自治州": [103.210357,35.601799],
      "甘南藏族自治州": [102.91173,34.98328],
      "陇南市": [104.927786,33.390298],
      "天水市": [105.722922,34.584729],
      "平凉市": [106.664913,35.542405],
      "庆阳市": [107.643297,35.709496],
      "定西市": [104.626864,35.585066]
    };
    var levelColorMap = {
      '1': 'rgba(241, 109, 115, .8)',
      '2': 'rgba(255, 235, 59, .7)',
      '3': 'rgba(147, 235, 248, 1)'
    };

    var defaultOpt = {
      mapName: 'china',     // 地图展示
      goDown: false,        // 是否下钻
      bgColor: '#404a59',   // 画布背景色
      activeArea: [],       // 区域高亮,同echarts配置项
      data: [],
      // 下钻回调(点击的地图名、实例对象option、实例对象)
      callback: function (name, option, instance) {
      }
    };
    if (opt) opt = this.util.extend(defaultOpt, opt);

    // 层级索引
    var name = [opt.mapName];
    var idx = 0;
    var pos = {
      leftPlus: 115,
      leftCur: -10,
      left: 38,
      top: 40
    };

    var line = [[0, 0], [8, 11], [0, 22]];
    // style
    var style = {
      font: '18px "Microsoft YaHei", sans-serif',
      textColor: '#eee',
      lineColor: 'rgba(147, 235, 248, .8)'
    };

    var handleEvents = {

      resetOption: function (i, o, n) {
        var breadcrumb = this.createBreadcrumb(n);

        var j = name.indexOf(n);
        var l = o.graphic.length;
        if (j < 0) {
          o.graphic.push(breadcrumb);
          o.graphic[0].children[0].shape.x2 = 145;
          o.graphic[0].children[1].shape.x2 = 145;
          if (o.graphic.length > 2) {
            for (var x = 0; x < opt.data.length; x++) {
              if (n === opt.data[x].name + '市') {
                o.series[0].data = handleEvents.initSeriesData([opt.data[x]]);
                break;
              } else o.series[0].data = [];
            }
          }
          ;
          name.push(n);
          idx++;
        } else {
          o.graphic.splice(j + 2, l);
          if (o.graphic.length <= 2) {
            o.graphic[0].children[0].shape.x2 = 60;
            o.graphic[0].children[1].shape.x2 = 60;
            o.series[0].data = handleEvents.initSeriesData(opt.data);
          }
          ;
          name.splice(j + 1, l);
          idx = j;
          pos.leftCur -= pos.leftPlus * (l - j - 1);
        }
        ;

        o.geo.map = n;
        o.geo.zoom = 0.4;
        i.clear();
        i.setOption(o);
        this.zoomAnimation();
        opt.callback(n, o, i);
      },

      createBreadcrumb: function (name) {
        var cityToPinyin = {
          "张掖市": 'zhangye',
          "酒泉市": 'jiuquan',
          "金昌市": 'jinchang',
          "武威市": 'wuwei',
          "白银市": 'baiyin',
          "兰州市": 'lanzhou',
          "临夏回族自治州": 'linixa',
          "甘南藏族自治州": 'gannan',
          "陇南市": 'longnan',
          "天水市": 'tianshui',
          "平凉市": 'pingliang',
          "庆阳市": 'qingyang',
          "定西市": 'dingxi'
        };
        var breadcrumb = {
          type: 'group',
          id: name,
          left: pos.leftCur + pos.leftPlus,
          top: pos.top + 5,
          children: [{
            type: 'polyline',
            left: -90,
            top: -5,
            shape: {
              points: line
            },
            style: {
              stroke: '#fff',
              key: name
              // lineWidth: 2,
            },
            onclick: function () {
              var name = this.style.key;
              handleEvents.resetOption(chart, option, name);
            }
          }, {
            type: 'text',
            left: -68,
            top: 'middle',
            style: {
              text: name,
              textAlign: 'center',
              fill: style.textColor,
              font: style.font
            },
            onclick: function () {
              var name = this.style.text;
              handleEvents.resetOption(chart, option, name);
            }
          }, {
            type: 'text',
            left: -68,
            top: 10,
            style: {

              name: name,
              text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif',
            },
            onclick: function () {
              // console.log(this.style);
              var name = this.style.name;
              handleEvents.resetOption(chart, option, name);
            }
          }]
        }

        pos.leftCur += pos.leftPlus;

        return breadcrumb;
      },

      // 设置effectscatter
      initSeriesData: function (data) {
        var temp = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            temp.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value, data[i].level)
            });
          }
        }
        ;
        return temp;
      },

      zoomAnimation: function () {
        var count = null;
        var zoom = function (per) {
          if (!count) count = per;
          count = count + per;
          // console.log(per,count);
          chart.setOption({
            geo: {
              zoom: count
            }
          });
          if (count < 1) window.requestAnimationFrame(function () {
            zoom(0.2);
          });
        };
        window.requestAnimationFrame(function () {
          zoom(0.2);
        });
      }
    };

    var option = {
      // backgroundColor: opt.bgColor,
      graphic: [{
        type: 'group',
        left: pos.left,
        top: pos.top - 4,
        children: [{
          type: 'line',
          left: 0,
          top: -20,
          shape: {
            x1: 0,
            y1: 0,
            x2: 60,
            y2: 0
          },
          style: {
            stroke: style.lineColor,
          }
        }, {
          type: 'line',
          left: 0,
          top: 20,
          shape: {
            x1: 0,
            y1: 0,
            x2: 60,
            y2: 0
          },
          style: {
            stroke: style.lineColor,
          }
        }]
      }, {
        id: name[idx],
        type: 'group',
        left: pos.left + 2,
        top: pos.top - 8,
        children: [{
          type: 'polyline',
          left: 90,
          top: -12,
          shape: {
            points: line
          },
          style: {
            stroke: 'transparent',
            key: name[0]
          },
          onclick: function () {
            var name = this.style.key;
            handleEvents.resetOption(chart, option, name);
          }
        }, {
          type: 'text',
          left: 0,
          top: 'left',
          style: {
            text: name[0] === '甘肃' ? '甘肃' : name[0],
            textAlign: 'left',
            fill: style.textColor,
            font: style.font
          },
          onclick: function () {
            handleEvents.resetOption(chart, option, '甘肃');
          }
        }, {
          type: 'text',
          left: 0,
          top: 20,
          style: {
            text: 'GANSU',
            textAlign: 'center',
            fill: style.textColor,
            font: '12px "Microsoft YaHei", sans-serif',
          },
          onclick: function () {
            handleEvents.resetOption(chart, option, '甘肃');
          }
        }]
      }],
      tooltip: {
        show:true,
        trigger: 'item',
        backgroundColor: 'rgba(166, 200, 76, 0.82)',
        borderColor: '#FFFFCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        formatter: function(params, ticket, callback) {
          console.log(params);

          //根据业务自己拓展要显示的内容
          var res = "";
          var name = params.name;
          var value = params.value[2];
          res = "<span style='color:#fff;'>" + name + "</span><br/>"+tip+'：' + value;
          return res;
        }
      },
      geo: {
        map: opt.mapName,
        // roam: true,
        zoom: 1,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [{
                offset: 0,
                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            shadowColor: 'rgba(128, 217, 248, 1)',
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        },
        regions: opt.activeArea.map(function (item) {
          if (typeof item !== 'string') {
            return {
              name: item.name,
              itemStyle: {
                normal: {
                  areaColor: item.areaColor || '#389BB7'
                }
              },
              label: {
                normal: {
                  show: item.showLabel,
                  textStyle: {
                    color: '#fff'
                  }
                }
              }
            }
          } else {
            return {
              name: item,
              itemStyle: {
                normal: {
                  borderColor: '#91e6ff',
                  areaColor: '#389BB7'
                }
              }
            }
          }
        })
      },
      series: [{
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // symbol: 'diamond',
        showEffectOn: 'render',
        rippleEffect: {
          period: 15,
          scale: 6,
          brushType: 'fill'
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: function (params) {
              return levelColorMap[params.value[3]];
            },
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: handleEvents.initSeriesData(opt.data)
      }]
    };

    chart.setOption(option);
    // 添加事件
    chart.on('click', function (params) {
      var _self = this;
      if (opt.goDown && params.name !== name[idx]) {
        if (cityMap[params.name]) {
          var url = cityMap[params.name];
          $.get(url, function (response) {
            // console.log(response);
            curGeoJson = response;
            echarts.registerMap(params.name, response);
            handleEvents.resetOption(_self, option, params.name);
          });
        }
      }
    });

    chart.setMap = function (mapName) {
      var _self = this;
      if (mapName.indexOf('市') < 0) mapName = mapName + '市';
      var citySource = cityMap[mapName];
      if (citySource) {
        var url = './map/' + citySource + '.json';
        $.get(url, function (response) {
          // console.log(response);
          curGeoJson = response;
          echarts.registerMap(mapName, response);
          handleEvents.resetOption(_self, option, mapName);
        });
      }
      // handleEvents.resetOption(this, option, mapName);
    };

    return chart;
  };

  $.getJSON(gansu, function (geoJson) {
    echarts.registerMap('甘肃', geoJson);
    var myChart = echarts.extendsMap('chart-panel', {
      bgColor: '#154e90', // 画布背景色
      mapName: '甘肃',    // 地图名
      goDown: true,       // 是否下钻
      // 下钻回调
      callback: function(name, option, instance){
        let theMap = {
          "张掖市": zhangye,
          "酒泉市": jiuquan,
          "金昌市": jinchang,
          "武威市": wuwei,
          "白银市": baiyin,
          "兰州市": lanzhou,
          "临夏回族自治州": linixa,
          "甘南藏族自治州": gannan,
          "陇南市": longnan,
          "天水市": tianshui,
          "平凉市": pingliang,
          "庆阳市": qingyang,
          "定西市": dingxi
        }
        mapData.map(mapDataItem => {
          if(name === mapDataItem.name) {
            // 获取json数据，得到每个县的坐标
            if(theMap[name]) {
              var url = theMap[name];
              $.get(url, function (response) {
                const params = {
                  id: mapDataItem.id,
                  type: "district"
                }
                // 获取县级数据
                apiType(params).then(res => {
                    if(res.code === 200) {
                      res.data.mapdata.map(item => {
                        response.eara.map(countyItem => {
                          if(countyItem.name === item.name) {
                            option.series[0].data.push({
                              name: item.name,
                              value: [countyItem.longitude,countyItem.latitude,item.value,countyItem.level]
                            })
                          }
                        })
                      })
                    option.geo.zoom = 1;
                    myChart.setOption(option)
                  }
                })
              })
            }
          }
        })
      },
      // 数据展示
      data: mapData
    });
  })
}
