<template>
  <div class="container-fluid">
    <div>
      <div class="form-container">
      <div class="form-group">
        <label>All currency: {{ dataLength }}</label>
      </div>
      <div class="form-group">
        <label for="fromDate">From Date:</label>
        <input type="date" v-model="fromDate" id="fromDate" />
      </div>
      <div class="form-group">
        <label for="toDate">To Date:</label>
        <input type="date" v-model="toDate" id="toDate" />
      </div>
      <div class="form-group">
        <label for="from">From:</label>
        <input type="number" v-model="from" id="from" />
      </div>
      <div class="form-group">
        <label for="size">Size:</label>
        <input type="number" v-model="size" id="size" />
      </div>
    </div class="chart-container">
    <h1>chart</h1>
    </div>

    <div class="table-container">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Unit</th>
            <th scope="col">buyRate</th>
            <th scope="col">middleRate</th>
            <th scope="col">salesRate</th>
            <th scope="col">name</th>
            <th scope="col">diffRate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exchangeRate in exchangeRates" :key="exchangeRate.currency">
            <th scope="row">{{ exchangeRate.currency ? exchangeRate.currency : "No data" }}</th>
            <th scope="row">{{ exchangeRate.date ? exchangeRate.date : "No data" }}</th>
            <th scope="row">{{ exchangeRate.time ? exchangeRate.time : "No data" }}</th>
            <th scope="row">{{ exchangeRate.unit ? exchangeRate.unit : "No data" }}</th>
            <th scope="row">{{ exchangeRate.buyRate ? exchangeRate.buyRate : "No data" }}</th>
            <th scope="row">{{ exchangeRate.middleRate ? exchangeRate.middleRate : "No data" }}</th>
            <th scope="row">{{ exchangeRate.salesRate ? exchangeRate.salesRate : "No data" }}</th>
            <th scope="row">{{ exchangeRate.name ? exchangeRate.name : "No data" }}</th>
            <th scope="row">{{ exchangeRate.diffRate ? exchangeRate.diffRate : "No data" }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import DataService from "../services/dataService";
import { ref } from "vue";

const exchangeRates = ref([])
const dataLength = ref();
const fromDate = ref((new Date().toISOString().slice(0, 10)));
const toDate = ref((new Date().toISOString().slice(0, 10)));
const from = ref(0);
const size = ref(20);

// fromDate.value.replaceAll('-', ''), toDate.value.replaceAll('-', ''), from.value, size.value
DataService.getAllExchangeRate()
  .then((resp) => {
    exchangeRates.value = resp.data.exchangeRates;
    dataLength.value = resp.data.total;
    console.log(fromDate.value.replaceAll('-', ''));
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<style scoped>
.container-fluid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 20px;
  background-color: #f5f5f5;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  margin-left: 6rem;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.form-group input[type="number"] {
  width: 100%;
}

.table-container {
  margin: 0rem 0rem 0rem 8rem;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  flex: 1;
}

@media (max-width: 768px) {
  .container-fluid {
    flex-direction: column;
  }

  .form-container {
    width: 100%;
    margin-bottom: 20px;
    margin-left: 0px;
  }

  .table-container {
    width: 100%;
    margin: 0px;
  }
}
</style>