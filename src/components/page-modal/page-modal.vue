<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>

              <!-- 定义插槽 自定义 -->
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>

              <template v-if="item.type === 'textarea'"
                ><el-input
                  v-model="formData[item.prop]"
                  :rows="2"
                  type="textarea"
                  :placeholder="item.placeholder"
                />
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import userSystemStore from '@/pinia/main/system/system'
import type { IProps } from '@/types/IProps_pageModal'

const props = defineProps<IProps>()

const dialogVisible = ref(false)

const initidlData: any = {}
for (const item of props.modalConfig.formItems) {
  initidlData[item.prop] = ''
}

const formData = reactive<any>(initidlData)

const isNewRef = ref(true)
const updateData = ref()

function setDialogVisible(isNew: boolean = true, userRow?: any) {
  // 拦截，不让直接操作ialogVisible
  dialogVisible.value = true

  // 用来判断是否需要显示密码框
  isNewRef.value = isNew

  // 判断不是新建用户，并且拿到用户userRow行数据赋予formData用以回显
  if (!isNew && userRow) {
    for (const key in formData) {
      formData[key] = userRow[key] //编辑
    }
    updateData.value = userRow // 拿到用户行数据,包括id
  } else {
    for (const key in formData) {
      formData[key] = '' //新建时清除上个用户数据
    }
    updateData.value = null
  }
}

// 点击确定 创建/编辑用户
const systemStore = userSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = formData

  if (props.otherInfo) {
    //判断是否有权限菜单menuList，有一起添加发送请求
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && updateData.value) {
    // 编辑
    systemStore.updatePageAction(
      props.modalConfig.pageName,
      updateData.value[props.modalConfig.id],
      infoData
    )
  } else {
    // 创建
    systemStore.newPageAction(props.modalConfig.pageName, infoData)
  }
}

defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
