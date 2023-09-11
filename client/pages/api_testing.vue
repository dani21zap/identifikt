<template>
	<div class="container pt-5 pb-5">
		<div v-if="interactiveRoutes" class="accordion" role="tablist">
			<services-method v-for="(route, index) in interactiveRoutes" :key="route.name" :route="route" :index="index"></services-method>
		</div>
	</div>
</template>

<script>
import ServicesMethod from '@/components/services/Method.vue';

export default {
	layout: 'landing',
	componentes: { ServicesMethod },
	data() {
		return {
			interactiveRoutes: null,
		};
	},

	mounted() {
		this.getInterativeDocs();
	},

	methods: {
		async getInterativeDocs() {
			try {
				const { data } = await this.$axios.get('/api/services/docs/61425d7e3c3fae57280fb13a');
				this.interactiveRoutes = data.routes;
			} catch (error) {
				this.showError(error);
			}
		},
	},
};
</script>
