<template>
  <div class="container-fluid">
    <div class="form-container">
      <div class="form-group">
        <label id="all-currency">All currency: {{ dataLength }}</label>
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
      <div class="form-group">
        <label for="currency">Currency:</label>
        <select id="currency" class="form-select">
          <option value="">All selected</option>
          <option value="1">BGN</option>
        </select>
      </div>
      <div class="form-group">
        <button id="search-button" type="submit" @click="Search(fromDate.replaceAll('-', ''), toDate.replaceAll('-', ''), from, size)">Search</button>
      </div>
    </div>

    <div class="table-container">
      <table class="styled-table table-striped table-hover">
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

    <div class="chart-container">
      <h1>chart</h1>
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
const size = ref(18);

DataService.getAllExchangeRate()
  .then((resp) => {
    exchangeRates.value = resp.data.exchangeRates;
    dataLength.value = resp.data.total;
    console.log(fromDate.value.replaceAll('-', ''));
  })
  .catch((err) => {
    console.log(err);
  });

const Search = (fromDate, toDate, from, size) => {
  console.log("search");
  DataService
    .getAllExchangeRate(fromDate, toDate, from, size)
    .then((resp) => {
      exchangeRates.value = resp.data.exchangeRates;
      dataLength.value = resp.data.total;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
.container-fluid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 20px;
  background-color: #F1F8E8;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  width: 350px;
  margin-left: 1rem;
  margin-right: 0.5rem;
  padding: 20px;
  background-color: #55AD9B;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin: 5px auto;
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
  width: 200px;
}

.form-group select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.table-container {
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  background-color: #55AD9B;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table thead tr {
  background-color: #009879;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody {
  background-color: #F1F8E8;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table tbody tr:hover {
  background-color: #55AD9B;
  cursor: pointer;
}

#search-button {
  padding: 10px 20px;
  font-size: 16px;
  width: 150px;
  background-color: #393737;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 5px auto;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-right: 1rem;
  margin-left: 0.5rem;
  padding: 20px;
  background-color: #55AD9B;
  border: 1px solid #ccc;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .container-fluid {
    flex-direction: column;
  }

  .form-container {
    width: 100%;
    margin: auto 0;
  }

  .table-container {
    padding: 0;
  }

  #search-button {
    padding: 5px 10px;
    font-size: 16px;
    background-color: #393737;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin: 0px 0px;
  }

  #all-currency {
    margin: 1rem;
  }

  .chart-container {
    width: 100%;
    margin: auto 0;
  }
}
</style>