import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from '@/store/index'
import '@/assets/dropzone.min.css'
import './style/custom.css'
import './style/bootstrap-glyphicons.css'
import 'font-awesome/css/font-awesome.min.css'
require('vue2-animate/dist/vue2-animate.min.css')
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import VueSlideoutPanel from 'vue2-slideout-panel'
import Vue2Filters from 'vue2-filters'
import AnimatedVue from 'animated-vue'
import 'animate.css/animate.css'
import PrettyCheckbox from 'pretty-checkbox-vue'
import 'pretty-checkbox/dist/pretty-checkbox.min.css'
import Vuelidate from 'vuelidate'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import apolloProvider from './apollo'
import VueTimers from 'vue-timers'
import VueTypedJs from 'vue-typed-js'
import 'toastr/build/toastr.min.css'
import 'toastr/build/toastr.min.js'
Vue.config.productionTip = false
Vue.use(VueTimers)
Vue.use(VueTypedJs)
Vue.use(PrettyCheckbox)
Vue.use(Vuelidate)
Vue.use(VueSlideoutPanel)
Vue.use(AnimatedVue)
Vue.use(Vue2Filters)
Vue.use(VueGoodTablePlugin); 
new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')

