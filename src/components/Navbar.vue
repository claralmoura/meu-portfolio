<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'
import { 
  SunIcon, 
  MoonIcon, 
  LanguageIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/vue/24/solid'
import { useScroll } from '../composables/useScroll'

const { t, locale } = useI18n()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const isMobileMenuOpen = ref(false)

const { isScrolled } = useScroll()

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
const toggleLocale = () => {
  locale.value = locale.value === 'pt' ? 'en' : 'pt'
}
</script>

<template>
  <header 
    class="
      sticky top-0 z-30 py-6
      transition-all duration-300 ease-in-out
    "
    :class="{
      'bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl shadow-lg border-b border-gray-900/10 dark:border-white/10': isScrolled,
      '': !isScrolled
    }"
  >
    <div class="max-w-4xl mx-auto flex justify-between items-center px-4 sm:px-0">
      
      <a 
        href="#about" 
        @click="closeMobileMenu" 
        class="text-2xl font-bold text-neutral-800 dark:text-white"
      >
        Clara Lívia
      </a>
      
      <nav class="hidden md:flex gap-6">
        <a href="#about" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">{{ t('navbar.about') }}</a>
        <a href="#experience" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">{{ t('navbar.experience') }}</a>
        <a href="#projects" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">{{ t('navbar.projects') }}</a>
        <a href="#contact" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">{{ t('navbar.contact') }}</a>
      </nav>

      <div class="hidden md:flex items-center gap-4">
        <button 
          @click="toggleDark()" 
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors"
          aria-label="Toggle theme"
        >
          <SunIcon v-if="isDark" class="w-6 h-6" />
          <MoonIcon v-else class="w-6 h-6" />
        </button>
        <button 
          @click="toggleLocale"
          class="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors"
          aria-label="Change language"
        >
          <LanguageIcon class="w-6 h-6" />
          <span class="font-medium">{{ locale.toUpperCase() }}</span>
        </button>
      </div>

      <div class="flex md:hidden items-center gap-4">
        <button 
          @click="toggleLocale"
          class="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors"
          aria-label="Change language"
        >
          <LanguageIcon class="w-6 h-6" />
          <span class="font-medium">{{ locale.toUpperCase() }}</span>
        </button>
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen" 
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <XMarkIcon v-if="isMobileMenuOpen" class="w-7 h-7" />
          <Bars3Icon v-else class="w-7 h-7" />
        </button>
      </div>
    </div> 

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="
          md:hidden fixed top-0 left-0 w-full min-h-screen pt-28 p-6 
          bg-white dark:bg-neutral-900 
          flex flex-col items-center gap-8 z-10
        "
      >
        <a href="#about" @click="closeMobileMenu" class="text-2xl font-medium text-neutral-800 dark:text-gray-200 hover:text-blue-600">{{ t('navbar.about') }}</a>
        <a href="#experience" @click="closeMobileMenu" class="text-2xl font-medium text-neutral-800 dark:text-gray-200 hover:text-blue-600">{{ t('navbar.experience') }}</a>
        <a href="#projects" @click="closeMobileMenu" class="text-2xl font-medium text-neutral-800 dark:text-gray-200 hover:text-blue-600">{{ t('navbar.projects') }}</a>
        <a href="#contact" @click="closeMobileMenu" class="text-2xl font-medium text-neutral-800 dark:text-gray-200 hover:text-blue-600">{{ t('navbar.contact') }}</a>
        
        <hr class="w-full border-gray-200 dark:border-gray-700 my-4" />

        <button 
          @click="toggleDark()" 
          class="flex items-center gap-2 text-xl text-neutral-800 dark:text-gray-200"
        >
          <SunIcon v-if="isDark" class="w-6 h-6" />
          <MoonIcon v-else class="w-6 h-6" />
          <span>{{ t('navbar.toggleTheme') }}</span>
        </button>
      </div>
    </transition>
  </header>
</template>