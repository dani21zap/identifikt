<template>
	<div class="row justify-content-center">
		<div :class="colClass" class="col-my">
			<table-prices>
				<template slot="header">
					<h1 class="text-white">Free</h1>
					<span>Cost per month</span>
				</template>
				<template>
					<ul>
						<li>
							Requests
							<br />
							1 - 1,000
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>24*7</strong> Support
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited Apps</strong> EcartAPI Module
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited</strong> Stores
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Included</strong> Webhooks
						</li>
					</ul>
				</template>
			</table-prices>
		</div>

		<div :class="colClass" class="col-my">
			<table-prices>
				<template slot="header">
					<h1 class="text-white">$0.01<span>/request</span></h1>
					<span>Cost per month *Min $10 usd</span>
				</template>
				<template>
					<ul>
						<li>
							Requests
							<br />
							1,000 - 10,000
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>24*7</strong> Support
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited Apps</strong> EcartAPI Module
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited</strong> Stores
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Included</strong> Webhooks
						</li>

						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							Phone & Email Support
						</li>
					</ul>
				</template>
			</table-prices>
		</div>

		<div :class="colClass" class="col-my">
			<table-prices>
				<template slot="header">
					<h1 class="text-white">$0.003<span>/request</span></h1>
					<span>Cost per month *Min $100 usd</span>
				</template>
				<template>
					<ul>
						<li>
							Requests
							<br />
							10,000 - 100,000
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>24*7</strong> Support
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited Apps</strong> EcartAPI Module
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited</strong> Stores
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Included</strong> Webhooks
						</li>

						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							Phone & Email Support
						</li>
					</ul>
				</template>
			</table-prices>
		</div>

		<div :class="colClass" class="col-my">
			<table-prices>
				<template slot="header">
					<h1 class="text-white">$0.001<span>/request</span></h1>
					<span>Cost per month *Min $300 usd</span>
				</template>
				<template>
					<ul>
						<li>
							Requests
							<br />
							100,001 - 1,000,000
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>24*7</strong> Support
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited Apps</strong> EcartAPI Module
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited</strong> Stores
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Included</strong> Webhooks
						</li>

						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							Phone & Email Support
						</li>
					</ul>
				</template>
			</table-prices>
		</div>

		<div :class="colClass" class="col-my">
			<table-prices>
				<template slot="header">
					<h1 class="text-white">$0.0005<span>/request</span></h1>
					<span>Cost per month *Min $1000 usd</span>
				</template>
				<template>
					<ul>
						<li>
							Requests
							<br />
							1,000,001 +
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>24*7</strong> Support
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited Apps</strong> EcartAPI Module
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Unlimited</strong> Stores
						</li>
						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							<strong>Included</strong> Webhooks
						</li>

						<li>
							<i class="fa fa-check-circle" aria-hidden="true"></i>
							Phone & Email Support
						</li>
					</ul>
				</template>
			</table-prices>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		colClass: {
			type: String,
			default: 'col-md-auto',
		},
	},
};
</script>

<style lang="scss" scoped>
.fa-check-circle {
	color: $primary;
}
h1 span {
	font-size: 1rem;
}
</style>
