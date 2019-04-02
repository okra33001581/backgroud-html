/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function marqueeList(query) {
    return axios({
        url: "http://apidemo.test/api/event/marqueeList",
        method: "get",
        params: query
    });
}
// 获取列表
export function messageList(query) {
    return axios({
        url: "http://apidemo.test/api/event/messageList",
        method: "get",
        params: query
    });
}
// 获取列表
export function noticeList(query) {
    return axios({
        url: "http://apidemo.test/api/event/noticeList",
        method: "get",
        params: query
    });
}
// 获取列表
export function pushList(query) {
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


// 保存
export function messageSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/messageSave"
            : "http://apidemo.test/api/event/messageSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function noticeSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/noticeSave"
            : "http://apidemo.test/api/event/noticeSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 保存
export function noticeTopSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/noticeTopSave"
            : "http://apidemo.test/api/event/noticeTopSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function noticeStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/noticeStatusSave"
            : "http://apidemo.test/api/event/noticeStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}



// 保存
export function marqueeSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/marqueeSave"
            : "http://apidemo.test/api/event/marqueeSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}



// 删除管理员
export function messageDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/messageDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function noticeDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/noticeDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function marqueeDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/marqueeDelete",
        method: "post",
        data: data
    });
}

