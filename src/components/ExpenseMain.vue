<script setup>
import ExpenseHeader from './ExpenseHeader.vue'
</script>

<template>
      <section>
    <ExpenseHeader />
  </section>
    <section>
      <router-view></router-view>
    </section>
</template>
<style>
</style>