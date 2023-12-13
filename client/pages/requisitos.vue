<template>
	<div class="pt-12 pb-12 sm:pt-26 sm:pb-26 lg:pt-32 lg:pb-32">
		<div class="container faq">
			<h2 class="mb-5">Requisitos para obtener tu credencial</h2>
			<div class="accordion" role="tablist">
				<p>Cuando estes listo para tramitar tu credencial IDENTIFI-K-T deberás de cumplir con los siguientes requerimientos:</p>
				<b-card no-body v-for="(item, index) in requisitos" :key="index">
					<b-card-header header-tag="header" class="p-1 bg-white" role="tab">
						<b-button class="text-left text-black" block v-b-toggle="'accordion-' + index" variant="none">
							{{ item.requisito }}
							<div class="float-right text-gray-300">
								<i class="fas fa-plus"></i>
								<i class="fas fa-minus"></i>
							</div>
						</b-button>
					</b-card-header>
					<b-collapse class="bg-gray-50" :id="'accordion-' + index" accordion="faqs" role="tabpanel">
						<b-card-body>
							<b-card-text v-html="item.detalle"></b-card-text>
						</b-card-body>
					</b-collapse>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'landing',

	data() {
		return {
			requisitos: [
				{
					requisito: 'Título de Propiedad del Vehículo',
					detalle:
						'Presenta una copia del título de propiedad del vehículo a tu nombre. Este documento es fundamental para verificar la propiedad legítima del automóvil.',
				},
				{
					requisito: 'Credencial de lector',
					detalle:
						"Presentar original y una copia de tu credencial de lector vigente para confirmar tu identidad.",
				},
				{
					requisito: 'Licencia de Conducir',
					detalle: 'Presentar original y una copia vigente y en buen estado de tu licencia de conducir.',
				},
				{
					requisito: 'Comprobante de Domicilio',
					detalle:
						'Presentar un comprobante de domicilio que no exeda tres meses de antiguedad.',
				},
				{
					requisito: 'Foto del Vehículo',
					detalle:
						'En caso de que no sea posible presentar el vehículo físicamente, proporciona fotografías claras y detalladas que muestren el estado actual del mismo.',
				}
			],
		};
	},

	head() {
		return {
			title: "Requisitos IDENTIFI-K-T",
		};
	},
};
</script>

<style lang="scss" scoped>
h2 {
	text-align: center;
}
h2 button:after {
	content: '\002B';
	font-size: 20px;
	color: #777;
	float: right;
	margin-left: 5px;
}

.active:after {
	content: '\2212';
	font-size: 20px;
}

.card-header:hover {
	background-color: #eee;
}

.accordion {
	.not-collapsed {
		.fa-plus {
			display: none;
		}
	}
	.collapsed {
		.fa-minus {
			display: none;
		}
	}
}
</style>
