<template>
	<div class="container-fluid">
		<div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded border shadow mb-4">
			<div class="col-12 mb-5">
				<div class="col-12 col-md-6 mb-1 pl-0">
					<h1 class="text-2xl lead mb-3">Find the app that's right for yours.</h1>
					<b-input-group prepend-html="<i class='fas fa-search'></i>">
						<b-form-input type="text" placeholder="Search apps"></b-form-input>
					</b-input-group>
				</div>
			</div>
			<div class="col-12">
				<h2 class="text-uppercase text-sm font-weight-bold" style="color: #DC5526;">Staff picks</h2>
				<h3 class="text-lg lead">Some standout options you might want to try.</h3>
			</div>
			<div class="col-12">
				<div class="row">
					<appstore-featured
						author="Linus Torvalds"
						description="This is my first app description"
						image="https://images.unsplash.com/photo-1587803537744-c6d63897f2cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
						slug="app-1"
					></appstore-featured>

					<appstore-featured
						author="Peiky Corp"
						description="This is my second app description"
						image="https://images.unsplash.com/photo-1604478373761-eaa0a2c961fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
						slug="app-2"
					></appstore-featured>

					<appstore-featured
						author="SidePanda"
						description="This is my third app description"
						image="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
						slug="app-3"
					></appstore-featured>
				</div>
			</div>
		</div>

		<h2 class="text-uppercase text-lg font-weight-bold">Trending Apps</h2>
		<div class="row">
			<h3 class="col-auto col-md-10 text-base text-muted">Explore apps gaining popularity this month.</h3>
			<nuxt-link class="col-2 d-none d-md-block text-base no-underline" :to="{ name: 'appstore-all' }">
				<span class="float-right"> See more <i class="fas fa-arrow-right"></i> </span>
			</nuxt-link>
		</div>
		<div class="row">
			<appstore-item
				slug="sixads-advertising"
				image="https://cdn.shopify.com/app-store/listing_images/085824fbcecc6ba017c777d160d36d87/icon/CMni9970lu8CEAE=.png?height=144&width=144 2x, https://cdn.shopify.com/app-store/listing_images/085824fbcecc6ba017c777d160d36d87/icon/CMni9970lu8CEAE=.png?height=72&width=72 1x"
				title="Sixads - Paid Advertising"
				author="sixads"
				description="Facebook, Instagram, Google Ads"
				pricing="Free to install"
			></appstore-item>
			<appstore-item
				slug="custom-background-music"
				image="https://cdn.shopify.com/app-store/listing_images/4f7c6a56d9f1b02270cf8f40d6eb5588/icon/CL+Tjcj0lu8CEAE=.png?height=144&width=144 2x, https://cdn.shopify.com/app-store/listing_images/4f7c6a56d9f1b02270cf8f40d6eb5588/icon/CL+Tjcj0lu8CEAE=.png?height=72&width=72 1x"
				title="Custom Background Music"
				author="Effective Apps"
				description="Play a song of your choice in your store's background"
				pricing="7-day free trial"
			></appstore-item>
			<appstore-item
				slug="cart-shipping-calculator-pro"
				image="https://cdn.shopify.com/app-store/listing_images/4bbf0fe31cdf41d53c3e6f0083af4b4d/icon/CNiD+ZPO0/ACEAE=.png?height=144&width=144 2x, https://cdn.shopify.com/app-store/listing_images/4bbf0fe31cdf41d53c3e6f0083af4b4d/icon/CNiD+ZPO0/ACEAE=.png?height=72&width=72 1x"
				title="Cart Shipping Calculator Pro"
				author="Shop Doctors"
				description="Shipping Calculator on Cart, Free Shipping Bars"
				pricing="Free plan available"
			></appstore-item>
			<appstore-item
				slug="seo-booster-marketing"
				image="https://cdn.shopify.com/app-store/listing_images/57953f1b3d5799998ef9e4eaafc2a0e0/icon/CIXg86v0lu8CEAE=.png?height=144&width=144 2x, https://cdn.shopify.com/app-store/listing_images/57953f1b3d5799998ef9e4eaafc2a0e0/icon/CIXg86v0lu8CEAE=.png?height=72&width=72 1x"
				title="SEO Booster - SEO Marketing"
				author="Secomapp"
				description="Auto optimize SEO & Google traffic daily. Beginner to Advanced"
				pricing="Free plan available"
			></appstore-item>

			<nuxt-link class="d-block d-md-none text-base ml-auto no-underline" :to="{ name: 'appstore-all' }">
				See more <i class="fas fa-arrow-right"></i>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'apps',
};
</script>

<style lang="scss" scoped>
.featured-container {
	overflow: hidden;
	max-width: 1400px;
	margin-left: auto;
	margin-right: auto;
}
</style>
