import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';

//store
import store from './store';

Vue.config.productionTip = false

//load ckeditor
Vue.use(CKEditor);

new Vue({
	store,
  router,
  render: h => h(App)
}).$mount('#app')
