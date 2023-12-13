<template>
	<div class="bg-identifikt">
		<div class="container-md">
			<b-navbar toggleable="lg" type="dark" class="md:pt-6 md:pb-6 pr-0 pl-0">
				<b-navbar-brand href="/home" class="font-extrabold fs-36px">
					<span class="logo">IDENTIFI-K-T</span>
					<!-- <img data-not-lazy class="logo" src="/images/logo-blanco.svg" alt="ECARTAPI" /> -->
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
								<nuxt-link class="nav-link" :to="{ path: '/requisitos' }">Requisitos</nuxt-link>
							</b-nav-item>
							<b-nav-item is="li" class="nav-item mr-3 font-semibold">
								<a class="nav-link" href="https://wa.me/6271390469" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
							</b-nav-item>
							<!-- <b-nav-item is="li" class="nav-item mr-3 font-semibold">
								<a class="nav-link" href="https://example.com" target="_blank">
									<i class="fa-solid fa-envelope"></i>
								</a>
							</b-nav-item> -->
							<b-nav-item-dropdown class='mr-3'>
								<!-- <template #default="{ expanded }">
									<i v-if="!expanded" class="fas fa-bars"></i>
									<i v-else class="fas fa-times"></i>
								</template>
								<i class="fas fa-bars"></i> -->
								<b-dropdown-item href="/login" class="mr-3 font-semibold">Identificate </b-dropdown-item>
							</b-nav-item-dropdown>

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

<style lang="css">
.logo {
	color: #CC2936
}

.bg-identifikt {
	background-color: #003554
}
</style>
