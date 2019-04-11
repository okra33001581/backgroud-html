/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function floatwindowconfigList(query) {
    return axios({
        url: "event/floatwindowconfigList",
        method: "get",
        params: query
    });
}

// 获取列表
export function informationCompanylist(query) {
    return axios({
        url: "event/informationCompanylist",
        method: "get",
        params: query
    });
}

// 获取列表
export function informationList(query) {
    return axios({
        url: "event/informationList",
        method: "get",
        params: query
    });
}

// 获取列表
export function lotterygroupSort(query) {
    return axios({
        url: "event/lotterygroupSort",
        method: "get",
        params: query
    });
}

// 获取列表
export function proxyiptablesBlackcontainlist(query) {
    return axios({
        url: "event/proxyiptablesBlackcontainlist",
        method: "get",
        params: query
    });
}

// 获取列表
export function qrconfigList(query) {
    return axios({
        url: "event/qrconfigList",
        method: "get",
        params: query
    });
}

// 获取列表
export function rotationconfigList(query) {
    return axios({
        url: "event/rotationconfigList",
        method: "get",
        params: query
    });
}

// 获取列表
export function systemconfigImagelist(query) {
    return axios({
        url: "event/systemconfigImagelist",
        method: "get",
        params: query
    });
}



// 获取列表
export function blacklist(query) {
    return axios({
        url: "event/blacklist",
        method: "get",
        params: query
    });
}
// 获取列表
export function systemconfiglist(query) {
    return axios({
        url: "event/systemconfiglist",
        method: "get",
        params: query
    });
}

// 获取列表
export function systemconfigSet(query) {
    return axios({
        url: "event/systemconfigSet",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function authAdminRoleList(query) {
    return axios({
        url: "event/authAdminRoleList",
        method: "get",
        params: query
    });
}

// 保存
export function proxyiptablesBlackSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/proxyiptablesBlackSave"
            : "event/proxyiptablesBlackSave";
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
            ? "event/systemConfigSave"
            : "event/systemConfigSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function webIconSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/webIconSave"
            : "event/webIconSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function informationStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/informationStatusSave"
            : "event/informationStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function updatefloatwindowSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/updatefloatwindowSequence"
            : "event/updatefloatwindowSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function qrCodeSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/qrCodeSave"
            : "event/qrCodeSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


export function rotatePlaySave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/rotatePlaySave"
            : "event/rotatePlaySave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function floatWindowSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/floatWindowSave"
            : "event/floatWindowSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function informationSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/informationSave"
            : "event/informationSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
export function companySave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/companySave"
            : "event/companySave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function updateLotterygroupSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/updateLotterygroupSequence"
            : "event/updateLotterygroupSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
export function updateInformationSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/updateInformationSequence"
            : "event/updateInformationSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
export function updateLotteryGroupPropertySave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/updateLotteryGroupPropertySave"
            : "event/updateLotteryGroupPropertySave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 删除管理员
export function authAdminDelete(data) {
    return axios({
        url: "event/adminDelete",
        method: "post",
        data: data
    });
}


// 删除管理员
export function rotationconfigDelete(data) {
    return axios({
        url: "event/rotationconfigDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function floatwindowconfigDelete(data) {
    return axios({
        url: "event/floatwindowconfigDelete",
        method: "post",
        data: data
    });
}


// 删除管理员
export function blackDelete(data) {
    return axios({
        url: "event/blackDelete",
        method: "post",
        data: data
    });
}


// 删除管理员
export function informationDelete(data) {
    return axios({
        url: "event/informationDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function updateRotateSequence(data) {
    return axios({
        url: "event/updateRotateSequence",
        method: "post",
        data: data
    });
}

