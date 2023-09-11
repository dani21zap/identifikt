const appSidebarMenu = [
	// {
	// 	text      : 'Navigation',
	// 	is_header : true,
	// },
	{
		url: '/dashboard',
		icon: 'fa fa-tachometer-alt',
		text: 'Dashboard',
		class: 'only-exact',
	},
	{
		url: '/dashboard/apps',
		icon: 'fab fa-buffer',
		text: 'My Apps',
		// children: [
		//     {text: 'Envia', url: '/apps/#'},
		//     {text: 'enviapaqueteria', url: '/apps/#'},
		//     {text: 'parapaquetes', url: '/apps/#'},
		//     {text: 'fulfillment', url: '/apps/#'},
		//     {text: 'ecart', url: '/apps/#'},
		// ],
	},
	// {
	// 	url  : '/prices',
	// 	icon : 'fa fa-tags',
	// 	text : 'Prices',
	// },

	{
		url: '/dashboard/pricing',
		icon: 'fas fa-tags',
		text: 'Our Prices',
		target: '_blank',
	},
	{
		url: '/dashboard/billing',
		icon: 'fa fa-credit-card',
		text: 'Billing',
	},
	{
		url: 'https://docs.ecartapi.com/',
		icon: 'fas fa-cogs',
		text: 'API',
		target: '_blank',
	},
	{
		url: '/dashboard/documentation',
		icon: 'fas fa-book',
		text: 'Documentation',
	},
	{
		url: 'https://envia.atlassian.net/servicedesk/customer/portal/8',
		icon: 'far fa-question-circle',
		text: 'Help Center',
		target: '_blank',
	},
	{
		url: '/dashboard/contact',
		icon: 'fa-solid fa-phone',
		text: 'Contact Us',
	},
	{
		url: '/dashboard/settings',
		icon: 'fas fa-cog',
		text: 'Settings',
	},
];

export default appSidebarMenu;
