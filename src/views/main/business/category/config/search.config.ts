const searchConfig = {
  pageName: 'category',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '业务名称',
      placeholder: '请输入查询的业务名称'
    },
    {
      type: 'input',
      prop: 'description',
      label: '描述信息',
      placeholder: '请输入查询的描述信息'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
