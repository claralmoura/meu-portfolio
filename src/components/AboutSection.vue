<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import GithubIcon from './icons/GithubIcon.vue'
import LinkedinIcon from './icons/LinkedinIcon.vue'

const { t } = useI18n()

const target = ref<HTMLElement | null>(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

const tiltStyle = computed(() => {
  if (isOutside.value) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out',
    }
  }
  const maxTilt = 5
  const centerX = elementWidth.value / 2
  const centerY = elementHeight.value / 2
  const normalizedX = (elementX.value - centerX) / centerX
  const normalizedY = (elementY.value - centerY) / centerY
  const tiltY = normalizedX * maxTilt
  const tiltX = -normalizedY * maxTilt
  return {
    transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    transition: 'transform 0.05s linear',
  }
})

const profilePicture = new URL('../assets/minha-foto.jpg', import.meta.url).href
</script>

<template>
  <section id="about" ref="target" class="py-16 sm:py-24">
    <div
      :style="tiltStyle"
      class="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 p-6 md:p-12 rounded-3xl bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl shadow-gray-300/20 dark:shadow-black/20 transition-all duration-500"
    >
      <div class="w-48 md:w-64 flex-shrink-0 relative">
        <img
          :src="profilePicture"
          alt="Foto de Clara Lívia"
          class="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover mx-auto border-4 border-white/40 dark:border-white/20 shadow-lg dark:shadow-xl dark:shadow-black/30"
        />
        <div
          class="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-400/30 to-pink-400/30 filter blur-3xl opacity-50 dark:opacity-20 -z-10"
        ></div>
      </div>

      <div class="flex-1 text-center md:text-left">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-3 text-neutral-900 dark:text-white">
          {{ t('about.title') }}
        </h2>
        <p class="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('about.description') }}
        </p>

        <div class="flex flex-wrap gap-4 justify-center md:justify-start">
          <a
            :href="t('contact.linkedinUrl')"
            target="_blank"
            class="flex items-center gap-2 font-medium py-3 px-5 rounded-xl border border-blue-600/30 dark:border-blue-800/70 bg-blue-600/20 dark:bg-blue-800/30 text-blue-800 dark:text-blue-400 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <LinkedinIcon class="w-5 h-5" />
            {{ t('buttons.linkedin') }}
          </a>

          <a
            :href="t('contact.githubUrl')"
            target="_blank"
            class="flex items-center gap-2 font-medium py-3 px-5 rounded-xl border border-white/30 dark:border-white/20 bg-white/30 dark:bg-white/10 text-neutral-800 dark:text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <GithubIcon class="w-5 h-5" />
            {{ t('buttons.github') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
