<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        &copy;{{ currentYear }} Pirik Mihály
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  bottom: 0;
  text-align: center;
}
</style>
