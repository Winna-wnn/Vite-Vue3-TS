<template>
  <a-layout>
    <a-layout-content>
      <router-view>
        <template #default="{ Component }">
          <component :is="Component" />
        </template>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<style lang="less" scoped>
.ant-layout {
  min-height: 100vh;
}
</style>
