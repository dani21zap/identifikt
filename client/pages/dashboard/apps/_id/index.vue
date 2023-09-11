<template>
	<div v-if="appInformation">
		<div class="app-content">
			<div v-if="appInformation.settings">
				<div>
					<div class="row">
						<div class="col-auto ml-auto">
							<span
								:class="{
									active: appInformation.active,
									inactive: !appInformation.active,
								}"
							>
								<badge-status class="" active-status="Active" inactive-status="Inactive" :value="true">
									{{ appInformation ? 'Active' : 'Inactive' }}
								</badge-status>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="col-md-auto">
							<h3 class="d-inline-block mr-3 text-3xl">
								{{ appInformation.name }}
							</h3>
							<div class="text-base mb-1">
								<b-badge nav-class="list" pill variant="primary">Month Requests: {{ appInformation.month_requests }}</b-badge>
								<b-badge nav-class="list" pill variant="primary">Total Requests: {{ appInformation.requests }}</b-badge>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<b-tabs v-model="tabIndex" content-class="app-content" nav-class="justify-content-left md:justify-content-start" nav-wrapper-class="custom-tabs">
			<b-tab @click="$router.push({ hash: 'stores' })">
				<template #title> <i class="fas fa-shopping-bag"></i> Stores </template>
				<table-stores :app="appInformation"></table-stores>
			</b-tab>
			<b-tab @click="$router.push({ hash: 'settings' })">
				<template #title> <i class="fas fa-cog"></i> App Setup </template>
				<forms-apps-form :app="appInformation" type="edit" title="App Setup" @submit="setAppInfo"> </forms-apps-form>
			</b-tab>

			<b-tab @click="$router.push({ hash: 'ecommerce' })">
				<template #title> <i class="fas fa-cog"></i> E-commerce Setup </template>
				<ecommerce-setup :app-information="appInformation"></ecommerce-setup>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {
			appInformation: null,
			tabs: ['stores', 'settings', 'ecommerce'],
		};
	},

	head() {
		return {
			title: 'My App',
			tabIndex: 0,
		};
	},

	computed: {
		tabIndex: {
			set(value) {
				return value;
			},
			get() {
				const hash = this.$route.hash.replace('#', '');
				const tab = this.tabs.findIndex(i => i === hash);
				return tab !== -1 ? tab : 0;
			},
		},
	},

	async mounted() {
		await this.getAppInformation();
		this.$nuxt.$on('updatedAppKeys', async () => {
	  		await this.getAppInformation();  
		})
	},

	methods: {
		async getAppInformation() {
			try {				
				// Get app information
				const { data } = await this.$axios.get(`/api/apps/${this.$route.params.id}`);
				this.appInformation = data;
			} catch (err) {
				this.showError(err);
			}
		},

		setAppInfo(appInfo) {
			this.appInformation = appInfo;
		},
	},
};
</script>

<style lang="scss" scoped>
[v-cloak]::before {
	// content: "<i class='fas fa-spinner fa-spin'></i>"
}

.description {
	border-radius: $border-radius;
	margin-top: 2rem;
}

.col-xl-6 {
	margin-left: -0.5rem;
}

.active i {
	font-size: 1.3rem;
}

.image-app {
	display: block;
	img {
		width: 100%;
		max-width: 450px;
		height: 215px;
		object-fit: cover;
	}
}

@media screen and (max-width: 540px) {
	li.nav-item i {
		display: none;
	}
}
</style>
