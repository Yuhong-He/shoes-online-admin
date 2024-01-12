<template>
  <div id="login">
    <div class="login-box">
      <div class="logo">
        <el-image style="width: 100px; height: 100px" src="public/favicon.ico" fit="fill" :lazy="true" />
      </div>
      <el-form>
        <el-form-item>
          <el-input class="input" placeholder="Username" clearable :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input class="input" placeholder="Password" clearable show-password :prefix-icon="Lock" />
        </el-form-item>
        <div class="btns">
          <el-button type="primary" class="btn">Login</el-button>
          <button class="btn reset">Reset</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">

import {User, Lock} from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: linear-gradient(to right, #2b2c43, #1e3158);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 360px;
    height: 450px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .logo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: 0 0 4px 2px #9fa1a5;
      margin-bottom: 30px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-form {
      width: 90%;
      margin-top: 30px;
      .input {
        height: 40px;
        :deep(.el-input__wrapper) {
          border-radius: 20px;
          border: 1px solid #000;
        }
      }
      .btns {
        display: flex;
        flex-direction: column;
        align-items: center;
        .btn {
          width: 100%;
          height: 40px;
          border-radius: 20px;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .reset {
          margin-top: -20px;
          text-align: center;
          border: none;
          background: transparent;
        }
      }
    }
  }
}
</style>
