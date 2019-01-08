/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 获取列表
export function authRoleList(query) {
    return axios({
        url: "http://apidemo.test/api/event/roleIndex",
        method: "get",
        params: query
    });
}

// 编辑
export function authRoleAuthList(query) {
    return axios({
        url: "http://apidemo.test/api/event/roleAuthList",
        method: "get",
        params: query
    });
}

// 添加
export function authRoleAuth(data) {
    return axios({
        url: "http://apidemo.test/api/event/roleAuth",
        method: "post",
        data: data
    });
}

// 添加
export function authRoleAuthListByUser(data) {
    return axios({
        url: "http://apidemo.test/api/event/roleAuthListByUser",
        method: "get",
        data: data
    });
}

// 保存
export function authRoleSave(data, formName, method = "post") {
    let url =
        formName === "add" ? "http://apidemo.test/api/event/roleSave" : "http://apidemo.test/api/event/roleEdit";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除
export function authRoleDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/roleDelete",
        method: "post",
        data: data
    });
}
