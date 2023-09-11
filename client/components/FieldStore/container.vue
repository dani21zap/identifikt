<template>
	<div>
		<b-form-group v-for="(field, key, index) in form" :key="index" :label="field.label">
			<component
				:is="'field-store-' + field.type"
				v-if="field.type"
				v-model="accessModel[key]"
				:readonly="disabledFields.includes(key)"
				:field="field"
				:options="field.data"
				:disabled="field.label === 'Name'"
			></component>
		</b-form-group>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'access',
		event: 'change',
	},
	props: {
		form: {
			type: Object,
			required: true,
		},
		access: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			accessModel: this.access,
			disabledFields: ['url', 'expiresIn'],
		};
	},
};
</script>
