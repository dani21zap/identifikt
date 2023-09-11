<template>
	<!-- BEGIN #content -->
	<div id="content" class="app-content">
		<div class="w-90 box">
			<div class="header">
				<div v-if="info" class="row">
					<div class="col-md-6">
						<h3>Invoice Number:</h3>
						<PuSkeleton v-if="isLoading" width="200px" height="21px"></PuSkeleton>
						<h5 v-else>#{{ info.number }}</h5>
					</div>

					<div v-if="userData" class="col-md-6">
						<div class="float-md-right">
							<h5 class="mb-0">{{ userData.first_name }} {{ userData.last_name }}</h5>
							<p class="mb-0 text-gray-500">{{ userData.email }}</p>
							<p class="text-gray-500">{{ userData.company }}</p>

							<PuSkeleton v-if="isLoading" width="150px" height="40px"></PuSkeleton>

							<div v-else class="m-0 mb-2 mb-lg-2 flag float-left text-capitalize" :class="getStatusClass(info.status)">
								<b>Status: {{ info.status }} </b>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="info">
				<h5>
					Period:
					{{
						$dayjs(info.begin)
							.utc()
							.format('MMMM, YYYY')
					}}
				</h5>
			</div>
			<b-table
				id="table-invoice"
				ref="table"
				class="mx-auto"
				:items="getPaymentInfo"
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

				<template #cell(app)="data">
					<div class="d-flex justify-content-center md:justify-content-start">
						<div class="d-flex flex-row align-items-center overflow-hidden">
							<span class="overflow-hidden overflow-ellipsis">
								<nuxt-link
									:to="{ name: 'dashboard-billing-id-stores-appId', params: { id: $route.params.id, appId: data.item.app_id } }"
								>
									{{ data.item.name }}
								</nuxt-link>
							</span>
						</div>
					</div>
				</template>

				<template #cell(api_calls)="data">
					<div class="d-flex flex-column text-center">
						<span>{{ formattedNumber(data.item.count) }}</span>
						<span class="text-gray-500">Api Calls</span>
					</div>
				</template>

				<template #cell(call_cost)="data">
					<span
						><strong>${{ data.item.price }}</strong></span
					>
				</template>

				<template #cell(app_total_cost)="data">
					<span
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

		<b-pagination v-if="apps > perPage" v-model="currentPage" :total-rows="apps" :per-page="perPage" aria-controls="table-invoice"></b-pagination>

		<b-card v-if="info" class="mb-3">
			<div class="totals d-flex float-right flex-column">
				<h6>Total Requests: {{ formattedNumber(info.totals.requests) }}</h6>
				<h6 v-if="info && (info.totals.domains && info.totals.domains > 0)">Total Domains: {{ formattedNumber(info.totals.domains/19.99) }}</h6>
			</div>
		</b-card>

		<b-card v-if="info">
			<div class="totals d-flex float-right flex-column">
				<h6 v-if="info && (info.totals.domains && info.totals.domains > 0)">Domains: ${{ formattedNumber(info.totals.domains.toFixed(2)) }}</h6>
				<h6 v-if="info && info.totals.discount > 0" >Discount: ${{ formattedNumber(info.totals.discount.toFixed(2)) }}</h6>
				<h6 v-if="info && info.totals.subtotal > 0" >Subtotal: ${{ formattedNumber(info.totals.subtotal.toFixed(2)) }}</h6>
				<h2 class="font-weight-bold">Total: ${{ formattedNumber(info.totals.total.toFixed(2)) }}</h2>
			</div>
		</b-card>
		<a
			v-if="info && info.totals.total > 0 && info.status !== 'paid'"
			class="btn btn-lg btn-primary float-right mt-3"
			role="button"
			:href="info.pay_link"
		>
			Proceed to Payment
		</a>
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
			fields: ['app', 'api_calls', 'call_cost', 'app_total_cost'],
			info: null,
			isLoading: true,
			apps: 0,
			perPage: 20, // 20
			currentPage: 1,
		};
	},

	head() {
		return {
			title: 'Payment',
		};
	},

	computed: {
		...mapState('userInformation', ['userData']),
	},

	methods: {
		// API get payment info
		async getPaymentInfo(context) {
			try {
				const { currentPage, perPage } = context;
				const params = {
					limit: perPage,
					page: currentPage,
				};
				const { data } = await this.$axios.get(`/api/payments/${this.$route.params.id}`, { params });
				this.info = data.info;
				this.apps = data.appsInfo.count;
				return data.apps;
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
	},
};
</script>

<style type="text/css">
	.overflow-hidden {
		overflow: hidden;
	}
</style>
<style lang="scss" scoped>
.card-body {
	padding: 0 1.25rem;
}

table {
	margin: 1rem;
	color: $gray-700;
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
		text-align: center !important;
	}

	th:first-child {
		text-align: left;
	}
}
</style>
