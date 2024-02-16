<template>
  <div class="department">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>
    <pageContent
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewUserClick"
      @update-click="handleUpdateUserClick"
    ></pageContent>
    <pageModal ref="modalRef" :modalConfig="modalConfigRef"></pageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'
import userMainStore from '@/pinia/main/main'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作 (获取全部部门列表信息,添加进options)
const modalConfigRef = computed(() => {
  const mainStore = userMainStore()
  const departments = mainStore.departments.map((item) => {
    return { label: item.name, value: item.departmentId }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options = [] // 清空原有的数据 避免重复添加
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

// setup相同的逻辑的抽取: hooks
// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
const { modalRef, handleNewUserClick, handleUpdateUserClick } = usePageModal()
</script>

<style lang="less" scoped></style>
