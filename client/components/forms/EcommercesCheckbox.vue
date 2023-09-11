<template>
	<div v-if="ecommerces.length" class="row">
		<div v-for="ecommerce in ecommerces" :key="ecommerce._id" :class="itemClass">
			<div class="ec-checkbox-button-content">
				<b-form-checkbox v-model="mutable" size="lg"> </b-form-checkbox>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'ecommercesActive',
		event: 'change',
	},

	props: {
		ecommerces: {
			type: Array,
			required: true,
		},

		ecommercesActive: {
			type: Array,
			required: true,
		},
		itemClass: {
			type: String,
			default: 'col-6 col-sm-4 col-md-3 col-lg-2',
		},
	},

	data() {
		return {
			mutable: this.ecommercesActive,
			appInformation: null,
			currentEcommerce: null,
			appId: this.$route.params.id,
			oauth: null,
			isLoading: false,
		};
	},

	watch: {
		mutable(newValue) {
			this.$emit('change', newValue);
		},
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
	display: flex;
	flex-direction: column;
	align-items: center;
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
