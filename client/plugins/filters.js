import Vue from 'vue';
import currency from 'currency.js';

Vue.filter('currency', (value) => {
    if(typeof value != 'number') return value;
    return currency(value).format();
});