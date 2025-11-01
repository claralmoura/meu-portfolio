import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 10)

export function useScroll() {
  return { isScrolled }
}