import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import './assets/base.css'
import axios from './config/httpConfig'
import tooltip from './assets/lib/util/tooltip'
import 'vue-ydui/dist/ydui.base.css';
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

Vue.filter('fromdate',(datetime)=>{
  let minute=1000*60;      //把分，时，天，周，半个月，一个月用毫秒表示
  let hour=minute*60;
  let day=hour*24;
  let week=day*7;
  let halfamonth=day*15;
  let month=day*30;
  let now=new Date().getTime();   //获取当前时间毫秒
  let diffValue=now-datetime;//时间差

  if(diffValue<0){return;}

  let  minC=diffValue/minute;  //计算时间差的分，时，天，周，月
  let  hourC=diffValue/hour;
  let  dayC=diffValue/day;
  let  weekC=diffValue/week;     
  let  monthC=diffValue/month;
  let result = "";
 if(minC>=1){
   result=""+parseInt(minC)+"分钟前"
  }else if(hourC>=1){
   result=""+parseInt(hourC)+"小时前"
  }else if(dayC>=1){
   result=""+parseInt(dayC)+"天前"
  // }else if(weekC>=1){
  //  result=" "+parseInt(weekC)+"周前"
  }else if(monthC>=1){
   result=""+parseInt(monthC)+"月前"
  }else{
   result="刚刚";
}  
  return result;
});


/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
