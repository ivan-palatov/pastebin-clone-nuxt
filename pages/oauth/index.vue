<template>
  <div>Redirecting...</div>
</template>

<script>
export default {
  mounted() {
    localStorage.setItem('token', this.$route.query.token);
    window.opener.location.replace('http://localhost:3000');
    window.close();
  },
};
</script>
