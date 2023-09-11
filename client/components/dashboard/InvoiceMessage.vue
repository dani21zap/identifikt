<template>
	<b-card v-if="invoiceMessage()" :border-variant="invoiceMessage()" :text-variant="invoiceMessage()" class="text-center">
		<b-card-text>
			<span class="d-block mb-2">{{ displayMessage() }}</span>
			<nuxt-link
				role="button"
				class="btn"
				:class="{ 'btn-outline-danger': invoiceMessage() === 'danger', 'btn-outline-warning': invoiceMessage() === 'warning' }"
				:to="{ name: 'dashboard-billing' }"
			>
				Go to billing
			</nuxt-link>
		</b-card-text>
	</b-card>
</template>

<script>
export default {
	props: {
		pendingInvoices: {
			type: Number,
			required: true,
		},

		pending: {
			type: String,
			default: new Date().toISOString(),
		},
	},

	data() {
		return {
			message: null,
		};
	},

	computed: {
		remainingDays() {
			const today = new Date();
			const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);
			return this.$dayjs(lastDay).format('MMMM DD');
		},
	},

	methods: {
		invoiceMessage() {
			let result = '';
			const diffMonth = this.$dayjs().diff(this.pending, 'month');
			if (this.pending !== null) {
				if (this.pendingInvoices === 1) {
					result = 'warning';
				}
				if (this.pendingInvoices > 1 || diffMonth > 1) {
					result = 'danger';
				}
			}

			return result;
		},

		displayMessage() {
			if (this.invoiceMessage() === 'warning') {
				return `You have a payment pending, please pay before ${this.remainingDays} to prevent your account from being suspended.`;
			}

			return 'Urgent! Your account has been suspended, please pay as soon as possible.';
		},
	},
};
</script>
