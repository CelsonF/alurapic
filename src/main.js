import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from  'vue-router';
import {routes} from './routes';
import VeeValidate, {Validator} from 'vee-validate';
import PtBr from 'vee-validate/dist/locale/pt_BR';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueRouter);

const router = new VueRouter({ 
  routes,
  mode:'history'
});

Vue.use(VeeValidate);

Validator.localize('pt-BR',PtBr)

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})