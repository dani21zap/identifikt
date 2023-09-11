<template>
	<div>
		<div class="app-content pt-3 pb-3">
			<h2>Engomados vigentes</h2>
			<p>En este apartado se encuentran todos los engomados existentes de la plataforma para filtrar por estado, vencido, fecha de creación y etc.</p>
		</div>
		<hr />
		<div class="app-content">
			<div class="row">
				<b-form-group :hidden="filters.q === '' && !countApps" class="col-md-6 ml-auto">
					<b-input-group prepend-html="<i class='fas fa-search'></i>">
						<b-form-input v-model="filters.q" type="text" placeholder="Search" debounce="600"></b-form-input>
					</b-input-group>
				</b-form-group>
			</div>
			<div class="theme-table">
				<div class="custom-header-2" :hidden="filters.q === '' && !countApps">
					<div>
						<p class="pb-0">Apps: {{ countApps }}</p>
					</div>
					<div v-if="userData">
						<span class="pb-0"> {{ userData.month_requests }} </span>
						<span class="text-gray-500"> Total requests this month </span>
					</div>
					<nuxt-link v-wave :to="{ name: 'dashboard-apps-new' }" class="btn-new-app cursor-pointer text-lg">
						<i class="fas fa-plus-circle fa-lg mr-1"></i> New App
					</nuxt-link>
				</div>
				<b-table
					ref="table"
					:items="provider"
					:fields="fields"
					:busy="isBusy"
					:filter="filters"
					:per-page="perPage"
					:current-page="currentPage"
					show-empty
					no-local-sorting
				>
					<template #emptyfiltered>
						<div v-if="currentPage === 1 && filters.q === ''">
							<empty-content button-link="/dashboard/apps/new">
								<template #button-content>
									<i class="fas fa-plus mr-1 d-inline-block"></i>

									Create New App
								</template>
							</empty-content>
						</div>

						<div v-else>
							<empty-content-filtered></empty-content-filtered>
						</div>
					</template>

					<!-- A custom formatted column -->
					<template #cell(name)="data">
						<div class="d-flex flex-column align-content-center justify-content-start sm:justify-content-center">
							<!-- <img
                                width="50"
                                class="d-inline-block mr-4"
                                src="~/assets/images/bg.jpg"
                                alt=""
                            /> -->
							<div class="d-flex flex-column align-content-start">
								<nuxt-link class="font-weight-bold" :to="{ path: `/dashboard/apps/${data.item.app_id}` }">
									{{ data.item.name }}
								</nuxt-link>
								<span class="text-gray-500">{{ data.item.accesses }} Stores</span>
							</div>
						</div>
					</template>
					<template #cell(calls)="data">
						<div class="d-flex flex-column items-center">
							<span>{{ formattedNumber(data.item.month_requests) }}</span>
							<span class="text-gray-500">Api Calls</span>
						</div>
					</template>
					<template #cell(active)="data">
						<badge-status class="text-center m-2" :value="data.item.active"></badge-status>
					</template>

					<template #table-busy>
						<div class="text-center pt-5 pb-5">
							<b-skeleton-table :columns="3" :rows="5"> </b-skeleton-table>
						</div>
					</template>
				</b-table>
			</div>

			<b-pagination v-if="countApps > perPage" v-model="currentPage" :total-rows="countApps" :per-page="perPage" aria-controls="table-stores">
			</b-pagination>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Dashboard',
	data() {
		return {
			totalRequests: 0,
			totalApps: 0,
			totalStores: 0,
			pendingInvoices: 0,
			diffMonth: 0,
			recentStores: [],
			isLoading: true,
			pending: null,
		};
	},

	head() {
		return {
			title: 'Dashboard',
		};
	},

	computed: {
		...mapState('ecommerces', ['ecommerces']),
	},

	async mounted() {
		await this.getSummary();
		await this.getMostRecentStores();
		await this.getPayments();
	},

	methods: {
		async getSummary() {
			try {
				const { data } = await this.$axios.get('/api/summary');
				this.totalRequests = data.requests;
				this.totalApps = data.apps;
				this.totalStores = data.stores;
				this.pendingInvoices = data.invoices;
			} catch (err) {
				this.showError(err);
			} finally {
				this.isLoading = false;
			}
		},

		async getMostRecentStores() {
			try {
				// Get all stores (only 10)
				const { data } = await this.$axios.get(`/api/apps/stores?limit=10&page=1`);
				this.recentStores = data.docs;
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},

		async getPayments() {
			try {
				const {
					data: { payments },
				} = await this.$axios.get('/api/payments');
				let pending;
				payments.some(payment => {
					if (payment.status === 'pending') {
						pending = payment;
					}
				});
				if (pending !== undefined) {
					this.pending = pending.end;
				}
			} catch (error) {
				this.showError(error);
			}
		},

		formattedNumber(number) {
			return Number(number).toLocaleString();
		},
	},
};
</script>

<style lang="scss" scoped>
.app-content .mb-5.img-fluid {
	width: 35% !important;
}
</style>
