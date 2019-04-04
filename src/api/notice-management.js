/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function marqueeList(query) {
    return axios({
        url: "event/marqueeList",
        method: "get",
        params: query
    });
}
// 获取列表
export function messageList(query) {
    return axios({
        url: "event/messageList",
        method: "get",
        params: query
    });
}
// 获取列表
export function noticeList(query) {
    return axios({
        url: "event/noticeList",
        method: "get",
        params: query
    });
}
// 获取列表
export function pushList(query) {
    return axios({
        url: "event/adminIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function authAdminRoleList(query) {
    return axios({
        url: "event/adminRoleList",
        method: "get",
        params: query
    });
}

// 保存
export function authAdminSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/adminSave"
            : "event/adminEdit";
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
            ? "event/messageSave"
            : "event/messageSave";
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
            ? "event/noticeSave"
            : "event/noticeSave";
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
            ? "event/noticeTopSave"
            : "event/noticeTopSave";
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
            ? "event/noticeStatusSave"
            : "event/noticeStatusSave";
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
            ? "event/marqueeSave"
            : "event/marqueeSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function marqueeSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/marqueeSequence"
            : "event/marqueeSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
// 保存
export function noticeSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/noticeSequence"
            : "event/noticeSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除管理员
export function messageDelete(data) {
    return axios({
        url: "event/messageDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function noticeDelete(data) {
    return axios({
        url: "event/noticeDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function marqueeDelete(data) {
    return axios({
        url: "event/marqueeDelete",
        method: "post",
        data: data
    });
}

