/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 获取列表
export function authAdminList(query) {
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
export function adminStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/adminStatusSave"
            : "event/adminStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
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
