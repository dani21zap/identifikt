export default {
	namespaced: true,
	state() {
		return {
			userData: null,
			payData: null,
			cards: [],
			error: null
		};
	},

	actions: {
		async getUserInformation(context) {
			try {
				const { data: user } = await this.$axios.get('/api/account');
				console.log(data);
				context.commit('setUserInformation', user);
				if (window.$nuxt) {
					$nuxt.$emit('getUserInformation', user);
				}
			} catch (error) {}
		},
		async getPaySession(context) {
			try {
				const { data: session } = await this.$axios.get('/api/users/pay/session');
				context.commit('setPaySession', session);
				if (window.$nuxt) {
					$nuxt.$emit('getPaySession', session);
				}
			} catch (error) {
				context.commit('setError', error);
				if (window.$nuxt) {
					$nuxt.$emit('userInformationFailed', error);
				}
			}
		},

		async getPayCards(context) {
			try {
				const { data: cards } = await this.$axios.get('/api/users/pay/cards');
				context.commit('setPayCards', cards);
				if (window.$nuxt) {
					$nuxt.$emit('getPaycards', cards);
				}
			} catch (error) {
				context.commit('setError', error);
				if (window.$nuxt) {
					$nuxt.$emit('userInformationFailed', error);
				}
			}
		},
	},

	mutations: {
		setUserInformation(state, payload) {
			state.userData = payload;
		},
		setPaySession(state, payload) {
			state.payData = payload;
		},
		setPayCards(state, payload) {
			state.cards = payload;
		},
		setError(state, payload){
			state.error = payload
		},
	},
};
