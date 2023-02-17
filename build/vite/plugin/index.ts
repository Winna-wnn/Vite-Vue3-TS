import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import configSvgIconsPlugin from './svg'
import { configThemePlugin } from './theme'
export function getPluginsList(
  isBuild: boolean
): (PluginOption | PluginOption[])[] {

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    createHtmlPlugin()
  ]

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild))

  return vitePlugins
}
