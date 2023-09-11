<template>
	<b-form @submit.prevent="saveApp">
		<div class="justify-content-center mb-2">
			<h3 class="mb-4">{{ title }}</h3>
		</div>

		<div v-if="type === 'edit'">
			<h4>App Credentials</h4>
			<div class="box">
				<b-form-group label="API Id">
					<b-input-group>
						<template #append>
							<btn-clipboard :text="appId"></btn-clipboard>
						</template>
						<b-form-input id="input-app-id" v-model="appId" readonly></b-form-input>
					</b-input-group>
				</b-form-group>
			</div>
		</div>

		<div class="box">
			<div class="row">
				<div class="col-md">
					<b-form-group label="App name" description="This will be the name used for your application in our App Store.">
						<b-input-group prepend-html="<i class='fas fa-mobile-alt'></i>">
							<b-form-input ref="appName" v-model="appName" :state="inputState($v.appName)"></b-form-input>
						</b-input-group>
						<forms-errors-feedback :field="$v.appName"> </forms-errors-feedback>
					</b-form-group>
					<b-form-group
						label="Short Description"
						description="Describe what your app does in 10 words or
                                less."
					>
						<b-input-group prepend-html="<i class='fas fa-sticky-note'></i>">
							<b-form-input v-model="appShortDescription"></b-form-input>
						</b-input-group>
					</b-form-group>

					<b-form-group label="Description" description="Long description of your app (optional).">
						<!-- <b-input-group prepend-html="<i class='far fa-sticky-note'></i>"> -->
						<b-form-textarea v-model="appDescription" rows="2"></b-form-textarea>
						<!-- </b-input-group> -->
					</b-form-group>
				</div>

				<div class="col-12 col-md-4 mb-3 mb-md-0">
					<div class="image-card">
						<div class="image-icon">
							<label for="app-icon" class="container-fa-image">
								<img
									v-if="appIconFile.length"
									onerror="javascript:this.src='image404.svg'"
									:src="appIconFile[0].url"
									class="rounded"
								/>

								<div v-else>
									<i class="fas fa-image"></i>
								</div>
							</label>
							<file-upload
								ref="upload"
								v-model="appIconFile"
								extensions="jpg,jpeg,png"
								accept="image/png,image/jpeg"
								name="app-icon"
								:drop="true"
								@input-filter="inputFilter"
							>
							</file-upload>
						</div>
						<div v-if="appIconFile.length" class="mt-2">
							<b>{{ appIconFile[0].name }}</b>
						</div>
						<div v-else>
							<div><b>App icon</b></div>
							<div class="text-muted">
								Must be .jpg or .png and have a minimum of 512 x 512 px
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<h4>URLs</h4>
		<div class="box">
			<b-form-group label="App URL" description="Add the URL of your website.">
				<b-input-group prepend-html="<i class='fas fa-link'></i>">
					<b-form-input
						v-model="appUrl"
						v-b-tooltip.hover
						title="Must start with http:// or https://"
						placeholder="https://site.com"
						:state="inputState($v.appUrl)"
					>
					</b-form-input>
				</b-input-group>
				<forms-errors-feedback :field="$v.appUrl"> </forms-errors-feedback>
			</b-form-group>
			<b-form-group label="Redirect URL">
				<template #description>
					When a store completes the OAuth process EcartApi will redirect to this URL and send as query params the store Access Token and
					other important information you can use our URL to start testing: <i>https://ecartapi.com/integrations</i> <span class="text-primary">(Very Important!)</span>.
				</template>
				<b-input-group prepend-html="<i class='fas fa-directions'></i>">
					<b-form-input
						v-model="appRedirectUrl"
						v-b-tooltip.hover
						title="Must start with http:// or https://"
						type="text"
						placeholder="https://ecartapi.com/integrations"
						:state="inputState($v.appRedirectUrl)"
					></b-form-input>
				</b-input-group>
				<forms-errors-feedback :field="$v.appRedirectUrl"> </forms-errors-feedback>
			</b-form-group>
		</div>

		<h4>Advanced Settings</h4>
		<div class="box">
			<p v-if="type !== 'edit'">Note: When your app has been created you will be able to change your integration page domain.</p>

			<b-form-group v-if="type === 'edit'"  label="Integration Page Domain">
				<template #description>
					White label your app with your own domain. The domain has to have SSL.
					<span class="text-primary">Costs $19.99 USD per month</span>.
					<span class="text-primary">(Optional)</span>.
				</template>
				<b-input-group prepend-html="<i class='fas fa-link'></i>">
					<template #append>
						<b-button v-if="type === 'edit'" variant="outline-danger" @click="deleteDomain">
							<i class="far fa-trash-alt"></i>
							<!-- <custom-spinner v-if="isLoadingDomain"></custom-spinner> -->
						</b-button>
						<b-button v-wave :disabled="isLoading" variant="primary" @click="saveDomain()">
							<i class="fas fa-save"></i>
							<custom-spinner v-if="isLoadingDomain"></custom-spinner>
						</b-button>
					</template>
					<b-form-input
						v-model="appDomain"
						v-b-tooltip.hover
						title="No https:// domain must have SSL"
						type="text"
						placeholder="oauth.ecartapi.com"
						:state="inputState($v.appDomain)"
					></b-form-input>
				</b-input-group>
				<forms-errors-feedback :field="$v.appDomain"> </forms-errors-feedback>
			</b-form-group>
			<b-form-group v-if="type === 'edit'"  label="DNS Address" class="mb-0">
				<template #description>
					This is a unique cname address you will point your domain DNS service.
					<span class="text-primary">Be careful not to share it with anyone!</span>.
				</template>
				<b-input-group prepend-html="<i class='fas fa-link'></i>">
					<b-form-input
						v-b-tooltip.hover
						:disabled="true"
						title="No https:// domain must have SSL"
						type="text"
						:value="cname"
					></b-form-input>
				</b-input-group>
			</b-form-group>
		</div>

		<b-modal ref="deleteModal" cancel-variant="light" ok-variant="danger" cancel-title="No, cancel" @ok="deleteApp">
			<template #modal-title> Are you sure you want to delete {{ appName }}? </template>

			<div class="d-flex flex-column justify-content-center text-center">
				<i class="fa fa-exclamation-triangle fa-6x mb-4 text-muted text-center"></i>
				<p>
				You are about to delete {{appName}}.<br>
				<span class="text-red font-weight-bold text-capitalize">Warning. This process can't be undone.</span>
				</p>
			</div>

			<template #modal-ok>
				Yes, delete
				<custom-spinner v-if="isLoading"></custom-spinner>
			</template>
		</b-modal>

		<b-modal ref="domainModal" cancel-variant="light" ok-variant="success" cancel-title="No, cancel" @ok="updateDomain">
			<template #modal-title>Setup your domain</template>
			<div  class="d-flex flex-column justify-content-center text-center">
				<i class="fas fa-check-circle fa-4x mb-3 text-green"></i>

				Take your app to the next level by adding your own domain.<br>
				<span>Note: <br>
				After activating your domain it will be required to have your own App keys for the ecommerces to work. <a href="https://docs.ecartapi.com/?version=latest#52e7dfbe-4a13-44a4-8da6-9934efb7c1ca" target="_blank">Find out more in our documentation.</a></span> 
			</div>

			<template #modal-ok>
				Okay
				<custom-spinner v-if="isLoading"></custom-spinner>
			</template>
		</b-modal>

		<b-modal ref="deleteDomainModal" cancel-variant="light" ok-variant="danger" cancel-title="No, cancel" @ok="updateDeleteDomain">
			<template #modal-title> Are you sure you want to delete your domain? </template>

			<div class="d-flex flex-column justify-content-center text-center">
				<i class="fa fa-exclamation-triangle fa-6x mb-3 text-muted"></i>
				<p>
				You are about to delete your domain.<br>
				<span class="text-red font-weight-bold text-capitalize">Warning. This process can't be undone.</span>
				</p>
			</div>

			<template #modal-ok>
				Yes, delete
				<custom-spinner v-if="isLoading"></custom-spinner>
			</template>
		</b-modal>

		<div class="d-flex align-baseline">
			<b-button v-if="type === 'edit'" variant="outline-danger" class="mr-3" @click="showModal">
				<i class="far fa-trash-alt"></i>
				Delete App
			</b-button>
			<b-button v-wave class="w-32" size="lg" :disabled="isLoading" variant="primary" type="submit" @submit="saveApp()">
				<i class="fas fa-save"></i>
				Save
				<custom-spinner v-if="isLoading"></custom-spinner>
			</b-button>
		</div>
	</b-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, helpers } from 'vuelidate/lib/validators';
