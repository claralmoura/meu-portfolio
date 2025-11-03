<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpIcon } from '@heroicons/vue/24/solid'
import { useScroll } from '../composables/useScroll'
import { useAnalytics } from '../composables/useAnalytics'

const { y } = useScroll()
const { trackClick } = useAnalytics()

const isButtonVisible = computed(() => y.value > 400)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  trackClick('click_back_to_top')
}
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="isButtonVisible"
      aria-label="Voltar ao topo da página"
      class="fixed bottom-8 right-8 z-40 p-3 rounded-full shadow-2xl border backdrop-blur-lg bg-white/60 border-white/40 text-blue-600 hover:bg-white/80 dark:bg-white/10 dark:border-white/20 dark:text-blue-300 dark:hover:bg-white/20 transition-all duration-300"
      @click="scrollToTop"
    >
      <ArrowUpIcon class="w-6 h-6" />
    </button>
  </transition>
</template>
