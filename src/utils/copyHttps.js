import axios from "axios";
console.log(process.env.NODE_ENV);

const baseURL = "http://toutiao.itheima.net/v1_0/";

// 创建一个 axios 实例对象，用于配置项目应用相关请求
const _axios = axios.create({ baseURL });

// 请求拦截器
_axios.interceptors.request.use(
  (config) => {
    const passUrl = ["/login"];
    if (passUrl.includes(config.url)) return config;
    // 获取 token
    const token = localStorage.getItem("@#@TOKEN");
    console.log(token);
    // 判断受否携带了 Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // else {
    //   // 未携带 token 则跳转到登录页面
    //   window.location.href = "/"
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 404) {
      return Promise.reject({
        message: "请求资源不存在",
        status: 404,
      });
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

// 生成请求函数所需参数
const generateRequestConfig = (url, method, data) => ({
  url,
  method,
  [method.toLowerCase() === "get" ? "params" : "data"]: data,
});

// 请求函数（不带Token）
export default function request(url, method, data) {
  return _axios(generateRequestConfig(url, method, data));
}
