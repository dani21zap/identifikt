export default {
	namespaced : true,
    state(){
        return {
            ecommerces: [],
			options: [],
			status: ''
        }
    },
	actions: {
		async getEcommerces({state, commit}){
			try {
				let response = await this.$axios.get("/api/services/ecommerces")
				commit('setData', response.data);
				/* state.status = 'success'; */
				commit('setStatus', 'success')
				commit('setOptions', response.data)
				$nuxt.$emit('loadEcommerces');
			} catch (error) {
				commit('setStatus', 'error')
				// state.status = 'error';
				throw new Error(error);
			}
		}
	},
	mutations: {
		setData(state, payload){
			state.ecommerces = payload
		},

		setStatus(state, payload){
			state.status = payload
		},

		setOptions(state, payload){
			state.ecommerces = payload
            state.ecommerces.forEach(ecommerce => {
                const option = {
                    value: ecommerce._id,
                    text: ecommerce.name
                }
                state.options.push(option)
            })

            state.options.sort((a,b) => a.text.localeCompare(b.text))
		}
	},

	getters: {
		ecommercesOptions(state){
			return state.options
		},
		
	}
}
