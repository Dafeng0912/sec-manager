<template>
  <div class="echarts">
    <chart ref="chart1"  :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>
import { get } from "@/api/record"
export default {
  name: 'pie',
  data () {
    return {
      orgOptions: {},
    }
  },
  mounted() {
    get()
    .then(response => {
      console.log(response)
      const countlist = response.list
      this.orgOptions.series[0].data = response.list
    })
    .catch(error => {
      console.log(error);
    });
    this.orgOptions = {
      backgroundColor: '#2c343c',

      title: {
         // 主标题文本，支持使用 \n 换行。
          text: '评论分值饼图',
          // grid离容器上面的距离
          left: 'center',
          top: 20,
          // 主标题文字设置
          textStyle: {
              color: '#ccc'
          }
      },
      // 提示框主键
      tooltip : {
        // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // visualMap 是视觉映射组件，不知道干嘛的
      visualMap: {
          show: false,
          min: 0,
          max: 100,
          // 定义在选中范围中 的视觉元素
          inRange: {
            // colorLightness: 颜色的明暗度
              colorLightness: [0, 1]
          }
      },
      // 系列列表
      series : [
          {
              name:'评价记录',
              type:'pie',
              // 极坐标的半径所占比例
              radius : '55%',
              // 极坐标系的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
              center: ['50%', '50%'],
              data:
              [
                  {value:274, name:'优良'},
                  {value:235, name:'合格'},
                  {value:400, name:'基本合格'},
                  {value:400, name:'不合格'},
              ]
              .sort(function (a, b) { return a.value - b.value; }),
              //  南丁格尔图，通过半径区分数据大小，扇区圆心角展现数据的百分比，半径展现数据的大小。
              roseType: 'radius',
              label: {
                  normal: {
                      textStyle: {
                          color: 'rgba(255, 255, 255, 0.3)'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      lineStyle: {
                          color: 'rgba(255, 255, 255, 0.3)'
                      },
                      smooth: 0.2,
                      length: 10,
                      length2: 20
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#c23531',
                      shadowBlur: 200,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              },
              // 初始动画效果，可选。'scale' 缩放效果，配合设置 animationEasing='elasticOut' 可以做成 popup 的效果。
              animationType: 'scale',
              animationEasing: 'elasticOut',
              // 初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
      ]
    }
  }
}
    </script>
<style>
.echarts{
  width: 100%
}
</style>

