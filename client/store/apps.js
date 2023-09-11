export default {
	namespaced : true,
    state(){
        return {
            fields: [
                {
                    key: 'app_id',
                },
                {
                    key: 'active'
                },
                {
                    key: 'name',
                    sortable: true,
                },
                {
                    key: 'img'
                },
                {
                    key: 'requests',
                    sortable: true,
                },
                {
                    key: 'accesses',
                    sortable: true,
                },
                {
                    key: 'created_at',
                    label: 'Date of creation'
                },
                {
                    key: 'updated_at',
                    label: 'Date of Update'
                }
            ],
            filters: {
                page: 1,
                limit: 25
            },
            apps: [],
            app: {},
            status: 'loading'
        }
    },
	actions: {
		async GetApps({state, commit}){
			try {
				let response = await this.$axios.get("/api/apps")
				commit('setApps', response.data);
				state.filters.count = response.data.length;
				state.status = 'done'
			} catch (error) {
				state.status = 'error'
				throw new Error(error);
			}
		},
        async GetApp({commit, state}){
			try {
				let { response } = await this.$axios.get(`/api/apps/${state.app.id}`)
				commit('setApp', response.data);
			} catch (error) {
				throw new Error(error);
			}
		}
	},
	mutations: {
		setApps(state, payload){
			state.apps = payload
		},
        setApp(state, payload){
			state.app = payload
		},
        setPage(state, payload){
            state.filters.page = payload.page;
			state.filters.limit = payload.limit;
        },
		setStatus(state, payload){
			state.status = payload.status
		}
	},
}
