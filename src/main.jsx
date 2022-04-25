import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
// 导入 antd 组件库的样式文件
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import locale from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";

import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
