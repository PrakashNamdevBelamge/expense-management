<template>
  <div>
    <RouterLink to="/expenses">
                <v-btn class="success-btn" style="padding: 10px 10px;margin-right: 20px;">
                    Back To List
                </v-btn>
            </RouterLink>
  </div>
    <div>
      <canvas id="pieChart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import { useExpenseStore } from '../stores/ExpenseStore'
  import { userStore } from '../stores/UserStore'

  const useUserStore = userStore();
  const expenseStore = useExpenseStore();
  Chart.register(...registerables);
  let colors = ['#FF6384', '#36A2EB', '#FFCE56','#4BC0C0', '#9966FF'];
  const response = expenseStore.getExpensesReport(useUserStore.user[0].id,'current');
  console.log(response.reports);
  let label = [];
  let amount = [];
  response.then(res=>{
    console.log(res);

res.reports.forEach(element => {
  label.push(element.category);
  amount.push(element.amount);
});
colors = colors.slice(0, label.length);
openChart();
  })
  const chartInstance = ref(null);
  const openChart = () =>{
    const ctx = document.getElementById('pieChart').getContext('2d');
  
  // Create a new pie chart
  chartInstance.value = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: label,
      datasets: [
        {
          label: 'Votes',
          data: amount, // Your data values
          backgroundColor: colors, // Colors
          hoverOffset: colors.length, // Hover offset
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
  }

  
  </script>
  
  <style scoped>
 canvas {
  width: 500px;
  height: 400px;
  max-width: 500px;
  margin: auto;
}
</style>
  