<script setup>
import ExpenseList from './ExpenseList.vue'
import ExpenseHeader from './ExpenseHeader.vue'
</script>

<template>
      <section>
    <ExpenseHeader />
  </section>
    <section>
        <ExpenseList />
        <router-view></router-view>
    </section>
</template>
<style>
</style>