<template>
  <div id="header">
    <div class="logo-box">
      Shoes Online
    </div>
    <div class="right-box">
      <div class="title">Management System</div>
      <div class="avatar-box">
        <el-avatar :src="userInfoStore.userinfo?.avater" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserInfoStore} from "@/stores/userInfo.store";

const userInfoStore = useUserInfoStore();
</script>

<style scoped lang="scss">
#header {
  background-color: #2b2c44;
  color: #fff;
  display: flex;
  justify-content: space-between;

  .logo-box {
    width: 200px;
    text-align: center;
    line-height: 60px;
    font-size: 22px;
    font-weight: bold;
    color: #e73267;
  }

  .right-box {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    .el-avatar {
      margin-right: 10px;
    }
  }
}
</style>
