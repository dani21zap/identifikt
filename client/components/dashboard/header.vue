<template>
	<div id="header" class="app-header" :class="[$style.header]">
		<div class="brand bg-identifikt" :class="[$style.brand]" v-if="!appOptions.appSidebarMinified">
			<span class="logo">IDENTIFI-K-T</span>
			<!-- <a href="/" class="brand-logo">
				<img class="mx-auto" src="/images/logo-blanco.svg" alt="" width="150" />
			</a> -->
		</div>
		<div class="menu flex" :class="[$style.wrapper]">
			<div class="desktop-toggler" :class="[$style.toggle]">
				<button type="button" class="menu-toggler" v-on:click="toggleAppSidebarMinify">
					<span class="bar"></span>
					<span class="bar"></span>
				</button>
			</div>
			<div class="mobile-toggler" :class="[$style.toggle]">
				<button type="button" class="menu-toggler" v-on:click="toggleAppSidebarMobile">
					<span class="bar"></span>
					<span class="bar"></span>
				</button>
			</div>
			<b-dropdown class="menu-item ml-auto" left toggle-tag="a" variant="link" :no-caret="true" toggle-class="menu-link border-0">
				<template v-slot:button-content>
					<div class="menu-img printing">
						<div
							:class="[$style.userIcon]"
							class="d-flex align-items-center justify-content-center w-100 h-100 bg-gray-800 text-gray-300 rounded-circle overflow-hidden"
						>
							<i class="fa fa-user fa-2x mb-n3"></i>
						</div>
					</div>
					<div v-if="userData" class="account-info text-white ml-3 d-flex flex-column text-left">
						<span class="text-semibold text-md">{{ userData.first_name }} {{ userData.last_name }}</span>
						<!-- <span class="text-sm text-gray-100" :key="userData.company"> {{ userData.company }}</span> -->
						<span class="text-sm text-gray-100"> {{ userData.email }}</span>
					</div>
				</template>

				<b-dropdown-item v-if="userData" class="account-info__dropdown">
					<span class="text-semibold text-md">{{ userData.first_name }} {{ userData.last_name }}</span> <br>
					<span class="text-sm text-muted"> {{ userData.email }}</span>
				</b-dropdown-item>

				<b-dropdown-divider />
				<b-dropdown-item link-class="d-flex align-items-center" @click="logout" href="#">
					Log Out <i class="fa fa-toggle-off fa-fw ml-auto text-gray-400 f-s-16"></i>
				</b-dropdown-item>
			</b-dropdown>
		</div>
		<!-- END menu -->
	</div>
</template>

<script>
import AppOptions from '@/config/AppOptions';
import { mapState } from 'vuex';

export default {
	name: 'Header',
	data() {
		return {
			appOptions: AppOptions,
			notificationData: [],
		};
	},
	computed: {
		...mapState('userInformation', ['userData']),
	},
	async mounted() {
		if (localStorage.user) {
			this.user = JSON.parse(localStorage.user);
		} else {
			this.user = {
				email: 'account@example.com',
			};
		}
	},
	methods: {
		toggleAppSidebarMobile() {
			this.appOptions.appSidebarMobileToggled = !this.appOptions.appSidebarMobileToggled;
		},
		toggleAppSidebarMinify() {
			this.appOptions.appSidebarMinified = !this.appOptions.appSidebarMinified;
		},
		checkForm(e) {
			e.preventDefault();
			this.$router.push({
				path: '/extra/search',
			});
		},
		logout() {
			this.$cookiz.remove('token');
			this.$axios.setHeader('Authorization', null);
			window.location.href = '/login';
		},
	},
};
</script>

<style lang="scss" module>
.header {
	background-color: #003554;
	padding-left: 0;
	padding-right: 0;
}
.toggle {
	button {
		padding: 0;
	}
}
.wrapper {
	display: flex;
	flex-grow: 1;
	padding: 0 20px;
	margin-right: -20px;
}
.userIcon {
	box-shadow: 0 0 0 2px white;
}
.userBox {
	margin-left: auto;
	display: flex;
	align-items: center;
	img {
		box-shadow: 0 0 0 2px white;
		border-radius: $border-radius-pill;
		height: 40px;
		width: 40px;
		object-fit: cover;
	}
}
.brand {
	background-color: #003554;
	display: none;
	padding: 0 20px;
	align-items: center;
	justify-content: center;
	@include media-breakpoint-up(lg) {
		display: flex;
	}
}
</style>

<style lang="scss" scoped>
.account-info span {
	display: none;
	@media screen and (min-width: 600px) {
		display: block;
	}
}

.account-info__dropdown,
ul hr {
	display: block;
	@media screen and (min-width: 600px) {
		display: none;
	}
}
</style>

<style lang="css">
.logo {
	color: #CC2936;
}

.bg-identifikt {
	background-color: #003554;
}
</style>