<template>
	<div class="text-center">
		<h3>Ecommerce Platforms</h3>
		<p>
			Select the e-commerces that can be integrated into your application. By default they will all be visible on the integration page.
		</p>

		<div class="row">
			<b-form-group v-if="type === 'link'" class="col-md-6 mx-auto">
				<b-input-group prepend-html="<i class='fas fa-search'></i>">
					<b-form-input id="filter-input" v-model="filter" type="text" placeholder="Search"></b-form-input>
				</b-input-group>
			</b-form-group>
		</div>

		<b-table
			v-if="appInformation"
			id="table-stores"
			ref="table"
			:items="ecommercesFiltered"
			:fields="type === 'link' ? fields : fieldsCheckbox"
			:busy.sync="isBusy"
			:filter="filter"
			stacked="md"
			:per-page="perPage"
			:current-page="currentPage"
			show-empty
		>
			<template #emptyfiltered>
				<empty-content-filtered></empty-content-filtered>
			</template>

			<template #cell(e-commerce)="data">
				<div class="d-flex justify-content-left md:justify-content-start">
					<img width="50" class="d-inline-block mr-4" :src="data.item.image" />
					<div class="d-flex d-flex-row justify-content-center align-items-center">
						<nuxt-link :to="{ path: `/dashboard/apps/${appId}/settings/${data.item.name}` }" class="text-blue-500">{{
							data.item.name
						}}</nuxt-link>
					</div>
				</div>
			</template>

			<template #cell(status)="data">
				<ecommerce-btn-status 
				:status="activeEcommerces.includes(data.item._id)" 
				:ecommerce_data="data.item" 
				:app_keys= "data.item.required_app_keys && appInformation.oauth ? appInformation.oauth[data.item.name.toLowerCase()] || null : null"
				></ecommerce-btn-status>
			</template>

			<template #table-busy>
				<div class="text-center pt-5 pb-5">
					<!-- <b-spinner class="align-middle"></b-spinner>
					<strong>Loading...</strong> -->
					<b-skeleton-table :columns="2" :rows="10"></b-skeleton-table>
				</div>
			</template>
		</b-table>

		<b-pagination v-if="rows > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="table-stores"> </b-pagination>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	props: {
		type: {
			type: String,
			default: 'link',
		},
		appInformation: {
			type: Object,
			required: false,
		},
	},

	data() {
		return {
			activeEcommerces: [],
			appName: '',
			appRedirectUrl: '',
			appUrl: '',
			appShortDescription: '',
			appDescription: '',
			publishAppChecked: true,
			appIconFile: [
				{
					url: null,
				},
			],

			fields: ['e-commerce', 'status'],
			fieldsCheckbox: ['check', 'e-commerce'],
			isBusy: false,
			perPage: 300,
			currentPage: 1,
			filter: '',
			appId: this.$route.params.id,
		};
	},

	computed: {
		ecommercesFiltered() {
			if (this.filter === '') {
				return this.ecommerces;
			}
			return this.ecommerces.filter(ec => ec.name.toLowerCase().includes(this.filter.toLowerCase()));
		},
		rows() {
			return this.ecommerces.length;
		},
		...mapState('ecommerces', ['ecommerces']),
	},
	async created() {
		if (this.type === 'link') {
			if (this.ecommerces.length) {
				this.activeEcommerces = this.appInformation.ecommerces.map(ec => ec._id);
			} else {
				this.$nuxt.$on('loadEcommerces', () => {
					this.activeEcommerces = this.appInformation.ecommerces.map(ec => ec._id);
				});
			}
		}
	},

	methods: {
		...mapActions('ecommerces', ['getEcommerces']),
	},
};
</script>

<style lang="scss">
#table-stores {
	th:first-child {
		text-align: left;
		> div {
			display: inline-block;
		}
	}
}
</style>
