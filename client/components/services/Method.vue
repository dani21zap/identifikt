<template>
	<b-card no-body class="mb-2 border-bottom" :class="`method-type--${route.type}-border`">
		<b-card-header header-tag="header" class="method-type-header p-0" :class="`method-type--${route.type}-header`" role="tab">
			<b-button v-b-toggle="'accordion-' + index" class="text-left text-black" block variant="none" :class="`method-type--${route.type}-btn`">
				<span class="method-type pr-3 pl-3 pt-1 pb-1" :class="`method-type--${route.type}`">
					{{ route.type }}
				</span>

				<span class="method-endpoint ml-2"> /{{ route.descriptive_route }} </span>
				<span class="fs-14px ml-1">{{ route.name }}</span>
				<div class="float-right text-gray-900">
					<i class="fas fa-chevron-up"></i>
					<i class="fas fa-chevron-down"></i>
				</div>
			</b-button>
		</b-card-header>
		<b-collapse :id="'accordion-' + index" class="bg-white" accordion="routes" role="tabpanel">
			<b-card-body>
				<b-card-text class="font-weight-normal">
					{{ route.description }} <a v-if="route.src" :href="route.src" target="_blank">Click here</a>
				</b-card-text>
			</b-card-body>

			<b-card-body class="d-flex justify-content-end align-items-center pt-0 pb-0 mb-3">
				<b-button variant="outline-primary" :disabled="isLoading" @click="executeMethod(route.endpoint, route.type)"
					>Try it out
					<custom-spinner v-if="isLoading"></custom-spinner>
				</b-button>
			</b-card-body>

			<div v-if="route.params.length">
				<b-card-body class="mb-3 bg-gray-100">
					<span class="font-weight-bold fs-14px">Route params</span>
				</b-card-body>

				<b-card-body class="pt-0 pb-0">
					<div v-for="p in route.params" :key="p" class="row">
						<span class="col-4">{{ p }}</span>

						<b-form-group class="col-8 font-weight-normal">
							<b-form-input
								v-model="paramsModel[p]"
								type="text"
								autocomplete="off"
								:state="inputState($v.paramsModel[p])"
							></b-form-input>
						</b-form-group>
					</div>
				</b-card-body>
			</div>

			<div v-if="route.query.length">
				<b-card-body class="mb-3 bg-gray-100">
					<span class="font-weight-bold fs-14px">Query params</span>
				</b-card-body>

				<b-card-body class="pt-0 pb-0">
					<div v-for="q in route.query" :key="q.title" class="row">
						<span class="col-4">{{ q.title }}</span>

						<b-form-group class="col-8 font-weight-normal" :label="q.desc">
							<b-form-input v-model="paramsModel[q.title]" type="text" autocomplete="off"></b-form-input>
						</b-form-group>
					</div>
				</b-card-body>
			</div>

			<b-card-body class="mb-3 bg-gray-100">
				<span class="font-weight-bold fs-14px">Responses</span>
			</b-card-body>

			<b-card-body class="pt-0 pb-0 mb-3" :class="`response-json-${index}`">
				<b-alert :show="isError" fade variant="danger" dismissible @dismissed="isError = false">
					{{ errorResponse }}
				</b-alert>
				<JsonViewer :value="jsonResponse" copyable expanded boxed />
			</b-card-body>
		</b-collapse>
	</b-card>
</template>

<script>
import JsonViewer from 'vue-json-viewer/ssr';
import 'vue-json-viewer/style.css';
import formMixin from '@/mixins/form.mixin';
import { required } from 'vuelidate/lib/validators';

