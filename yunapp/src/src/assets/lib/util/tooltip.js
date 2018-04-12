import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
export default {
    //确认框
    Confirm: (msg,callback)=>{
        Confirm({
            title: "",
            mes: msg,
            opts: () => {
                callback();
            }
        });
    },
    //警示框
    Alert: (mes)=>{
        Alert({
            mes: mes
        });
    },
    //提示框
    ToastMsg: (mes)=>{
        Toast({
            mes: mes,
            timeout: 1500
        });
    },
    //成功
    Toast:{
        Success: (mes,tim)=>{
            Toast({
                mes: mes,
                timeout: tim||1500,
                icon: 'success'
            });
        },
        //失败
        Error: (mes,tim)=>{
            Toast({
                mes: mes,
                timeout: tim||1500,
                icon: 'error'
            });
        },
    },
    //顶部通知条
    Notify: (msg,callback)=>{
        Notify({
            mes: msg,
            timeout: 3000,
            callback: callback
        })
    },
    //加载中...
    Loading:{
        start:(mes)=>{
            Loading.open(mes);
        },
        end:()=>{
            Loading.close();
        }
    }

}