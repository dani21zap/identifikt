<template>
	<div class="bg-secondary">
		<div class="container-md">
			<b-navbar toggleable="lg" type="dark" class="pr-0 pl-0">
				<b-navbar-brand href="/appstore" class="font-extrabold fs-36px">
					<img data-not-lazy class="logo" src="/images/logo-blanco.svg" alt="ECARTAPI" />
				</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse">
					<template #default="{ expanded }">
						<i v-if="!expanded" class="fas fa-bars"></i>
						<i v-else class="fas fa-times"></i>
					</template>
				</b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto">
						<b-navbar-nav class="text-lg">
							<b-nav-item is="li" class="nav-item mr-3 font-semibold">
								<nuxt-link class="nav-link" :to="{ path: '/home' }">ecartapi.com</nuxt-link>
							</b-nav-item>

							<div v-if="$cookiz.get('token')" class="d-flex align-items-center">
								<!-- <span class="icon-user">
                                    <i class="far fa-user"></i>
                                </span> -->
								<nuxt-link
									class="d-inline-block ml-2 text-white  rounded-pill pr-5 pl-5 pt-2 pb-2 bg-brand text-lg font-semibold"
									to="/dashboard"
								>
									My Account
								</nuxt-link>
							</div>

							<div v-else class="get-started">
								<b-nav-item href="/login" class="mr-3 font-semibold"> Login </b-nav-item>

								<b-button pill class="bg-brand pr-5 pl-5 text-lg font-semibold" href="/register"> Sign Up </b-button>
							</div>
						</b-navbar-nav>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.get-started {
	display: flex;
	flex-direction: column;
	// align-items: flex-start;
	@media screen and (min-width: 990px) {
		flex-direction: row;
	}

	a {
		align-self: center;
	}
}

.btn.bg-brand {
	transition: all 0.2s ease-in-out;
}

.btn.bg-brand:hover {
	transform: translateY(-1px);
}

.logo {
	height: 30px;
	@include media-breakpoint-up(md) {
		height: 40px;
	}
}
</style>

<style lang="scss">
.navbar-toggler {
	font-size: 24px;
	padding: 0;
	border: none;
	i {
		color: $white;
	}
}
#nav-collapse {
	.nuxt-link-active {
		color: $white;
	}
}
.icon-user {
	border-radius: 50%;
	height: 35px;
	width: 35px;
	display: inline-block;
	box-shadow: 0 0 0 2px $white inset;
	display: flex;
	color: $white;
	justify-content: center;
	align-items: center;
}
</style>
