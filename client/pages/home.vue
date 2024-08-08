<template>
	<div>
		<landing-main-hero></landing-main-hero>
		<landing-gobierno></landing-gobierno>
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
