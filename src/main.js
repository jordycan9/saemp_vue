import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import moment from 'moment';
import DatetimePicker from 'vuetify-datetime-picker'

moment.locale('cs');

Vue.use(DatetimePicker)


Vue.component(VueQrcode.name, VueQrcode);

Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:3000/api'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
