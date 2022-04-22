import axios from "axios";

//1.创建一个新的axios 实例对象，专门用于配置和小兔鲜应用相关的请求
export const baseURL = "http://localhost:3001";
//创建请求实例（不携带token）
const instanceWithoutToken = axios.create({
  baseURL,
});

//4.2配置未携带token的响应拦截器
instanceWithoutToken.interceptors.response.use((response) => {
  return response.data;
});

//用于生成请求配置的函数
export function generateRequestConfig(url, method, data) {
  return {
    url: url,
    method: method,
    [method === "get" ? "params" : "data"]: data,
  };
}

//用于发送 未携带token的普通请求
export function requestWithToken(url, method, data) {
  return instanceWithoutToken(generateRequestConfig(url, method, data));
}
