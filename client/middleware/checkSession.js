const jwt = require('jsonwebtoken');

export default ({route, redirect, $cookiz}) => {
	if (process.client) return;
	const pages = [
		'login',
		'register'
	];
	const admin_only_pages = [
		'dashboard'
	]

	const secret_pages = [
		'dashboard',
		'plate-card'
	]
	const token = $cookiz.get('token');
	if(route.name == 'logout'){
		$cookiz.remove('token');
		// setHeader('Authorization', null);
		redirect('/home', {query: route.query});
		return;
    }

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const admin = decoded.admin;
			if (!admin && admin_only_pages.includes(route.name)) {
				redirect('/home', {query: route.query});
				return;
			}
		} catch (error) {
			if (secret_pages.includes(route.name)) {
	        	// Handle invalid or expired token
				redirect('/home', {query: route.query});
				return;
			}
		}
	} else if (secret_pages.includes(route.name)) {
		redirect('/home', {query: route.query});
		return;
	}
};
