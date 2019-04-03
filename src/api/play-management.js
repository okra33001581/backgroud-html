/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function betlimitList(query) {
    return axios({
        url: "event/betlimitList",
        method: "get",
        params: query
    });
}

// 获取列表
export function lotteryriskList(query) {
    return axios({
        url: "event/lotteryriskList",
        method: "get",
        params: query
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