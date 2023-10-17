<template>
	<div class="container pt-5 pb-5">
		<forms-card title="Agrega un card"></forms-card>
	</div>
</template>

<script>
import ServicesMethod from '@/components/services/Method.vue';
import { mapActions, mapState } from 'vuex';

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
			isLoading: true,
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
		async getPlateData(plate_id) {
			let query = {};
			if (plate_id) {
				query = {plate_id: plate_id};
			}
			try {
				const { data } = await this.$axios.get(`/api/engomados/tarjeta`, );
				this.ecommerce_image = data[0].image;
				this.ecommerce_resources = data[0].resources;
				this.isLoading = false;
			} catch (error) {
				this.showError(error);
			}
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
	}
</style>