import formMixin from '@/mixins/form.mixin';

const initialData = () => {
	return {
		appName: '',
		appRedirectUrl: '',
		appDomain:'',
		appUrl: '',
		appShortDescription: '',
		appDescription: '',
		publishAppChecked: true,
		appIconFile: [],
		selected: [],
		isLoading: false,
		appId: $nuxt.$route.params.id,
	};
};

const mustBeUrl = helpers.regex('mustBeUrl', /^((http|https):\/\/).+$/);
const notMustBeUrl = helpers.regex('notMustBeUrl', /^(?!(http|https):\/\/).+$/);

export default {
	mixins: [formMixin],
	props: {
		type: {
			type: String,
			default: 'add',
		},

		title: {
			type: String,
			required: true,
		},

		app: {
			type: Object,
			required: false,
		},
	},

	data() {
		return {
			appName: '',
			appRedirectUrl: '',
			appUrl: '',
			appShortDescription: '',
			appDescription: '',
			appDomain:'',
			publishAppChecked: true,
			cname: '',
			requests: 0,
			appIconFile: this.type === 'edit' && this.app.settings.image ? [{ url: this.app.settings.image }] : [],
			selected: [],
			isLoading: false,
			isLoadingDomain: false,
			appId: this.$route.params.id,
		};
	},

	computed: {
		...mapState('ecommerces', ['ecommerces']),
	},

	watch: {
		$route() {
			if (this.type !== 'edit') {
				Object.assign(this.$data, initialData());
			}
		},
	},
	validations() {
		return {
			appName: { required },
			appRedirectUrl: { required, mustBeUrl },
			appUrl: { required, mustBeUrl },
			appDomain:{ notMustBeUrl }
		};
	},

	mounted() {
		if (this.type === 'edit') {
			this.fillInformation();
		}
	},

	methods: {
		showModal() {
			this.$refs.deleteModal.show();
		},
		setDefaultImage(e) {
			e.target.src = `${process.env.HOSTNAME}/images/image404.svg`;
		},

		inputFilter(newFile, oldFile, prevent) {
			if (newFile && !oldFile) {
				if (!/\.(jpg|jpeg|png)$/i.test(newFile.name)) {
					return prevent();
				}
			}
			if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
				newFile.url = '';
				const URL = window.URL || window.webkitURL;
				if (URL && URL.createObjectURL) {
					newFile.url = URL.createObjectURL(newFile.file);
				}
			}
		},
		fillInformation() {
			try {
				// Get app information
				const data = this.app;

				this.appName = data.name;
				this.appShortDescription = data.short_description;
				this.appDescription = data.description;
				this.appUrl = data.settings.app_url;
				this.appRedirectUrl = data.settings.redirect_url;
				this.appDomain = data.settings.domain_url;
				this.cname = data.settings.cname;
				this.requests = data.requests;
				if (this.appIconFile[0]) this.appIconFile[0].url = data.settings.image;
				// Filling selected with only ecommerce id
				data.ecommerces.forEach(ecommerce => {
					this.selected.push(ecommerce._id);
				});
			} catch (err) {
				this.showError(err);
			}
		},

		saveDomain() {
			if (this.appDomain) {
				this.$refs.domainModal.show();
			}
		},

		deleteDomain(){
			this.$refs.deleteDomainModal.show();
		},

		async saveApp() {
			// if (this.appDomain) {
			// 	this.$refs.domainModal.show();
			// } else {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.scrollToError(this.$v);
					return;
				}
				const payload = {
					name: this.appName,
					description: this.appDescription,
					short_description: this.appShortDescription,
				};
				let formData;
				let params = {};

				if (this.type === 'edit') {
					payload.settings = {
						redirect_url: this.appRedirectUrl,
						app_url: this.appUrl,
						domain_url: this.appDomain,
						image: this.appIconFile[0]?.url,
						cname: this.cname
					};
					// Domain only updates when changed
					payload.domain_id = this.app.domain_id || null;
					payload.own_domain = this.cname && this.cname !== '' ? true : false;

					params.updateDomain = false;
					payload.active = true;
					// POST Upload image
					if (this.appIconFile.length && this.appIconFile[0].file) {
						formData = new FormData();
						formData.append('file', this.appIconFile[0].file);
						const { data: image } = await this.$axios.post(`/api/apps/img/upload/${this.appId}`, formData).catch(() => {
							this.$toast.error('Image upload failed');
							return {
								path: '',
							};
						});

						payload.settings.image = image;
					}
				} else {
					payload.ecommerces = this.selected;
					payload.redirect = this.appRedirectUrl;
					payload.url = this.appUrl;
					if (this.appIconFile.length) {
						formData = new FormData();
						formData.append('file', this.appIconFile[0].file);
						// POST upload app image
						const { data: image } = await this.$axios.post(`/api/apps/img/upload`, formData);

						payload.file = image;
					}
				}
				this.isLoading = true;
				// PUT update app
				let response;
				if (this.type === 'edit') {
					const appId = this.$route.params.id;
					response = await this.$axios.put(`/api/apps/${appId}`, payload, { params:params });
					this.$toast.success('Saved successfully');
					this.app = response.data
					this.fillInformation()
				} else {
					response = await this.$axios.post(`/api/apps`, payload);
					this.$nuxt.$emit('app-created');
					this.$toast.success('Saved successfully');
				}
				this.$v.$reset();
				this.$emit('submit', response.data);
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
			// }
		},

		async updateDomain() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.scrollToError(this.$v);
					return;
				}
				const payload = {
					name: this.appName,
					description: this.appDescription,
					short_description: this.appShortDescription,
				};
				let formData;
				let params = {};
				payload.settings = {
					redirect_url: this.appRedirectUrl,
					app_url: this.appUrl,
					domain_url: this.appDomain,
					image: this.appIconFile[0]?.url,
				};
				// Domain updated only when string changes
				payload.domain_id = this.app.domain_id || null;
				payload.own_domain = payload.settings.domain_url && payload.settings.domain_url !== '' ? true : false;
				payload.active = true;
				params.updateDomain = this.app.settings.domain_url == '' || !this.app.settings.domain_url || payload.settings.domain_url !== this.app.settings.domain_url ? true : false;

				this.isLoadingDomain = true;
				// PUT update app
				let response;
				const appId = this.$route.params.id;
				response = await this.$axios.put(`/api/apps/${appId}/domain`, payload, { params:params });

				this.app = response.data
				this.fillInformation()
				this.$refs.domainModal.hide();
				this.$toast.success('Changes saved successfully');
				this.$v.$reset();
				this.$emit('submit', response.data);
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoadingDomain = false;
			}
		},

		async updateDeleteDomain() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					this.scrollToError(this.$v);
					return;
				}
				const payload = {
					name: this.appName,
					description: this.appDescription,
					short_description: this.appShortDescription,
				};
				let formData;
				let params = {};
				payload.settings = {
					redirect_url: this.appRedirectUrl,
					app_url: this.appUrl,
					domain_url: '',
					image: this.appIconFile[0]?.url,
				};
				// Domain updated only when string changes
				payload.domain_id = this.app.domain_id || null;
				payload.own_domain = payload.settings.domain_url && payload.settings.domain_url !== '' ? true : false;
				payload.active = true;
				params.deleteDomain = true;

				this.isLoadingDomain = true;
				// PUT update app
				let response;
				const appId = this.$route.params.id;
				response = await this.$axios.put(`/api/apps/${appId}/domain`, payload, { params:params });

				this.app = response.data
				this.fillInformation()
				this.$refs.domainModal.hide();
				this.$toast.success('Changes saved successfully');
				this.$v.$reset();
				this.$emit('submit', response.data);
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoadingDomain = false;
			}
		},

		async deleteApp() {
			try {
				this.isLoading = true;
				const appId = this.$route.params.id;
				await this.$axios.delete(`/api/apps/${appId}`);
				this.$router.push(`/dashboard/apps`);
				this.$nuxt.$emit('app-deleted');
				this.$toast.success('Deleted successfully');
				this.$refs.deleteModal.hide();
			} catch (error) {
				this.showError(error);
			} finally {
				this.isLoading = false;
			}
		},
		// ...mapActions('userInformation', ['getUserInformation']),
		...mapActions('ecommerces', ['getEcommerces']),
	},
};
</script>

