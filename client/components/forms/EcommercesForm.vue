<template>
	<div v-if="ecommerces.length && currentEcommerce" class="app-content">
		<b-form @submit.prevent="updateAppKeys">
			<h3>E-commerce Setup</h3>
			<div class="box">
				<div class="row">
					<div class="col-md">
						<b-form-group
							label="Enable/Disable"
							class="mb-2"
							description="Enable stores using this ecommerce to integrate."
						>
							<b-form-checkbox id="ecommerce-status" v-model="currentEcommerce.active" switch @change="toggleEcommerce">
								{{ currentEcommerce.name }}
							</b-form-checkbox>
						</b-form-group>
						<b-form-group v-if="currentEcommerce.guideURL">
							To create your own listing in the ecommerce marketplace we have created a guide with the steps on how to do the process to make it easier for you. <a :href="currentEcommerce.guideURL" target="_blank">Find the information on how to do this process by clicking on this text.</a>
						</b-form-group>
						<b-form-group
							v-if="currentEcommerce.redirect_url"
							label="Point your app to this redirect URL."
						>
							<template #description>
								If the ecommerce only allows one URL use your Domain URL otherwise your domain won't work.<br>
								<span class="text-primary font-weight-bold">WARNING. If you are going to setup a domain for your integration page first set your domain in the app advanced settings and then come to add your keys.</span>.
							</template>
							<div v-if="currentEcommerce.redirect_url && appInformation.settings && appInformation.settings.domain_url && appInformation.settings.domain_url !== ''">
								<b-form-input
									class="mb-2"
									:disabled="true"
									:value="'https://' + appInformation.settings.domain_url + '/oauth/' + currentEcommerce.name.toLowerCase() + '/access'"
								>
								</b-form-input>
							</div>
							<div v-if="currentEcommerce.redirect_url">
								<b-form-input
									class="mb-2"
									:disabled="true"
									:value="currentEcommerce.redirect_url"
								/>
							</div>
						</b-form-group>
						<b-form-group
							v-if="currentEcommerce.oauth && currentEcommerce.oauth_pattern"
							description="Fill in the spaces to start using your custom app keys."
						>
							<div v-for="(customKey, index) in currentEcommerce.oauth_pattern" :key="customKey">
								<label v-if="customKey !== 'scopes' && customKey == 'client_id'" for=""> App Key </label>
								<label v-else-if="customKey !== 'scopes' && customKey == 'client_secret'" for=""> App Secret </label>
								<label v-else-if="customKey !== 'scopes' && customKey !== 'client_id' && customKey !== 'client_secret'" for=""> {{ customKey }} </label>
								<!-- <label v-if="customKey === 'client_secret'" for=""> Client Secret </label> -->

								<div 
								class="input-group mb-2" 
								v-if="customKey !== 'scopes' && customKey == 'client_id'"
								>
									<b-form-input
									autocomplete="off"
									v-model="currentEcommerce.oauth[customKey]"
									:type="inputs_style[index].inputType"
									:placeholder="'Add your App Key here'"
									/>
									<div class="input-group-append">
										<b-button class="btn btn-light" type="button" v-on:click="show(index)" :pressed.sync="inputs_style[index].showPassword">
											<i 
											:class="{
											'fas fa-solid fa-eye' : !inputs_style[index].showPassword,
											'fas fa-solid fa-eye-slash' : inputs_style[index].showPassword,
											}"
											/>
										</b-button>
									</div>
								</div>
								
								<div 
								class="input-group mb-2"
								v-if="customKey !== 'scopes' && customKey == 'client_secret'"
								>
									<b-form-input
									autocomplete="off"
									v-model="currentEcommerce.oauth[customKey]"
									:type="inputs_style[index].inputType"
									:placeholder="'Add your App Secret here'"
									/>
									<div class="input-group-append">
										<b-button class="btn btn-light" type="button" v-on:click="show(index)" :pressed.sync="inputs_style[index].showPassword">
											<i 
											:class="{
											'fas fa-solid fa-eye' : !inputs_style[index].showPassword,
											'fas fa-solid fa-eye-slash' : inputs_style[index].showPassword,
											}"
											/>
										</b-button>
									</div>
								</div>

								<div 
								class="input-group mb-2"
								v-if="customKey !== 'scopes' && customKey !== 'client_id' && customKey !== 'client_secret'"
								>
									<b-form-input
									autocomplete="off"
									v-model="currentEcommerce.oauth[customKey]"
									:type="inputs_style[index].inputType"
									:placeholder="'Add your ' + customKey + ' here'"
									/>
									<div class="input-group-append">
										<b-button class="btn btn-light" type="button" v-on:click="show(index)" :pressed.sync="inputs_style[index].showPassword">
											<i 
											:class="{
											'fas fa-solid fa-eye' : !inputs_style[index].showPassword,
											'fas fa-solid fa-eye-slash' : inputs_style[index].showPassword,
											}"
											/>
										</b-button>
									</div>
								</div>

							</div>
						</b-form-group>
					</div>

					<div class="col-md-auto">
						<div class="col-lg-auto order-lg-2 text-center">
							<img class="rounded" width="200" :src="currentEcommerce.image" />
						</div>
					</div>
				</div>
			</div>

			<div v-if="currentEcommerce.oauth_pattern">
				<div v-if="currentEcommerce.oauth_pattern.includes('scopes')">
					<h4>Scopes</h4>
					<div class="box">
						<div class="row">
							<div class="col-md">
								<b-form-checkbox :checked="allSelected" switch class="mb-4" @change="selectAll"> Select All Scopes </b-form-checkbox>
								<div v-if="currentEcommerce.oauth && currentEcommerce.oauth.scopes" class="row">
									<div
										v-for="(scope, key) in currentEcommerce.scopes"
										v-show="scope.length"
										:key="key"
										class="col-md-6 col-xl-4 mb-1"
									>
										<div class="box-p4 shadow h-100">
											<label for="" class="font-weight-bold">
												{{ key.toUpperCase() }}
											</label>
											<b-form-checkbox
												v-for="sc in scope"
												:key="sc"
												v-model="currentEcommerce.oauth.scopes[key]"
												:value="sc"
												class="text-capitalize mb-1"
											>
												{{ sc.replace(/[_|.]/g, ' ') }}
											</b-form-checkbox>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<b-modal ref="deleteModal" cancel-variant="light" ok-variant="danger" cancel-title="No, cancel" @ok="deleteAppKeys">
				<template #modal-title> Delete {{ currentEcommerce.name }} app keys </template>
				<div class="d-flex flex-column text-center">
					<i class="fa fa-exclamation-triangle fa-6x mb-4 text-muted"></i>
					<p>
					You are about to delete the {{ currentEcommerce.name }} app keys.<br>
					<span class="text-red font-weight-bold text-capitalize">Warning. This process can't be undone.</span>
					</p>
				</div>

				<template #modal-ok>
					Yes, delete
					<custom-spinner v-if="isLoading"></custom-spinner>
				</template>
			</b-modal>

			<div class="d-flex justify-content-end" v-if="currentEcommerce.oauth_pattern" >
				<b-button variant="outline-danger" class="mr-3" @click="showModal">
					<i class="far fa-trash-alt"></i>
					Delete App Keys
				</b-button>
				<b-button v-wave variant="primary" size="lg" type="submit" :disabled="isLoading" @submit="updateAppKeys">
					<i class="fas fa-save" style="display: inline-block" />
					Save
					<custom-spinner v-if="isLoading" />
				</b-button>
			</div>
			<div class="d-flex justify-content-end" v-if="!currentEcommerce.oauth_pattern" >
				<b-button v-wave variant="outline-primary" size="lg" type="submit" :disabled="isLoading" @submit="back">
					<i class="fas fa-chevron-left" style="display: inline-block" />
					Go back
					<custom-spinner v-if="isLoading" />
				</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
