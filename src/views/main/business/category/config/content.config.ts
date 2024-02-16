const contentConfig = {
  pageName: 'category',
  header: {
    title: '业务列表',
    btnTitle: '新建业务'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },

    { type: 'normal', label: '业务名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '描述信息', prop: 'description', width: '300px' },
    { type: 'normal', label: '业务负责人', prop: 'user.realname', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '150px', id: 'id' }
  ]
}

export default contentConfig
