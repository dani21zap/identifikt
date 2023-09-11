export default ({ route, redirect, $cookiz }) => {
	if (process.client) return;
	const pages = [
		'login',
		'home',
		'faqs',
		'contact-us',
		'prices',
		'integrations'
	];
	if (pages.includes(route.name) && $cookiz.get('token')) {
		redirect(
			'/dashboard',
			{query: route.query}
		);
	} else if (pages.includes(route.name) && !$cookiz.get('token')) {
		redirect({
			name: route.name,
			query: route.query
		});
	} else if (!$cookiz.get('token')) {
		redirect(
			'/login',
			{query: route.query}
		);
	}
};
