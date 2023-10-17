<template>
	<div>
		<div class="app-content pt-3 pb-3">
			<h2>Engomados vencidos</h2>
			<p>En este apartado se encuentran todos los engomados existentes de la plataforma para filtrar por estado, vencido, fecha de creación y etc.</p>
		</div>
		<hr />
		<div class="app-content">
			<div class="row">
				<b-form-group :hidden="filters.q === '' && !countEngomados" class="col-md-6 ml-auto">
					<b-input-group prepend-html="<i class='fas fa-search'></i>">
						<b-form-input v-model="filters.q" type="text" placeholder="Search" debounce="600"></b-form-input>
					</b-input-group>
				</b-form-group>
			</div>
			<div class="engomados-table">
				<div class="custom-header-2" :hidden="filters.q === '' && !countEngomados">
					<div>
						<p class="pb-0">Engomados vencidos: {{ countEngomados }}</p>
					</div>
					<!-- <div v-if="userData">
						<span class="pb-0"> {{ userData.month_requests }} </span>
						<span class="text-gray-500"> Total requests this month </span>
					</div> -->
					<!-- <nuxt-link v-wave :to="{ name: 'dashboard-apps-new' }" class="btn-new-app cursor-pointer text-lg">
						<i class="fas fa-plus-circle fa-lg mr-1"></i> New App
					</nuxt-link> -->
				</div>
				<b-table
					hover
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
						<!-- <div v-if="currentPage === 1 && filters.q === ''">
							<empty-content button-link="/dashboard/apps/new">
								<template #button-content>
									<i class="fas fa-plus mr-1 d-inline-block"></i>

									Create New App
								</template>
							</empty-content>
						</div>

						<div v-else> -->
							<empty-content-filtered></empty-content-filtered>
						<!-- </div> -->
					</template>

					<!-- A custom formatted column -->
					<template #cell(owner_name)="data">
						<span>
							{{ data.item.owner_name }} {{ data.item.owner_lastname }}
						</span>
					</template>
					<!-- <template #cell(plate_id)="data">
						<div class="d-flex flex-column items-center">
							<span>{{ data.plate_id }}</span>
						</div>
					</template> -->
					<template #cell(active)="data">
						<badge-status :value="data.item.active == 1"></badge-status>
					</template>

					<!-- <template #cell(car_serial_number)="data">
						<div class="d-flex flex-column items-center">
							<span>{{ data.car_serial_number }}</span>
						</div>
					</template> -->

					<!-- <template #cell(expedition_at)="data">
						<div class="d-flex flex-column items-center">
							<span>{{ data.expedition_at }}</span>
						</div>
					</template>

					<template #cell(expires_at)="data">
						<div class="d-flex flex-column items-center">
							<span>{{ data.expires_at }}</span>
						</div>
					</template> -->

					<template #table-busy>
						<div class="text-center pt-5 pb-5">
							<b-skeleton-table :columns="5" :rows="5"> </b-skeleton-table>
						</div>
					</template>
				</b-table>
			</div>

			<b-pagination v-if="countEngomados > perPage" v-model="currentPage" :total-rows="countEngomados" :per-page="perPage" aria-controls="table-stores">
			</b-pagination>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			loaded: false,
			 fields: [
				{
					key: 'owner_name',
					label: 'Nombre',
				},
				{
					key: 'plate_id',
					label: 'Placa',
				},
				{
					key: 'active',
					label: 'Estado'
				},
				{
					key: 'expedition_at',
					label: 'Expedicion'
				},
				{
					key: 'expires_at',
					label: 'Vencimiento'
				}
	        ],
			isBusy: false,
			filters: {
				q: '',
			},
			countEngomados: 0,
			perPage: 10,
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

	mounted() {
		this.provider();
		this.$refs.table.refresh();
	},

	methods: {
		async provider(context) {
			this.isBusy = true;
			const { filter, currentPage, perPage } = context;
			const params = {
				limit: perPage,
				page: currentPage,
				expired: true
			};
			if (filter.q !== '') {
				params.q = filter.q;
			}
			try {
				const { data } = await this.$axios.get(`/api/engomados`, { params });
				this.countEngomados = data.length;
				return data;
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
<style type="text/css">
	.engomados-table {
	    border-radius: 0.25rem;
	    background: white;
	    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	    box-sizing: border-box;
	}
</style>
