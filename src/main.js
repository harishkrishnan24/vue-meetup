import Vue from "vue";

import App from "./App.vue";

import router from "./router";
import store from "./store";

import AppDropdown from "./components/shared/AppDropdown";
import AppHero from "./components/shared/AppHero";
import AppSpinner from "./components/shared/AppSpinner.vue";

import moment from "moment";

Vue.config.productionTip = false;

Vue.component("AppHero", AppHero);
Vue.component("AppDropdown", AppDropdown);
Vue.component("AppSpinner", AppSpinner);

Vue.filter("capitalize", value => {
  if (value && typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return "";
});

Vue.filter("formatDate", (value, formatType = "LL") => {
  if (!value) return "";

  return moment(value).format(formatType);
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
