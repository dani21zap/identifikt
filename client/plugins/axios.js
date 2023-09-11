export default ({ $axios, req, redirect, $cookiz }) => {
	const baseURL = process.server ? `${req.protocol}://${req.headers.host}` : '/';
	if ($cookiz.get('token')) {
		$axios.setHeader('Authorization', $cookiz.get('token'));
	} else {
		$axios.setHeader('Authorization', null);
	}
	$axios.onError(error => {
		if (error.response.status === 401 && window.location.pathname !== '/login') {
			$cookiz.remove('token');
			redirect('/login?session_expired');
		}
		throw error;
	});

	$axios.setBaseURL(baseURL);
};
