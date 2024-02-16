<template>
  <div class="user">
    <userSearch @query-click="handleQueryClick" @reset-click="handleResetClick"></userSearch>
    <userContent
      ref="contentRef"
      @new-user="handleNewUserClick"
      @update-user="handleUpdateUserClick"
    ></userContent>
    <userModal ref="modalRef"></userModal>
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'

const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(searchForm: any) {
  const { name, realname, cellphone, enable } = searchForm //后端没有对时间范围进行处理，不需要时间范围来进行查询
  contentRef.value?.fecthUsersListData({ name, realname, cellphone, enable })
}
function handleResetClick() {
  contentRef.value?.fecthUsersListData()
}

// 对modal组件操作
const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewUserClick() {
  modalRef.value?.setDialogVisible()
}
function handleUpdateUserClick(userRow: any) {
  modalRef.value?.setDialogVisible(false, userRow)
}
</script>

<style lang="less" scoped></style>
