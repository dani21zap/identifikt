<template>
	<b-button
		pill
		size="sm"
		:variant="currentValue ? 'success' : 'danger'"
		class="font-weight-bold"
		:class="{
			'badge okay': currentValue,
			'badge danger': !currentValue,
		}"
		@click="updateStatus"
	>
		{{ currentValue ? 'Active' : 'Inactive' }}
	</b-button>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		storeId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			currentValue: this.value,
			loading: false,
		};
	},
	mounted() {
		this.$nuxt.$on('changeStoreStatus', ({ status, store_id }) => {
			if (this.storeId === store_id) {
				this.currentValue = status;
			}
		});
	},
	methods: {
		async updateStatus() {
			try {
				this.currentValue = !this.currentValue;
				const payload = {
					active: this.currentValue,
				};
				await this.$axios.put(`/api/apps/${this.$route.params.id}/stores/${this.storeId}`, payload);
				this.$nuxt.$emit('changeStoreStatus', { status: this.currentValue, store_id: this.storeId });
			} catch (error) {
				this.currentValue = !this.currentValue;
				this.showError(error);
			}
		},
	},
};
</script>
