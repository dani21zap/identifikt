<template>
	<div
		class="app main-layout"
		:class="{
			'app-sidebar-minified': appOptions.appSidebarMinified,
			'app-sidebar-mobile-toggled': appOptions.appSidebarMobileToggled,
			'app-sidebar-mobile-closed': appOptions.appSidebarMobileClosed,
			'app-content-full-height': appOptions.appContentFullHeight,
			'app-content-full-width': appOptions.appContentFullWidth,
			'app-without-sidebar': appOptions.appWithoutSidebar,
			'pt-0': appOptions.appWithoutHeader,
			'app-boxed-layout': appOptions.appBoxedLayout,
			/* 'app-footer-fixed': appOptions.appWithFooter */
		}"
	>
		<dashboard-sidebar></dashboard-sidebar>
		<dashboard-header></dashboard-header>
		<div class="wrapper-app pb-5">
			<Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
		</div>
	</div>
</template>

<script>
import AppOptions from '@/config/AppOptions';
import { mapActions } from 'vuex';

export default {
	middleware: ['checkSession'],
	data() {
		return {
			appOptions: AppOptions,
		};
	},

	async created() {
		await this.getUserInformation();
	},

	methods: {
		...mapActions('userInformation', ['getUserInformation']),
	},
};
</script>

<style lang="scss">
.app-sidebar-minified .wrapper-app {
	margin-left: $app-sidebar-minify-width;
}
.wrapper-app {
	margin-left: $app-sidebar-width;
	@include media-breakpoint-down(md) {
		margin-left: 0;
	}
}
</style>

<style>
    .cookieControl button {
        border-radius: 50rem;
        font-weight: 600;
        font-size: 0.75rem;
        margin: 0.5rem !important;
    }
    .cookieControl__BarButtons{
        margin: 0!important;
        justify-content: center;
    }
    .cookieControl__ModalClose button{
        border-radius: 80rem;
    }

    .cookieControl__ModalInputWrapper {
        font-size: 0.75rem;
    }

    .cookieControl__ModalButtons {
        margin: 0;
        justify-content: center;
    }

    .cookieControl__ModalButtons button {
        width: 100%;
        padding:0.5rem;
        margin: 0.5rem !important;
    }

    .cookieControl__ModalContent h3 {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>