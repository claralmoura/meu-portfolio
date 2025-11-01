<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import GithubIcon from './icons/GithubIcon.vue'

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  key: string
}

const { t, tm } = useI18n()

const projects = computed((): Project[] => {
  return (tm('projects.items') as Project[]) || []
})

function getColorAnimation(index: number): string {
  const colorClasses: string[] = [
    'bg-blue-300/30 dark:bg-blue-600/30',
    'bg-pink-300/30 dark:bg-pink-600/30',
    'bg-green-300/30 dark:bg-green-600/30',
    'bg-amber-300/30 dark:bg-amber-600/30',
  ]

  const positionClasses: string[] = [
    'top-1/3 -left-20',
    'top-2/3 -right-20',
    'bottom-0 -left-10',
    'bottom-1/4 right-1/4',
  ]

  const i = index % colorClasses.length
  return `${colorClasses[i]} ${positionClasses[i]} animate-blob`
}

function getDemoImage(key: string): string {
  try {
    return new URL(`../assets/${key}.png`, import.meta.url).href
  } catch {
    return new URL('../assets/project-placeholder.jpg', import.meta.url).href
  }
}
</script>

<template>
  <section id="projects" class="py-16 sm:py-24">
    <h2 class="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-12 text-center">
      {{ t('projects.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="(project, index) in projects"
        :key="project.title"
        class="relative card-glass group p-6 rounded-2xl flex flex-col overflow-visible transition-all duration-500 border backdrop-blur-2xl bg-white/20 border-white/30 shadow-xl shadow-gray-300/20 dark:bg-white/5 dark:border-white/20 dark:shadow-black/30 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02]"
      >
        <div
          :class="getColorAnimation(index)"
          class="absolute w-64 h-64 rounded-full blur-3xl opacity-25 dark:opacity-10 -z-10 transition-all duration-500 mix-blend-soft-light"
          :style="{ animationDelay: `${index * 1.2}s` }"
        ></div>

        <div class="relative z-10 flex flex-col h-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white">
              {{ project.title }}
            </h3>
            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white transition-colors w-6 h-6"
            >
              <GithubIcon />
            </a>
          </div>

          <div
            class="mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-w-16 aspect-h-9 group relative"
          >
            <img
              :src="getDemoImage(project.key)"
              :alt="`Demo do projeto ${project.title}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-3 mt-auto">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-sm font-medium py-2 px-4 rounded-full bg-white/30 border border-white/20 backdrop-blur-md shadow-inner shadow-white/20 dark:bg-white/5 dark:border-white/10 dark:shadow-black/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 100%);
  transform: translateX(-100%) skewX(-15deg);
  opacity: 0;
  transition: all 0.8s ease-in-out;
  border-radius: inherit;
  pointer-events: none;
}

.card-glass:hover::before {
  transform: translateX(100%) skewX(-15deg);
  opacity: 1;
}

.card-glass:hover {
  backdrop-filter: blur(24px) saturate(160%);
}
</style>
