import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//导入所有图标并进行全局注册

function icons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default icons
