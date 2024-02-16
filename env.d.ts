/// <reference types="vite/client" />

// 声明vue文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.mjs'

declare module '*.js'
