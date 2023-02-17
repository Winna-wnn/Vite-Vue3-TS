import 'ant-design-vue/dist/antd.less'
import '@/assets/styles/index.less'
import { createApp, App as VueApp } from 'vue'
import App from './App.vue'

import AntDesign from 'ant-design-vue'
import * as antIcons from '@ant-design/icons-vue'
import router from '@/template/router'
import { setupStore } from '@/store'
import setupGlobDirectives from '@/directives'
import { setupI18n } from '@/locales/setupI18n'
import { initAppConfigStore } from '@/settings/initAppConfig'

function registerGlobComp(app: VueApp<Element>) {
  app.use(AntDesign)
  Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
  })
  app.config.globalProperties.$antIcons = antIcons
}

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  initAppConfigStore()

  registerGlobComp(app)

  await setupI18n(app)

  setupGlobDirectives(app)

  app.use(router).mount('#app')
}

bootstrap()
