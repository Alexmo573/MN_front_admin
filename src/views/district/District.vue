<template>
  <div class="">
    <!-- 面包屑导航 -->
    <!--el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="nav" :to="{ path: '/district'}">投诉管理</el-breadcrumb-item>
      <el-breadcrumb-item  >处理投诉</el-breadcrumb-item>
    </el-breadcrumb-->
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
.nav:hover{
  cursor: pointer;
}
</style>
