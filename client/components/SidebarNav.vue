<template>
	<!-- menu with submenu -->
	<div v-if="menu.children" class="menu-item has-sub" v-bind:class="{ 'active': subIsActive(menu.url), 'expand': this.stat == 'expand', 'collapsed': this.stat == 'collapse', 'd-none': this.stat =='hide' }">
		<a :href="'#'" class="menu-link" @click.prevent.stop="expand($event)" @mouseover="mouseOver(menu.children)" @mouseleave="hideFloatSubmenu">
			<span class="menu-icon" v-if="menu.icon || !menu.children">
				<i v-bind:class="menu.icon"></i>
				<span class="menu-icon-label" v-if="menu.label">{{ menu.label }}</span>
			</span>
			<span class="menu-text">{{ menu.text }}</span>
			<span class="menu-caret" v-if="menu.children"><b class="caret"></b></span>
		</a>
		<div class="menu-submenu" ref="submenu" v-bind:style="submenuStyle">
			<template v-for="(submenu, index) in menu.children">
				<sidebar-nav v-bind:menu="submenu" v-bind:key="index" ref="sidebarNav" v-on:calcFloatSubmenu="handleCalcFloatSubmenu" v-on:collapse-other="handleCollapseOther(submenu)"></sidebar-nav>
			</template>
		</div>
	</div>

	<!-- menu without submenu -->

	<a v-else-if="typeof menu.url == 'string' && menu.url.includes('http')" :href="menu.url" class="menu-item no-underline d-block" :target="menu.target">
		<span class="menu-link">
			<span class="menu-icon" v-if="isActive(menu.url) && !menu.icon">
				<i class="fas fa-chevron-right"></i>
			</span>
			<span class="menu-icon" v-if="menu.icon">
				<i v-bind:class="menu.icon"></i>
				<span class="menu-icon-label" v-if="menu.label">{{ menu.label }}</span>
			</span>
			<span class="menu-text">{{ menu.text }}</span>
		</span>
	</a>
	<div v-else>
		<nuxt-link :to="menu.url" :class="menu.class" class="menu-item no-underline d-block" v-on:click.native="collapseOther()">
			<span class="menu-link">
				<span class="menu-icon" v-if="isActive(menu.url) && !menu.icon">
					<i class="fas fa-chevron-right"></i>
				</span>
				<span class="menu-icon" v-if="menu.icon">
					<i v-bind:class="menu.icon"></i>
					<span class="menu-icon-label" v-if="menu.label">{{ menu.label }}</span>
				</span>
				<span class="menu-text">{{ menu.text }}</span>
			</span>
		</nuxt-link>
	</div>
</template>

<script>
import AppOptions from '../config/AppOptions'
import SidebarNav from './SidebarNav'

export default {
	name: 'SidebarNav',
	props: ['menu'],
	components: {
		SidebarNav
	},
	watch: {
		$route(to, from){
			if (this.appOptions.appSidebarMobileToggled == true) {
				this.appOptions.appSidebarMobileClosed = true;

				setTimeout(() => {
					this.appOptions.appSidebarMobileClosed = false;
					this.appOptions.appSidebarMobileToggled = false;
				}, 250);
			}
		}
	},
	mounted() {
		if (this.subIsActive(this.menu.url) && this.$refs.sidebarNav) {
			var finalHeight = 0;
			for (var i = 0; i < this.$refs.sidebarNav.length; i++) {
				finalHeight += this.$refs.sidebarNav[i].$el.clientHeight;
			}
			this.submenuStyle = { maxHeight: finalHeight + 'px' };
		}
	},
	data() {
		return {
			stat: '',
			appOptions: AppOptions,
			submenuStyle: {

			}
		}
	},
	methods: {
		expand: function() {
			if (this.stat == '') {
				this.stat = (this.subIsActive(this.menu.url)) ? 'collapse' : 'expand';
			} else {
				this.stat = (this.stat == 'expand') ? 'collapse' : 'expand'
			}
			if (this.stat == 'expand') {
				setTimeout(() => {
					var finalHeight = 0;
					for (var i = 0; i < this.$refs.sidebarNav.length; i++) {
						finalHeight += this.$refs.sidebarNav[i].$el.clientHeight;
					}

					this.submenuStyle = { maxHeight: '0px' };
					setTimeout(() => {
						this.submenuStyle.maxHeight = finalHeight + 'px';
					}, 0);
				}, 0);
			} else {
				this.submenuStyle = { maxHeight: '0px' };
			}
			this.$emit('collapse-other', this.menu);

			if (this.appOptions.appSidebarMinified) {
				this.$emit('calcFloatSubmenu');
			}
		},
		collapse: function(menu) {
			if (this.menu != menu) {
				this.stat = 'collapse';
				this.submenuStyle = { maxHeight: '0px' };
			}
		},
		mouseOver: function(data) {
			if (this.appOptions.appSidebarMinified) {
				setTimeout(() => {
					var offset = this.$el.getBoundingClientRect();
					this.$emit('showFloatSubmenu', data, offset);
				},0);
			}
		},
		hideFloatSubmenu: function() {
			if (this.appOptions.appSidebarMinified) {
				this.$emit('hideFloatSubmenu');
			}
		},
		handleCalcFloatSubmenu: function() {
			if (this.appOptions.appSidebarMinified) {
				this.$emit('calcFloatSubmenu');
			}
		},
		hide: function() {
			this.stat = 'hide';
		},
		show: function() {
			this.stat = '';
		},
		searchExpand: function() {
			this.stat = 'expand'
		},
		collapseOther: function() {
			this.$emit('collapse-other', this.menu)
		},
		handleCollapseOther: function(menu) {
			for (var i = 0; i < this.menu.children.length; i++) {
				if(this.$refs.sidebarNav[i]) {
					this.$refs.sidebarNav[i].collapse(menu);
				}
			}
		},
		subIsActive(url) {
			const paths = Array.isArray(url) ? url : [url]
			return paths.some(url => {
				return this.$route.path.indexOf(url) === 0
			})
		},
		childrenIsActive(children) {
            if(!children) return false;
            let result = children.some(c => {
                return this.$route.fullPath === '/apps/#';
            });
		},
		isActive(url) {
            url = typeof url == 'string' ? url : null;
            if(url == null) return false;
            return this.$route.fullPath.indexOf(url) === 0;
		}
  }
}
</script>


<style lang="scss">
    .menu-submenu{
		margin-top: 0.5rem;
    }

    .menu-link.nuxt-link-active{
        *{
			color: $primary;
        }
        background: rgba($primary, 0.1);
    }
</style>
