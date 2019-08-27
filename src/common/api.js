import ajax from './ajax';
let baseUrl = {
    serverA:{
        development:"https://apptest.rv2go.cn/gateway/wechat/",
        dev:"https://apptest.rv2go.cn/gateway/wechat/",
        sit:"https://apptest.rv2go.cn/gateway/wechat/",
        //production:"https://apptest.rv2go.cn/gateway/app/"
        //https://app.rv2go.com/gateway/app/
        production:"https://apptest.rv2go.cn/gateway/wechat/"
    }
};
export const postApi = async (action,param = {} ,config={}) =>
    await ajax.post(`${baseUrl.serverA[process.env.NODE_ENV]||""}`,action,param, {...config, timeout: 8000});


export const getApi = async (action,param = {} ,config={}) =>
    await ajax.get(`${baseUrl.serverA[process.env.NODE_ENV]||""}`,action,param, {...config, timeout: 8000});


export const patchApi = async (action,param = {} ,config={}) =>
    await ajax.patch(`${baseUrl.serverA[process.env.NODE_ENV]||""}`,action,param, {...config, timeout: 8000});
