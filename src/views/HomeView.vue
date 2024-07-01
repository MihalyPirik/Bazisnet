<template>
  <div>
    <h1>teszt</h1>
  </div>
</template>

<script setup>
import DataService from "../services/dataService";
import { ref } from "vue";
import TableComponent from "../components/TableComponent.vue";

const exhangeRates = ref([])

DataService.getAllExchangeRate()
  .then((resp) => {
    exhangeRates.value = resp;
    console.log(exhangeRates.value);
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<style scoped></style>