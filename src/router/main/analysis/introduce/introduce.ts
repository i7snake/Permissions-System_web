const introduce = () => import('@/views/main/analysis/introduce/introduce.vue')
export default {
  path: '/main/analysis/introduce',
  name: 'introduce',
  component: introduce,
  children: []
}

/**
 * coderwhy 路由文件自动化工具 自动生成页面文件和路由文件
 * coderwhy add3page_setup(表示vue3) category(文件名) -d src/views/main/business/category(文件路径)
 * 注意，该工具需要规范性 生成的是页面、路由一一对应的关系，用来基于菜单(menu)动态路由管理
 */
