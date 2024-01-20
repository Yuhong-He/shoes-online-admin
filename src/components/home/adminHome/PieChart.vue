<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref } from 'vue';
import {getMarketingApi} from "@/apis/charts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const option = ref({
  title: {
    text: 'Marketing Report',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [],
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

interface DataItem {
  typeName: string;
  num: number;
  percentage: number;
}

const data = ref<DataItem[]>();

const getMarketing = async () => {
  const res = await getMarketingApi();
  if (res && res.code == 200) {
    data.value = res.data;
    option.value.legend.data = data.value!.map((item) => item.typeName);
    option.value.series[0].data = data.value!.map((item) => ({
      value: item.num,
      name: item.typeName
    }));
  }
}

getMarketing();
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