<style lang="scss" scoped>
.box {
	border: none;

	small {
		color: $gray-500;
		display: block;
		margin-top: 0.25rem;
	}

	input::placeholder {
		font-size: 12px;
		color: $gray-300;
	}

	.image-card {
		padding: 1rem;
		border: 1px solid $gray-300;
		border-radius: 6px;
		text-align: center;
		vertical-align: middle;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		.image-icon {
			max-width: 100%;
			display: inline-block;
			cursor: pointer;

			label,
			span {
				cursor: pointer;
			}

			.fa-image,
			img {
				width: 100%;
				font-size: max(100px, min(150px, 150px));
				color: $blue-400;
			}
		}
	}
}

.ec-checkbox-button-content .ecommerce-image {
	width: 80px;
	background-size: contain;
	background-repeat: no-repeat;
	height: 80px;
	background-position: center;
}

.ec-shop-title {
	font-weight: bold;
	align-self: center;
	display: none;

	@media screen and (min-width: 768px) {
		display: block !important;
	}
}

.ec-checkbox-button-content {
	padding-bottom: 30px;
}

.ec-checkbox-div {
	cursor: pointer !important;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

input[type='checkbox']:checked + .ec-checkbox-div {
	box-shadow: inset 0px 0px 50px $primary;
}

@media (max-width: 768px) {
	.ec-checkbox-button-content .ec-checkbox-div .ecommerce-image {
		background-position: center;
		margin: 0 auto;
	}
	h1 {
		font-size: 25px;
	}
	h2 {
		font-size: 22px !important;
	}
	.continue-text {
		font-size: 20px !important;
	}
	.search-mobile {
		font-size: 1em !important;
		border-radius: 0px 2px 2px 0px !important;
	}
}

.container-fa-image {
	max-width: 12rem;
	display: flex;
	flex-direction: column;
	align-content: center;
	margin-bottom: 0;
}

.box .image-card .image-icon .fa-image {
	font-size: 5rem;
}
</style>
