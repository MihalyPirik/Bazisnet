<template>
  <div class='container-fluid'>
    <div class="row justify-content-center">
      <div class='form-container'>
        <div class='form-group'>
          <input type='number' v-model='fromCurrency' id='fromCurrency' />
          <select id='fromCurrencySelect' class='form-select' v-model='fromCurrencySelected'>
            <option v-for='currency in currencies' :key='currency' :value='currency'>{{ currency }}</option>
          </select>
        </div>
        <div class='form-group'>
          <input type='number' v-model='toCurrency' id='toCurrency' readonly />
          <select id='toCurrencySelect' class='form-select' v-model='toCurrencySelected'>
            <option v-for='currency in currencies' :key='currency' :value='currency'>{{ currency }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataService from '../services/dataService';
import { ref, onMounted, computed, watch } from 'vue';

const today = new Date();
today.setDate(today.getDate() - 1);

const fromDate = ref((today.toISOString().slice(0, 10)));
const fromCurrency = ref(1);
const fromCurrencyValue = ref(1);
const fromCurrencySelected = ref('EUR');
const toCurrency = ref(0);
const toCurrencyValue = ref(0);
const toCurrencySelected = ref('HUF');
const fromUnit = ref(1);
const toUnit = ref(1);
const exchangeRates = ref([]);
const currencies = ref([]);

onMounted(() => {
  DataService
    .getAllExchangeRate(fromDate.value.replaceAll('-', ''))
    .then((resp) => {
      exchangeRates.value = resp.data.exchangeRates;

      const uniqueCurrencies = new Set();
      exchangeRates.value.forEach((rate) => {
        if (rate.currency) {
          uniqueCurrencies.add(rate.currency);
        }
      });

      currencies.value = Array.from(uniqueCurrencies)
      currencies.value.unshift('HUF');
    })
    .catch((err) => {
      console.log(err);
    });
});

const calculatedToCurrency = computed(() => {
  if (!fromCurrencySelected.value || !toCurrencySelected.value || fromCurrency.value === 0) {
    return 0;
  }

  fromCurrencyValue.value = exchangeRates.value.find(rate => rate.currency === fromCurrencySelected.value)?.middleRate || 1;
  toCurrencyValue.value = exchangeRates.value.find(rate => rate.currency === toCurrencySelected.value)?.middleRate || 1;

  fromUnit.value = exchangeRates.value.find(rate => rate.currency === fromCurrencySelected.value)?.unit || 1;
  toUnit.value = exchangeRates.value.find(rate => rate.currency === toCurrencySelected.value)?.unit || 1;

  const result = (fromCurrency.value * fromCurrencyValue.value / fromUnit.value) / (toCurrencyValue.value / toUnit.value);
  return parseFloat(result.toFixed(2));
});

watch(calculatedToCurrency, (newValue) => {
  toCurrency.value = newValue;
});

</script>

<style scoped>
.container-fluid {
  padding: 10px;
  background-color: #F1F8E8;
  margin-top: 10vh;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  padding: 30px;
  background-color: #54b4a0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  margin: 5px auto;
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 150px;
  margin-right: 10px
}

.form-group select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80px;
}


@media (max-width: 768px) {
  .form-container {
    width: 90%;
    margin: auto 0;
  }
}
</style>