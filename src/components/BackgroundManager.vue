<script setup lang="ts">
import { computed } from 'vue'
import { useMouse } from '@vueuse/core'
import { useScroll } from '../composables/useScroll'

const { isScrolled } = useScroll()
const { x, y } = useMouse()

const blobStyle = computed(() => ({
  transform: `translate(${x.value - 200}px, ${y.value - 200}px)`,
}))
</script>

<template>
  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none backdrop-blur-[60px] backdrop-saturate-[180%]">
    <div
      class="absolute top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-300/50 to-indigo-400/40 dark:from-blue-700/20 dark:to-indigo-800/20 blur-[120px] opacity-60 dark:opacity-40 animate-blob"
    ></div>

    <div
      class="absolute bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-pink-300/50 to-purple-400/40 dark:from-pink-700/20 dark:to-purple-800/20 blur-[140px] opacity-60 dark:opacity-40 animate-blob"
      style="animation-delay: 4s"
    ></div>

    <div
      :style="blobStyle"
      class="absolute top-0 left-0 w-[22rem] h-[22rem] rounded-full bg-gradient-to-br from-emerald-300/50 to-cyan-400/40 dark:from-emerald-600/20 dark:to-cyan-700/20 blur-[120px] opacity-60 dark:opacity-40 transition-transform duration-500 ease-out will-change-transform"
    ></div>
  </div>

  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isScrolled"
      class="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-neutral-100/90 to-transparent dark:from-neutral-900/90 dark:to-transparent pointer-events-none z-20"
    ></div>
  </transition>

  <div
    class="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-neutral-100/90 to-transparent dark:from-neutral-900/90 dark:to-transparent pointer-events-none z-20"
  ></div>
</template>

<style scoped>
@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -20px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 25px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 14s infinite ease-in-out;
}
</style>
