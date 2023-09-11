import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: {
        bootstrap: false,
        id: 'G-X0HQXYWSW6',
      },
    },
    app.router
  );
};