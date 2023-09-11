<template>
	<div class="register m-4 block">
		<div class="container lg:pr-5 lg:pl-5 login-content">
			<form ref="form" name="register_form" @submit.prevent="authenticate">
				<nuxt-link to="/home">
					<site-logo class="d-block mx-auto mb-3" width="150px"></site-logo>
				</nuxt-link>

				<b-form-group label="First Name">
					<b-input-group prepend-html="<i class='fas fa-user'></i>">
						<b-input
							v-model="firstName"
							:state="inputState($v.firstName)"
							size="lg"
							class="fs-15px"
							label="First Name"
							name="firstName"
							type="text"
							placeholder="First Name"
						/>
					</b-input-group>

					<forms-errors-feedback :field="$v.firstName"></forms-errors-feedback>
				</b-form-group>

				<b-form-group label="Last Name">
					<b-input-group prepend-html="<i class='fas fa-user'></i>">
						<b-input
							v-model="lastName"
							:state="inputState($v.lastName)"
							size="lg"
							class="fs-15px"
							label="Last Name"
							name="lastName"
							type="text"
							placeholder="Last Name"
						/>
					</b-input-group>

					<forms-errors-feedback :field="$v.lastName"></forms-errors-feedback>
				</b-form-group>

				<b-form-group label="Email">
					<b-input-group prepend-html="<i class='fas fa-at'></i>">
						<b-input
							v-model="email"
							:state="inputState($v.email)"
							size="lg"
							class="fs-15px"
							label="Email"
							name="email"
							type="email"
							placeholder="Email"
						/>
					</b-input-group>
					<forms-errors-feedback :field="$v.email"></forms-errors-feedback>
				</b-form-group>

				<b-form-group label="Password">
					<b-input-group prepend-html="<i class='fas fa-key'></i>">
						<b-input
							v-model="password"
							:state="inputState($v.password)"
							size="lg"
							class="fs-15px"
							label="Password"
							name="password"
							type="password"
							placeholder="Password"
						/>
					</b-input-group>
					<forms-errors-feedback :field="$v.password"></forms-errors-feedback>
				</b-form-group>

				<b-form-group label="Password Confirmation">
					<b-input-group prepend-html="<i class='fas fa-key'></i>">
						<b-input
							v-model="passwordConfirmation"
							:state="inputState($v.passwordConfirmation)"
							size="lg"
							class="fs-15px"
							label="Password Confirmation"
							name="passwordConfirmation"
							type="password"
							placeholder="Password Confirmation"
						/>
					</b-input-group>
					<forms-errors-feedback :field="$v.passwordConfirmation"></forms-errors-feedback>
				</b-form-group>

				<b-form-group label="Country">
					<b-input-group prepend-html="<i class='fas fa-flag'></i>">
						<b-form-select v-model="country" :state="inputState($v.country)" size="lg" class="fs-15px" label="Country">
							<b-form-select-option value="" disabled selected>Select an option</b-form-select-option>
							<b-form-select-option v-for="c in countries" :key="c.code_2" :value="c.code_2">{{ c.name }}</b-form-select-option>
						</b-form-select>
					</b-input-group>
					<forms-errors-feedback :field="$v.country"></forms-errors-feedback>
				</b-form-group>

				<b-form-group label="Phone">
					<b-input-group prepend-html="<i class='fas fa-phone'></i>">
						<b-input
							v-model="phone"
							:state="inputState($v.phone)"
							size="lg"
							class="fs-15px"
							label="Phone"
							name="phone"
							type="number"
							placeholder="Phone"
						/>
					</b-input-group>

					<forms-errors-feedback :field="$v.phone"></forms-errors-feedback>
				</b-form-group>

				<b-alert variant="danger" :show="error != ''" dismissible>
					{{ error }}
				</b-alert>

				<div class="row">
					<div class="col-6">
						<nuxt-link class="btn btn-light bg-gray-400 text-white btn-lg btn-block fw-500" :to="{ path: 'login' }"
							>Login</nuxt-link
						>
					</div>
					<div class="col-6">
						<button v-wave type="submit" :disabled="loading" class="btn btn-primary btn-lg btn-block fw-500 mb-3">
							<i class="fas fa-user-edit"></i>
							Sign Up
							<custom-spinner v-if="loading"></custom-spinner>
						</button>
					</div>
				</div>
			</form>
		</div>
<!-- 
		<div class="background-authenticate hidden lg:d-block">
			<img data-not-lazy src="/assets/img/authenticate/authenticate.jpg" alt="authenticate" />
		</div> -->
	</div>
</template>

<script>
import formMixin from '@/mixins/form.mixin';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';

export default {
	mixins: [formMixin],
	layout: 'simple',
	middleware: ['checkSession'],

	data() {
		return {
			loading: false,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			country: '',
			phone: '',
			error: '',
		};
	},

	head() {
		return {
			title: 'authenticate and start using the multi platform API',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'authenticate to a free to use Api for developers looking to connect to multiple carts and marketplaces with a single API.',
				},
			],
		};
	},

	validations() {
		return {
			firstName: { required },
			lastName: { required },
			email: { required, email },
			password: { required },
			passwordConfirmation: {
				required,
				sameAsPassword: sameAs('password'),
			},
			country: { required },
			phone: { required },
		};
	},

	computed: {
		...mapState('countries', ['countries']),
		...mapState('countries', ['options']),
	},

	mounted() {
		this.getCountries();
	},

	methods: {
		async authenticate() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) return;
				// todo tu codigo cuando el formulario sea valido
				this.loading = true;

				const payload = {
					placa: this.firstName,
					aplleod: this.lastName
				};
				this.err = '';
				const {
					data: { success },
				} = await this.$axios.post('/api/plate/authenticate', payload);

				if (success) {
					this.$router.push({
						name: 'plate-card',
						query: { engomado: this.placa },
					});
				}
			} catch (error) {
				this.loading = false;
				this.showError(error);
			}
		},
		...mapActions('countries', ['getCountries']),
	},
};
</script>

<style lang="scss" scoped>
.register {
	padding: 0;
	margin-top: 0;
	height: 100vh;

	.login-content {
		width: 100%;
		max-width: 400px;
	}
}

.background-register {
	overflow: hidden;
	min-width: 30rem;
	height: 100%;

	.login-content {
		height: 100%;
	}
}
.background-register img {
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
	object-fit: cover;
}

// input number
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
