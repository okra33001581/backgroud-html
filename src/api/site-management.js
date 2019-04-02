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
export function blacklist(query) {
    return axios({
        url: "http://apidemo.test/api/event/blacklist",
        method: "get",
        params: query
    });
}
// 获取列表
export function systemconfiglist(query) {
    return axios({
        url: "http://apidemo.test/api/event/systemconfiglist",
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
export function proxyiptablesBlackSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/proxyiptablesBlackSave"
            : "http://apidemo.test/api/event/proxyiptablesBlackSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function systemConfigSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/systemConfigSave"
            : "http://apidemo.test/api/event/systemConfigSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function webIconSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/webIconSave"
            : "http://apidemo.test/api/event/webIconSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function informationStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/informationStatusSave"
            : "http://apidemo.test/api/event/informationStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function qrCodeSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/qrCodeSave"
            : "http://apidemo.test/api/event/qrCodeSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


export function rotatePlaySave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/rotatePlaySave"
            : "http://apidemo.test/api/event/rotatePlaySave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function floatWindowSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/floatWindowSave"
            : "http://apidemo.test/api/event/floatWindowSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function informationSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/informationSave"
            : "http://apidemo.test/api/event/informationSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
export function companySave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/companySave"
            : "http://apidemo.test/api/event/companySave";
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


// 删除管理员
export function rotationconfigDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/rotationconfigDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function floatwindowconfigDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/floatwindowconfigDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function blackDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/blackDelete",
        method: "post",
        data: data
    });
}


// 删除管理员
export function informationDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/informationDelete",
        method: "post",
        data: data
    });
}

