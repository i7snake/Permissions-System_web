const contentConfig = {
  pageName: 'message',
  header: {
    title: '业务信息列表',
    btnTitle: '新建业务信息'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },

    { type: 'normal', label: '业务信息', prop: 'name', width: '150px' },
    { type: 'normal', label: '详细信息', prop: 'message' },
    { type: 'normal', label: '所属业务', prop: 'category.categoryName', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt', width: '170px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '170px' },

    { type: 'handler', label: '操作', width: '150px', id: 'id' }
  ]
}

export default contentConfig
