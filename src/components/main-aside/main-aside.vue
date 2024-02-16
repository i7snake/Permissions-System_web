<template>
  <div class="main-aside">
    <div class="logo">
      <img class="img" src="@/assets/image/logo.jpg" />
      <h2 class="title" v-show="!isFold">人事管理系统</h2>
    </div>

    <!-- 菜单导航 -->
    <div class="menu">
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        :collapse="isFold"
        background-color="#001529"
        :default-active="defaultActive"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="String(subitem.id)" @click="handleItemRoute(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLoginStore from '@/pinia/login/login'
import { mapPathToMenu } from '@/utils/mapMenus'

// 接收main-header中折叠的状态并决定collapse状态
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取动态权限菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 监听submenu子菜单的点击并跳转路由
const router = useRouter()
function handleItemRoute(subitem: any) {
  const url = subitem.url
  router.push(url)
}

//ElMenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return String(pathMenu.id)
})
</script>

<style lang="less" scoped>
.main-aside {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
  .el-menu {
    border-right: none;
    user-select: none;
  }

  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
