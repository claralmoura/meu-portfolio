<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
}

const { t, tm } = useI18n()

const projects = computed((): Project[] => {
  return tm('projects.items') as Project[]
})

const githubIcon = `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>`
</script>

<template>
  <section id="projects" class="py-16 sm:py-24">
    <h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-12">
      {{ t('projects.title') }}
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="project in projects" 
        :key="project.title"
        class="
          p-6 rounded-2xl flex flex-col
          transition-all duration-300
          border backdrop-blur-lg 
          bg-white/60 border-white/40 shadow-xl shadow-gray-300/50
          dark:bg-white/5 dark:border-white/20 dark:shadow-black/30
        "
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-neutral-900 dark:text-white">{{ project.title }}</h3>
          <div class="flex gap-3">
            <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="text-gray-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white transition-colors w-6 h-6" v-html="githubIcon"></a>
          </div>
        </div>

        <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{{ project.description }}</p>

        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in project.tags" 
            :key="tag"
            class="
              text-xs font-medium py-1 px-3 rounded-full
              border backdrop-blur-sm
              bg-white/40 border-white/50 text-brand-primary
              dark:bg-white/10 dark:border-white/20 dark:text-brand-primary-light
            "
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>