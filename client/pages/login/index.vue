<template>
	<div class="login">
		<div class="login-content">
			<form ref="form" name="login_form" @submit.prevent="login">
				<div class="text-center" >
					
					<nuxt-link class="mb-2 text-red" to="/home">
                    	<span class="text-red">IDENTIFI-K-T</span>
                    </nuxt-link>

				</div>
				<div class="text-muted text-center mb-4">Porfavor verifica tu identidad.</div>

				<b-form-group :label= "plate_auth ? 'Numero de engomado' : 'Nombre de Usuario'">
					<b-input-group prepend-html="<i class='fas fa-at'></i>">
						<b-input
							:state="inputState($v.username)"
							size="lg"
							class="fs-15px"
							v-model="username"
							:label="plate_auth ? 'Numero de engomado' : 'Usuario'"
							:placeholder="plate_auth ? 'Numero de engomado' : 'Usuario'"
							name="username"
							type="text"
						/>
					</b-input-group>
					<forms-errors-feedback :field="$v.username"></forms-errors-feedback>
				</b-form-group>

				<b-form-group :label= "plate_auth ? 'Apellidos del dueño' : 'Contraseña'">
					<b-input-group prepend-html="<i class='fas fa-key'></i>">
						<b-input
							:state="inputState($v.password)"
							v-model="password"
							:label="plate_auth ? 'Apellidos' : 'Contraseña'"
							:placeholder="plate_auth ? 'Apellidos' : 'Contraseña'"
							name="password"
							type="password"
							size="lg"
							class="fs-15px"
						/>
					</b-input-group>
					<forms-errors-feedback :field="$v.password"></forms-errors-feedback>
				</b-form-group>

				<!-- <b-form-group>
					<nuxt-link :to="{ name: 'login-recovery' }"> Forgot password? </nuxt-link>
				</b-form-group> -->

				<b-alert variant="danger" :show="'session_expired' in $route.query" dismissible>Tu sesión se vencio valida de nuevo tus datos.</b-alert>

				<b-alert variant="danger" :show="error != ''" dismissible>
					{{ error }}
				</b-alert>

				<div class="row justify-content-center">
					<!-- <div class="col-6">
						<nuxt-link to="register" class="btn btn-light bg-gray-400 text-white btn-lg btn-block fw-500">Register</nuxt-link>
					</div> -->
					<div class="col-6">
						<button v-wave type="submit" :disabled="loading" class="btn btn-success btn-lg btn-block fw-500 mb-3">
							<!-- <i class="fas fa-sign-in-alt"></i> -->
							Ok
							<custom-spinner v-if="loading"></custom-spinner>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import formMixin from '@/mixins/form.mixin';

export default {
	mixins: [formMixin],
	layout: 'simple',
	middleware: ['checkSession'],

	data() {
		return {
			plate_auth: this.$route?.query?.plate_auth || false,
			loading: false,
			username: '',
			password: '',
			error: ''
		};
	},

	head() {
		return {
			title: 'Inicio de sesión',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Inicia sesión y encuentra todo lo que necesitas sobre IDENTIFI-K-T.',
				},
			],
		};
	},

	validations() {
		return {
			username: {required},
			password: {required},
		};
	},

	mounted() {
		// this.loginConfirmation();
	},

	methods: {
		async login() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) return;
				this.loading = true;
				const payload = {
					username: this.username,
					password: this.password,
				};
				this.err = '';
				let url = this.plate_auth ? '/api/plate/login' : '/api/login';
				let push_to = {
					name: 'dashboard'
				};

				const { data } = await this.$axios.post(url, payload);
				console.log(data);
				if (this.plate_auth) {
					push_to = {
						path: '/plate-card/'+data.user.id,
					};
				}
				const expires = this.$dayjs().add(100, 'year').toDate();
				
				this.$cookiz.set('token', data.token, { expires });
				this.$axios.setHeader('Authorization', data.token);
				this.$router.push(push_to);
			} catch (error) {
				console.log(error);
				this.loading = false;
				this.error = (error.response && error.response.data.message) || 'An error has ocurred';
			} finally {
				this.loading = false;
			}
		},

		...mapMutations('user', ['setUser']),
	},
};
</script>

<style lang="css">
.text-red {
  color: red; /* Cambia el color a rojo */
}
</style>

