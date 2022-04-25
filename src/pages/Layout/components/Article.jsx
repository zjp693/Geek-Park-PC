import React from "react";

import { Form, Button, Card, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import styles from "./style/Article.module.scss";
const Article = () => {
  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form>
          <Form.Item label="状态："></Form.Item>
          <Form.Item label="频道："></Form.Item>
          <Form.Item label="日期："></Form.Item>
          <Form.Item>
            <Button type="primary">筛选</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Article;
