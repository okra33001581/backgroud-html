/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 投注限额相关
// 获取列表
export function betlimitList(query) {
    return axios({
        url: "event/betlimitList",
        method: "get",
        params: query
    });
}

// 获取下拉框列表
export function betlimitOptions(query) {
    return axios({
        url: "event/betlimitOptions",
        method: "get",
        params: query
    });
}
export function updateLotteryGroupPropertySave(data) {
    return axios({
        url: "event/updateLotteryGroupPropertySave",
        method: "post",
        data: data
    });
}
// 内容保存
export function betlimitSave(data) {
    return axios({
        url: "event/betlimitSave",
        method: "post",
        data: data
    });
}

// 姓名保存
export function betlimitNameSave(data) {
    return axios({
        url: "event/betlimitNameSave",
        method: "post",
        data: data
    });
}

// 单一用户单次中奖金额保存
export function betlimitPrizeSave(data) {
    return axios({
        url: "event/betlimitPrizeSave",
        method: "post",
        data: data
    });
}
// 单一用户单次中奖金额保存
export function betlimitDelete(data) {
    return axios({
        url: "event/betlimitDelete",
        method: "post",
        data: data
    });
}

// 风控相关获取列表
export function lotteryriskList(query) {
    return axios({
        url: "event/lotteryriskList",
        method: "get",
        params: query
    });
}

// 保存
export function lotteryriskStatusSave(data) {
    return axios({
        url: "event/lotteryriskStatusSave",
        method: "post",
        data: data
    });
}


// 保存
export function lotteryriskSave(data) {
    return axios({
        url: "event/lotteryriskSave",
        method: "post",
        data: data
    });
}

// 删除管理员
export function lotteryriskDelete(data) {
    return axios({
        url: "event/lotteryriskDelete",
        method: "post",
        data: data
    });
}


// 获取列表
export function pgameList(query) {
    return axios({
        url: "event/pgameList",
        method: "get",
        params: query
    });
}

// 获取列表
export function proxygamesList(query) {
    return axios({
        url: "event/proxygamesList",
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

// 删除管理员
export function authAdminDelete(data) {
    return axios({
        url: "event/adminDelete",
        method: "post",
        data: data
    });
}