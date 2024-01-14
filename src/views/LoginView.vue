<template>
  <div id="login">
    <div class="login-box">
      <div class="logo">
        <el-image style="width: 100px; height: 100px" src="public/favicon.ico" fit="fill" :lazy="true" />
      </div>
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input class="input" v-model="form.username" placeholder="Username" clearable :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="input" v-model="form.password" placeholder="Password" clearable show-password :prefix-icon="Lock" />
        </el-form-item>
        <div class="btns">
          <el-button type="primary" class="btn" @click="login">Login</el-button>
          <div class="btn reset" @click="reset">Reset</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {User, Lock} from "@element-plus/icons-vue";
import { ref } from "vue";
import type {FormInstance} from "element-plus";
import { rules } from "@/rules/userinfo";
import {loginApi} from "@/apis/login";
import { useUserInfoStore } from "@/stores/userInfo.store";
import {ElMessage} from "element-plus";
import router from "@/router";

const userInfoStore = useUserInfoStore();

interface Form {
  username: string;
  password: string;
}

const form = ref<Form>({
  username: "",
  password: ""
})

const formRef = ref<FormInstance>();

const reset = () => {
  formRef.value?.resetFields();
}

const login = async () => {
  const res = await loginApi(form.value);
  if (res && res.code == 200) {
    userInfoStore.setAuth(res.data.token);
    ElMessage.success("Login Success");
    router.push("/").then(() => {});
  }
}
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
          margin-top: -10px;
          text-align: center;
          border: none;
          background: transparent;
        }
        .reset:hover {
          color: red;
        }
        .reset:active {
          color: yellow;
        }
      }
    }
  }
}
</style>
