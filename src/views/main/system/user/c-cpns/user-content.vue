<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUser">新建用户</el-button>
    </div>

    <div class="table">
      <el-table :data="usersList" style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column align="center" type="index" label="序号" width="70px" />

        <el-table-column align="center" label="用户名" prop="name" width="160px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="160px" />
        <el-table-column align="center" label="手机号" prop="cellphone" width="160px" />
        <el-table-column align="center" label="状态" prop="enable" width="120px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'success' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
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
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import userSystemStore from '@/pinia/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

// 定义事件
const emit = defineEmits(['newUser', 'updateUser'])

// 用户的权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
// const isQuery = usePermissions('users:query')

// 分页逻辑1
const currentPage = ref(1)
const pageSize = ref(10)

const systemStore = userSystemStore()
// 页码操作(action)后返回第一页
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'deleteUserIdAction' || name === 'newUserAction' || name === 'updateUserAction') {
      currentPage.value = 1
    }
  })
})
fecthUsersListData()

// 获取usersList
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 分页逻辑2
function handleSizeChange() {
  fecthUsersListData()
}
function handleCurrentChange() {
  fecthUsersListData()
}

// 网络请求封装
function fecthUsersListData(searchForm: any = {}) {
  // 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 发起action 获取用户列表
  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postUserListAction(queryInfo)
}

// 删除/新建/编辑操作
function handleDelete(id: number) {
  systemStore.deleteUserIdAction(id)
}
function handleNewUser() {
  emit('newUser')
}
function handleUpdate(userRow: any) {
  emit('updateUser', userRow)
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
