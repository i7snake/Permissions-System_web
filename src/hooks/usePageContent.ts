import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(searchForm: any) {
    // const { name, leader, createAt } = searchForm
    contentRef.value?.fecthUsersListData(searchForm)
  }
  function handleResetClick() {
    contentRef.value?.fecthUsersListData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
