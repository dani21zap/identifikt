<template>
	<div class="col-12 col-md-4 col-lg-3 col-my d-flex justify-content-center justify-content-md-start">
		<nuxt-link :to="{ name: 'appstore-itemId', params: { itemId: slug } }">
			<b-card
				:img-src="image"
				img-alt="Image"
				img-height="180px;"
				:sub-title="`by ${author}`"
				img-top
				tag="article"
				style="max-width: 20rem;"
				class="mb-2 featured-app rounded"
				bg-variant="none"
			>
				<b-card-text>
					{{ description }}
				</b-card-text>
			</b-card>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	props: {
		/* title: {
			type: String,
			required: true,
		}, */

		image: {
			type: String,
			required: true,
			default: 'https://picsum.photos/600/300/?image=25',
		},

		author: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},

		slug: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
article.card {
	border: none;
}

article.card img {
	border-radius: 6px;
	box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
}

a {
	text-decoration: none;
	color: inherit;
}
</style>
