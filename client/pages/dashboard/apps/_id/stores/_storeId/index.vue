<template>
	<div class="app-content">
		<b-form @submit.prevent="updateStoreInformation">
			<h3>
				Store Setup
				<a target="_blank" class="d-inline-block ml-2 text-blue-500 text-base" :href="storeInformation.storeUrl">
					<i class="fas fa-external-link-alt"></i>
				</a>
			</h3>

			<div class="box">
				<div class="row">
					<div class="col-md">
						<b-form-group label="E-commerce">
							<b-form-input v-model="storeInformation.ecommerce" disabled></b-form-input>
						</b-form-group>
						<b-form-group label="Store URL">
							<b-form-input v-model="storeInformation.storeUrl" readonly></b-form-input>
						</b-form-group>

						<b-form-group label="Enable/Disable store">
							<b-form-checkbox v-model="storeInformation.active" name="check-button" switch size="lg" @change="toggleStore">
							</b-form-checkbox>
						</b-form-group>
					</div>
					<div class="col-md-auto">
						<div class="col-lg-auto order-lg-2 text-center">
							<PuSkeleton v-if="pageLoading" width="200px" height="191px"></PuSkeleton>
							<img v-else class="rounded" width="200" :src="storeInformation.image" />
						</div>
					</div>
				</div>
			</div>

			<h4>Store Access Token</h4>
			<div class="box">
				<b-form-group class="mb-0">
					<b-input-group>
						<template #append>
							<btn-clipboard :text="storeInformation.accessToken"></btn-clipboard>
						</template>
						<b-form-input v-model="storeInformation.accessToken" readonly></b-form-input>
					</b-input-group>
				</b-form-group>
			</div>

			<h4>Ecommerce Access</h4>
			<PuSkeleton v-if="pageLoading" style="min-width: 398px" height="320px"></PuSkeleton>
			<div v-else class="box">
				<field-store-container v-if="ecommerce" v-model="storeInformation.access" :form="ecommerce.form"></field-store-container>
			</div>

			<div v-if="storeInformation.webhooks">
				<div class="d-flex">
					<h4>Webhooks</h4>
				</div>
				<div class="box">
					<webhooks-container></webhooks-container>
				</div>
			</div>

			<b-modal ref="deleteModal" centered cancel-variant="light" ok-variant="danger" cancel-title="No, cancel" @ok="deleteStore">
				<template #modal-title>
					<div v-if="storeInformation.access.name">Are you sure you want to delete {{ storeInformation.access.name }}?</div>

					<div v-else>Are you sure you want to delete this store?</div>
				</template>

				<div class="d-flex flex-column text-center">
					<i class="fa fa-exclamation-triangle fa-6x mb-4 text-muted"></i>

					Do you really want to delete this store? This process can't be undone.
				</div>

				<template #modal-ok>
					Yes, delete
					<custom-spinner v-if="isLoading"></custom-spinner>
				</template>
			</b-modal>

			<div class="d-flex justify-content-end">
				<b-button variant="outline-danger" class="mr-3" @click="showModal">
					<!-- Delete Store -->
					<i class="fas fa-trash-alt"></i>
					Delete Store
				</b-button>
				<b-button v-wave variant="primary" size="lg" class="w-32" type="submit" :disabled="isLoading" @submit="updateStoreInformation">
					<i class="fas fa-save" style="display: inline-block"></i>
					Save
					<custom-spinner v-if="isLoading"></custom-spinner>
				</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
export default {
	validate({ params }) {
		return params.storeId;
	},

	data() {
		return {
			storeInformation: {
				storeUrl: '',
				token: '',
				ecommerce: '',
				accessToken: '',
				image: '',
				active: false,
				access: null,
				webhooks: null,
			},
			appId: this.$route.params.id,
			storeId: this.$route.params.storeId,
			enabled: false,
			ecommerce: null,
			isLoading: false,
			pageLoading: true,
		};
	},

	head() {
		return {
			title: 'Store Setup',
		};
	},

	async mounted() {
		await this.getStoreInformation();
		this.$nuxt.$on('changeStoreStatus', ({ status, store_id }) => {
			if (store_id === this.storeId) {
				this.storeInformation.active = status;
			}
		});
	},

	methods: {
		showModal() {
			this.$refs.deleteModal.show();
		},

		async toggleStore(status) {
			try {
				const payload = this.storeInformation.access;
				payload.active = this.storeInformation.active;
				// This two following attributes are not allowed
				delete payload.ecommerce;
				delete payload.url;
				delete payload.name;

				await this.$axios.put(`/api/apps/${this.appId}/stores/${this.storeId}`, payload);
				const message = payload.active ? 'enabled' : 'disabled';
				this.$toast.info(`You have ${message} this store`);
				this.$nuxt.$emit('changeStoreStatus', { status, store_id: this.storeId });
			} catch (error) {
				this.showError(error);
			}
		},

		async getStoreInformation() {
			try {
				const { data } = await this.$axios.get(`/api/apps/${this.appId}/stores/${this.storeId}`);
				this.storeInformation.ecommerce = data.store.access.ecommerce;
				this.storeInformation.storeUrl = data.store.access.url;
				this.storeInformation.accessToken = data.store.access_token;
				this.storeInformation.image = data.ecommerce.image;
				this.storeInformation.active = data.store.active;
				this.storeInformation.access = data.store.access;
				this.storeInformation.webhooks = data.ecommerce.webhooks;
				this.ecommerce = data.ecommerce;
			} catch (error) {
				this.showError(error, 'Error getting store information.');
			} finally {
				this.pageLoading = false;
			}
		},

		async updateStoreInformation() {
			try {
				const payload = this.storeInformation.access;
				payload.active = this.storeInformation.active;

				// This two following attributes are not allowed
				delete payload.ecommerce;
				delete payload.url;
				delete payload.name;

				this.isLoading = true;
				const { data } = await this.$axios.put(`/api/apps/${this.appId}/stores/${this.storeId}`, payload);
				this.$refs.deleteModal.hide();

				this.$toast.success('Saved successfully');
				if (data.store.error) {
					this.$toast.error('Unauthorized. Keys are not valid!');
				}
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},

		async deleteStore() {
			try {
				this.isLoading = true;
				await this.$axios.delete(`/api/apps/${this.appId}/stores/${this.storeId}`);
				this.$toast.success('Deleted successfully');
				this.$nuxt.$emit('storeDeleted');
				this.$router.push(`/dashboard/apps/${this.appId}`);
				this.$refs.deleteModal.hide();
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
	/* Left arrow */
	.button-back:after {
		content: 'Back to App';
		font-size: 1.1rem;
	}

	/* Trash icon */
	.button-delete:after {
		content: 'Delete Store';
	}

	i.fa-trash {
		display: none;
	}

	/* Save icon */
	.button-save:before {
		content: 'Save';
		padding: 5rem !important;
		font-size: 1.1rem !important;
	}

	i.fa-save {
		display: none;
	}
}
</style>
