/**
 * @description Env handle
 * @param envConf
 * @returns
 */
export const warpperEnv = (envConf: Recordable): ViteEnv => {
  // This is the default value, no need to modify
  const ret: ViteEnv = {
    VITE_PORT: 3100,
    VITE_PUBLIC_PATH: '',
    VITE_PROXY_DOMAIN: '',
    VITE_PROXY_DOMAIN_REAL: '',
    VITE_ROUTER_HISTORY: '',
    VITE_USE_MOCK: false
  }

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
/**
 * @description Cross-domain proxy rewrite
 * @param path
 * @param reg
 * @returns
 */
export const regExps = (path: string, reg: string): string => {
  return path.replace(new RegExp(`^${reg}`, 'g'), '')
}
/**
 * @description Environment variable
 * @returns
 */
export const loadEnv = (): ViteEnv => {
  return import.meta.env
}
