import type { RouteRecordRaw } from 'vue-router'

function localLocalRoutes() {
  // 5.1.我们根据菜单拿到所有文件，并自动生成对应关系
  // 接下来需要将路由的独立文件中的路由对象读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // 5.2.将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

/**
 * 根据菜单去匹配正确的路由，添加动态路由；获取用户登录成功第一个被匹配的菜单。
 * @param userMenus 用户的菜单
 * @returns
 */
export function mapMenusToRoutes(userMenus: any[]) {
  // 5.3.加载本地路由
  const localRoutes = localLocalRoutes()
  let firstMenu: any = null // 将firstMenu设为函数内的变量 确保不同用户之间不会共享状态

  // 5.4.根据菜单去匹配正确的路由(动态添加：router.addRouter())
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //5.7.针对面包屑顶层菜单的重定向功能(添加一次)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 5.5
        routes.push(route)
      }
      // 5.6.记录每个用户第一个被匹配到的菜单(在firstMenu为空 && route) 添加，并且只添加一次第一个
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return { routes, firstMenu }
}

/**
 *根据路径去匹配需要显示的菜单(main页面的菜单高亮)
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 *定义面包屑 遍历获取层级菜单（顶层、匹配菜单）
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 * @returns 返回面包屑 breadcrumbs
 */
interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }

  return breadcrumbs
}

/**
 * 由于是el-tree 组件 只需要遍历最低层的菜单id便可以回显勾选上层菜单
 * @param meneuList 递归遍历menuList 的menuId
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      // 判断是否有children 并且是否是空数组因为最底是没东西的
      if (item.children && item.children.length !== 0) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuList)

  return ids
}

/**
 * 获取菜单映射的按钮权限
 * @param meneuList 菜单列表
 * @returns 按钮权限数组
 */
export function mapMenusToPermissions(meneuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }

  recurseGetPermission(meneuList)

  return permissions
}
