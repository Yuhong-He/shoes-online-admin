<template>
  <div class="wrap">
    <AdminOverview class="item"></AdminOverview>
    <PieChart class="item"></PieChart>
    <BarChart class="item"></BarChart>
    <LineChart class="item"></LineChart>
  </div>
</template>

<script setup lang="ts">
import AdminOverview from "@/components/home/adminHome/AdminOverview.vue";
import PieChart from "@/components/home/adminHome/PieChart.vue";
import BarChart from "@/components/home/adminHome/BarChart.vue";
import LineChart from "@/components/home/adminHome/LineChart.vue";
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-wrap: wrap;
  box-shadow: var(--el-box-shadow-light);
  .item {
    width: 50%;
    height: calc((100vh - 60px - 40px) / 2);
    min-height: 360px;
    padding: 20px;
    border: 1px solid #f5f5f5;
  }
}
</style>
