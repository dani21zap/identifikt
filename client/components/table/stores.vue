<template>
	<!-- BEGIN #content -->
	<div class="text-center">
		<div class="row">
			<b-form-group :hidden="filters.q === '' && rows === 0" class="col-md-6 ml-auto">
				<b-input-group prepend-html="<i class='fas fa-search'></i>">
					<b-form-input id="apps-search" v-model="filters.q" type="text" placeholder="Search" debounce="600"></b-form-input>
				</b-input-group>
			</b-form-group>
		</div>

		<div class="theme-table w-100">
			<div class="custom-header-2" :hidden="filters.q === '' && stores === 0">
				<div>
					<p class="pb-0">Total Results: {{ rows }}</p>
				</div>

				<a
					v-wave
					:href="new_store_button_link"
					target="_blank"
					class="btn-new-app cursor-pointer text-lg"
				>
					<i class="fas fa-plus-circle mr-1 fas-lg"></i> New Store
				</a>
			</div>
			<div class="theme-table d-flex justify-content-start">
			<b-table
				v-if="ecommerces"
				id="table-stores"
				class="mx-auto m-2"
				ref="table"
				:items="getAppStores"
				:fields="fields"
				:busy.sync="isBusy"
				:filter="filters"
				stacked="md"
				:per-page="perPage"
				:current-page="currentPage"
				show-empty
			>
				<template #emptyfiltered>
					<div v-if="currentPage === 1 && rows === 0 && filters.q === ''">
						<empty-content :external-link="true" :button-link="new_store_button_link">
							<template #button-content> Integrate a new store </template>
						</empty-content>
					</div>

					<div v-else>
						<empty-content-filtered></empty-content-filtered>
					</div>
				</template>

				<!-- A custom formatted column -->
				<template #cell(name)="data">
					<div class="row align-items-center m-0">
						<img v-if="images" width="50" class="m-2  md:hidden" :src="images[data.item.ecommerce]" />

						<div>
							<span class="overflow-hidden">
								<nuxt-link
									:to="{ name: 'dashboard-apps-id-stores-storeId', params: { id: $route.params.id, storeId: data.item._id } }"
									class="text-blue-500"
									style="align-self: center"
								>
									{{ data.item.url }}
								</nuxt-link>
							</span>
						</div>
					</div>
				</template>
				<template #cell(ecommerce)="data">
					<span v-if="data.item.error" title="Credentials are not valid">
						<i class="fas fa-exclamation-circle text-red"></i>
						<br />
					</span>
					<span class="text-gray-500 ">{{ data.item.ecommerce }}</span>
				</template>
				<template #cell(calls)="data">
					<div class="d-flex flex-column justify-content-center">
						<span
							><strong>{{ formattedNumber(data.item.requests) }}</strong></span
						>
						<span class="text-gray-500">Api Calls</span>
					</div>
				</template>
				<template #cell(active)="data">
					<store-btn-status :value="data.item.active == undefined ? true : data.item.active" :store-id="data.item._id"></store-btn-status>
				</template>
				<template #cell(options)="data">
					<nuxt-link class="btn btn-secondary" :to="{ path: `/dashboard/apps/${appId}/stores/${data.item._id}` }">
						<i class="fas fa-cog"></i>
					</nuxt-link>
				</template>

				<template #table-busy>
					<div class="text-center pt-5 pb-5">
						<b-skeleton-table :columns="4" :rows="5"></b-skeleton-table>
					</div>
				</template>
			</b-table>
			</div>
		</div>
		<b-pagination v-if="rows > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="table-stores"> </b-pagination>
	</div>
	<!-- END #content -->
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	props: {
		app: {
			type: Object,
			required: false,
		},
	},
	data() {
		return {
			loaded: false,
			fields: ['name', 'ecommerce', 'calls', 'active'],
			stores: [],
			isBusy: false,
			perPage: 200,
			currentPage: 1,
			appId: this.$route.params.id,
			active: false,
			// oauth_url: process.delete.env.OAUTH_URL,
			// new_store_button_link: this.app.settings && this.app.settings.domain_url && this.app.settings.domain_url ? 'https://' + this.app.settings.domain_url + '?nobar=true&back_device=true' : process.delete.env.OAUTH_URL + '/' + this.$route.params.id + '?nobar=true',
			images: null,
			rows: 0,
			filters: {
				q: '',
			},
		};
	},

	computed: {
		...mapState('ecommerces', ['ecommerces']),
	},

	watch: {
		$route(to, from) {
			if (from.name === 'apps-id-stores-storeId') {
				this.$refs.table.refresh();
			}
		},
	},

	async mounted() {
		this.$nuxt.$on('storeDeleted', () => {
			this.$refs.table.refresh();
		});
		if (this.ecommerces.length) {
			this.fillImages();
		} else {
			this.$nuxt.$on('loadEcommerces', () => {
				this.fillImages();
			});
		}
	},

	methods: {
		async getAppStores(context) {
			try {
				const { currentPage, perPage } = context;
				const params = {
					limit: perPage,
					page: currentPage,
					app_id: this.appId,
				};
				if (this.filters.q !== '') {
					params.q = this.filters.q;
				}
				// Getting all the stores (just for the number)
				const { data } = await this.$axios.get(`/api/apps/stores`, { params });
				this.rows = data.count || 0;
				return data.docs;
			} catch (error) {
				this.showError(error);
				return [];
			}
		},

		formattedNumber(number) {
			return Number(number).toLocaleString();
		},

		fillImages() {
			this.images = {};
			this.ecommerces.map(i => {
				this.images[i.name] = i.image;
			});
		},
		...mapActions('ecommerces', ['getEcommerces']),
	},
};
</script>

<style lang="scss">
div a.text-gray-500 {
	word-break: break-all;
}
.cursor-pointer{
	cursor: pointer;
}

.custom-header-2 {
	display: flex;
	align-content: center;
	justify-content: space-between;
	padding: 0.8rem;
}
.theme-table tr td:last-child {
	text-align: center;
}

.overflow-hidden {
	overflow: hidden;
	text-overflow: ellipsis!important;
}


</style>
