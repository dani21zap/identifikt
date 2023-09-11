<template>
	<!-- BEGIN #content -->
	<div id="content" class="app-content">
		<div class="w-90 box">
			<div class="header">
				<div v-if="appDetails" class="row">
					<div class="col-md-6">
						<h3>App:</h3>
						<PuSkeleton v-if="isLoading" width="200px" height="21px"></PuSkeleton>
						<h5 v-else>{{ appDetails.app.name }}</h5>
					</div>

					<div v-if="userData" class="col-md-6">
						<div class="float-md-right">
							<h5 class="mb-0">{{ userData.first_name }} {{ userData.last_name }}</h5>
							<p class="mb-0 text-gray-500">{{ userData.email }}</p>
							<p class="text-gray-500">{{ userData.company }}</p>

							<PuSkeleton v-if="isLoading" width="150px" height="40px"></PuSkeleton>

							<div v-else class="m-0 mb-2 mb-lg-0 flag float-left text-capitalize" :class="getStatusClass(appDetails.payment[0].status)">
								<b>Status: {{ appDetails.payment[0].status }} </b>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="appDetails">
				<h5>
					Period:
					{{
						$dayjs(appDetails.payment[0].begin)
							.utc()
							.format('MMMM D, YYYY')
					}}
				</h5>
			</div>
			<b-table
				id="table-invoice"
				ref="table"
				class="mx-auto"
				:items="getAppDetails"
				:fields="fields"
				:busy.sync="isBusy"
				stacked="md"
				show-empty
				:per-page="perPage"
				:current-page="currentPage"
			>
				<!-- A custom formatted column -->
				<template #empty>
					<h4 class="my-5">No API Calls registered in this period.</h4>
				</template>

				<template #cell(store_id)="data">
					<div v-if="data.item.access" class="d-flex justify-content-center">
						<div class="d-flex d-flex-row justify-content-center overflow-hidden">
							<span class="overflow-hidden overflow-ellipsis">
								{{ data.item.access._id }}
							</span>
						</div>
					</div>
				</template>

				<template #cell(ecommerce)="data">
					<div v-if="data.item.access" class="inline-flex flex-col justify-content-center">
						<span class="overflow-hidden overflow-ellipsis">
							{{ data.item.access.access.ecommerce }}
						</span>
					</div>
				</template>

				<template #cell(url)="data">
					<div class="d-flex d-flex-row justify-content-center overflow-hidden">
						<span class="overflow-hidden overflow-ellipsis">
							<a :href="data.item.access.access.url" target="_blank">
								{{ data.item.access.access.url }}
							</a>
						</span>
					</div>
				</template>

				<template #cell(api_calls)="data">
					<div class="d-flex flex-column text-center">
						<span>{{ formattedNumber(data.item.count) }}</span>
						<span class="text-gray-500">Api Calls</span>
					</div>
				</template>

				<template #cell(call_cost)="data">
					<span v-if="data.item.access"
						><strong>${{ data.item.price }}</strong></span
					>
				</template>

				<template #cell(store_total_cost)="data">
					<span v-if="data.item.access"
						><strong>${{ formattedNumber(data.item.amount.toFixed(2)) }}</strong></span
					>
				</template>

				<template #table-busy>
					<div class="text-center">
						<b-skeleton-table :columns="4" :rows="5"></b-skeleton-table>
					</div>
				</template>
			</b-table>
		</div>

		<b-pagination v-if="rows > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="table-invoice"></b-pagination>

		<b-button v-b-tooltip.hover title="Export to pdf" class="printing pr-4 pl-4 float-right mt-3" size="lg" @click="downloadPdf">
			<i class="far fa-file-pdf fa-lg"></i>
		</b-button>
	</div>
	<!-- END #content -->
</template>

<script type="text/javascript">
import { mapState } from 'vuex';

export default {
	data() {
		return {
			isBusy: false,
			error: '',
			fields: ['store_id', 'ecommerce', 'url', 'api_calls', 'call_cost', 'store_total_cost'],
			appDetails: null,
			isLoading: true,
			perPage: 200, // 200
			currentPage: 1,
			rows: 0,
		};
	},

	head() {
		return {
			title: 'Payment App Details',
		};
	},

	computed: {
		...mapState('userInformation', ['userData']),
	},

	methods: {
		// API get payment info
		async getAppDetails(context) {
			try {
				const { currentPage, perPage } = context;
				const params = {
					limit: perPage,
					page: currentPage,
				};
				const { data } = await this.$axios.get(`/api/payments/${this.$route.params.appId}/stores/${this.$route.params.id}`, { params });
				this.appDetails = data;
				this.rows = data.storesInfo.total || 0;
				return data.stores;
			} catch (error) {
				this.showError(error);
				return false;
			} finally {
				this.isLoading = false;
			}
		},

		getStatusClass(status) {
			let classes = 'badge badge-info';
			if (status === 'paid') {
				classes = 'badge okay';
			}
			if (status === 'pending') {
				classes = 'badge warning';
			}
			return classes;
		},

		formattedNumber(number) {
			return Number(number).toLocaleString();
		},

		downloadPdf() {
			window.print();
		},
	},
};
</script>

<style lang="scss" scoped>
.card-body {
	padding: 0 1.25rem;
}

.overflow-hidden {
	overflow: hidden;
}

table {
	margin: 1rem;
	color: $gray-700;
	table-layout: fixed;
	width: 100%;
}
td {
	padding: 0.5rem 1rem 0.5rem 0.5rem;
}
th {
	padding: 1rem 1rem 1rem 0.5rem;
}
thead {
	background: $gray-200;
	color: $blue;
}
div .flag,
.invoice-body {
	margin: 1rem;
}
div .header {
	font-size: medium;
}
.flag {
	padding: 0.5rem 1rem 0.5rem 0.5rem;
	text-align: center;
	border-radius: 7px;
}
.warning {
	color: snow;
	background-color: $orange-e2;
}
.totals {
	margin: 1rem;
	color: $gray-700;
	padding: 0.5rem 1rem 0.5rem 0.5rem;
}
.okay {
	color: snow;
	background-color: $green;
}
.pay {
	color: snow;
}

/* MODAL */
.modal-details__data {
	display: flex;
	flex-direction: column;
	word-break: break-all;
}

.modal-container .col-6 {
	margin: 1rem 0;
}
</style>

<style lang="scss">
#table-invoice {
	td {
		text-align: center !important;
	}

	th {
		text-align: center;
	}

	th:first-child {
		text-align: left;
	}
}

@media print {
	.printing {
		visibility: hidden;
	}
}
</style>
