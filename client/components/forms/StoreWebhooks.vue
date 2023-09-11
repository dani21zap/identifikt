<template>
	<!-- <div class="row d-flex justify-content-around"> -->
	<!--  <div v-for="(webhook, key, index) in webhooks" :key="key">
            <div class="ec-checkbox-button-content">
                <b-form-group :label="key">
                    {{webhook[index]}}
                    <b-form-checkbox-group :options="Object.keys(webhook)" class="d-flex flex-column">

                    </b-form-checkbox-group>
                </b-form-group>
            </div>
        </div> -->
	<!-- A custom formatted column -->
	<!-- </div> -->

	<div class="app-content">
		<b-form @submit.prevent="saveWebhook">
			<h3>{{ message }}</h3>

			<div class="box">
				<div class="row">
					<div class="col-md">
						<b-form-group label="API Category">
							<b-input-group prepend-html="<i class='fas fa-layer-group'></i>">
								<b-form-select
									v-model="resourceSelected"
									:state="inputState($v.resourceSelected)"
									size="lg"
									class="fs-15px text-capitalize"
									name="resourceSelected"
									@change="resetEvents"
								>
									<b-form-select-option v-if="action !== 'edit'" value="null" disabled>
										Select category
									</b-form-select-option>
									<b-form-select-option v-for="category in getCategories" :key="category" :value="category" class="text-capitalize">
										{{ category }}
									</b-form-select-option>
								</b-form-select>
							</b-input-group>
							<forms-errors-feedback :field="$v.resourceSelected"></forms-errors-feedback>
						</b-form-group>

						<b-form-group v-show="getEvents.length > 0" label="Events">
							<b-form-checkbox-group v-model="events" :options="getEvents" :state="inputState($v.events)"> </b-form-checkbox-group>
							<forms-errors-feedback :field="$v.events"></forms-errors-feedback>
						</b-form-group>

						<b-form-group label="Callback URL">
							<b-input-group prepend-html="<i class='fas fa-link'></i>">
								<b-form-input v-model="url" :state="inputState($v.url)"> </b-form-input>
							</b-input-group>
							<forms-errors-feedback :field="$v.url"></forms-errors-feedback>
						</b-form-group>
					</div>
				</div>
			</div>

			<b-modal ref="deleteModal" cancel-variant="light" ok-variant="danger" cancel-title="No, cancel" @ok="deleteWebhook">
				<template #modal-title>
					<div>
						Are you sure you want to delete this webhook?
					</div>
				</template>

				<div class="d-flex flex-column text-center">
					<i class="fa fa-exclamation-triangle fa-6x mb-4 text-muted"></i>

					Do you really want to delete this webhook? This process can't be undone.
				</div>

				<template #modal-ok>
					Yes, delete
					<custom-spinner v-if="isLoading"></custom-spinner>
				</template>
			</b-modal>

			<div class="d-flex justify-content-end">
				<b-button v-if="action === 'edit'" variant="outline-danger" class="mr-3" @click="showModal">
					<i class="fas fa-trash-alt"></i>
					Delete Webhook
				</b-button>
				<b-button v-wave variant="primary" size="lg" class="w-32" type="submit" :disabled="isLoading" @submit="saveWebhook">
					<i class="fas fa-save" style="display: inline-block;"></i>
					Save
					<custom-spinner v-if="isLoading"></custom-spinner>
				</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
import formMixin from '@/mixins/form.mixin';
import { required } from 'vuelidate/lib/validators';

export default {
	mixins: [formMixin],

	validations() {
		return {
			resourceSelected: { required },
			events: { required },
			url: { required },
		};
	},

	props: {
		action: {
			type: String,
			default: 'new',
		},

		message: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isLoading: false,
			resources: [],
			resourceSelected: null,
			events: [],
			url: null,
			webhooks: null,
		};
	},

	computed: {
		getCategories() {
			if (this.webhooks) {
				const categories = Object.keys(this.webhooks);
				return categories;
			}

			return [];
		},

		getEvents() {
			let events = [];
			if (this.webhooks) {
				for (const key in this.webhooks) {
					if (Object.hasOwnProperty.call(this.webhooks, key)) {
						const element = this.webhooks[key];
						if (this.resourceSelected && key === this.resourceSelected.toLowerCase()) {
							events = Object.keys(element);
							break;
						}
					}
				}
			}
			return events;
		},
	},

	async mounted() {
		await this.getStoreWebhooks();
		if (this.action === 'edit') {
			await this.getWebhooksData();
		}
	},

	methods: {
		showModal() {
			this.$refs.deleteModal.show();
		},

		// Reset events if we select differents categories
		resetEvents() {
			if (this.resourceSelected) {
				this.events = [];
			}
		},

		async getWebhooksData() {
			const { data } = await this.$axios.get(`/api/webhooks?store_id=${this.$route.params.storeId}&wh=${this.$route.params.webhook_id}`);
			this.resourceSelected = data.resource;
			this.events = data.action;
			this.url = data.url;
		},

		async getStoreWebhooks() {
			const { data } = await this.$axios.get(`/api/apps/${this.$route.params.id}/stores/${this.$route.params.storeId}`);
			this.webhooks = data.ecommerce.webhooks;
		},

		async saveWebhook() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) return;

				this.isLoading = true;
				const payload = {
					resource: this.resourceSelected,
					action: this.events,
					url: this.url,
					store_id: this.$route.params.storeId,
				};

				await this.$axios.post('/api/webhooks', payload);
				this.$toast.success('Saved successfully');
				if (this.action === 'new') {
					this.$router.push({
						name: 'dashboard-apps-id-stores-storeId',
						params: { id: this.$route.params.id, storeId: this.$route.params.storeId },
					});
				}
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},

		async deleteWebhook() {
			try {
				await this.$axios.delete(`/api/webhooks?store_id=${this.$route.params.storeId}&wh=${this.$route.params.webhook_id}`);
				this.$toast.success('Deleted successfully');
				this.$router.push({
					name: 'dashboard-apps-id-stores-storeId',
					params: { id: this.$route.params.id, storeId: this.$route.params.storeId },
				});
			} catch (error) {
				this.showError(error);
			}
		},
	},
};
</script>
