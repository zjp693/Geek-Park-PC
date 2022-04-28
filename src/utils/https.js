// 引入 axios 包
import axios from "axios";

// 2. 创建 baseURL 用于存储基准地址
const baseURL = "http://toutiao.itheima.net/v1_0/";
// 1. 创建一个 axios 实例对象，用于配置项目应用相关请求
// const instanceWithToken = axios.create({ baseURL }); // 携带Token才可以查看的数据
const _axios = axios.create({ baseURL }); // 无需携带 Token 就可以看到的数据

// 6. 用于返回 response.data
const onResponseFulfilled = (response) => response.data;

// 5. 用于捕获错误，传递错误
const onRejected = (error) => Promise.reject(error);

// 3. 请求拦截器：检查是否携带了Token
_axios.interceptors.request.use((config) => {
  const passUrl = ["/authorizations"];
  if (passUrl.includes(config.url)) return config;
  const token = localStorage.getItem("Token");
  // console.log(token);
  // 判断受否携带了 Token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, onRejected);

// 响应拦截器(不携带token) 返回 response.data、捕获错误传递错误
_axios.interceptors.response.use(onResponseFulfilled, onRejected);

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
