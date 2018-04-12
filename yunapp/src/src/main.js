import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import './assets/base.css'
import axios from './config/httpConfig'
import tooltip from './assets/lib/util/tooltip'
import 'vue-ydui/dist/ydui.base.css';
import { Input } from 'vue-ydui/dist/lib.rem/input';
// 阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
//将$http绑定到全局域
Vue.prototype.$http = axios
Vue.prototype.tooltip = tooltip
//方便使用格式localStorage
Vue.prototype.Stor = {
  setStor:function (key,val){
      window.localStorage.setItem(key,JSON.stringify(val));
 },
  getStor:function (){
     return JSON.parse(window.localStorage.getItem(item))||[];
 },
  remove:function (item){
    window.localStorage.removeItem(item);
  }
}
Vue.prototype.User = {
  getUserInfo: function(){
    return JSON.parse(window.localStorage.getItem("info"))||[];
}
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
