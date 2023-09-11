<template>
	<div class="background pt-4 pb-4">
		<div class="container">
			<div class="box shadow">
				<div class="logo-confirmation rounded-t p-3 text-center">
					<site-logo width="220" variant="negro"></site-logo>
				</div>

				<div class="pt-5 pb-5 pr-4 pl-4 text-center">
					<h2 class="font-medium mb-5">Your Payment is Successful.</h2>

					<!-- <div class="success">
						<b-img fluid src="/images/payment-successful.svg" alt="payment-successful" />
					</div> -->

					<p class="text-lg font-weight-light my-5">
						Thank you for your payment. An automated payment receipt will be sent to your registered email.
					</p>

					<div class="md:pr-40 md:pl-40 lg:pr-64 lg:pl-64">
						<nuxt-link v-wave :to="{ name: 'dashboard-billing' }" class="btn btn-primary btn-lg sm:lg:pr-64 lg:pl-64 mt-3">
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
.success img {
	@media screen and (min-width: 768px) {
		width: 30%;
	}
}
</style>
