import * as api from '@/common/api'
import { Indicator,Toast } from 'mint-ui';
export let C =  {
    version:'v1',
    postApi(action,param,config) {
        Indicator.open();
        return new Promise((reslove,reject) => {
            api.postApi(action,param,config).then((data)=>{
                Indicator.close();
                if(data.data.code == '0' || data.data.code =='0042001' || data.data.code == '0042002' || data.data.code == '21000')
                {
                    reslove(data.data);
                }
                else{
                    Toast({
                        message: data.data.msg,
                        duration: 2000
                    });
                }
            },(item)=>{
                //+item.config.url+'出错编码:'+item.status,
                Toast({
                    message: '系统错误，请稍后再试',
                    duration: 2000
                });
                Indicator.close();
            });
        })
    },
    getApi(action,param,config) {
        Indicator.open();

        return new Promise((reslove,reject) => {
            api.getApi(action,param,config).then((data)=>{
                Indicator.close();
                if(data.data.code == '0' || data.data.code =='0042001' || data.data.code == '0042002' || data.data.code == '21000')
                {
                    reslove(data.data);
                }
                else{
                    Toast({
                        message: data.data.msg,
                        duration: 2000
                    });
                }

            },(item)=>{
                Toast({
                    message: '系统错误，请稍后再试',
                    duration: 2000
                });
                Indicator.close();
            });
        })
    },
    patchApi(action,param,config) {
        Indicator.open();
        return new Promise((reslove,reject) => {
            api.patchApi(action,param,config).then((data)=>{
                Indicator.close();
                if(data.data.code == '0' || data.data.code =='0042001' || data.data.code == '0042002' || data.data.code == '21000')
                {
                    reslove(data.data);
                }
                else{
                    Toast({
                        message: data.data.msg,
                        duration: 2000
                    });
                }
            },(item)=>{
                Toast({
                    message: '系统错误，请稍后再试',
                    duration: 2000
                });
                Indicator.close();
            });
        })
    }
}
