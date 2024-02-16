const searchConfig = {
  pageName: 'message',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '业务信息',
      placeholder: '请输入查询的业务信息'
    },
    {
      type: 'input',
      prop: 'message',
      label: '详细信息',
      placeholder: '请输入查询的信息字段'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
