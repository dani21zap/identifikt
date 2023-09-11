<template>
	<div class="app-content">
		<forms-ecommerces-form v-if="appInformation && ecommerces.length" :ecommerces="ecommerces" :app="appInformation"></forms-ecommerces-form>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	data() {
		return {
			appInformation: null,
		};
	},

	computed: {
		...mapState('ecommerces', ['ecommerces']),
	},

	async mounted() {
		await this.getAppInformation();
	},

	methods: {
		async getAppInformation() {
			try {
				// Get app information
				const { data } = await this.$axios.get(`/api/apps/${this.$route.params.id}`);
				this.appInformation = data;
			} catch (err) {
				this.showError(err);
			}
		},
		...mapActions('ecommerces', ['getEcommerces']),
	},
};
</script>

<style lang="scss" scoped>
.ec-checkbox-button-content .ecommerce-image {
	width: 80px;
	background-size: contain;
	background-repeat: no-repeat;
	height: 80px;
	background-position: center;
}

.ec-shop-title {
	font-weight: bold;
	align-self: center;
	display: none;

	@media screen and (min-width: 768px) {
		display: block !important;
	}
}

.ec-checkbox-button-content {
	padding-bottom: 30px;
}

.ec-checkbox-div {
	cursor: pointer !important;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

input[type='checkbox']:checked + .ec-checkbox-div {
	box-shadow: inset 0px 0px 50px $primary;
}

@media (max-width: 768px) {
	.ec-checkbox-button-content .ec-checkbox-div .ecommerce-image {
		background-position: center;
		margin: 0 auto;
	}
	h1 {
		font-size: 25px;
	}
	h2 {
		font-size: 22px !important;
	}
	.continue-text {
		font-size: 20px !important;
	}
	.search-mobile {
		font-size: 1em !important;
		border-radius: 0px 2px 2px 0px !important;
	}
}

.img-fluid {
	height: 80px;
	object-fit: contain;
	max-width: 80px;
}

.checkbox {
	display: grid;
	// grid-template-columns: repeat (2, 1fr) !important;
}
</style>
