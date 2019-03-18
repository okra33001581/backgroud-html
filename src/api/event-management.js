/**
 * Created by lk on 19/1/15.
 */
import axios from "../utils/axios";

// 获取列表
export function activityList(query) {
    return axios({
        url: "event/activityList",
        method: "get",
        params: query
    });
}

// 获取列表
export function activitySubList(query) {
    return axios({
        url: "event/activitySubList",
        method: "get",
        params: query
    });
}

// 获取列表
export function eventUserPrizeList(query) {
    return axios({
        url: "event/eventUserPrizeList",
        method: "get",
        params: query
    });
}

// 获取列表
export function eventProcessList(query) {
    return axios({
        url: "event/eventProcessList",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function authAdminRoleList(query) {
    return axios({
        url: "event/eventSave",
        method: "get",
        params: query
    });
}

// 保存
export function eventSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/eventSave"
            : "event/eventSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function fileSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/fileSave"
            : "event/fileSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function eventStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/eventStatusSave"
            : "event/eventStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function eventUserPrizeStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/eventUserPrizeStatusSave"
            : "event/eventUserPrizeStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function eventObjectSetSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/eventObjectSetSave"
            : "event/eventObjectSetSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除管理员
export function eventDelete(data) {
    return axios({
        url: "event/eventDelete",
        method: "post",
        data: data
    });
}



