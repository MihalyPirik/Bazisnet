<script setup>
import { RouterView } from 'vue-router';
import Nav from './components/NavComponent.vue';
import Footer from './components/FooterComponent.vue';
</script>

<template>
  <Nav />
  <router-view/>
  <Footer />
</template>

<style scoped>
</style>
