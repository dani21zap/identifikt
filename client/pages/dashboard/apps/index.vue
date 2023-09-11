<template>
	<!-- BEGIN #content -->
	<div>
		<div class="app-content pt-3 pb-3">
			<h2>My Apps</h2>
			<div v-if="userData" class="client">
				<span>
					To learn more about ecartapi webservices read the following
					<a href="https://docs.ecartapi.com/?version=latest#2e1f089f-0d43-4b4b-a858-3938ee27b2e4" target="_blank"> documentation.</a>
				</span>
			</div>
			<p>Create and manage your apps here.</p>
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

	<!-- END #content -->
</template>
<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			loaded: false,
			fields: ['name', 'calls', 'active', 'options'],
			isBusy: false,
			filters: {
				q: '',
			},
			countApps: 0,
			perPage: 200,
			currentPage: 1,
		};
	},

	head() {
		return {
			title: 'Apps',
		};
	},

	computed: {
		...mapState('userInformation', ['userData']),
	},

	watch: {
		$route(to, from) {
			if (from.name === 'apps-new' || from.name === 'apps-id') {
				this.$refs.table.refresh();
			}
		},
	},

	mounted() {
		this.$nuxt.$on('app-created', () => {
			this.$refs.table.refresh();
		});
		this.$nuxt.$on('app-deleted', () => {
			this.$refs.table.refresh();
		});
	},

	methods: {
		async provider(context) {
			this.isBusy = true;
			const { filter, currentPage, perPage } = context;
			const params = {
				limit: perPage,
				page: currentPage,
			};
			if (filter.q !== '') {
				params.q = filter.q;
			}
			try {
				const { data } = await this.$axios.get(`/api/apps`, { params });
				this.countApps = data.count;
				return data.docs;
			} catch (error) {
				this.showError(error);
				return [];
			} finally {
				this.isBusy = false;
			}
		},

		formattedNumber(number) {
			return Number(number).toLocaleString();
		},
	},
};
</script>
<style lang="scss" scoped>
.cursor-pointer {
	cursor: pointer
}
.client {
	display: flex;
	flex-direction: column;
	margin-bottom: 5px;
	div {
		color: $primary;
		max-width: 1100px;
		word-break: break-all;
	}
	span {
		margin: 5px 0;
		a {
			font-weight: bold;
			text-decoration: none;
			transition: color 0.3s;
		}
		a:hover {
			color: lighten($primary, 15%);
		}
	}
}

.custom-header-2 {
	display: flex;
	align-content: center;
	justify-content: space-between;
	padding: 0.8rem;
	position: relative;
}
	.custom-header-2 > div:nth-child(2) {
		display: flex;
		flex-direction:column;
		align-items: center;
		justify-content:center;
	    right: 22.5%;
    	position: absolute;
	}
</style>
