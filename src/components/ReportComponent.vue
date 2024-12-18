<script setup>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useExpenseStore } from '../stores/ExpenseStore'
import { userStore } from '../stores/UserStore'
import { useRouter } from 'vue-router';

const router = useRouter();
const useUserStore = userStore();
const expenseStore = useExpenseStore();
const type = ref('currentmonth');
const durations = ref([{ text: 'Current Month', value: 'currentmonth' }, { text: 'Last Six Months', value: 'sixmonth' }, { text: 'Last One Year', value: 'oneyear' }]);
Chart.register(...registerables);
let colorCodes = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
let label = [];
let amount = [];
let colors = [];
const getReportData = () => {
  label = [];
  amount = [];
  const response = expenseStore.getExpensesReport(useUserStore.user[0].id, type.value);
  console.log(response.reports);

  response.then(res => {

    res.reports.forEach(element => {
      label.push(element.category);
      amount.push(element.amount);
    });
    colors = colorCodes.slice(0, label.length);
    openChart();
  })
}
getReportData();
const chartInstance = ref(null);
const openChart = () => {

  const ctx = document.getElementById('pieChart').getContext('2d');
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
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
const backToList = () => {
  router.push({ path: '/expenses' })
}
const exportPDF = () => {
  expenseStore.exportExpenseAsPDF(useUserStore.user[0].id, type.value);
}

</script>



<template>
  <div class="btn-container">

    <h4 @click="backToList" class="back-btn">
      <- Back To List </h4>
        <v-btn class="export-btn" @click="exportPDF">Export As PDF</v-btn>
  </div>

  <v-card>
    <v-card-title class="card-title dark-blue">
      <div> Expense Report</div>

      <div style="height: 20px;width: 20%;">
        <v-select name="designation" v-model="type" :items="durations" item-title="text" item-value="value"
          @update:modelValue="getReportData" />
      </div>
    </v-card-title>

    <canvas id="pieChart"></canvas>
  </v-card>
</template>


<style scoped>
canvas {
  width: 400px;
  height: 400px;
  max-width: 400px;
  margin: auto;
}

.card-title {
  font-weight: bold !important;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
}

.back-btn {
  padding: 10px 10px;
  margin-right: 20px;
  color: darkblue
}

.export-btn {
  margin-right: 20px;
  background-color: darkblue;
  color: white;
  font-weight: bold;
}

.btn-container {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
}
</style>