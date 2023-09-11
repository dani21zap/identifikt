<template>
	<platforms-supported-ecommerces></platforms-supported-ecommerces>
</template>
<script>
export default {
	layout: 'landing',
	head() {
		return {
			title: 'API to every Ecommerce Cart and Marketplace - Ecart API',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						'Unified API for developers looking to connect to multiple carts and marketplaces with a single Web Service. Connect with Ecart, Shopify, Woocommerce, Wix, Magento, Amazon, Mercado Libre, Walmart, Etsy, Magento and more.',
				},
			],
		};
	}
};
</script>