export default {
	components: { JsonViewer },
	mixins: [formMixin],
	props: {
		route: {
			type: Object,
			required: true,
		},

		index: {
			type: Number,
			required: true,
		},
	},

	data() {
		return {
			jsonResponse: {},
			errorResponse: null,
			isError: false,
			paramsModel: { ...this.buildDynamicData },
			isLoading: false,
		};
	},

	validations() {
		const validations = [...this.route.params];
		const obj = {};
		validations.map(item => {
			obj[item] = { required };
		});
		return {
			paramsModel: obj,
		};
	},

	computed: {
		buildDynamicData() {
			const resp = {};
			if (this.route.params.length) {
				const routeParams = [...this.route.params];

				for (const route of routeParams) {
					resp[route] = null;
				}
			}

			if (this.route.query.length) {
				const queryParams = [...this.route.query];

				for (const query of queryParams) {
					for (const key in query) {
						if (Object.hasOwnProperty.call(query, key)) {
							if (key === 'title') {
								const element = query[key];
								resp[element] = null;
							}
						}
					}
				}
			}

			return resp;
		},

		getQueryParamsValues() {
			const resp = {};
			if (this.route.query.length) {
				const queryParams = [...this.route.query];
				const vModel = this.paramsModel;
				// Iterating query array of objects
				for (const query of queryParams) {
					// Iterating objects inside query array
					for (const key in query) {
						if (Object.hasOwnProperty.call(query, key)) {
							const elementQuery = query[key];
							// Iterating objects from paramsModel obj
							for (const vM in vModel) {
								if (Object.hasOwnProperty.call(vModel, vM)) {
									const elementModel = vModel[vM];
									// If paramsModel (for query params) has something
									if (elementQuery === vM && elementModel.trim() !== '') {
										resp[vM] = elementModel;
									}
								}
							}
						}
					}
				}
			}
			return resp;
		},

		getQueryRouteValues() {
			let routeValue = '';
			const routeParams = [...this.route.params];
			const vModel = this.paramsModel;
			if (this.route.params.length) {
				for (const key in vModel) {
					if (Object.hasOwnProperty.call(vModel, key)) {
						const element = vModel[key];
						// Iterating values from routeParams (params) array
						for (const val of routeParams) {
							if (key === val) {
								routeValue = `/${element}`;
							}
						}
					}
				}
			}
			return routeValue;
		},
	},

	methods: {
		async executeMethod(endpoint, method) {
			try {
				this.isError = false;
				this.isLoading = true;
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.scrollToError();
					return;
				}
				// const { data } = await this.$ecart_api[method.toLowerCase()](`/${endpoint}`);
				const routeParam = this.getQueryRouteValues;
				const config = {
					url: `/${endpoint}${routeParam}`,
					method: method.toLowerCase(),
					headers: {
						Authorization:
							'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOclVBVkhzZmpUSlVFME5hY2dBN21WU29na2ZUdVdUVyIsImlhdCI6MTU4Mjc0MDM4MTQ4OH0.gQdWERZbU_VRrXApwXX47O73WpKL6R_uH3YoA-24QEb4ubyk_JVFV2CxzpVysyZNwZWMGTGJZl__fQ8lEsmZ2Q',
					},
					timeout: 15000,
				};

				const params = { ...this.getQueryParamsValues };
				config.params = params;
				const { data } = await this.$ecart_api.request(config);
				this.jsonResponse = data;
				this.scrollToResponse();
			} catch (error) {
				// this.showError(error);
				this.errorResponse = error;
				this.isError = true;
				this.jsonResponse = {};
				// if error scroll to b-alert
				this.scrollToResponse();
			} finally {
				this.isLoading = false;
			}
		},

		scrollToResponse() {
			setTimeout(() => {
				const input = document.querySelector(`.response-json-${this.index}`).getBoundingClientRect();
				window.scroll({
					top: input.top + document.documentElement.scrollTop - 150,
					left: 0,
					behavior: 'smooth',
				});
			}, 200);
		},
	},
};
</script>

<style lang="scss" scoped>
.accordion {
	.not-collapsed {
		.fa-chevron-down {
			display: none;
		}
	}

	.collapsed {
		.fa-chevron-up {
			display: none;
		}
	}

	.not-collapsed.method-type--GET-btn {
		border-bottom-color: $blue;
	}

	.not-collapsed.method-type--POST-btn {
		border-bottom-color: $green;
	}

	.not-collapsed.method-type--PUT-btn {
		border-bottom-color: $orange;
	}

	.not-collapsed.method-type--DELETE-btn {
		border-bottom-color: $red;
	}
}

.method-type {
	border-radius: 3px;
	color: #fff;
	font-family: sans-serif;
	font-size: 14px;
	font-weight: 700;
	min-width: 80px;
	text-align: center;
	text-shadow: 0 1px 0 rgb(0 0 0 / 10%);
}

.method-endpoint {
	font-size: 16px;
	font-weight: 600;
	color: $gray-900;
	letter-spacing: 0.6px;
}

.method-type-header {
	margin-bottom: 0 !important;
}

.method-type--GET {
	background-color: $blue;
}

.method-type--GET-btn {
	background-color: rgba(31, 107, 255, 0.1);
}

.method-type--GET-border {
	border-color: $blue;
	border-bottom: 1px solid $blue !important;
}

.method-type--POST {
	background-color: $green;
}

.method-type--POST-btn {
	background-color: rgba(16, 185, 129, 0.1);
}

.method-type--POST-border {
	border-color: $green;
	border-bottom: 1px solid $green !important;
}

.method-type--PUT {
	background-color: $orange;
}

.method-type--PUT-btn {
	background-color: rgba(255, 149, 0, 0.1);
}

.method-type--PUT-border {
	border-color: $orange;
	border-bottom: 1px solid $orange !important;
}

.method-type--DELETE {
	background-color: $red;
}

.method-type--DELETE-btn {
	background-color: rgba(255, 59, 48, 0.1);
}

.method-type--DELETE-border {
	border-color: $red;
	border-bottom: 1px solid $red !important;
}

.btn.method-type--GET-btn,
.btn.method-type--POST-btn,
.btn.method-type--PUT-btn,
.btn.method-type--DELETE-btn {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	border-bottom-color: none;
}
</style>
