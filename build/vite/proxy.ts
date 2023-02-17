// import { regExps } from '../index'
import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>
export function createProxy(
  VITE_PROXY_DOMAIN: string,
  VITE_PROXY_DOMAIN_REAL: string
): ProxyTargetList | undefined {
  return VITE_PROXY_DOMAIN_REAL.length > 0
    ? {
        [VITE_PROXY_DOMAIN]: {
          target: VITE_PROXY_DOMAIN_REAL,
          ws: true,
          changeOrigin: true
          /* rewrite: (path: string) =>
            path.replace(new RegExp(`^${VITE_PROXY_DOMAIN}`), '') */
        }
      }
    : undefined
}
