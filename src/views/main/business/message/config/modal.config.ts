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
  pageName: 'message',
  id: 'id', //每个表的id不同
  header: {
    newTitle: '新建业务信息',
    editTitle: '编辑业务信息'
  },
  formItems: [
    {
      type: 'input',
      label: '业务信息',
      prop: 'name',
      placeholder: '请输入业务信息名称'
    },
    {
      type: 'textarea',
      label: '具体信息',
      prop: 'message',
      placeholder: '请输入业务信息名称'
    },
    {
      type: 'select',
      label: '业务分类',
      prop: 'category_id',
      placeholder: '请选择所属业务类别',
      options: []
    }
  ]
}

export default modalConfig
