/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function cashOrderlist(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashPaysetting(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashRakeback(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashWithdrawlist(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function companymoneyList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function fastpaymoneyList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function layerchartIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function manualpaySave(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function manualpayconfirmList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function payaccountList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function paygroupList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function transferorderList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function tripartiteList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function userbetscheckList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function authAdminRoleList(query) {
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
