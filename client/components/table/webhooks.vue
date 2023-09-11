<template>
	<!-- BEGIN #content -->
	<div class="text-center">
		<b-table id="table-webhooks" ref="table" :items="getAllWebhooks" :fields="fields" :busy.sync="isBusy" stacked="md" show-empty>
			<!-- A custom formatted column -->
			<template #cell(api_category)="data">
				<div class="d-flex text-capitalize justify-content-center sm:justify-content-center">
					<div class="d-flex d-flex-row text-center block overflow-hidden">
						<span class="overflow-hidden block">
							<nuxt-link
								:to="{
									name: 'dashboard-apps-id-stores-storeId-webhook-webhook_id',
									params: { id: $route.params.id, storeId: $route.params.storeId, webhook_id: data.item._id },
								}"
								class="text-blue-500"
								style="align-self: center;"
							>
								{{ data.item.resource }}
							</nuxt-link>
						</span>
					</div>
				</div>
			</template>

			<template #cell(events)="data">
				<div class="text-capitalize d-flex flex-column justify-content-center">
					<span>
						{{ data.item.action }}
					</span>
				</div>
			</template>
			<template #cell(callback_url)="data">
				<span>
					{{ data.item.url }}
				</span>
			</template>

			<template #table-busy>
				<div class="text-center pt-5 pb-5">
					<b-spinner class="align-middle"></b-spinner>
					<strong>Loading...</strong>
				</div>
			</template>
		</b-table>
	</div>
	<!-- END #content -->
</template>

<script>
export default {
	data() {
		return {
			fields: ['api_category', 'events', 'callback_URL'],
			isBusy: false,
		};
	},

	watch: {
		$route(to, from) {
			if (from.name === 'dashboard-apps-id-stores-storeId-webhook-webhook_id' || from.name === 'dashboard-apps-id-stores-storeId-webhook-new') {
				this.$refs.table.refresh();
			}
		},
	},

	methods: {
		async getAllWebhooks() {
			try {
				const { data } = await this.$axios.get(`/api/webhooks/all?store_id=${this.$route.params.storeId}`);
				return data.webhooks;
			} catch (error) {
				this.showError(error);
				return false;
			}
		},
	},
};
</script>

<style lang="scss">
#table-webhooks {
	th:first-child {
		text-align: left;
	}
}
</style>
