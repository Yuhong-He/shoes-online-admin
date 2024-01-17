<template>
  <div id="menu">
    <el-menu
        active-text-color="#fff"
        background-color="#2b2c43"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#c1c1c1"
        router=""
    >
      <component :is="item.children? ElSubMenu : ElMenuItem" v-for="item in menuList" :key="item.id" :index="item.index">
        <template v-if="item.children" #title>
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <span v-if="!item.children">
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </span>
        <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.index">
          {{ subItem.name }}
        </el-menu-item>
      </component>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {Goods, House, User} from "@element-plus/icons-vue";
import type {Component} from "vue";
import { ref } from "vue";
import { ElSubMenu, ElMenuItem } from "element-plus";
import router from "@/router";

const defaultActive = ref<string>(router.currentRoute.value.path);

interface MenuItem {
  id: number;
  name: string;
  index: string;
  icon?: Component;
  children?: MenuItem[];
}

const menuList: MenuItem[] = [
  {
    id: 1,
    name: "Home",
    index: "/home/admin-home",
    icon: House
  },
  {
    id: 2,
    name: "User Manage",
    index: "/home/users",
    icon: User,
  },
  {
    id: 101,
    name: "Product Manage",
    index: "/product-management",
    icon: Goods,
    children: [
      {
        id: 102,
        name: "Product List",
        index: "/home/goods"
      },
      {
        id: 103,
        name: "Brand List",
        index: "/home/brand"
      },
      {
        id: 104,
        name: "Type List",
        index: "/home/type"
      },
      {
        id: 105,
        name: "Color List",
        index: "/home/color"
      },
      {
        id: 106,
        name: "Size List",
        index: "/home/size"
      }
    ]
  }
]
</script>

<style scoped lang="scss">

</style>
