/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

/********代理默认配额*********/
// 获取列表
export function proxycommissionList(query) {
    return axios({
        url: "event/proxycommissionList",
        method: "get",
        params: query
    });
}


// 保存
export function proxycommissionSave(data) {
    return axios({
        url: "event/proxycommissionSave",
        method: "post",
        data: data
    });
}


// 删除管理员
export function proxycommissionDelete(data) {
    return axios({
        url: "event/proxycommissionDelete",
        method: "post",
        data: data
    });
}

/********代理推广链接*********/
export function proxycommissionProxylist(query) {
    return axios({
        url: "event/proxycommissionProxylist",
        method: "get",
        params: query
    });
}

// 保存
export function proxycommissionProxySave(data) {
    return axios({
        url: "event/proxycommissionProxySave",
        method: "post",
        data: data
    });
}

// 删除
export function proxycommissionProxyDelete(data) {
    return axios({
        url: "event/proxycommissionProxyDelete",
        method: "post",
        data: data
    });
}