
export default {
    setStor:function (key,val){
        window.localStorage.setItem(key,JSON.stringify(val));
   },
    getStor:function (){
       return JSON.parse(window.localStorage.setItem(JSON.stringify(item))||[]);
   }
}