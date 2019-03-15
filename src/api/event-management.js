/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function activityList(query) {
    return axios({
        url: "http://apidemo.test/api/event/activityList",
        method: "get",
        params: query
    });
}

// 获取列表
export function activitySubList(query) {
    return axios({
        url: "http://apidemo.test/api/event/activitySubList",
        method: "get",
        params: query
    });
}

// 获取列表
export function eventUserPrizeList(query) {
    return axios({
        url: "http://apidemo.test/api/event/eventUserPrizeList",
        method: "get",
        params: query
    });
}

// 获取列表
export function eventProcessList(query) {
    return axios({
        url: "http://apidemo.test/api/event/eventProcessList",
        method: "get",
        params: query
    });
}



// 获取角色列表
export function authAdminRoleList(query) {
    return axios({
        url: "http://apidemo.test/api/event/eventSave",
        method: "get",
        params: query
    });
}

// 保存
export function eventSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/eventSave"
            : "http://apidemo.test/api/event/eventSave";
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
            ? "http://apidemo.test/api/event/fileSave"
            : "http://apidemo.test/api/event/fileSave";
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
            ? "http://apidemo.test/api/event/eventStatusSave"
            : "http://apidemo.test/api/event/eventStatusSave";
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
            ? "http://apidemo.test/api/event/eventObjectSetSave"
            : "http://apidemo.test/api/event/eventObjectSetSave";
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
