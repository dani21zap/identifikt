<template>
	<div class="container pt-5 pb-5">
		<h3 class="mb-4">Tarjeta de conductor en línea</h3>
		<p>A continuación se lista la información del conductor para el cual se ingresaron los datos.</p>
		<hr />
		<forms-card class="component-to-save"></forms-card>
		<div class="flex-row justify-content-center adjustSm mt-3">
			<b-button v-wave class="w-32" size="md" variant="primary" :to="{ name: 'home' }">
			Inicio.
			</b-button>

			<b-button v-wave class="w-32" size="md" variant="primary" :to="{ name: 'terms-and-conditions' }">
			Terminos y condiciones.
			</b-button>

			<b-button v-wave class="w-32" size="md" :disabled="isLoading" variant="primary" @click="savePlateCard">
			<i class="fas fa-save"></i>
			Guardar tarjeta
			<custom-spinner v-if="isLoading"></custom-spinner>
			</b-button>
		</div>
	</div>
</template>

<script>
import ServicesMethod from '@/components/services/Method.vue';
import { mapActions, mapState } from 'vuex';
import html2canvas from 'html2canvas';

export default {
	layout: 'simple',
	data() {
		if (!this.$route.query.error) {
			this.$route.query.error = "false";
		}
		return {
			buttons: [
			{
				message: "More information about the ecommerce.",
				nuxtlink: `/platforms/${this.$route.query.ecommerce}`
			},
			{
				message: "Start making API requests.",
				ref: "https://docs.ecartapi.com/?version=latest"
			},
			{
				message: "Log in",
				nuxtlink: "/register"
			}
			],
			isLoading: false,
			title: 'Integration completed',
			params: this.$route.query,
			ecommerce_image: null,
			ecommerce_resources: null,
			platformsUrl: `https://ecartapi.com/platforms/${this.$route.query.ecommerce}`,
			ecommerce: null
		};
	},

	computed: {
		...mapState('userInformation', ['userData']),
	},

	async mounted() {
		// await this.getPlateData(this.$route.params.id);
		// console.log(localStorage.user);
	},

	methods: {
		async savePlateCard(plate_id) {
			this.isLoading = true;
			const componentToSave = document.querySelector('.component-to-save');

			if (componentToSave) {
				const canvas = await html2canvas(componentToSave);

				// Convert the canvas to a data URL
				const imageDataURL = canvas.toDataURL('image/png');

				// Create a temporary anchor element to trigger the download
				const a = document.createElement('a');
				a.href = imageDataURL;
				a.download = `${this.params.id}_card.png`; // Set the filename
				a.click();
			}
			this.isLoading = false;
		}
	},
	...mapActions('userInformation', ['getUserInformation']),
};
</script>

<style>
	.tagResource {
		font-size: 12px;
		text-align: center;
		color: black;
	}
	.button-text {
    	font-weight: 600;
    	font-size: 1rem; /* 16px */
		line-height: 1.5rem; /* 24px */

	}
	@media(max-width: 768px) {
		.optionLink { 
			width: 20%;
		}
		.button-text {
	    	font-size: 0.875rem; /* 14px */
			line-height: 1.25rem; /* 20px */
		}
		.adjustSm {
			display:flex;
			flex-direction: column;
			width: 60%;
    		margin: auto;
		}
	}
</style>