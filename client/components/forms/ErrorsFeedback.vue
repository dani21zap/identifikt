<template>
    <div v-if="field.$error">
        <ul class="text-red pl-0 text-sm mb-0 list-none" v-if="hasMultipleValidations(field)">
            <li
            v-for="(validationType, index) in getErrors(field)" :key="index">
                {{getMessage(validationType)}}
            </li>
        </ul>
        <span class="text-red" v-else>
            {{getMessage(Object.keys(field.$params)[0])}}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        field: {
            type: Object,
            required: true,
        }
    },
    data(){
        return {
            messages: {
                required: 'This field is required.',
                email: 'Invalid email',
                mustBeUrl: 'This URL is not valid',
                notMustBeUrl: 'Domain can\'t have https:// please remove it',
                sameAs: 'Passwords do not match',
                maxLength:this.field.$params.maxLength ? `Must have at most ${this.field.$params.maxLength.max} characters.` : null,
                minLength: this.field.$params.minLength ? `Must have at least ${this.field.$params.minLength.min} characters.` : null,
                numeric: 'Only numbers are allowed',
                alpha: 'Only characters are allowed'
            }
        }
    },
    methods:{
        getErrors(field){
            let result = [];
            Object.keys(field.$params).forEach(i => {
                let type = field.$params[i].type;
                if(!field[type]) result.push(type);
            });
            return result;
        },
        hasMultipleValidations(field){
            return Object.keys(field.$params).length > 1;
        },
        getMessage(validationType){
            return this.messages[validationType] || `${validationType} is invalid.`;
        }
    }
}
</script>
