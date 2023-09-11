<template>
	<div class="background pt-4 pb-4">
		<div class="container">
			<div class="box shadow">
				<div class="logo-confirmation rounded-t p-3 text-center">
					<site-logo width="220" variant="negro"></site-logo>
				</div>

				<div class="pt-5 pb-5 pr-4 pl-4 text-center">
					<h2 class="font-medium mb-5">This invoice has already been paid.</h2>

					<div class="completed my-5">
						<b-img fluid src="/images/payment-completed.svg" alt="payment-completed" />
					</div>

					<div class="md:pr-40 md:pl-40 lg:pr-64 md:pl-64">
						<nuxt-link v-wave :to="{ name: 'dashboard-billing' }" class="btn btn-primary btn-lg sm:w-3/4 mt-3">
							Back to billing
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'simple',
	head() {
		return {
			title: 'Payment successful',
		};
	},
};
</script>

<style lang="scss" scoped>
.completed img {
	@media screen and (min-width: 768px) {
		width: 50%;
	}
}
</style>
