<template>
  <div id="menu">
    <el-menu
        active-text-color="#fff"
        background-color="#2b2c43"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#c1c1c1"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {Document, Goods, House, Setting, User} from "@element-plus/icons-vue";
import type {Component} from "vue";

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
    name: "User Management",
    index: "/home/users",
    icon: User,
  },
  {
    id: 101,
    name: "Product Management",
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
