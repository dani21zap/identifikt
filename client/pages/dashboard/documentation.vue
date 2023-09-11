<template>
	<div class="app-content">
		<div v-if="docs" class="container">
			<div class="row">
				<h1 class="col-auto">API Documentation</h1>
				<div class="col-auto ml-auto">
					<b-button to="/api_testing" target="_blank" variant="brand" size="lg">Try now!</b-button>
				</div>
			</div>

			<div class="row">
				<b-list-group class="col">
					<b-list-group-item v-for="{ title, src, description } in docs.docs_hot_routes" :key="title">
						<a :href="src" target="_blank" class="api-link">
							{{ title }}
						</a>
						<p class="lead m-0 api-description">{{ description }}</p>
					</b-list-group-item>
				</b-list-group>
			</div>

			<div class="row">
				<div v-for="{ title, description, src } in docs.videos" :key="title" class="mt-4 col-12 col-md-6 col-lg-4">
					<b-card :header="title" header-bg-variant="primary" header-text-variant="white">
						<div class="embed-responsive embed-responsive-16by9 mb-2">
							<iframe class="embed-responsive-item" allowfullscreen :src="src"> </iframe>
						</div>
						<b-card-text class="lead">
							{{ description }}
						</b-card-text>
					</b-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			docs: null,
		};
	},

	head() {
		return {
			title: 'Documentation',
		};
	},

	mounted() {
		this.getDocumentation();
	},

	methods: {
		async getDocumentation() {
			try {
				const { data } = await this.$axios.get('/api/services/docs/6176e300985d2ba2ebcc4f97');
				this.docs = data;
			} catch (error) {
				this.showError(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.api-link {
	text-decoration: none;
}

.api-description {
	color: $gray-800;
}
</style>
