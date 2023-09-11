<template>
	<div class="container pt-5 pb-5">
		<div v-if="isLoading" class="d-flex justify-content-center">
			<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
			<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_yyEACKuU0a.json"  background="transparent"  speed="1"  style="width: 50%; height: 50%;"  loop  autoplay></lottie-player>
		</div>
		<div v-else>
			<img class="rounded mb-3" width="100"  :src="ecommerce_image" />
			<!-- <img class="rounded" width="200" :src="`/images/integrations/${params.ecommerce.toLowerCase()}.png`" /> -->
			<h2>{{params.ecommerce}} Integration completed.</h2>
			<p>The e-commerce integration has been completed below is the information of your store. Log in for further details.</p>
			<div class="box">
				<div class="row">
					<div class="col-md">
						<b-form-group label="E-commerce">
							<b-form-input v-model="params.ecommerce || '' " disabled></b-form-input>
						</b-form-group>
						<b-form-group label="Store URL">
							<b-form-input v-model="params.url || '' " readonly></b-form-input>
						</b-form-group>

						<b-form-group label="Error">
							<b-form-input v-model="params.error || '' " readonly></b-form-input>
						</b-form-group>
					</div>
				</div>
			</div>

			<h4>Store Access Token</h4>
			<div class="box">
				<b-form-group class="mb-0">
					<b-input-group>
						<template #append>
							<btn-clipboard :text="params.access_token"></btn-clipboard>
						</template>
						<b-form-input v-model="params.access_token" readonly></b-form-input>
					</b-input-group>
				</b-form-group>
			</div>

			<h4>Available resources</h4>
			<div class= "row d-flex justify-content-between">
				<div 
				v-if="ecommerce_resources"
				v-for = "resource in ecommerce_resources"
				class="box m-1">
					<span 
					target="_blank"
					class="align-items-center m-1 tagResource text-decoration-none">
						<i :class = "`fa ${resource ? resource.complement.icon_b : null}`"></i>
						<span class="ml-1">{{resource ? resource.complement.title : null}}</span>
					</span>
				</div>
			</div>
			<div class="row d-flex justify-content-center mt-3">
				<div v-for="button in buttons">
					<a v-if="button.ref" :href="button.ref" target="_blank" class="d-inline-block m-1 text-white rounded-pill pr-5 pl-5 pt-2 pb-2 bg-brand button-text">{{button.message}}</a>
					<NuxtLink  v-if="button.nuxtlink" :to="button.nuxtlink" target="_blank" class="d-inline-block m-1 text-white rounded-pill pr-5 pl-5 pt-2 pb-2 bg-brand button-text">{{button.message}}</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ServicesMethod from '@/components/services/Method.vue';

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

	async mounted() {
		await this.getEcommerce(this.$route.query.ecommerce);
	},

	methods: {
		async getEcommerce() {
			try {
				const { data } = await this.$axios.get(`/api/plate/${this.$route.query.placa}`);
				this.ecommerce_image = data[0].image;
				this.ecommerce_resources = data[0].resources;
				this.isLoading = false;
			} catch (error) {
				this.showError(error);
			}
		}
	}
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