<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref } from 'vue';
import {getAchievementApi} from "@/apis/charts";

use([
  CanvasRenderer,
  BarChart,
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
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
});

interface DataItem {
  shoeName: string;
  num: number;
  percentage: number;
}

const data = ref<DataItem[]>();

const getAchievement = async () => {
  const res = await getAchievementApi();
  if (res && res.code == 200) {
    data.value = res.data;
    option.value.xAxis.data = data.value!.map((item) => item.shoeName);
    option.value.series[0].data = data.value!.map((item) => item.num);
  }
}

getAchievement();
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
