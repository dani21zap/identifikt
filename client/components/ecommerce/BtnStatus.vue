<template>
	<div>
		<b-button
		pill
		size="sm"
		:class="{
			'badge okay': value,
			'badge danger': !value,
		}"
		class="font-weight-bold p-2"
		:variant="value ? 'success' : 'danger'"
		@click="updateStatus"
		>
		{{ value ? 'Active' : 'Inactive' }}
		</b-button>

		<b-modal ref="AppKeysModal" cancel-variant="dark-transparent" ok-variant="primary" @ok="redirect">
			<template #modal-title>Setup {{ecommerce_name}}</template>
			<div  class="d-flex flex-column justify-aling-start text-center">
				<i class="fas fa-circle-exclamation fa-4x mb-3 text-yellow"></i>
				<p>
					Can not activate {{ ecommerce_name }}<br>
					<label class="text-xs">To activate {{ecommerce_name}} you must have your own App Developer keys.</label><br>
				</p>
			</div>

			<template #modal-ok>
				Okay
			</template>
		</b-modal>
	</div>
</template>

<script>
export default {
	props: {
		status: {
			type: Boolean,
			default: false,
		},
		ecommerce_data: {
			type: Object,
			required: true,
		},
		app_keys: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			ecommerce_name: this.ecommerce_data.name,
			ecommerceId: this.ecommerce_data._id,
			value: this.status,
			app_id:this.$route.params.id
		};
	},
	mounted() {
		this.$nuxt.$on('changeEcommerceStatus', ({ status, ecommerceId }) => {
			if (this.ecommerce === ecommerceId) {
				this.value = status;
			}
		});
	},
	methods: {
		redirect() {
			this.$router.push({
				name: 'dashboard-apps-id-settings-ecommerce_name', 
					params: {
						id: this.app_id, 
						ecommerce_name: this.ecommerce_name 
					}
			});
		},

		async updateStatus() {
			try {				
				if (this.ecommerce_data.required_app_keys && !this.status) {
					let validation = this.app_keys ? !this.ecommerce_data.oauth_pattern.some(key => Object.keys(this.app_keys).includes(key)) : true;
					if (validation) {
						this.$refs.AppKeysModal.show();
						return false;
					}
				}
				this.value = !this.value;
				const payload = {
					active: this.value,
					ecommerce: this.ecommerceId,
				}
				await this.$axios.put(`/api/apps/${this.$route.params.id}/ecommerce`, payload);
				this.$nuxt.$emit('changeEcommerceStatus', { status: this.value, ecommerceId: this.ecommerceId });
			} catch (error) {
				this.value = !this.value;
				this.showError(error);
			}
		},
	},
};
</script>

