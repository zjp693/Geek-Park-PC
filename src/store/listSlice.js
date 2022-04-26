// createSlice: 用于创建状态切片
import { getSetChannels, getArticles, delArticles } from "@/api/list";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 频道
export const loadList = createAsyncThunk("list/loadList", async (payload) => {
  // 异步操作成功, 返回异步操作结果, 它将会被作为 fulfilled action 的 payload
  // 异步操作失败, 抛出异常, 它将会作为 rejected action 的 error
  try {
    let { data } = await getSetChannels();
    // console.log(data.channels);
    return data.channels;
  } catch (error) {
    console.log("请求失败");
  }
});
//获取 文章
export const Articles = createAsyncThunk(
  "list/delarticleList",
  async (payload) => {
    // 异步操作成功, 返回异步操作结果, 它将会被作为 fulfilled action 的 payload
    // 异步操作失败, 抛出异常, 它将会作为 rejected action 的 error
    try {
      let { data } = await getArticles(payload);
      return data;
    } catch (error) {
      console.log("请求失败");
    }
  }
);
//删除
// export const halderDelArticles = createAsyncThunk(
//   "list/articleList",
//   async (payload) => {
//     // 异步操作成功, 返回异步操作结果, 它将会被作为 fulfilled action 的 payload
//     // 异步操作失败, 抛出异常, 它将会作为 rejected action 的 error
//     try {
//       let { data } = await delArticles(payload);
//       console.log(data);
//       return data;
//     } catch (error) {
//       console.log("请求失败");
//     }
//   }
// );
// actions: 对象类型, 用于存储 action creator 函数, 函数名字和 reducers 配置选项中 reducer 函数的名字相对应
const { actions, reducer: userReducer } = createSlice({
  // createSlice 方法将会返回 action creator 函数, action creator 函数将要返回 action 对象
  // 按照约定, action 对象中的 type 属性值应该由两部分组成, 第一部分表示你要处理什么状态, 第二部分表示你要对该状态进行什么处理
  // 这样约定的目的是为了让代码看起来更加的清晰 {type: "todos/addTodo"}
  // name 属性配置的就是 action 对象中 type 属性值的一部分, 表示你要对什么状态进行处理
  name: "user",
  // initialState 配置的是当前状态切片中状态的初始值
  initialState: {
    list: [],
    artlist: [],
  },
  // reducers 对象中配置的是对状态进行处理的 reducer 函数
  // 在原本的 reducer 函数中, 对状态进行的不同的处理是通过 switch case 语句匹配 action.type 属性实现的
  // ReduxToolkit 将原本的 switch case 抽象成了多个 reducer 函数, 每个 reducer 函数对应的就是原本 switch case 中的一种情况
  // 在 ReduxToolkit 中 reducer 函数的名字会作为 action 对象中 type 属性值的第二部分, 这样的话就形成了完整的 type 属性值了
  // reducers: {
  //   // 频道数据
  //   channel(state) {
  //     // 在 ReduxToolkit 中的 reducer 函数里, 可以直接对状态进行处理, 不必拷贝新的状态再对其进行处理
  //     // 因为 ReduxToolkit 内部集成了不可变数据结构, 此处操作不会改变原有状态
  //     // 状态处理完成后也不必显式的在 reducer 函数中返回新的处理后的状态, 内部会帮助我们使用新状态替换旧状态
  //     // action.payload 是 ReduxToolkit 为 action 对象添加的属性, 属性值是调用 action creator 函数时传递的参数
  //     console.log(state.value);
  //   },
  // },
  extraReducers: {
    [loadList.pending](state) {
      state.loading = true;
      state.list = [];
      state.error = null;
    },
    [loadList.fulfilled](state, action) {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    },
    [loadList.rejected](state, action) {
      state.loading = false;
      state.list = [];
      state.error = action.error;
    },
    // 文章数据
    [Articles.fulfilled](state, action) {
      state.loading = false;
      state.error = null;
      // state.list.push(action.payload);
      state.artlist = action.payload;
    },
  },
});
// 导出 action creator 函数, 供组件使用
// export const { channel } = actions;
// 导出 reducer 函数, 因为在后续的代码中还是要合并 reducer 函数
export default userReducer;
