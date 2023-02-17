<template>
  <div class="template-wrapper">
    <component :is="activeComp" />
    <div class="config-tip" v-show="isMark" v-position.right="currentHoverEl">
      {{ t('openConfig') }}
    </div>
    <!-- <div class="config-area" v-show="isMark" v-position.left="selectedEl">Test</div> -->
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, unref, shallowRef, computed, watch, ref,h } from 'vue'
import { message } from 'ant-design-vue'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
import { useAreaStoreWithOut } from '@/store/modules/area'
import { getHoverElement } from '@/directives/container'
import { useI18n } from './locales/useI18n'
const { t } = useI18n('area')
const props = defineProps({
  path: String
})
const activeComp = shallowRef<any>()

let settingsStore = useAreaStoreWithOut()
const selectedEl = computed(() => settingsStore.getSelectedEl)
const hoverCount = computed(() => settingsStore.getHoverCount)
const isMark = computed(() => settingsStore.getIsMark)
/* const top = ref(0)
const left = ref(0) */
let errTips = [
  h(CloseCircleOutlined),
  t('errTips.title'),
  h('br'),
  t('errTips.p1'),
  h('br'),
  t('errTips.p2')
]

watchEffect(async () => {
  settingsStore.cancelSelected()
  if (unref(props.path)) {
    try {
      const module = ((await import(/* @vite-ignore */`./views/${unref(props.path)}`)) as any)
        .default
      module && (activeComp.value = module)
    } catch {
      message.error({
        content: () => h('div', { style: { textAlign: 'left' } }, errTips),
        icon: () => undefined
      })
    }
  } else {
    activeComp.value = null
  }
})
const currentHoverEl = ref()

watch(
  () => hoverCount.value,
  () => {
    currentHoverEl.value = getHoverElement()[0] ?? null
  }
)
</script>

<style lang="less" scoped>
.template-wrapper {
  position: relative;
}
</style>
