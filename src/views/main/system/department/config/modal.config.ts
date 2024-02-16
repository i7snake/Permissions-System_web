// 配置文件类型(解决options: never[])
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
  pageName: 'department',
  id: 'departmentId', //每个表的id不同
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: []
    }
  ]
}

export default modalConfig
