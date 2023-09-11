<template>
	<!-- BEGIN #content -->
	<div class="container-fluid pt-12 pb-12 sm:pt-26 sm:pb-26 lg:pt-32 lg:pb-32">
		<h1 class="text-center mb-4 pricing-title font-weight-bold">Our Pricing</h1>
		<table-prices-container></table-prices-container>
	</div>
	<!-- END #content -->
</template>

<script>
export default {
	layout: 'landing',
	head() {
		return {
			title: 'Prices',
		};
	},
};
</script>
