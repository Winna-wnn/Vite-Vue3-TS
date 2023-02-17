import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { warpperEnv } from './build/index'
import { createProxy } from './build/vite/proxy'
import { getPluginsList } from './build/vite/plugin'
import { optimizeDeps } from './build/config/optimizeDeps'
import { generateModifyVars } from './build/generate/generateModifyVars'

/**
 * @description path resolve
 * @param dir
 * @returns
 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

/**
 * @description Set alias
 */
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@build': pathResolve('build'),
  'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
  // '/#': pathResolve('src/utils'),
}

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root: string = process.cwd()

  const viteEnv = warpperEnv(loadEnv(mode, root))
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY_DOMAIN,
    VITE_PROXY_DOMAIN_REAL
  } = viteEnv
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: { alias },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },

    plugins: getPluginsList(viteEnv, isBuild),
    optimizeDeps,
    // minify="esbuild"
    esbuild: {
      pure: ['console.log', 'debugger']
    },
    build: {
      chunkSizeWarningLimit: 1000,
      /**
       * Uncomment when minify="terser"
       */
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //     pure_funcs: ['console.log']
      //   }
      // },
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    },

    server: {
      https: false,
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: createProxy(VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL)
    }
  }
}
