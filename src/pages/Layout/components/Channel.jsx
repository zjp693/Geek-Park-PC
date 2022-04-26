import React, { useEffect } from "react";
import { loadList } from "@/store/listSlice";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
const { Option } = Select;
function Channel() {
  // 频道数据
  const { list } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadList());
  }, []);
  // 获取数据
  const handleChange = (val) => {};
  return (
    <>
      <Select
        onChange={handleChange}
        style={{ width: 400 }}
        placeholder="请选择文章开始频道"
      >
        {list.map((item) => {
          return (
            <Option label={item.id} key={item.id} value={item.id}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    </>
  );
}

export default Channel;
