/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";
// 获取列表
export function adTypeIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/adTypeIndex",
        method: "get",
        params: query
    });
}

// 获取列表
export function adLocationIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/adLocationIndex",
        method: "get",
        params: query
    });
}

// 获取列表
export function eventPrizeIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/eventPrizeIndex",
        method: "get",
        params: query
    });
}

// 获取列表
export function eventConditonsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/eventConditonsIndex",
        method: "get",
        params: query
    });
}





// 获取角色列表
export function authAdminRoleList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adminRoleList",
        method: "get",
        params: query
    });
}

// 保存
export function authAdminSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/adminSave"
            : "http://apidemo.test/api/event/adminEdit";
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
