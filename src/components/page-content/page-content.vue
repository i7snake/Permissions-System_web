<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUser">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>

    <div class="table">
      <el-table :data="pageList" style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleUpdate(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="isDelete"
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDelete(scope.row[item.id])"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <!-- 为什么不能指定type 因为这里使用 v-bind绑定全部 type也会绑定显示不了树型 -->
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { IProps } from '@/types/IProps_pageContent'

import userSystemStore from '@/pinia/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

const props = defineProps<IProps>()

// 定义事件
const emit = defineEmits(['newClick', 'updateClick'])

// 0.获取是否有对应的增删改权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
// const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起action，请求usersList的数据
const systemStore = userSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
// 页码操作(action)后返回第一页
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'deletePageIdAction' || name === 'newPageAction' || name === 'updatePageAction') {
      currentPage.value = 1
    }
  })
})

fecthUsersListData()

// 2.获取List数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fecthUsersListData()
}
function handleCurrentChange() {
  fecthUsersListData()
}

// 网络请求封装
function fecthUsersListData(searchForm: any = {}) {
  // if (!isQuery) return // 没有按钮权限不进行列表数据请求

  // 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 发起action 获取列表
  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除/新建/编辑操作
function handleDelete(id: number) {
  systemStore.deletePageIdAction(props.contentConfig.pageName, id)
}
function handleNewUser() {
  emit('newClick')
}
function handleUpdate(userRow: any) {
  emit('updateClick', userRow)
}

defineExpose({ fecthUsersListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
  .table {
    :deep(.el-table__cell) {
      padding: 14px 0;
    }
    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
