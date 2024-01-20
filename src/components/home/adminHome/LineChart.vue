<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref } from 'vue';
import {getOrderApi} from "@/apis/charts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
]);

const option = ref({
  title: {
    text: 'Achievement Report',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});

interface DataItem {
  date: string;
  num: number;
}

const data = ref<DataItem[]>();

const getOrder = async () => {
  const res = await getOrderApi();
  if (res && res.code == 200) {
    data.value = res.data;
    option.value.xAxis.data = data.value!.map((item) => item.date);
    option.value.series[0].data = data.value!.map((item) => item.num);
  }
}

getOrder();
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
