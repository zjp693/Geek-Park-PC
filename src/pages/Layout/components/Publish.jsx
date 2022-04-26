import React, { useEffect, useState } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Select,
  Button,
  Input,
  Space,
  Radio,
  Upload,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Editor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import styles from "./style/Publish.modul.sass";
import { PlusOutlined } from "@ant-design/icons";
import { loadList } from "@/store/listSlice";
import { addArticles } from "@/api/list";
const { Option } = Select;

const Publish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.list);
  useEffect(() => {
    dispatch(loadList());
  }, []);
  // 富文本内容
  const [text, setText] = useState("");
  // 封面类型渲染和切换
  const [type, setType] = useState(1);
  const onTypeChange = (e) => {
    setType(e.target.value);
    setFileList([]);
  };
  // 完成封图上传，根据封面类型限制上传的图片张数
  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  // 发表文章
  const onFinish = async (values) => {
    console.log(values);
    if (type !== fileList.length) {
      return message.warning("请按照选择的封面类型上传图片");
    }
    // 组织提交数据
    const data = {
      ...values,
      cover: {
        type,
        // 后台需要[string]类型
        images: fileList.map((item) => item.response.data.url),
      },
    };
    addArticles(data).then((res) => {
      if (res.message == "OK") {
        console.log(111111);
        message.success("添加成功");
        navigate("/home/article");
      }
    });
  };
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form onFinish={onFinish} labelCol={{ span: 4 }}>
          <Form.Item
            label="文章标题："
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="所属频道："
            name="channel_id"
            rules={[{ required: false, message: "请选择所属频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {list.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="文章封面：">
            {/* 一个FormItem只能有一个元素 */}
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 这个位置放Upload组件 */}
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onPreview={() => {}}
                  onChange={onUploadChange}
                >
                  {fileList.length < type ? (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>请上传封面</div>
                    </div>
                  ) : null}
                </Upload>
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            label="文章内容："
            name="content"
            initialValue=""
            rules={[{ required: true, message: "请输入文章内容" }]}
            wrapperCol={{ span: 16 }}
          >
            <Editor
              placeholder="请输入文章内容"
              modelValue={text}
              onChange={(modelValue) => {
                setText(modelValue);
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                发表文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
