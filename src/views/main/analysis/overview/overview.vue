<template>
  <div class="overview">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="demo-image">
            <img class="image" v-for="item in images" :key="item" :src="item" alt="" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="el-row-logo" :gutter="10">
      <template v-for="item in logoInfo" :key="item.text">
        <el-col :span="4">
          <el-card class="box-card">
            <a :href="item.href" target="_blank">
              <div class="logo">
                <img class="img" :src="item.src" alt="" />
                <p class="text">{{ item.text }}</p>
              </div>
            </a>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="overview">
import { images, logoInfo } from './logo'
</script>

<style scoped>
.demo-image {
  height: 400px;
  overflow-y: scroll;
  cursor: pointer;

  scrollbar-width: thin; /* 适配Firefox */
  scrollbar-color: transparent transparent; /* 适配Firefox */
}

/* ---------------------适配谷歌(隐藏滚动条)-------------------------- */
.demo-image::-webkit-scrollbar {
  width: 6px; /* 调整滚动条宽度 */
}

.demo-image::-webkit-scrollbar-thumb {
  background-color: transparent; /*设置滚动条滑块为透明 */
}

.demo-image::-webkit-scrollbar-track {
  background-color: transparent; /*设置滚动条轨道为透明*/
}
/* ---------------------适配谷歌(隐藏滚动条)-------------------------- */

.demo-image .image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
  width: 100%;
}
.demo-image .image:last-child {
  margin-bottom: 0;
}

.el-row-logo {
  margin-top: 10px;

  .el-col {
    margin-bottom: 10px;
    .box-card {
      width: 100%;
      height: 100%;
    }
  }

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    .img {
      width: 50%;
      height: 50%;
    }

    .text {
      /* padding-top: 5px; */
      font-size: 20px;
      font-weight: 700;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
  }
}
</style>
