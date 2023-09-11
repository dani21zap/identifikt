export default {
    state(){
        return{
            appInformation: null
        }
    },

    actions: {
        async getAppInformation(context, appId) {
            try {
                // Get app information
                const {data} = await this.$axios.get(`/api/apps/${appId}`);
                context.commit('setAppInformation', data)
            } catch (err) {
                console.log(err);
            }
        },
    },

    mutations: {
        setAppInformation(state, payload){
            state.appInformation = payload
        }
    },

    getters: {
        getDataApp(state){
            return state.appInformation
        }
    }
}