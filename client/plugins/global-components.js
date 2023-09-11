import Vue from 'vue';

import VueCustomScrollbar from 'vue-custom-scrollbar';
import VueHljs from 'vue-hljs';
// import DateRangePicker from 'vue2-daterange-picker';
// import * as VueGoogleMaps from 'vue2-google-maps';
// import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
// import VueColorPicker from '@caohenghu/vue-colorpicker';
// import VueCountdown from '@chenfengyuan/vue-countdown';
// import VueMaskedInput from 'vue-maskedinput';
import wysiwyg from 'vue-wysiwyg';
import Skeleton from 'vue-loading-skeleton';


Vue.component('vue-custom-scrollbar', VueCustomScrollbar);
Vue.use(wysiwyg, { maxHeight: '300px' });
Vue.use(VueHljs);
Vue.use(Skeleton);
if(process.client){
	const VueUploadComponent = require('vue-upload-component');
	const { MonthPickerInput } = require('vue-month-picker');
	const { MonthPicker } = require('vue-month-picker');
	const VueInsProgressBar = require('vue-ins-progress-bar');
	const VueApexCharts = require('vue-apexcharts');
	Vue.use(VueInsProgressBar, {
		position : 'fixed',
		show     : true,
		height   : '3px',
	});
	Vue.component('apexchart', VueApexCharts);
	Vue.use(MonthPicker);
	Vue.use(MonthPickerInput);
	Vue.component('month-picker-input',MonthPickerInput);
	Vue.component('file-upload', VueUploadComponent);
}
// Vue.use(VueGoogleMaps, {
// 	load : {
// 		key       : '',
// 		libraries : 'places',
// 	},
// });
// Vue.component('date-range-picker', DateRangePicker)
// Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
// Vue.component('vue-color-picker', VueColorPicker)
// Vue.component('vue-masked-input', VueMaskedInput)
// Vue.component(VueCountdown.name, VueCountdown)
