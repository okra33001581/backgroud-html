/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function authAdminList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function finance_index(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function operation_profit(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function pgamePlaylist(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function preportProfit(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminRoleList",
        method: "get",
        params: query
    });
}
// 获取角色列表
export function userReport(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminRoleList",
        method: "get",
        params: query
    });
}

// 保存
export function authAdminSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/adminSave"
            : "http://apidemo.test/api/event/adminEdit";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除管理员
export function authAdminDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/adminDelete",
        method: "post",
        data: data
    });
}
