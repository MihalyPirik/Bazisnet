<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        &copy; {{ currentYear }} Pirik Mihály
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
  background-color: #55AD9B;
  padding: 0.5rem 0;
  position: fixed;
  width: 100%;
  bottom: 0;
  text-align: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.footer .content p {
  margin: 0;
  font-size: 1rem;
  font-size: 16px;
  font-weight: 500;
}
</style>