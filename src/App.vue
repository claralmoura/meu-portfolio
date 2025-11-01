<script setup>
import { computed } from 'vue'
import { useMouse } from '@vueuse/core'
import { useScroll } from './composables/useScroll'
import Navbar from './components/Navbar.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsAndContact from './components/SkillsAndContact.vue'

const { isScrolled } = useScroll()

const { x, y } = useMouse()
const blobStyle = computed(() => ({
  transform: `translate(${x.value - 192}px, ${y.value - 192}px)`
}))
</script>

<template>
  <div 
    class="
      relative overflow-hidden 
      min-h-screen 
      font-sans antialiased transition-colors duration-300
      bg-neutral-100 text-neutral-800 
      dark:bg-neutral-900 dark:text-gray-200
    "
  >
    
    <div class="absolute top-0 left-0 w-full h-full z-0">
      <div 
        class="
          absolute top-20 -left-20 w-72 h-72 rounded-full 
          filter blur-3xl opacity-50 dark:opacity-20
          animate-blob animate-color-1
        "
      ></div>
      <div 
        class="
          absolute bottom-40 -right-20 w-80 h-80 rounded-full 
          filter blur-3xl opacity-50 dark:opacity-20
          animate-blob [animation-delay:4s] animate-color-2
        "
      ></div>
      <div 
        :style="blobStyle"
        class="
          absolute top-0 left-0 w-96 h-96 rounded-full 
          filter blur-3xl opacity-30 dark:opacity-10
          animate-color-3
          transition-transform duration-500 ease-out
        "
      ></div>
    </div>
    
    <Navbar /> 

    <div class="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <main>
        <AboutSection /> 
        <ExperienceSection /> 
        <ProjectsSection />
        <SkillsAndContact />
      </main>
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
        class="
          fixed top-0 left-0 w-full h-32 
          bg-gradient-to-b 
          from-neutral-100 to-transparent 
          dark:from-neutral-900 dark:to-transparent 
          pointer-events-none z-20
        "
      ></div>
    </transition>
    
    <div class="
      fixed bottom-0 left-0 w-full h-64
      bg-gradient-to-t 
      from-neutral-100 to-transparent 
      dark:from-neutral-900 dark:to-transparent 
      pointer-events-none z-20
    "></div>
    
  </div>
</template>