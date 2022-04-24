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