export default {
	name: 'EcommercesForm',
	props: {
		ecommerces: {
			type: Array,
			required: true,
		},
		itemClass: {
			type: String,
			default: 'col-6 col-sm-4 col-md-3 col-lg-2',
		},
		app: {
			type: Object,
			required: false,
			default: null,
		},
	},

	data() {
		return {
			appInformation: this.app,
			currentEcommerce: null,
			appId: this.$route.params.id,
			oauth: null,
			isLoading: false,
			ecommerceName: this.$route.params.ecommerce_name,
			indeterminate: false,
			inputType: 'password',
			showPassword: false,
			inputs_style: []
		};
	},
	head() {
		return {
			title: 'E-commerce Setup',
		};
	},

	computed: {
		allSelected() {
			let indicator = true;
			if (
				!this.currentEcommerce ||
				!this.currentEcommerce.oauth ||
				!this.currentEcommerce.oauth.scopes ||
				!Object.keys(this.currentEcommerce.oauth.scopes).length
			) {
				return false;
			}
			for (const key in this.currentEcommerce.scopes) {
				if (
					Object.hasOwnProperty.call(this.currentEcommerce.scopes, key) &&
					Object.hasOwnProperty.call(this.currentEcommerce.oauth.scopes, key)
				) {
					const element = this.currentEcommerce.scopes[key];
					if (this.currentEcommerce.oauth.scopes[key] && (element.length > this.currentEcommerce.oauth.scopes[key].length)) {
						indicator = false;
						break;
					}
				}
			}
			return indicator;
		},
	},

	async mounted() {
		this.getEcommerce();
		this.$nuxt.$on('changeEcommerceStatus', ({ status, ecommerceId }) => {
			if (this.currentEcommerce._id === ecommerceId) {
				this.currentEcommerce.active = status;
			}
		});
	},

	methods: {

		show(index) {
			if (this.inputs_style[index].showPassword) {
				this.inputs_style[index].inputType = 'text';
			} else {
				this.inputs_style[index].inputType = 'password';
			}
		},

		showModal() {
			this.$refs.deleteModal.show();
		},

		selectAll(checked) {
			if (!this.currentEcommerce.scopes) return;
			for (const key in this.currentEcommerce.scopes) {
				if (Object.hasOwnProperty.call(this.currentEcommerce.scopes, key)) {
					const element = this.currentEcommerce.scopes[key];
					if (checked) {
						this.currentEcommerce.oauth.scopes[key] = element;
					} else {
						this.currentEcommerce.oauth.scopes[key] = [];
					}
				}
			}
		},

		async toggleEcommerce() {
			try {
				if (this.currentEcommerce.required_app_keys && this.currentEcommerce.active) {
					let validation = this.appInformation && this.appInformation.oauth && this.appInformation.oauth[this.ecommerceName.toLowerCase()] ? this.currentEcommerce.oauth_pattern.some(key => this.appInformation.oauth[this.ecommerceName.toLowerCase()][key] == '') : true;
					if (validation) {
						this.currentEcommerce.active = false;
						throw new Error('App Keys are required to activate Ecommerce, save information first');
					}
				}
				const payload = {
					active: this.currentEcommerce.active,
					ecommerce: this.currentEcommerce._id,
				};
				await this.$axios.put(`/api/apps/${this.appId}/ecommerce`, payload);
				const message = payload.active ? 'enabled' : 'disabled';
				this.$nuxt.$emit('changeEcommerceStatus', { status: payload.active, ecommerceId: payload.ecommerce });
				this.$toast.info(`You have ${message} this e-commerce`);
			} catch (error) {
				this.showError(error);
			}
		},

		getEcommerce() {
			const ecommerce = this.ecommerces.find(ec => ec.name.toLowerCase() === this.ecommerceName.toLowerCase());
			if (!ecommerce) {
				throw this.$nuxt.error({
					statusCode: 404,
					message: 'Not found',
				});
			}
			if(ecommerce.oauth_pattern) {
				this.inputs_style = ecommerce.oauth_pattern.map( e => ({
					showPassword: false,
					inputType: 'password',
				}));
			}


			this.currentEcommerce = JSON.parse(JSON.stringify(ecommerce));
			this.appInformation.ecommerces.map(i => {
				if (i.name === this.$route.params.ecommerce_name) {
					this.$set(this.currentEcommerce, 'active', i.active );
				}
			});
			if (this.appInformation.oauth) {
				const oauth = this.appInformation.oauth[this.currentEcommerce.name.toLowerCase()];
				if (oauth && oauth.scopes && Array.isArray(oauth.scopes) && oauth.scopes.length > 0) {
					let scopes = {};
					Object.keys(this.currentEcommerce.scopes).forEach( key => {
						scopes[key] = []
						this.currentEcommerce.scopes[key].forEach( sc => {
							if (oauth.scopes.includes(sc)) {
								scopes[key].push(sc);
							}
						});

					})
					oauth.scopes = scopes
				}

				this.currentEcommerce = { ...this.currentEcommerce, oauth };
			}
			if (!this.currentEcommerce.oauth) {
				const oauth = {
					client_id: '',
					client_secret: '',
				};
				this.currentEcommerce = { ...this.currentEcommerce, oauth };
				if (this.currentEcommerce.name == 'Ebay') {
					this.currentEcommerce.oauth.redirect_url = '';
				}
			}
			if (this.currentEcommerce.name && this.currentEcommerce.name !== 'Ebay') {
				if (this.appInformation.own_domain) {
					this.currentEcommerce.oauth.redirect_url = 'https://' + this.appInformation.settings.domain_url + '/oauth/' + this.currentEcommerce.name.toLowerCase() + '/access'
				} else {
					this.currentEcommerce.oauth.redirect_url = this.currentEcommerce.redirect_url || null;
				}
			}
			if ((this.currentEcommerce.scopes && !this.currentEcommerce.oauth.scopes) || Array.isArray(this.currentEcommerce.oauth.scopes)) {
				const scopes = this.makeScopesEmptyStructure();
				this.$set(this.currentEcommerce.oauth, 'scopes', scopes);
			}
		},

		makeScopesEmptyStructure() {
			const scopes = {};
			if (this.currentEcommerce.scopes) {
				for (const key in this.currentEcommerce.scopes) {
					if (Object.hasOwnProperty.call(this.currentEcommerce.scopes, key)) {
						scopes[key] = [];
					}
				}
			}
			return scopes;
		},

		back() {
			this.$router.push({
				name: 'dashboard-apps-id',
				params: { id: this.$route.params.id },
				hash: '#ecommerce',
			});
		},

		async updateAppKeys() {
			try {
				if (!this.currentEcommerce.oauth_pattern) {
					this.back();
					return;
				}
				this.isLoading = true;

				const payload = {
					[this.currentEcommerce.name.toLowerCase()]: this.currentEcommerce.oauth,
				};
				if (this.currentEcommerce.oauth && this.currentEcommerce.oauth.scopes) {
					let scopeArray = [];
					Object.keys(this.currentEcommerce.oauth.scopes).forEach( item => {
						if (this.currentEcommerce.oauth.scopes[item] && this.currentEcommerce.oauth.scopes[item].length > 0) {
							scopeArray = scopeArray.concat(this.currentEcommerce.oauth.scopes[item]);
						}
					})
					payload[this.currentEcommerce.name.toLowerCase()].scopes = scopeArray;
				}

				await this.$axios.put(`/api/apps/${this.appId}/oauth?ecommerce=${this.currentEcommerce.name.toLowerCase()}&pattern=${this.currentEcommerce.oauth_pattern || null}`, payload);
				this.$nuxt.$emit('updatedAppKeys');
				this.$toast.success('Saved successfully');

				this.$router.push({
					name: 'dashboard-apps-id',
					params: { id: this.$route.params.id },
					hash: '#ecommerce',
				});
			} catch (error) {
				this.showError(error);
				if (this.currentEcommerce.scopes) {
					this.makeScopesEmptyStructure();
				}
				this.getEcommerce();
			} finally {
				this.isLoading = false;
			}
		},

		async deleteAppKeys() {
			try {
				this.isLoading = true;

				await this.$axios.delete(`/api/apps/${this.appId}/oauth/${this.currentEcommerce.name.toLowerCase()}`);
				if (this.currentEcommerce.scopes) {
					this.makeScopesEmptyStructure();
				}
				if (this.currentEcommerce.required_app_keys && this.currentEcommerce.active) {
					this.currentEcommerce.active = false;
					await this.toggleEcommerce();
				}

				this.getEcommerce();
				this.$nuxt.$emit('updatedAppKeys');
				this.$toast.success('Deleted successfully');
				this.$router.push({
					name: 'dashboard-apps-id',
					params: { id: this.$route.params.id },
					hash: '#ecommerce',
				});
				this.$refs.deleteModal.hide();
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.box {
	border: none;
}

@media screen and (min-width: 768px) {
	/* Left arrow */
	.button-back:after {
		content: 'Back to App';
		font-size: 1.1rem;
	}

	/* Save icon */
	.button-save:before {
		content: 'Save';
		padding: 5rem !important;
		font-size: 1.1rem !important;
	}

	i.fa-save {
		display: none;
	}
}

.box-p4 {
	background: white;
	padding: 1rem;
	border-radius: $border-radius;
	margin-bottom: 1rem;
}
</style>
