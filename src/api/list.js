import request from "@/utils/https";

/** 获取频道
 *
 * @param {Object}
 * @returns
 */
export function getSetChannels() {
  return request("/channels", "get");
}

/** 获取文章列表
 *
 * @param {Object}
 * @returns
 */
export function getArticles(params) {
  console.log(params);
  return request("/mp/articles", "get", params);
}
/**删除文章
 *
 * @param {Object}
 * @returns
 */
export function delArticles(target) {
  return request(`/mp/articles/${target}`, "delete");
}
/**添加文章
 *
 * @param {Object}
 * @returns
 */
export function addArticles(data, draft = false) {
  return request(`mp/articles?draft=${false}`, "post", data);
}

/**编辑文章
 *
 * @param {Object}
 * @returns
 */
export function editArticle(data, draft = false) {
  return request(`mp/articles/${data.id}?draft=${draft}`, "put", data);
}

/**文章数据回显
 *
 * @param {Object}
 * @returns
 */
export function echoArticles(id) {
  return request(`mp/articles/${id}`, "get");
}
