import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

// 在这里调用加载本地数据  registerStore 注册store
function registerStore(app: App<Element>) {
  // 1.因为是在pinia里定义 所以需要注册pinia后使用
  app.use(pinia)

  // 2.加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
