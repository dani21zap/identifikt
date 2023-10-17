<template>
  <div>
    <h2>Logout Page</h2>
  </div>
</template>

<script>
export default {
  created() {
    this.logout();
  },
  methods: {
    logout() {
		this.$cookiz.remove('token');
		this.$axios.setHeader('Authorization', null);
		this.$router.push('/home');
    }
  }
}
</script>