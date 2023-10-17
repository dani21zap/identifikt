const appSidebarMenu = [
	// {
	// 	text      : 'Navigation',
	// 	is_header : true,
	// },
	{
		url: '/dashboard',
		icon: 'fa fa-tachometer-alt',
		text: 'Engomados',
		class: 'only-exact',
	},
	{
		url: '/dashboard/vencidos',
		icon: 'fab fa-buffer',
		text: 'Engomados Vencidos',
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

	// {
	// 	url: '/dashboard/pricing',
	// 	icon: 'fas fa-tags',
	// 	text: 'Engomados Expirados',
	// 	target: '_blank',
	// },
	{
		url: '/dashboard/agregar',
		icon: 'fas fa-cog',
		text: 'Agregar Engomado',
	},
];

export default appSidebarMenu;
