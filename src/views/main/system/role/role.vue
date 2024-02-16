<template>
  <div class="role">
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
    <pageModal ref="modalRef" :modal-config="modalConfig" :other-info="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="menuslist"
          show-checkbox
          node-key="menuId"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script setup lang="ts" name="role">
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import userMainStore from '@/pinia/main/main'
import type { ElTree } from 'element-plus'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from '../role/config/search.config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from '../role/config/content.config'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from '../role/config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { mapMenuListToIds } from '@/utils/mapMenus'

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewUserClick, handleUpdateUserClick } = usePageModal(
  editCallback,
  newCallback
)

// 获取完整菜单
const mainStore = userMainStore()
const { menuslist } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// 编辑回显以及新建清空
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

// TODO新建清空
</script>

<style scoped lang="less"></style>
