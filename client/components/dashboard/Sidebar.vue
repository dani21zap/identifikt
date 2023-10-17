<template>
	<div>
		<div id="sidebar" class="app-sidebar new-class" :class="[$style.sidebar]">
            <div :class="$style.wrapperLogo" class="bg-identifikt">
            	<span class="logo">IDENTIFI-K-T</span>
                <!-- <img src="/images/logo-blanco.svg" width="150"> -->
            </div>
			<vue-custom-scrollbar class="app-sidebar-content">
				<div class="menu">
					<template v-for="(menu, index) in appSidebarMenu">
						<div class="menu-header" v-if="menu.is_header" v-bind:key="index">{{ menu.text }}</div>
						<div class="menu-divider" v-else-if="menu.is_divider" v-bind:key="index"></div>
						<sidebar-nav v-else ref="sidebarNav"
							v-bind:key="index"
							v-bind:menu="menu"
							v-on:collapse-other="handleCollapseOther(menu)"
							v-on:showFloatSubmenu="handleShowFloatSubmenu"
							v-on:hideFloatSubmenu="handleHideFloatSubmenu"></sidebar-nav>
					</template>
				</div>
			</vue-custom-scrollbar>

			<button class="app-sidebar-mobile-backdrop" v-on:click="dismissAppSidebarMobile"></button>
		</div>

		<div class="app-float-submenu" @mouseover="clearHideFloatSubmenu" @mouseleave="handleHideFloatSubmenu"
			v-if="this.appOptions.appSidebarMinified && !this.refreshSubmenu"
			v-bind:class="{ 'd-none': !this.floatSubmenu }"
			v-bind:style="{
				top: this.floatSubmenuTop,
				left: this.floatSubmenuLeft,
				bottom: this.floatSubmenuBottom,
				right: this.floatSubmenuRight
			}">
			<sidebar-nav v-for="(submenu, index) in this.floatSubmenuMenu"
				ref="sidebarFloatNav"
				v-bind:menu="submenu"
				v-bind:key="index"
				v-on:calcFloatSubmenu="handleCalcFloatSubmenu"></sidebar-nav>
		</div>
	</div>
</template>

<script>
import AppSidebarMenu from '@/config/AppSidebarMenu'
import AppOptions from '@/config/AppOptions'
import SidebarNav from '@/components/SidebarNav.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
	name: 'Sidebar',
  data() {
		return {
			appOptions: AppOptions,
			appSidebarMenu: AppSidebarMenu,
			floatSubmenu: false,
			floatSubmenuMenu: '',
			floatSubmenuTop: '',
			floatSubmenuBottom: '',
			floatSubmenuLeft: '',
			floatSubmenuRight: '',
			clearSubmenu: '',
			subMenuOffset: '',
			refreshSubmenu: false
		}
  },
	components: {
		SidebarNav
	},
	methods: {
		dismissAppSidebarMobile() {
			this.appOptions.appSidebarMobileClosed = true;

			setTimeout(() => {
				this.appOptions.appSidebarMobileClosed = false;
				this.appOptions.appSidebarMobileToggled = false;
			}, 250);
		},
		handleCollapseOther: function(menu) {
			for (var i = 0; i < this.appSidebarMenu.length; i++) {
				if(this.$refs.sidebarNav[i]) {
					this.$refs.sidebarNav[i].collapse(menu);
				}
			}
		},
		handleCalcFloatSubmenu: function() {
			setTimeout(() => {
				var targetTop = this.subMenuOffset.top;
				var windowHeight = window.innerHeight;
				var targetHeight = document.querySelector('.app-float-submenu').offsetHeight;

				if ((windowHeight - targetTop) > targetHeight) {
					this.floatSubmenuTop = this.subMenuOffset.top + 'px';
					this.floatSubmenuBottom = 'auto';
				} else {
					this.floatSubmenuTop = 'auto';
					this.floatSubmenuBottom = '0';
				}
			}, 0);
		},
		handleShowFloatSubmenu: function(data, offset) {
			if (data != this.floatSubmenuMenu) {
				this.refreshSubmenu = true;
			}

			if (this.refreshSubmenu != true) {
				this.floatSubmenuMenu = data;
				this.floatSubmenu = true;
				this.subMenuOffset = offset;
				this.refreshSubmenu = false;
			}

			var targetTop = offset.top;
			var windowHeight = window.innerHeight;
			var targetHeight = document.querySelector('.app-float-submenu').offsetHeight;

			setTimeout(() => {
				if (this.refreshSubmenu == true) {
					this.refreshSubmenu = false;
					this.floatSubmenuMenu = data;
					this.floatSubmenu = true;
					this.subMenuOffset = offset;
					this.refreshSubmenu = false;
				}


				if ((windowHeight - targetTop) > targetHeight) {
					this.floatSubmenuTop = offset.top + 'px';
					this.floatSubmenuBottom = 'auto';
				} else {
					this.floatSubmenuTop = 'auto';
					this.floatSubmenuBottom = '0';
				}
			}, 0);

			this.floatSubmenuRight = 'auto';
			this.floatSubmenuLeft = (document.getElementById('sidebar').offsetLeft + offset.width) + 'px';

			clearTimeout(this.clearSubmenu);
		},
		handleHideFloatSubmenu: function() {
			this.clearSubmenu = setTimeout(() => {
				this.floatSubmenu = false;
			}, 250);
		},
		clearHideFloatSubmenu: function() {
			clearTimeout(this.clearSubmenu);
		}
	}
}
</script>

<style lang="scss" module>
    .sidebar{
        // top: 80px;
        box-shadow: 0 0 10px 0 rgba(#000, 0.1);
		background: white;
    }
    .wrapperLogo{
        z-index: 1020;
		background: $brand;
        display: flex;
        align-items: center;
        justify-content: center;
        height: $app-header-height;
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
