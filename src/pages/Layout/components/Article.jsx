import React, { useEffect, useState, useRef } from "react";

import {
  Form,
  Button,
  Card,
  Breadcrumb,
  Radio,
  Select,
  DatePicker,
  Modal,
  message,
  Upload,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Space, Tag, Image } from "antd";
import defaultImg from "@/assets/error.gif";

import styles from "./style/Article.module.scss";
import Channel from "./Channel";
import { useDispatch, useSelector } from "react-redux";
import { loadList, Articles } from "@/store/listSlice";
import { delArticles } from "@/api/list";
const { Option } = Select;
const Article = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // let [showMsg, setShowMsg] = useState();
  let showMsg = useRef("");
  const { list, artlist, page, per_page, total_count } = useSelector(
    (state) => state.list
  );
  const res = artlist.results;

  useEffect(() => {
    dispatch(loadList());
    dispatch(Articles());
  }, []);

  // 数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => (
        <Image
          src={cover?.images?.[0] || defaultImg}
          style={{ objectFit: "cover" }}
          width={200}
          height={120}
        />
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        // console.log("aa" + status);
        const info = statusLabel[status];
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => editArticleFn(record.id)}
            icon={<EditOutlined />}
          />
          <Button
            type="link"
            onClick={() => delArticleFn(record.id)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];
  // 文章
  const statusLabel = [
    { text: "草稿", color: "default" },
    { text: "待审核", color: "blue" },
    { text: "审核通过", color: "green" },
    { text: "审核拒绝", color: "red" },
  ];
  // 改变筛选条件查询
  const onFinish = (values) => {
    // console.log(this.props.form.getFieldsValue());
    params.current.status = values.status;
    params.current.channel_id = values.channel_id;
    console.log(values);
    if (values.dateArr) {
      params.current.begin_pubdate = values.dateArr[0].format(
        "YYYY-MM-DD HH:mm:ss"
      );
      params.current.end_pubdate = values.dateArr[1].format(
        "YYYY-MM-DD HH:mm:ss"
      );
    } else {
      params.current.begin_pubdate = undefined;
      params.current.end_pubdate = undefined;
    }
    params.current.page = 1;
    dispatch(Articles(params.current));
  };
  // 改变分页和size重新查询
  const onPageChange = (page, pageSize) => {
    params.current.page = page;
    params.current.per_page = pageSize;
    dispatch(Articles(params.current));
  };
  // 请求参数
  const params = useRef({
    page: 1,
    per_page: 20,
    channel_id: undefined,
    status: undefined,
    begin_pubdate: undefined,
    end_pubdate: undefined,
  });
  // 删除
  const delArticleFn = (id) => {
    Modal.confirm({
      title: "您是否确认删除该文章？",
      cancelText: "取消",
      okText: "确认",
      onOk: () => {
        delArticles(id).then(() => {
          message.success("删除成功");
          dispatch(Articles(params.current));
        });
      },
    });
  };
  // 编辑
  const editArticleFn = (id) => {
    navigate(`/home/publish?id=${id}`);
  };
  const getDatas = (msg) => {
    console.log(msg);
  };
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
        style={{ marginTop: 24 }}
      >
        {/* 表单 */}
        <Form onFinish={onFinish}>
          <Form.Item label="状态：" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 290 }}>
              {list.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期：" name="dateArr">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        title={`根据筛选条件共查询到 ${
          artlist && artlist?.total_count
        } 条结果：`}
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={res}
          rowKey="id"
          pagination={{
            current: artlist.page,
            pageSize: artlist.per_page,
            total: artlist.total_count,
            onChange: onPageChange,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Article;
