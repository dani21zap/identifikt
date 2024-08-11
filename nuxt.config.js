require('@nuxtjs/dotenv');
const path = require('path');
const globImporter = require('node-sass-glob-importer');

const css = ['@/assets/scss/styles.scss'];

const bootstrapVue = {
	bootstrapCSS: false, // O `css: false`
	bootstrapVueCSS: false, // O` bvCSS: false`
	icons: false,
};

const dayjs = {
	locales: ['en', 'es'],
	defaultLocale: 'en',
	plugins: ['utc', 'relativeTime'],
};

const styleResources = {
	scss: ['~/assets/scss/vuestudio/_variables.scss', 'bootstrap/scss/_mixins.scss'],
};

const mediaQuery = {
	// Default breakpoint for SSR
	defaultBreakpoint: 'sm',
	breakpoints: {
		xs: 640,
		sm: 768,
		md: 1024,
		lg: 1280,
		xl: 1660,
		xxl: Infinity,
	},
};

const redirect = {
	rules: [{ from: '^/(\\?(.*=.*)?)?$', to: '/home' }],
};

const modules = [
	// 'nuxt-i18n',
	['@luxdamore/nuxt-prune-html'],
	['nuxt-lazy-load'],
	'@nuxtjs/style-resources',
	['bootstrap-vue/nuxt', bootstrapVue],
	'@nuxtjs/axios',
	'@nuxtjs/device',
	['cookie-universal-nuxt', { alias: 'cookiz' }],
	'nuxt-vuex-router-sync',
	'nuxt-user-agent',
	'nuxt-compress',
	['@nuxtjs/dayjs', dayjs],
	['v-wave/nuxt', { duration: 0.3 }],
	['nuxt-mq', mediaQuery],
	['@nuxtjs/redirect-module', redirect],
	['vue-toastification/nuxt',
		{
			transition: 'Vue-Toastification__slideBlurred',
			maxToasts: 15,
			newestOnTop: true,
			position: 'bottom-right',
		}
	]
];

const routerConfig = {
	router: {
		middleware: ['auth'],
	},
};

const authConfig = {
	strategies: {
		local: {
			token: {
				type: false,
			},
			user: {
				property: '',
			},
			endpoints: {
				login: {
					url: '/api/login',
					method: 'post',
					propertyName: 'token',
				},
				logout: false,
				user: { url: '/api/dashboard/account', method: 'get' },
			},
		},
	},
};

const env = {
	ECARTAPI_URL: process.env.ECARTAPI_URL || 'https://api.ecartapi.com',
	OAUTH_URL: process.env.OAUTH_URL || 'https://oauth.ecartapi.com',
	PAYMENT_URL: process.env.PAYMENT_URL || 'https://pay.ecart.com'
};

const googleFonts = {
	families: {
		Montserrat: [300, 400, 500, 600, 700],
	},
	display: 'swap',
};

const buildModules = [
	'nuxt-build-optimisations',
	'@nuxt/postcss8',
	['@nuxtjs/google-fonts', googleFonts],
	['@nuxtjs/dotenv', { path: path.resolve(__dirname) }],
	[
		'@nuxtjs/eslint-module',
		{
			// lintDirtyModulesOnly: false,
			emitError: false,
			emitWarning: false,
			failOnError: false,
			failOnWarning: false,
		},
	],
];

const build = {
	transpile: ['vue-toastification'],
	filenames: {
		app: ({ isDev, isModern }) => (isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[name]-[contenthash:7]${isModern ? '.modern' : ''}.js`),
		chunk: ({ isDev, isModern }) => (isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[name]-[contenthash:7]${isModern ? '.modern' : ''}.js`),
		css: ({ isDev }) => (isDev ? '[name].css' : 'css/[name]-[contenthash:7].css'),
	},
	loaders: {
		cssModules: {
			modules: {
				localIdentName: '[name]__[local]__[hash:base64:6]',
			},
		},
	},
	babel: {
		compact: true,
		plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
	},
	terser: {
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
	extend(config, ctx) {
		const { scss } = ctx.loaders;
		const sassOptions = scss.sassOptions || {};
		sassOptions.importer = globImporter();
		scss.sassOptions = sassOptions;
		if (ctx.isDev) {
			config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
		}
	},
};

const head = {
	titleTemplate: titleChunk => {
		// If undefined or blank then we don't need the hyphen
		return titleChunk ? `${titleChunk} | Ecart API` : 'Integrate to every Ecommerce shopping cart and Marketplace Developers | Ecart API';
	},
	meta: [
		{ charset: 'utf-8' },
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1, , maximum-scale=1, viewport-fit=cover',
		},
		{
			hid: 'http-equiv',
			'http-equiv': 'X-UA-Compatible',
			content: 'IE=edge',
		},
		{ hid: 'theme-color', name: 'theme-color', content: '#ffffff' },
		{
			hid: 'msapplication-TileColor',
			name: 'msapplication-TileColor',
			content: '#81b23a',
		},
		{
			hid: 'description',
			name: 'description',
			content:
				'Api for developers looking to connect to multiple shopping carts and marketplaces with a single API. Develop all in one ecommerce solutions. Connect with over 12 million ecommerce owners.',
		},
		{
			hid: 'keywords',
			name: 'keywords',
			content:
				'shopping cart integration, marketplace integration, ecommerce integration, connect to multi store ecommerce platform, omnichannel ecommerce api, mercado libre api integration, ecwid api integration ,api shopify, api magento, api prestashop, amazon sp-api, multistore api, web service for multistore, ecart',
		},
		{
			hid: 'author',
			name: 'author',
			content: 'Tendencies Innovations LLC',
		},{
			hid: 'robots',
			name: 'robots',
			content: 'all'
		}
	],
	link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/site/images/favicon.ico' },
		{
			rel: 'short icon',
			type: 'image/x-icon',
			href: '/site/images/favicon.ico',
		},
		// {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		// {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
		// {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
		// {rel: 'mask-icon', color: '#81b23a', href: '/safari-pinned-tab.svg'},
		// {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
		// {rel: 'manifest', href: '/manifest.json'},
	],
};

const plugins = [
	'~/plugins/axios.js',
	'~/plugins/ecart-api.js',
	'~/plugins/vuelidate.js',
	'~/plugins/global-components.js',
	'~/plugins/filters.js',
	'~/plugins/vue-clipboard.js',
	'~/mixins/global.mixin.js',
	// '~/plugins/gtm.js',
];

const config = {
	version: '1.0.0',
	srcDir: 'client/',
	components: true,
	serverMiddleware: ['../server/app.js'],
	ssr: true,
	ignore: 'pages/ignore/**/*.vue',
	css,
	modules,
	styleResources,
	buildModules,
	build,
	head,
	plugins,
	routerConfig,
	authConfig,
	env,
	buildOptimisations: {
		profile: process.env.NODE_ENV === 'development' ? 'risky' : 'experimental',
	},
	server: {
		host: '0.0.0.0',
	}
};

if (process.env.NODE_ENV === 'development') {
	config.server = {
		port: process.env.PORT || 3010, // default: 3000
		host: '0.0.0.0',
	};
}

export default config;