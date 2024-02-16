<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
  <div class="btn">
    <el-button type="primary" plain @click="submitClick">发布</el-button>
  </div>
</template>

<script setup lang="ts" name="chat">
import { onBeforeUnmount, ref, shallowRef } from 'vue'

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { type IToolbarConfig } from '@wangeditor/editor'

// 0.编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 2.内容 HTML
const valueHtml = ref('')

// 3.工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['todo', 'insertLink', 'group-image', 'group-video']
}

// 4.编辑菜单配置
const editorConfig = {
  placeholder: '请输入内容...'
}

// 5.组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 按钮逻辑
const emit = defineEmits(['submit'])

function submitClick() {
  const content = valueHtml.value
  emit('submit', content)
  valueHtml.value = ''
}
</script>

<style scoped lang="less">
.btn {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
