// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Media } from 'bootstrap-vue/es/components'
import BMedia from 'bootstrap-vue/es/components/media/media'
import { Tabs } from 'bootstrap-vue/es/components'
import BTabs from 'bootstrap-vue/es/components/tabs/tabs'
import BCard from 'bootstrap-vue/es/components/tabs/tabs'
import { ListGroup } from 'bootstrap-vue/es/components'
import BListGroup from 'bootstrap-vue/es/components/list-group/list-group'
import { Modal } from 'bootstrap-vue/es/components'
import vBModal from 'bootstrap-vue/es/directives/modal/modal'
import { Table } from 'bootstrap-vue/es/components'
import BTable from 'bootstrap-vue/es/components/table/table'
import VueSweetalert2 from 'vue-sweetalert2'
import { Card } from 'bootstrap-vue/es/components'
import VueResource from 'vue-resource'
import store from './store/store.js'
import $ from 'jquery'
import google from '../static/js/jsapi.js'

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(Media);
Vue.use(Tabs);
Vue.use(ListGroup);
Vue.use(Modal);
Vue.use(Table);
Vue.use(store);
Vue.use(VueSweetalert2);
Vue.use(Card);
Vue.component('b-media', BMedia);
Vue.component('b-tabs', BTabs);
Vue.component('b-card',BCard);
Vue.component('b-list-group', BListGroup);
Vue.component('b-table', BTable);
Vue.directive('b-modal', vBModal);
Vue.component('b-card', BCard);
Vue.use(VueResource);

Vue.prototype.google = google;
Vue.config.productionTip = false;

let app = '';

const config = {
  apiKey: "AIzaSyAFW60yhqOlBJyBACl6F3aNAZiHbfRuew0",
  authDomain: "euphoria-cdd46.firebaseapp.com",
  databaseURL: "https://euphoria-cdd46.firebaseio.com",
  projectId: "euphoria-cdd46",
  storageBucket: "euphoria-cdd46.appspot.com",
  messagingSenderId: "377646057719"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});
