<template>
	<div>
		<section class="container-fluid my-2">
			<div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded border shadow mb-4">
				<div class="col-12">
					<div class="row">
						<div class="col-3 col-md-2 col-lg-2 col-xl-1">
							<img
								class="rounded"
								src="https://cdn.shopify.com/app-store/listing_images/4bbf0fe31cdf41d53c3e6f0083af4b4d/icon/CNiD+ZPO0/ACEAE=.png?height=84&width=84"
								alt="s"
							/>
						</div>

						<div class="col-9 col-md-6 col-lg-6 col-xl-6">
							<div class="row pl-4 pl-md-0 pl-lg-4">
								<div class="col-auto p-0">
									<h1 class="text-2xl">Shipping Calculator Pro</h1>
									<!-- <span>by Shop Doctor</span> -->
								</div>
								<div class="col-auto p-0 align-self-center">
									<span class="pl-sm-2">by Shop Doctors</span>
								</div>
							</div>

							<div class="row pl-4 pl-md-0 my-2 pl-lg-4">
								<div class="col-12 p-0">
									<p class="lead text-lg">Shipping Calculator on Cart, Free Shipping Bars</p>
								</div>

								<div class="col-12 p-0 font-semibold"><i class="fas fa-star text-yellow"></i> 4.5 (123 reviews)</div>
							</div>

							<div class="row my-4 pl-lg-4">
								<div class="col-4 p-0">
									<b-button size="lg" block class="d-none d-md-block">Add App</b-button>
								</div>
							</div>

							<div class="row pl-lg-4 d-none d-md-block lead text-base">
								Free plan available. 14-day free trial.
							</div>
						</div>

						<div class="col-md-4 col-lg-4 col-xl-5 d-none d-md-block">
							<b-carousel
								id="carousel-1"
								:interval="4000"
								controls
								indicators
								background="#ababab"
								img-width="1024"
								img-height="480"
								style="text-shadow: 1px 1px 2px #333;"
							>
								<!-- Text slides with image -->
								<b-carousel-slide
									caption="First slide"
									text="Nulla vitae elit libero, a pharetra augue mollis interdum."
									img-src="https://picsum.photos/1024/480/?image=52"
								></b-carousel-slide>

								<!-- Slides with custom text -->
								<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
									<h1>Hello world!</h1>
								</b-carousel-slide>

								<!-- Slides with image only -->
								<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

								<!-- Slides with img slot -->
								<!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
								<b-carousel-slide>
									<template #img>
										<img
											class="d-block img-fluid w-100"
											width="1024"
											height="480"
											src="https://picsum.photos/1024/480/?image=55"
											alt="image slot"
										/>
									</template>
								</b-carousel-slide>

								<!-- Slide with blank fluid image to maintain slide aspect ratio -->
								<b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt a tincidunt eget,
										convallis vel est. Ut pellentesque ut lacus vel interdum.
									</p>
								</b-carousel-slide>
							</b-carousel>
						</div>
					</div>
				</div>

				<div class="col-12">
					<b-button size="lg" block class="d-block d-md-none">Add App</b-button>
				</div>
				<div class="col-12 mt-3 d-block d-md-none">
					<p class="lead text-base">Free plan available. 14-day free trial.</p>
				</div>
			</div>

			<div class="row d-block d-md-none">
				<b-carousel
					id="carousel-1"
					:interval="4000"
					controls
					indicators
					background="#ababab"
					img-width="1024"
					img-height="480"
					style="text-shadow: 1px 1px 2px #333;"
				>
					<!-- Text slides with image -->
					<b-carousel-slide
						caption="First slide"
						text="Nulla vitae elit libero, a pharetra augue mollis interdum."
						img-src="https://picsum.photos/1024/480/?image=52"
					></b-carousel-slide>

					<!-- Slides with custom text -->
					<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
						<h1>Hello world!</h1>
					</b-carousel-slide>

					<!-- Slides with image only -->
					<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

					<!-- Slides with img slot -->
					<!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
					<b-carousel-slide>
						<template #img>
							<img
								class="d-block img-fluid w-100"
								width="1024"
								height="480"
								src="https://picsum.photos/1024/480/?image=55"
								alt="image slot"
							/>
						</template>
					</b-carousel-slide>

					<!-- Slide with blank fluid image to maintain slide aspect ratio -->
					<b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt a tincidunt eget, convallis vel
							est. Ut pellentesque ut lacus vel interdum.
						</p>
					</b-carousel-slide>
				</b-carousel>
			</div>
		</section>

		<div class="row justify-content-around my-5">
			<div class="d-flex flex-column text-center align-items-center col-12 col-md-4 app-feature my-2">
				<div class="row">
					<img
						class="rounded-lg shadow"
						src="https://cdn.shopify.com/app-store/listing_images/4bbf0fe31cdf41d53c3e6f0083af4b4d/key_benefit/CKfCn6rjnPACEAE=.png?height=240&width=320"
						alt=""
					/>
				</div>

				<div class="row my-4">
					<h2 class="m-0 text-xl">Shipping Calculator On Cart</h2>
				</div>

				<div class="row">
					<p class="lead font-medium text-gray">
						Your customers can now calculate shipping rates in cart. Fewer surprises mean fewer abandoned carts and higher Conversion
						Rate!
					</p>
				</div>
			</div>

			<div class="d-flex flex-column text-center align-items-center col-12 col-md-4 app-feature my-2">
				<div class="row">
					<img
						class="rounded-lg shadow"
						src="https://cdn.shopify.com/app-store/listing_images/4bbf0fe31cdf41d53c3e6f0083af4b4d/key_benefit/CPbHqarjnPACEAE=.png?height=240&width=320"
						alt=""
					/>
				</div>

				<div class="row my-4">
					<h2 class="m-0 text-xl">Auto Populated Shipping Rates</h2>
				</div>

				<div class="row">
					<p class="lead font-medium text-gray">
						Take advantage of the best-in-class IP Geolocation, and automatically calculate shipping on cart. Less work for your
						customers!
					</p>
				</div>
			</div>

			<div class="d-flex flex-column text-center align-items-center col-12 col-md-4 app-feature my-2">
				<div class="row">
					<img
						class="rounded-lg shadow"
						src="https://cdn.shopify.com/app-store/listing_images/4bbf0fe31cdf41d53c3e6f0083af4b4d/key_benefit/CNu6s6rjnPACEAE=.png?height=240&width=320"
						alt=""
					/>
				</div>

				<div class="row my-4">
					<h2 class="m-0 text-xl">Free Shipping Bar Includedt</h2>
				</div>

				<div class="row">
					<p class="lead font-medium text-gray">
						Increase Average Order Value using our Free Shipping Bars! "Spend $5.25 more to get Free Shipping!" or "Free Shipping when you
						spend $50!"
					</p>
				</div>
			</div>
		</div>

		<hr />

		<div class="row my-5">
			<div class="col-12 p-0 mb-4">
				<h3>About Cart Shipping Calculator Pro</h3>
			</div>
			<div class="col-12">
				<div class="row">
					<div class="col-6">
						<div class="row">
							<h4 class="text-lg">PRE-CALCULATED Shipping Calculator On Cart!</h4>
						</div>
						<div class="row">
							<p class="lead">
								Help your customers by showing them shipping rates on cart, using IP geolocation! Without seeing shipping prices until
								the last step of checkout, customers make assumptions or feel anxious regarding the shipping cost. This could lead to
								cart abandonment.
							</p>
						</div>

						<div class="row">
							<h4 class="text-lg">Cart Shipping Calculator</h4>
						</div>
						<div class="row">
							<p class="lead">
								A shipping calculator with pre-calculated rates on the cart page is a great way to provide shipping early on, which
								could help increase your shop's Conversion Rate!
							</p>
						</div>

						<b-collapse id="collapse-description">
							<div class="row">
								<h4 class="text-lg">Pre-calculated Shipping Rates / IP Geolocation</h4>
							</div>
							<div class="row">
								<p class="lead">
									We detect your customers' location using bast-in-class IP geolocation and calculate shipping rates right on the
									cart page. If you offer a free shipping tier in the customer’s location, our app can promote it using a free
									shipping bar - “Spend $5 more to get FREE SHIPPING!”. Customers in non-free shipping locations don't see the free
									shipping promotion.
								</p>
							</div>

							<div class="row">
								<h4 class="text-lg">Features:</h4>
							</div>
							<div class="row">
								<ol class="lead">
									<li>Easy and quick Self-Installation.</li>
									<li>Display shipping rates on the cart page, or anywhere else in your shop.</li>
									<li>Promote a free shipping tier using our fully customizable free shipping bars.</li>
									<li>Provide a cart summary section with shipping rates and final total calculation.</li>
									Instantly uninstalls, configuration saved in app for later!
								</ol>
							</div>

							<div class="row">
								<h4 class="text-lg">Shipping And Discounts On Cart</h4>
							</div>
							<div class="row">
								<p class="lead">
									Get a shipping calculator integrated with discounts on cart by using this app together with the Discount On Cart
									Pro Edition app.
								</p>
							</div>

							<div class="row">
								<h4 class="text-lg">FYI!</h4>
							</div>
							<div class="row">
								<p class="lead">
									Applied discounts can affect final shipping prices. For example: a site may give free shipping on orders over $50.
									If a customer has $52 in their cart and proceeds to checkout, they will expect to receive free shipping. But if
									they enter a discount code for 10% off, they will not receive free shipping at checkout.
								</p>

								<p class="lead">
									If you were using both apps together, the customer would see that they have to add more to cart to receive free
									shipping after entering their discount code on the cart page.
								</p>

								<p class="lead">
									Offering: Calculate shipping in cart, free shipping bars, dynamically calculate shipping rates, automatically
									calculated shipping in cart, pre-populated cart shipping calculator, calculate shipping rates in cart, dynamic
									cart shipping rates, shipping on cart.
								</p>
							</div>
						</b-collapse>
					</div>
					<div class="col-6">
						<b-carousel
							id="carousel-1"
							:interval="4000"
							controls
							indicators
							background="#ababab"
							img-width="1024"
							img-height="480"
							style="text-shadow: 1px 1px 2px #333;"
						>
							<b-carousel-slide
								caption="First slide"
								text="Nulla vitae elit libero, a pharetra augue mollis interdum."
								img-src="https://picsum.photos/1024/480/?image=52"
							></b-carousel-slide>

							<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
								<h1>Hello world!</h1>
							</b-carousel-slide>

							<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

							<b-carousel-slide>
								<template #img>
									<img
										class="d-block img-fluid w-100"
										width="1024"
										height="480"
										src="https://picsum.photos/1024/480/?image=55"
										alt="image slot"
									/>
								</template>
							</b-carousel-slide>

							<b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt a tincidunt eget,
									convallis vel est. Ut pellentesque ut lacus vel interdum.
								</p>
							</b-carousel-slide>
						</b-carousel>
					</div>
					<div class="col-6 pl-0">
						<b-button v-if="isCollapsed" v-b-toggle="'collapse-description'" variant="outline-primary" @click="getCollapseClass"
							>Show full description</b-button
						>
						<b-button v-else v-b-toggle="'collapse-description'" variant="link" @click="getCollapseClass">Show less</b-button>
					</div>
				</div>
			</div>
		</div>

		<div class="row bg-light my-5 p-5">
			<div class="col-12 my-3 pl-0">
				<h2 class="">
					Pricing
					<span class="lead text-muted font-medium">14-day free trial</span>
				</h2>
			</div>

			<div class="col bg-white p-5 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded border shadow">
					<div class="col-12">
						<div class="row">
							<h2 class="text-muted lead uppercase">
								TRIAL/DEV PLAN
							</h2>
						</div>
						<div class="row my-3">
							<h2 class="font-medium">Free</h2>
						</div>
						<div class="row">
							<div class="col-12">
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> Free for Shopify Trial shops</p>
								</div>
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> Free for Shopify Partner/Developer shops</p>
								</div>
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> Not applicable to Shopify Basic shops</p>
								</div>
							</div>
						</div>
					</div>
			</div>

			<!-- We added offset-1 for spaceing -->
			<div class="col bg-white p-5 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded border shadow offset-md-1">
					<div class="col-12">
						<div class="row">
							<h2 class="text-muted lead uppercase">
								PRO PLAN
							</h2>
						</div>
						<div class="row my-3">
							<h2 class="font-medium">$3.50/month</h2>
						</div>
						<div class="row">
							<div class="col-12">
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> 14 Days Free</p>
								</div>
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> Shipping Calculator+ Cart Math</p>
								</div>
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> Expandable Shipping Calculator</p>
								</div>
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> Floating Free Shipping Bar</p>
								</div>
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> Shipping Bars Anywhere</p>
								</div>
								<div class="row">
									<p class="lead"><i class="fas fa-check text-green"></i> IP Geolocation</p>
								</div>
							</div>
						</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'apps',

	props: {
		/* title: {
			type: String,
			required: true,
		} */
	},

	data() {
		return {
			isCollapsed: true,
		};
	},

	methods: {
		getCollapseClass() {
			this.isCollapsed = !this.isCollapsed;
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

.card-footer {
	border: none;
}

.carousel {
	-moz-border-radius: 10px; /* FF1+ */
	-webkit-border-radius: 10px; /* Saf3-4, iOS 1+, Android 1.5+ */
	border-radius: 10px; /* Opera 10.5, IE9, Saf5, Chrome, FF4 */
	overflow: hidden;
	z-index: 1000;
}

.app-feature {
	max-width: 320px;
}

hr {
	/* height: 32px;
	border: 1px solid #d2d5d9;
	border-color: transparent transparent #d2d5d9; */
}
</style>
