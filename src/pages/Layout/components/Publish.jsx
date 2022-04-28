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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Editor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import styles from "./style/Publish.modul.sass";
import { PlusOutlined } from "@ant-design/icons";
import { loadList } from "@/store/listSlice";
import {
  addArticles,
  echoArticles,
  editArticle,
  getArticles,
} from "@/api/list";
const { Option } = Select;

const Publish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.list);
  useEffect(() => {
    dispatch(loadList());
  }, []);
  // 富文本内容
  const [content, setContent] = useState("");
  // 封面类型渲染和切换
  const [type, setType] = useState("1");
  const onTypeChange = (e) => {
    setType(e.target.value);
    setFileList([]);
  };
  // 完成封图上传，根据封面类型限制上传的图片张数
  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  // 发表/编辑文章
  const onFinish = async (values, draft = false) => {
    // console.log(values);
    if (type !== fileList.length) {
      return message.warning("请按照选择的封面类型上传图片");
    }
    // 组织提交数据
    const data = {
      ...values,
      cover: {
        type,
        images: fileList.map((item) => {
          return item?.response?.data?.url || item.url;
        }),
        // 后台需要[string]类型
        // images: fileList.map((item) => item.url),
        // images: fileList.map((item) => console.log(item)),
      },
      content: content,
    };
    // console.log(data);
    // console.log(id);
    if (id) {
      // 编辑
      data.id = id;
      console.log(data);
      await editArticle(data, draft).then((res) => {
        // if (res.message == "OK") {
        //   message.success("编辑文章成功");
        // }
      });
    } else {
      addArticles(data, draft).then((res) => {
        // if (res.message == "OK") {
        //   message.success("添加文章成功");
        // }
      });
    }
    message.success("保存成功");
    navigate("/home/article");
    getArticles();
  };
  // // 编辑自动填充
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [form] = Form.useForm();
  // 数据回显
  const setFormData = async () => {
    if (id) {
      const data = await echoArticles(id);
      const { title, cover, content, channel_id } = data.data;

      form.setFieldsValue({ title, channel_id });
      setContent(content);
      setType(cover.type);
      setFileList(cover.images.map((item) => ({ url: item })));
    } else {
      setType(1);
      setFileList([]);
      form.resetFields();
    }
  };
  useEffect(() => {
    setFormData();
  }, [searchParams]);
  // 存入草稿
  const saveDarft = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values, true);
    } catch (e) {
      console.log("存入失败");
    }
  };
  // 富文本
  const handleChangeContent = (value) => {
    setContent(value);
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
            <Breadcrumb.Item>{id ? "修改文章" : "发布文章"}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form onFinish={onFinish} labelCol={{ span: 4 }} form={form}>
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
            rules={[{ required: true, message: "请选择所属频道" }]}
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
            // initialValue=""
            wrapperCol={{ span: 16 }}
          >
            <Editor
              rules={[{ required: true, message: "请输入文章内容" }]}
              placeholder="请输入文章内容"
              modelValue={content}
              onChange={handleChangeContent}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {id ? "修改文章" : "发布文章"}
              </Button>
              <Button onClick={saveDarft}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
