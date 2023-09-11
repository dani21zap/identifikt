<template>
	<div>
		<landing-main-hero></landing-main-hero>
		<!-- <landing-why-ecart-api></landing-why-ecart-api> -->
		<!-- <landing-benefits-carousel></landing-benefits-carousel> -->
		<!-- <landing-supported-ecommerces></landing-supported-ecommerces>
		<landing-data-collections></landing-data-collections>
		<landing-we-work-with></landing-we-work-with> -->
		<landing-mexico-seguro></landing-mexico-seguro>
	</div>
</template>

<script>
export default {
	layout: 'landing',
	head() {
		return {
			title: 'API to every Ecommerce Cart and Marketplace',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						'Unified API for developers looking to connect to shopping carts and marketplaces with a multichannel web service. Connect with Ecart, Shopify, Woocommerce, Wix, Magento, Amazon, Mercado Libre, Walmart, Etsy, Magento and more.',
				}
			],
			link: [
				{ 
					rel: 'canonical', 
					type: 'image/x-icon', 
					href:`${process.env.ECARTAPI_URL}/home` 
				},
			]
		};
	},
	data() {
	    return {
	        cookies: this.$cookies,
	    };
	 },
};
</script>
