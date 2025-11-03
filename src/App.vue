<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsAndContact from './components/SkillsAndContact.vue'
import BackToTop from './components/BackToTop.vue'
import BackgroundManager from './components/BackgroundManager.vue'
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden font-sans antialiased transition-colors duration-300 bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-gray-200"
  >
    <BackgroundManager />

    <Navbar />

    <div class="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <main>
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsAndContact />
      </main>
    </div>

    <BackToTop />
  </div>
</template>

<style scoped></style>
