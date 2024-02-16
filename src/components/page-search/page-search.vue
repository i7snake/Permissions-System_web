<template>
  <div class="search" v-if="isQuery">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleReset">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQuery">查询</el-button>
    </div>
  </div>
</template>
<!-- ======================== 除了user,其他的系统管理界面都进行封装 ===============================  -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import type { IProps } from '@/types/IProps_pageSearch'
import usePermissions from '@/hooks/usePermissions'

// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// TS中props需要定义类型 类型就是传递进来的数据
const props = defineProps<IProps>()

// 查看是否有查询权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 1.输入绑定Form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}

const searchForm = reactive(initialForm)

// 2.重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleReset() {
  // 1.重置表单数据
  formRef.value?.resetFields()
  // 2.重新刷新数据
  emit('resetClick')
}

// 3.查询操作
function handleQuery() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
