<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { EnvelopeIcon } from '@heroicons/vue/24/solid'
import GithubIcon from './icons/GithubIcon.vue'
import LinkedinIcon from './icons/LinkedinIcon.vue'
import { useAnalytics } from '../composables/useAnalytics'

interface SkillCategory {
  name: string
  items: string[]
}
interface ContactInfo {
  title: string
  description: string
  email: string
  linkedinUrl: string
  githubUrl: string
}

const { t, tm } = useI18n()
const { trackClick } = useAnalytics()
const skillCategories = computed((): SkillCategory[] => (tm('skills.categories') as SkillCategory[]) || [])
const contactInfo = computed((): ContactInfo => (tm('contact') as ContactInfo) || {})
</script>

<template>
  <div class="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
    <section id="skills">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-center text-neutral-900 dark:text-white mb-12">
        {{ t('skills.title') }}
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="category in skillCategories" :key="category.name" class="card-glass p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            {{ category.name }}
          </h3>

          <div class="flex flex-col gap-1.5">
            <span
              v-for="item in category.items"
              :key="item"
              class="px-3 py-1.5 rounded-lg text-sm bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/20 text-neutral-800 dark:text-white transition-colors duration-200 hover:bg-white/50 dark:hover:bg-white/20"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="text-center">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
        {{ t('contact.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        {{ t('contact.description') }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          :href="contactInfo.linkedinUrl"
          target="_blank"
          class="contact-btn w-full sm:w-auto"
          @click="() => trackClick('click_linkedin', { section: 'contact' })"
        >
          <LinkedinIcon class="w-6 h-6" />
          <span>LinkedIn</span>
        </a>
        <a
          :href="contactInfo.githubUrl"
          target="_blank"
          class="contact-btn w-full sm:w-auto"
          @click="() => trackClick('click_github', { section: 'contact' })"
        >
          <GithubIcon class="w-6 h-6" />
          <span>GitHub</span>
        </a>
        <a
          :href="`mailto:${contactInfo.email}`"
          class="contact-btn w-full sm:w-auto"
          @click="() => trackClick('click_email')"
        >
          <EnvelopeIcon class="w-6 h-6" />
          <span>E-mail</span>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.card-glass {
  @apply bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg transition-all duration-300;
}
.card-glass:hover {
  @apply scale-[1.03] shadow-xl;
}

.contact-btn {
  @apply flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-lg border backdrop-blur-md bg-white/50 dark:bg-white/10 border-white/50 dark:border-white/20 text-neutral-800 dark:text-white transition-all duration-300 hover:scale-105 hover:bg-white/70 dark:hover:bg-white/20;
}
</style>
