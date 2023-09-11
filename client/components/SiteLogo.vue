<template>
	<img data-not-lazy :src="'/images/logo-' + variant + '.svg'" />
</template>

<script>
export default {
	props: {
		variant: {
			type: String,
			default: 'negro',
		},
	},
};
</script>
