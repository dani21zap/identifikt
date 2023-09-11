export default {
	namespaced: true,
	state() {
		return {
			countries: [],
			options: [],
			status: '',
		};
	},
	actions: {
		async getCountries({ state, commit }) {
			try {
				const { data } = await this.$axios.get(`/api/services/countries`);
				/* const {name, code_3} = data; */
				commit('setData', data);
				/* commit('setCountries',) */
				commit('setStatus', 'success');
			} catch (error) {
				commit('setStatus', 'error');
				throw new Error(error);
			}
		},
	},
	mutations: {
		setData(state, payload) {
			state.countries = payload;
			state.countries.forEach(country => {
				const option = {
					value: country.code_2,
					text: country.name,
				};
				state.options.push(option);
			});

			state.options.sort((a, b) => a.text.localeCompare(b.text));
		},

		setStatus(state, payload) {
			state.status = payload;
		},
	},
};
