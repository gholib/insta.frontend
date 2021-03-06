/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// axios
import axios from "./axios.js"
Vue.use(axios)
import VuePlyr from 'vue-plyr';
// import 'vue-plyr/dist/vue-plyr.css';
Vue.use(VuePlyr)
// Theme Configurations
import '../themeConfig.js'


// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

// Globally Registered Components
import './globalComponents.js'

//filters
import './filters.js'

// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

Vue.prototype.$apiUrl = 'http://localhost:3000/'

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')

//moment
window.moment = require('moment');
window.moment.locale('ru');

// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
import mixins from './mixins.js'
Vue.mixin(mixins)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
