<template>
  <div class='container-fluid'>
    <div class='form-container'>
      <div class='form-group'>
        <label id='all-currency'>All currency: {{ dataLength }}</label>
      </div>
      <div class='form-group'>
        <label for='fromDate'>From Date:</label>
        <input type='date' v-model='fromDate' id='fromDate' />
      </div>
      <div class='form-group'>
        <label for='toDate'>To Date:</label>
        <input type='date' v-model='toDate' id='toDate' />
      </div>
      <div class='form-group'>
        <label for='from'>From:</label>
        <input type='number' v-model='from' id='from' />
      </div>
      <div class='form-group'>
        <label for='size'>Size:</label>
        <input type='number' v-model='size' id='size' />
      </div>
      <div class='form-group'>
        <label for='currency'>Currency:</label>
        <select id='currency' class='form-select' v-model='selectedCurrency'>
          <option value='All'>All selected</option>
          <option v-for='currency in currencies' :key='currency' :value='currency'>{{ currency }}</option>
        </select>
      </div>
      <div class='form-group'>
        <button id='search-button' type='submit'
          @click='Search(fromDate.replaceAll("-", ""), toDate.replaceAll("-", ""), from, size)'>Search</button>
      </div>
    </div>

    <div class='table-container'>
      <table class='styled-table table-striped table-hover'>
        <thead>
          <tr>
            <th scope='col'>Currency</th>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            <th scope='col'>Unit</th>
            <th scope='col'>BuyRate</th>
            <th scope='col'>MiddleRate</th>
            <th scope='col'>SlesRate</th>
            <th scope='col'>Name</th>
            <th scope='col'>DiffRate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='exchangeRate in exchangeRates' :key='exchangeRate.currency'>
            <th scope='row'>{{ exchangeRate.currency ? exchangeRate.currency : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.date ? exchangeRate.date : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.time ? exchangeRate.time : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.unit ? exchangeRate.unit : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.buyRate ? exchangeRate.buyRate : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.middleRate ? exchangeRate.middleRate : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.salesRate ? exchangeRate.salesRate : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.name ? exchangeRate.name : 'No data' }}</th>
            <th scope='row'>{{ exchangeRate.diffRate ? exchangeRate.diffRate : 'No data' }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class='chart-container'>
      <Bar id='chart' :options='chartRates.options' :data='chartRates.rates' />
    </div>
  </div>
</template>

<script setup>
import DataService from '../services/dataService';
import { ref, onMounted, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const today = new Date();
today.setDate(today.getDate() - 1);

const exchangeRates = ref([])
const dataLength = ref();
const fromDate = ref((today.toISOString().slice(0, 10)));
const toDate = ref((new Date().toISOString().slice(0, 10)));
const from = ref(0);
const size = ref(18);
const currencies = ref([]);
const selectedCurrency = ref('All');
const chartRates = computed(() => {
  return {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            font: {
              size: 14,
              weight: 'bold'
            },
            color: '#393737'
          }
        },
        y: {
          ticks: {
            font: {
              size: 14,
              weight: 'bold'
            },
            color: '#393737'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16, 
              weight: 'bold'
            },
            color: '#393737'
          }
        }
      }
    },
    rates: {
      labels: exchangeRates.value.map(rate => rate.date),
      datasets: [
        {
          label: selectedCurrency.value,
          backgroundColor: '#393737',
          data: exchangeRates.value.map(rate => rate.middleRate)
        }
      ]
    }
  };
});

onMounted(() => {
  DataService
    .getAllExchangeRate(fromDate.value.replaceAll('-', ''))
    .then((resp) => {
      exchangeRates.value = resp.data.exchangeRates;
      dataLength.value = resp.data.total;

      const uniqueCurrencies = new Set();
      exchangeRates.value.forEach((rate) => {
        if (rate.currency) {
          uniqueCurrencies.add(rate.currency);
        }
      });

      currencies.value = Array.from(uniqueCurrencies)
    })
    .catch((err) => {
      console.log(err);
    });
});

const Search = (fromDate, toDate, from, size) => {
  exchangeRates.value = [];
  DataService
    .getAllExchangeRate(fromDate, toDate, from, size*18)
    .then((resp) => {
      exchangeRates.value = resp.data.exchangeRates;
      dataLength.value = resp.data.total;

      const uniqueCurrencies = new Set();
      exchangeRates.value.forEach((rate) => {
        if (rate.currency) {
          uniqueCurrencies.add(rate.currency);
        }
      });

      currencies.value = Array.from(uniqueCurrencies)
      filterData();
    })
    .catch((err) => {
      console.log(err);
    });

};

const calculateDateDifferenceInDays = (date1, date2) => {
  const firstDate = new Date(date1.value);
  const secondDate = new Date(date2.value);

  const timeDifference = Math.abs(firstDate.getTime() - secondDate.getTime());

  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
};

const filterData = () => {
  if (selectedCurrency.value === 'All') {
    exchangeRates.value;
  } else {
    const dayDifference = calculateDateDifferenceInDays(toDate, fromDate);

    size.value = dayDifference * 18;
    exchangeRates.value = exchangeRates.value.filter(rate => rate.currency === selectedCurrency.value);
    dataLength.value = exchangeRates.value.length;
  };
};
</script>

<style scoped>
.container-fluid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 10px;
  background-color: #F1F8E8;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  width: 265px;
  padding: 10px;
  background-color: #54b4a0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
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
  margin: 0 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 800px;
  background-color: #54b4a0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table thead tr {
  background-color: #09a183;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 10px 12px;
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
  background-color: #54b4a0;
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

#search-button:hover {
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  border: 1px solid #ccc;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  width: 25rem;
  height: 25rem;
  padding: 20px;
  background-color: #54b4a0;
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
    margin: 15px auto;
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