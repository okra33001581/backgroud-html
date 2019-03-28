/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function floatwindowconfigList(query) {
    return axios({
        url: "http://apidemo.test/api/event/floatwindowconfigList",
        method: "get",
        params: query
    });
}

// 获取列表
export function informationCompanylist(query) {
    return axios({
        url: "http://apidemo.test/api/event/informationCompanylist",
        method: "get",
        params: query
    });
}

// 获取列表
export function informationList(query) {
    return axios({
        url: "http://apidemo.test/api/event/informationList",
        method: "get",
        params: query
    });
}

// 获取列表
export function lotterygroupSort(query) {
    return axios({
        url: "http://apidemo.test/api/event/lotterygroupSort",
        method: "get",
        params: query
    });
}

// 获取列表
export function proxyiptablesBlackcontainlist(query) {
    return axios({
        url: "http://apidemo.test/api/event/proxyiptablesBlackcontainlist",
        method: "get",
        params: query
    });
}

// 获取列表
export function qrconfigList(query) {
    return axios({
        url: "http://apidemo.test/api/event/qrconfigList",
        method: "get",
        params: query
    });
}

// 获取列表
export function rotationconfigList(query) {
    return axios({
        url: "http://apidemo.test/api/event/rotationconfigList",
        method: "get",
        params: query
    });
}

// 获取列表
export function systemconfigImagelist(query) {
    return axios({
        url: "http://apidemo.test/api/event/systemconfigImagelist",
        method: "get",
        params: query
    });
}

// 获取列表
export function systemconfigSet(query) {
    return axios({
        url: "http://apidemo.test/api/event/systemconfigSet",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function authAdminRoleList(query) {
    return axios({
        url: "http://apidemo.test/api/event/authAdminRoleList",
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