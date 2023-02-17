export {}
import type { PropType as VuePropType, VNodeRef as Ref, VNodeChild } from 'vue'

declare global {
  /* const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  }; */
  interface Window {
    // Global vue app instance
    // __APP__: App<Element>;
    webkitCancelAnimationFrame: (handle: number) => void
    mozCancelAnimationFrame: (handle: number) => void
    oCancelAnimationFrame: (handle: number) => void
    msCancelAnimationFrame: (handle: number) => void
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number
    onAreaSelected?: (areaId: string) => void
    changeMark: (isMark: boolean) => void
    sd?: Recordable
  }

  // vue
  type PropType<T> = VuePropType<T>
  type VNodeRef = Ref
  declare type VueNode = VNodeChild | JSX.Element

  // type Result<T = any> = ResponentResult<T>

  type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type Nullable<T> = T | null
  type NonNullable<T> = T extends null | undefined ? never : T
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }

  type Expandable<T = any> = T & { __key__?: number; [key: string]: any }
  type Indexable<T = any> = {
    [key: string]: T
  }
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>

  interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  interface WheelEvent {
    path?: EventTarget[]
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  declare interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_PROXY_DOMAIN: string
    VITE_PROXY_DOMAIN_REAL: string
    VITE_ROUTER_HISTORY: string
    VITE_USE_MOCK: boolean
  }

  function parseInt(s: string | number, radix?: number): number

  function parseFloat(string: string | number): number
}
