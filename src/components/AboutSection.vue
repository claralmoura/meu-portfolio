<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const { t } = useI18n()

const target = ref<HTMLElement | null>(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

const tiltStyle = computed(() => {
  if (isOutside.value) {
    return { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)', transition: 'transform 0.5s ease-out' }
  }
  const maxTilt = 5
  const centerX = elementWidth.value / 2
  const centerY = elementHeight.value / 2
  const normalizedX = (elementX.value - centerX) / centerX
  const normalizedY = (elementY.value - centerY) / centerY
  const tiltY = normalizedX * maxTilt
  const tiltX = -normalizedY * maxTilt
  return { transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`, transition: 'transform 0.05s linear' }
})

const linkedinIcon = `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>`
const githubIcon = `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>`

const profilePicture = new URL('../assets/minha-foto.jpg', import.meta.url).href
</script>

<template>
  <section id="about" ref="target" class="py-16 sm:py-24">
    <div 
      :style="tiltStyle"
      class="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 p-6 md:p-12 rounded-3xl
             bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10
             shadow-xl shadow-gray-300/20 dark:shadow-black/20 transition-all duration-500"
    >
      <div class="w-48 md:w-64 flex-shrink-0 relative">
        <img 
          :src="profilePicture" 
          alt="Foto de Clara Lívia" 
          class="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover mx-auto
                 border-4 border-white/40 dark:border-white/20 shadow-lg dark:shadow-xl dark:shadow-black/30"
        >
        <div class="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-400/30 to-pink-400/30
                    filter blur-3xl opacity-50 dark:opacity-20 -z-10"></div>
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
            class="flex items-center gap-2 font-medium py-3 px-5 rounded-xl
                   border border-blue-600/30 dark:border-blue-800/70
                   bg-blue-600/20 dark:bg-blue-800/30 text-blue-800 dark:text-blue-400
                   shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span class="w-5 h-5" v-html="linkedinIcon"></span>
            {{ t('buttons.linkedin') }}
          </a>

          <a 
            :href="t('contact.githubUrl')" 
            target="_blank"
            class="flex items-center gap-2 font-medium py-3 px-5 rounded-xl
                   border border-white/30 dark:border-white/20
                   bg-white/30 dark:bg-white/10 text-neutral-800 dark:text-white
                   shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span class="w-5 h-5" v-html="githubIcon"></span>
            {{ t('buttons.github') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
