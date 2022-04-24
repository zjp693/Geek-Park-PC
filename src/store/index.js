// 导入 configureStore 方法, 用于创建、配置 store 对象
import { configureStore } from "@reduxjs/toolkit";
// 导入 userReducer 函数, 用于配置 store 对象
import userReducer from "./userSlice";

// 创建、配置、导出 store 对象
export default configureStore({
  // 是否开启浏览器的 redux 开发者调试工具
  devTools: process.env.NODE_ENV !== "production",
  // reducer 选项用于替换原有的 combineReducers 方法, 用于合并应用中的多个 reducer 函数, 组成最终的 Store 对象
  reducer: {
    user: userReducer,
  },
});
