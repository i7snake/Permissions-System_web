import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(editCallback?: CallbackFnType, newCallback?: CallbackFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewUserClick() {
    modalRef.value?.setDialogVisible()

    if (newCallback) newCallback()
  }
  function handleUpdateUserClick(userRow: any) {
    modalRef.value?.setDialogVisible(false, userRow)

    if (editCallback) editCallback(userRow)
  }

  return {
    modalRef,
    handleNewUserClick,
    handleUpdateUserClick
  }
}

export default usePageModal
