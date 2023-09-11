<template>
	<div class="h-100 stat d-flex-wrap align-items-center align-content-around pt-8 pb-8 pr-5 pl-5 rounded shadow-md bg-white">
		<div>
			<strong>{{ title }}</strong>
			<div class="text-muted"><i :class="iconClass" class="fa-3x"></i></div>
			<PuSkeleton v-if="isLoading" class="mt-4 d-block" width="50px" height="2rem"></PuSkeleton>
			<h2 v-else class="mt-4">
				{{ value }}
			</h2>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			default: 0,
		},
		title: {
			type: String,
			required: true,
		},
		iconClass: {
			type: String,
			default: 'fas fa-tasks ',
		},
		isLoading: {
			type: Boolean,
			default: true,
		},
	},
};
</script>

<style type="text/css">
	.shadow-md {
   	box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)!important;
}
</style>
