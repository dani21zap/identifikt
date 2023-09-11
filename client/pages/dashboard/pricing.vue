<template>
    <!-- BEGIN #content -->
    <div class="app-content">
        <h1 class="row justify-content-center mb-4 pricing-title">
            Our Pricing
        </h1>
        <p class="row justify-content-center">
           Receive instant price discounts when your application reaches to the next request limits.
        </p>

       <table-prices-container></table-prices-container>


   <!--  </div> -->


    </div>
    <!-- END #content -->
</template>

<script>
export default {
	head() {
		return {
			title: 'Prices',
		};
	},
};
</script>

<style lang="scss" scoped>
.fa-check-circle {
	color: $brand;
}

.box {
	padding: 0;
}

.box p {
	margin: 1rem;
}

.pricing-title {
	font-size: 3rem;
	font-weight: bold;
}

h1 span {
	font-size: 1rem;
}
</style>
