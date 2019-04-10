/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function authAdminList(query) {
    return axios({
        url: "event/authAdminList",
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
export function getDayBetween(query) {
    return axios({
        url: "event/getDayBetween",
        method: "get",
        params: query
    });
}



// 获取列表
export function financeIndex(query) {
    return axios({
        url: "event/financeIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function operationProfit(query) {
    return axios({
        url: "event/operationProfit",
        method: "get",
        params: query
    });
}
// 获取列表
export function pgamePlaylist(query) {
    return axios({
        url: "event/pgamePlaylist",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function preportProfit(query) {
    return axios({
        url: "event/preportProfit",
        method: "get",
        params: query
    });
}
// 获取角色列表
export function userReport(query) {
    return axios({
        url: "event/userReport",
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