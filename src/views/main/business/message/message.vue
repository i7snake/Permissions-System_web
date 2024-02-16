<template>
  <div class="message">
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

    <pageModal ref="modalRef" :modal-config="modalConfigRef"> </pageModal>
  </div>
</template>

<script setup lang="ts" name="message">
import { computed } from 'vue'
import userMainStore from '@/pinia/main/main'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//对modalConfig进行操作 (获取全部类别列表信息,添加进options)
const modalConfigRef = computed(() => {
  const mainStore = userMainStore()

  const categorys = mainStore.categoryList.map((item) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'category_id') {
      item.options = []
      item.options?.push(...categorys)
    }
  })
  return modalConfig
})

// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
const { modalRef, handleNewUserClick, handleUpdateUserClick } = usePageModal()
</script>

<style scoped></style>
