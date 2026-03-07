<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <LandingNavbar />

    <main class="grow">
      <HeroSection />
      <FeaturesSection />
      <RegistrationForm />
    </main>

    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import LandingNavbar from "../components/landing/LandingNavbar.vue";
import HeroSection from "../components/landing/HeroSection.vue";
import FeaturesSection from "../components/landing/FeaturesSection.vue";
import RegistrationForm from "../components/landing/RegistrationForm.vue";
import LandingFooter from "../components/landing/LandingFooter.vue";
</script>
