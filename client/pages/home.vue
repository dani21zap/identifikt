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
			title: 'IDENTIFI-K-T',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						'Asociación civil enfocada a defender el patrimonio de las familias mexicas, especializadas en la regularización e importación de vehiculos.',
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
