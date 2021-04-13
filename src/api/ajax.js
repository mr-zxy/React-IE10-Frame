import React from 'react';
import axios from 'axios';
import errorCode from '@/utils/errorCode'
import { readToken } from "@/utils/storageUtil";
import { tansParams } from '@/utils/method'
const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    timeout: 10000,
    responseType: 'json',
    responseEncoding: 'utf8',
    headers: {
        'Cache-Control': 'no-cache',
        'cache':'false'
    }
});

export const METHOD_GET = 'GET';
export const METHOD_PUT = 'PUT';
export const METHOD_POST = 'POST';
export const METHOD_DELETE = 'DELETE';
let errMessage = (error) => {
    React.$message('error', '错误', error, 5);
}
service.interceptors.request.use(
    (config) => {
        if (readToken()) {
            config.headers['Authorization'] = 'Bearer ' + readToken() // 让每个请求携带自定义token 请根据实际
        }
        return config;
    },
    (error) => {
        console.log("----------------------------")
        console.debug(error);
        console.log("----------------------------")
        return Promise.reject(error)
    }
);

service.interceptors.response.use(
    (response) => {
        const res = response.data;
        const code = response.data.code || 200
        let msg = errorCode[code] || res.msg || errorCode['default']
        if (code === 401) {
            React.$confirm("登 录", "登录令牌过期,取消留在当前页面或重新登录！",
                () => {
                    console.log('OK');
                },
                () => {
                    return res;
                }, "重新登录");
        } else if (code === 500) {
            errMessage(msg);
        } else if (code !== 200) {
            errMessage(msg);
        }
        return res;
    },
    (error) => {
        let {message} = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        errMessage(message);
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    errMessage('请求错误');
                    break;
                case 401:
                    errMessage('验证过期了哈，还没开发呢');
                    break;
                case 403:
                    errMessage('拒绝访问');
                    break;

                case 404:
                    errMessage(`请求地址出错: ${error.response.config.url}`);
                    break;

                case 408:
                    errMessage('请求超时');
                    break;
                case 500:
                    errMessage(error.response.data.message);
                    break;
                case 501:
                    errMessage('服务未实现');
                    break;

                case 502:
                    errMessage('网关错误');
                    break;

                case 503:
                    errMessage('服务不可用');
                    break;

                case 504:
                    errMessage('网关超时');
                    break;

                case 505:
                    errMessage('HTTP版本不受支持');
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default function ajax(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        let promise
        // 1.执行异步请求
        if (method === METHOD_GET) {
            promise = service.get(url, {
                params: data
            });
        } else if (method === METHOD_POST) {
            promise = service.post(url, data);
        } else if (method === METHOD_PUT) {
            promise = service.put(url, data);
        } else if (method === METHOD_DELETE) {
            promise = service.delete(url, data);
        }
        // 2.如果成功了，调用resolve
        promise.then(res => {
            // 直接获取response的data
            resolve(res);
            // resolve(res.data?res.data:res);
        }).catch(err => {
            // 3.失败后不调用reject
            console.error(err.message);
        })
    })
};

/**
 * 通用下载方法
 *
 * @params  url         string  接口路径
 * @params  params      data    参数
 * @params  filename    string  下载的文件名
 * */
export function download(url, params, filename) {
  return service.post(url, params, {
    transformRequest: [(params) => {
      return tansParams(params)
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  }).then((data) => {
    const content = data
    const blob = new Blob([content])
    if ('download' in document.createElement('a.less')) {
      const elink = document.createElement('a.less')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }).catch((r) => {
    console.error(r)
  })
}
