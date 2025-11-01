<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { BriefcaseIcon } from '@heroicons/vue/24/solid'

interface ExperienceJob {
  title: string
  company: string
  date: string
  points: string[]
}

const { t, tm } = useI18n()

const experienceJobs = computed((): ExperienceJob[] => {
  return tm('experience.jobs') as ExperienceJob[]
})
</script>

<template>
  <section id="experience" class="py-16 sm:py-24">
    <h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-16">
      {{ t('experience.title') }}
    </h2>

    <div class="relative border-l border-gray-300 dark:border-gray-700 ml-5">
      
      <div 
        v-for="job in experienceJobs" 
        :key="job.title" 
        class="mb-12 ml-10"
      >
        <span class="
          absolute -left-5 
          flex items-center justify-center 
          w-5 h-5 rounded-full 
          ring-8 ring-neutral-100 dark:ring-neutral-900
          border backdrop-blur-lg 
          bg-white/10 border-white/40 shadow-lg
          dark:bg-white/10 dark:border-white/20
        ">
          <BriefcaseIcon class="w-5 h-5 text-brand-primary" />
        </span>

        <div class="
          p-6 rounded-2xl
          transition-all duration-300
          border backdrop-blur-lg 
          bg-white/30 border-white/40 shadow-xl shadow-gray-300/50
          dark:bg-white/5 dark:border-white/20 dark:shadow-black/30
        ">
          <h3 class="flex items-center mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
            {{ job.title }}
          </h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            {{ job.company }} | {{ job.date }}
          </time>
          
          <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li v-for="point in job.points" :key="point">
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>