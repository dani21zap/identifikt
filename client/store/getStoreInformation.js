export default {
    namespaced: true,
    state() {
        return {
            storeInfo: {}
        }
    },

    actions: {
        async getStoreInformation({state, commit}, appId, storeId){

            const {data} = await this.$axios.get(`/api/apps/${appId}/stores/${storeId}`)
            commit('setStoreInformation', data)
        }
    },


    mutations: {
        setStoreInformation(state, payload) {
            state.storeInfo = payload
        }
    }
}
