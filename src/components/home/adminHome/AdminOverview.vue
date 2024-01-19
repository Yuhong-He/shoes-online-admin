<template>
  <div id="overview">
    <div class="userinfo">
      <el-avatar :src="userInfoStore.userinfo?.avater" />
      <span class="username">{{ userInfoStore.userinfo?.nickname }}</span>
    </div>
    <div class="overview-list">
      <div class="overview-item" v-for="item in overviewData.allData" :key="item.id">
        <div class="title">{{ item.name }}</div>
        <div class="number">{{ item.number }}</div>
      </div>
    </div>
    <div class="overview-list">
      <div class="overview-item" v-for="item in overviewData.orderData" :key="item.id">
        <div class="title">{{ item.name }}</div>
        <div class="number">{{ item.number }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useUserInfoStore} from "@/stores/userInfo.store";

const userInfoStore = useUserInfoStore();

interface SingleData {
  id: number;
  name: string;
  number: string;
}

interface OverviewData {
  allData: SingleData[];
  orderData: SingleData[];
}

const overviewData = ref<OverviewData>({
  allData: [
    {
      id: 1,
      name: "Revenue",
      number: "836,387"
    },
    {
      id: 2,
      name: "Visits",
      number: "1,342,629"
    },
    {
      id: 3,
      name: "Paid",
      number: "993,851"
    },
    {
      id: 4,
      name: "Favorites",
      number: "1,031,753"
    }
  ],
  orderData: [
    {
      id: 1,
      name: "Order Today",
      number: "264"
    },
    {
      id: 2,
      name: "Total Cash",
      number: "3,564"
    },
    {
      id: 3,
      name: "Order Month",
      number: "4,523"
    },
    {
      id: 4,
      name: "Total Cash",
      number: "125,551"
    }
  ]
})
</script>

<style scoped lang="scss">
#overview {
  .userinfo {
    display: flex;
    align-items: center;
    .username {
      margin-left: 10px;
    }
  }
  .overview-list {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    .overview-item {
      width: 22%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: var(--el-box-shadow-light);
      border-radius: 10px;
      padding: 20px;
      .title {
        font-weight: 600;
        margin-bottom: 10px;
      }
      .number {
        font-size: 18px;
      }
    }
  }
}
</style>
