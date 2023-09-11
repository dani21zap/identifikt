<template>
	<div class="pt-5 pb-5 pr-3 pl-3 text-center">
		<b-img class="mb-5" fluid :src="require('@/assets/images/nothing-here.svg')"> </b-img>
		<h3 class="mb-4">{{ title }}</h3>

		<nuxt-link
			v-if="!externalLink"
			v-wave
			role="button"
			class="mr-auto btn btn-secondary no-underline btn-lg"
			:to="{ path: `${buttonLink}/` }"
		>
			<slot name="button-content"> </slot>
		</nuxt-link>

		<a v-else v-wave :href="buttonLink" target="_blank" class="mr-auto btn btn-secondary no-underline btn-lg">
			<slot name="button-content"> </slot>
		</a>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "There's nothing here",
		},
		buttonLink: {
			type: String,
			default: '#',
		},

		externalLink: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
img {
	width: 50%;
}

@media screen and (min-width: 768px) {
	img {
		width: 25%;
	}
}

.app-not-found {
	width: 35%;
}
</style>
