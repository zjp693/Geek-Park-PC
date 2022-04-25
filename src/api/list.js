import request from "@/utils/https";

/** 获取获取文章列表
 *
 * @param {Object}
 * @returns
 */
export function getSetChannels() {
  return request("/channels", "get");
}

/** 获取获取文章列表
 *
 * @param {Object}
 * @returns
 */
export function getArticles() {
  return request("/mp/articles", "get");
}
