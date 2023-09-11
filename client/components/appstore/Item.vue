<template>
	<div class="col-12 col-md-6 col-lg-3 col-my d-flex justify-content-center">
		<nuxt-link :to="{ name: 'appstore-itemId', params: { itemId: slug } }">
			<b-card no-body class="overflow-hidden p-1 bg-none" style="max-width: 325px;">
				<b-row no-gutters>
					<b-col cols="4">
						<b-card-img fluid :src="image" alt="Image" class="rounded"></b-card-img>
					</b-col>
					<b-col cols="8">
						<b-card-body class="p-0" :title="title" title-tag="h5">
							<b-card-sub-title class="font-medium mb-2">by {{ author }}</b-card-sub-title>
							<b-card-text class="text-gray font-medium">
								{{ description }}
							</b-card-text>
							<b-card-footer class="p-0 text-dark font-medium" footer-bg-variant="transparent">
								<i class="fas fa-star text-yellow"></i> 4.5 (123) <br />
								<span class="mt-1" style="display: block;">
									{{ pricing }}
								</span>
							</b-card-footer>
						</b-card-body>
					</b-col>
				</b-row>
			</b-card>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	props: {
		slug: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: true,
		},

		title: {
			type: String,
			required: true,
		},

		author: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},

		pricing: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.card-img {
	width: 80%;
	box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
}

div.card {
	border: none;
}

a {
	text-decoration: none;
	color: inherit;
}

div.card:hover {
	h5 {
		color: $primary;
		transition: all 0.2s;
	}
}

.card-footer {
	border: none;
}
</style>
