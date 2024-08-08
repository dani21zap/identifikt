<template>
	<!-- BEGIN #content -->
	<div id="content" class="app-content w-90">
		<!-- <div class="app-content"> -->
			<h2>Billing Details</h2>
			<p>Find your invoice information and set up automatic payments.</p>
		<!-- </div> -->
		<hr />
		<!-- <b-tabs v-model="tabIndex" content-class="app-content" nav-class="justify-content-center md:justify-content-start" nav-wrapper-class="custom-tabs">
			<b-tab @click="$router.push({ hash: 'invoices' })">
				<template #title> <i class="fas fa-shopping-bag"></i> Invoices </template>
				<table-stores :app="appInformation"></table-stores>
			</b-tab>
			<b-tab @click="$router.push({ hash: 'settings' })">
				<template #title> <i class="fas fa-cog"></i>  </template>
				<forms-apps-form :app="appInformation" type="edit" title="App Setup" @submit="setAppInfo"> </forms-apps-form>
			</b-tab>
		</b-tabs> -->
		<div class="box mb-4">
			<h3>Automatic payments.</h3>
			<div v-if="payProcessing">
				<custom-spinner></custom-spinner>
			</div>
			<div v-else>
				<b-form-group class="m-1">
					<p>
						<span class="font-normal">{{disclaimer}}</span>
						<br>
						<span class="font-semibold" v-if="nextChargeOn">{{nextChargeOn}}</span>
					</p>
						<b-button v-wave variant="primary" v-b-tooltip.hover title="Add payment method" :disabled="isLoading" @click="addPaymentMethod">
							{{paymentMethodButton}}
							<div v-if="isLoading">
								<custom-spinner></custom-spinner>
							</div>
						</b-button>
				</b-form-group>
			</div>
		</div>
		<div class="box mb-4">
			<div v-if="invoice" class="header">
				<div class="row">
					<div v-if="!emptyInvoices" class="col-md-6">
						<h3>Invoices</h3>
					</div>
				</div>
			</div>
			<div class="text-right">
				<h6>Billing information</h6>
				<div v-if="!emptyInvoices" class="">
					<div v-if="userData">
						<p class="mb-0 text-gray-500"><b>name:</b> {{ userData.first_name }} {{ userData.last_name }}</p>
						<p class="mb-0 text-gray-500"><b>email:</b> {{ userData.email }}</p>
						<p class="mb-0 text-gray-500"><b>company:</b> {{ userData.company }}</p>
					</div>
				</div>
			</div>
			<div class="pt-2 d-flex justify-content-center">
				<!-- <b-skeleton-table v-if="emptyInvoices" :columns="3" :rows="5"></b-skeleton-table> -->
				<b-table
					v-if="!emptyInvoices"
					id="table-invoice"
					ref="table"
					:items="getPayments"
					:fields="fields"
					:busy.sync="isBusy"
					:per-page="perPage"
					:current-page="currentPage"
					stacked="md"
				>
					<template #cell()="data">
						<div class = "d-flex flew-row justify-content-center" :class="{'spinner-border': inProcess == data.item._id}" >
							<a @click="openFilePdf(data.item._id)" style = "color: #464c4; cursor: pointer; padding: 6px 12px !important; " class=" justify-content-center m-0 p-1 flag text-capitalize btn-light fa fa-download " :class="{'sr-only': inProcess == data.item._id}"> </a>
						</div>
					</template>
					<template #cell(date)="data">
						<div class="d-flex  justify-content-center md:justify-content-start">
							<div class="d-flex flex-row justify-content-center overflow-hidden">
								<nuxt-link
									:to="{ name: 'dashboard-billing-id', params: { id: data.item._id } }"
									class="text-blue-500"
									style="align-self: center"
								>
									{{
										$dayjs(data.item.begin)
											.utc()
											.format('MMMM, YYYY')
									}}
								</nuxt-link>
							</div>
						</div>
					</template>
					<!-- A custom formatted column -->
					<template #cell(number)="data">
						{{ data.item.number }}
					</template>

					<template #cell(total)="data"> ${{ formattedNumber(data.item.totals.total.toFixed(2)) }} </template>

					<template #cell(status)="data">
						<span class="d-flex m-0 p-2 justify-content-center flag text-capitalize" :class="getStatusClass(data.item.status)">{{ data.item.status }}</span>
					</template>

					<template #cell(payNow)="data">
						<!-- <div class="d-flex  justify-content-center md:justify-content-start"> -->
							<!-- <div class="d-flex flex-row justify-content-center overflow-hidden"> -->
								<a
									v-if="data.item.status !== 'paid'"
									class="m-0 p-2 btn btn-warning font-weight-bold"
									role="button"
									target="_blank"
									:href="data.item.pay_link"
								>
									Pay now
								</a>
								<span
									v-if="data.item.status == 'paid'"
									class="m-0 p-2 flag outline-primary"
								>
									Paid
								</span>
							<!-- </div> -->
						<!-- </div> -->
					</template>

					<template #table-busy>
						<div class="text-center">
							<b-skeleton-table :columns="4" :rows="5"></b-skeleton-table>
						</div>
					</template>
				</b-table>
			</div>
			<div v-if="emptyInvoices" class="text-center pt-5 pb-5">
				<i class="fas fa-file-invoice-dollar fa-6x mb-5 text-muted"></i>
				<h2 class="text-gray-300">You don't have invoices yet.</h2>
			</div>
		</div>
		<b-pagination v-if="rows > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="table-invoice"></b-pagination>
	</div>
	<!-- END #content -->
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			isBusy: false,
			paymentMethodButton: 'Add payment method',
            disclaimer: 'By clicking the button you agree to get automatic monthly charges to your card and the storage of this information for future charges.',
            nextChargeOn: null,
			fields: ['donwload', 'date', 'number', 'status', 'total', 'payNow'],
			invoice: null,
			emptyInvoices: false,
			perPage: 200, // 8
			currentPage: 1,
			rows: 0,
			inProcess: '',
			payProcessing: true,
			isLoading: false,
			PayPopup: null,
		};
	},

	head() {
		return {
			title: 'Billing',
			// script: [
			// {
			// 	src: `${process.delete.env.PAYMENT_URL}/sdk/pay.js`
			// }]
		};
	},

	computed: {
		...mapState('userInformation', ['userData', 'payData', 'cards', 'error']),
	},

	mounted() {
		this.setPaymentMethodInformation();
		this.$nuxt.$on('getPaySession', () => {
			Pay.Cards.on('close', function () {
				this.$nuxt.$emit('close');
			});
			this.PayPopup.session(this.payData.session);
			this.PayPopup.start();
			
		});
		this.$nuxt.$on('close', async () => {
			this.payProcessing = false;
			this.isLoading = false;
			await this.getPayCards();
		})
		this.$nuxt.$on('getPaycards', () => {
			if (this.cards.length > 0) {
				const now = new Date();
				let chargedOn = null;
				if (now.getMonth() == 11) {
				    chargedOn = new Date(now.getFullYear() + 1, 0, 1);
				} else {
				    chargedOn = new Date(now.getFullYear(), now.getMonth() + 1, 1);
				}
				this.paymentMethodButton = 'Manage cards';
				this.disclaimer = 'You have agreed to receive monthly charges on the cards stored by our pay system.';
				this.nextChargeOn = 'Next charge will be on: ' + chargedOn;
			} else if(this.cards.length == 0) {
				this.paymentMethodButton = 'Add payment method';
				this.disclaimer = 'By clicking the button you agree to get automatic monthly charges to your card and the storage of this information for future charges.';
				this.nextChargeOn = null;
			}
			this.payProcessing = false;
		});

		this.$nuxt.$on('userInformationFailed', () => {
			this.paymentMethodButton = 'Add payment method';
			this.disclaimer = 'By clicking the button you agree to get automatic monthly charges to your card and the storage of this information for future charges.';
			this.nextChargeOn = null;
			this.payProcessing = false;
			this.isLoading = false;
			this.showError(this.error);
		});
	},

	methods: {
		// API get payments
		async getPayments(context) {
			try {
				const { currentPage, perPage } = context;
				const params = {
					limit: perPage,
					page: currentPage,
				};
				const { data } = await this.$axios.get('/api/payments', { params });
				this.invoice = data;
				this.rows = data.infoPayments.count || 0;
				return data.payments;
			} catch (err) {
				this.showError(err);
				return false;
			} finally {
				if (this.rows === 0) {
					this.emptyInvoices = true;
				}
			}
		},

		getStatusClass(status) {
			let classes = 'bg-blue-100 text-blue-500';
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

		async addPaymentMethod() {
			let renderConfig = {
				message: "Don't see EcartPay secure browser? We open the window again so you can manage your cards."
			};
			this.isLoading = false;
			this.PayPopup = Pay.Cards.render(renderConfig);
			this.isLoading = true;
			await this.getPaySession();
		},

		async openFilePdf(id){
			this.inProcess = id;
			let pdf = await this.$axios.get(`/api/payments/docs/${id}`)
			window.open(pdf.data.invoice)
			this.inProcess = '';
		},

		async setPaymentMethodInformation() {
			if (this.userData === null) {
				await this.getUserInformation();
			} 
			if (this.userData.payment_customer_id) {
				await this.getPayCards();
			}		
			this.payProcessing = false;
		},

		...mapActions('userInformation', ['getUserInformation', 'getPaySession', 'getPayCards']),
	},
};
</script>

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
.font-montserrat {
	font-weight: 600;
	font-family: "Montserrat", sans-serif;
}
.font-normal{
	font-weight: 400!important;
}
.font-semibold{
	font-weight: 600!important;	
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
.spinner-border {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: text-bottom;
    border: 0.25em solid #b8b8b8;
    border-right-color: transparent;
    border-radius: 50%;
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
		text-align: center !important;
	}
	th:nth-child(2) {
		text-align: left;
	}
}
</style>
