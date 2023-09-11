export default ({ $axios }, inject) => {
	// Create a custom axios instance
	const api = $axios.create({
		timeout: 15000,
		headers: {
			Authorization: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOclVBVkhzZmpUSlVFME5hY2dBN21WU29na2ZUdVdUVyIsImlhdCI6MTU4Mjc0MDM4MTQ4OH0.gQdWERZbU_VRrXApwXX47O73WpKL6R_uH3YoA-24QEb4ubyk_JVFV2CxzpVysyZNwZWMGTGJZl__fQ8lEsmZ2Q`,
		},
	});
	const ecart_api_url = 'https://api.ecartapi.com';
	api.setBaseURL(ecart_api_url);
	// Inject to context as $api
	inject('ecart_api', api);
};
