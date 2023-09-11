<template>
	<div class="app-content">
		<forms-apps-form v-show="currentTab === 0" title="Create a New App" @submit="changeCurrentTab"></forms-apps-form>
		<forms-ecommerces-list-checkbox
			v-if="ecommerces.length && appCreated && currentTab === 1"
			:app="appCreated"
			:ecommerces="ecommerces"
		></forms-ecommerces-list-checkbox>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	data() {
		return this.initialData();
	},
	head() {
		return {
			title: 'New App',
		};
	},
	computed: {
		...mapState('ecommerces', ['ecommerces']),
	},

	watch: {
		$route() {
			Object.assign(this.$data, this.initialData());
		},
	},

	methods: {
		initialData() {
			return {
				appName: '',
				appRedirectUrl: '',
				appUrl: '',
				appShortDescription: '',
				appDescription: '',
				publishAppChecked: true,
				appIconFile: [],
				error: '',
				selected: [],
				oauth: {},
				opentItems: false,
				currentTab: 0,
				isLoading: false,
				appCreated: null,
			};
		},
		changeCurrentTab(app) {
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
			this.appCreated = app;
			this.currentTab += 1;
		},
		...mapActions('ecommerces', ['getEcommerces']),
	},

};
</script>

<style lang="scss" scoped>
.card {
	margin-top: 1.5rem;
	border-radius: 3px;
	border: none;

	small {
		color: $gray-500;
		display: block;
		margin-top: 0.25rem;
	}

	input::placeholder {
		font-size: 12px;
		color: $gray-300;
	}

	.image-card {
		padding: 3rem;
		border: 1px solid $gray-300;
		border-radius: 6px;
		text-align: center;
		vertical-align: middle;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		.image-icon {
			max-width: 100%;
			display: inline-block;
			cursor: pointer;

			label,
			span {
				cursor: pointer;
			}

			.fa-image,
			img {
				width: 100%;
				font-size: max(100px, min(150px, 150px));
				color: $blue-400;
			}
		}
	}
}

label {
	margin: 0px;
}

input,
textarea {
	margin-top: 0.5rem;
}
</style>
