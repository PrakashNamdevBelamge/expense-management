<script setup>
import ExpenseHeader from './components/ExpenseHeader.vue'
localStorage.removeItem('userData')
</script>

<template>

  <router-view />
</template>

<style scoped></style>
