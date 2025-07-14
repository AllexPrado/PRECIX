<template>
  <router-view />
</template>

<script setup>
import router from './router.js'
import { onMounted } from 'vue'
onMounted(() => { router.push('/') })
</script>
