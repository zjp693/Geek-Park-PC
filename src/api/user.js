import request from "@/utils/https";

/** 用户登录
 *
 * @param {Object} userInfo
 * @returns
 */
export function login(userinfo) {
  console.log(userinfo);
  return request("/authorizations", "post", userinfo);
}
/** 获取个人用户资料
 *
 * @param {Object} userInfo
 * @returns
 */
export function getUserInfo() {
  return request("/user/profile", "get");
}
