<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon, LanguageIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useScroll } from '../composables/useScroll'
import { useAnalytics } from '../composables/useAnalytics'

const { t, locale } = useI18n()
const { trackClick } = useAnalytics()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const isMobileMenuOpen = ref(false)

const { isScrolled } = useScroll()

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
const toggleLocale = () => {
  locale.value = locale.value === 'pt' ? 'en' : 'pt'
  trackClick('click_toggle_locale', { locale: locale.value })
}

const trackNavClick = (link: string) => {
  trackClick('click_nav', { link })
  closeMobileMenu()
}
</script>

<template>
  <header
    class="sticky top-0 z-30 py-4 transition-all duration-300 ease-in-out /* Fundo Glassmorphism constante */ bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl border-b border-white/20 dark:border-white/10"
    :class="{
      'shadow-lg shadow-gray-300/40 dark:shadow-black/60': isScrolled,
    }"
  >
    <div class="max-w-4xl mx-auto flex justify-between items-center px-4 sm:px-0">
      <a
        href="#about"
        class="text-2xl font-bold text-neutral-800 dark:text-white"
        @click="() => trackNavClick('about')"
      >
        Clara Lívia
      </a>

      <nav class="hidden md:flex gap-6">
        <a href="#about" class="nav-link" @click="() => trackNavClick('about')">{{ t('navbar.about') }}</a>
        <a href="#experience" class="nav-link" @click="() => trackNavClick('experience')">{{
          t('navbar.experience')
        }}</a>
        <a href="#projects" class="nav-link" @click="() => trackNavClick('projects')">{{ t('navbar.projects') }}</a>
        <a href="#contact" class="nav-link" @click="() => trackNavClick('contact')">{{ t('navbar.contact') }}</a>
      </nav>

      <div class="hidden md:flex items-center gap-3">
        <button
          class="icon-btn"
          aria-label="Toggle theme"
          @click="
            () => {
              toggleDark()
              trackClick('click_toggle_theme', { theme: isDark ? 'dark' : 'light' })
            }
          "
        >
          <MoonIcon v-if="isDark" class="w-6 h-6" />
          <SunIcon v-else class="w-6 h-6" />
        </button>

        <button class="icon-btn flex gap-1 items-center" aria-label="Change language" @click="toggleLocale">
          <LanguageIcon class="w-6 h-6" />
          <span class="font-medium">{{ locale.toUpperCase() }}</span>
        </button>
      </div>

      <div class="flex md:hidden items-center gap-3">
        <button class="icon-btn flex gap-1 items-center" @click="toggleLocale">
          <LanguageIcon class="w-6 h-6" />
          <span class="font-medium">{{ locale.toUpperCase() }}</span>
        </button>
        <button class="icon-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <XMarkIcon v-if="isMobileMenuOpen" class="w-7 h-7" />
          <Bars3Icon v-else class="w-7 h-7" />
        </button>
      </div>
    </div>

    <transition name="fade-slide">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden fixed inset-0 z-20 flex flex-col items-center gap-8 p-6 pt-24 min-h-screen bg-white/80 dark:bg-neutral-900/80 backdrop-blur-3xl"
      >
        <a
          href="#about"
          class="text-2xl font-medium text-neutral-800 dark:text-white hover:text-blue-600"
          @click="() => trackNavClick('about')"
          >{{ t('navbar.about') }}</a
        >
        <a
          href="#experience"
          class="text-2xl font-medium text-neutral-800 dark:text-white hover:text-blue-600"
          @click="() => trackNavClick('experience')"
          >{{ t('navbar.experience') }}</a
        >
        <a
          href="#projects"
          class="text-2xl font-medium text-neutral-800 dark:text-white hover:text-blue-600"
          @click="() => trackNavClick('projects')"
          >{{ t('navbar.projects') }}</a
        >
        <a
          href="#contact"
          class="text-2xl font-medium text-neutral-800 dark:text-white hover:text-blue-600"
          @click="() => trackNavClick('contact')"
          >{{ t('navbar.contact') }}</a
        >

        <hr class="w-full border-gray-300 dark:border-gray-700 my-4" />

        <button
          class="flex items-center gap-2 text-xl text-neutral-800 dark:text-white"
          @click="
            () => {
              toggleDark()
              trackClick('click_toggle_theme', { theme: isDark ? 'dark' : 'light' })
            }
          "
        >
          <MoonIcon v-if="isDark" class="w-6 h-6" />
          <SunIcon v-else class="w-6 h-6" />
          <span>{{ t('navbar.toggleTheme') }}</span>
        </button>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav-link {
  @apply text-neutral-700 dark:text-gray-300 hover:text-neutral-900 dark:hover:text-white transition-colors relative font-medium;
}
.nav-link::after {
  content: '';
  @apply block h-0.5 bg-neutral-500 dark:bg-white absolute left-0 -bottom-1 w-0 transition-all duration-300;
}
.nav-link:hover::after {
  @apply w-full;
}

.icon-btn {
  @apply p-2 rounded-lg transition-colors duration-300 
         text-neutral-700 dark:text-gray-300 
         hover:bg-white/40 dark:hover:bg-white/10;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
