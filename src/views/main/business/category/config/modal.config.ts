// 配置文件类型(为了解决options: never[])
interface IModal {
  pageName: string
  id: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

const modalConfig: IModal = {
  pageName: 'category',
  id: 'id', //每个表的id不同
  header: {
    newTitle: '新建业务',
    editTitle: '编辑业务'
  },
  formItems: [
    {
      type: 'input',
      label: '业务名称',
      prop: 'name',
      placeholder: '请输入业务名称'
    },
    {
      type: 'input',
      label: '描述信息',
      prop: 'description',
      placeholder: '请输入描述信息'
    },
    {
      type: 'select',
      label: '负责人',
      prop: 'user_id',
      placeholder: '请选择业务负责人',
      options: []
    }
  ]
}

export default modalConfig
