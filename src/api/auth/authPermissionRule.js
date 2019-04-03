/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 权限管理

// 获取列表
export function authPermissionRuleList(query) {
    return axios({
        url: "event/permissionRuleIndex",
        method: "get",
        params: query
    });
}
// 获取树形列表
export function authPermissionRuleTree(query) {
    return axios({
        url: "event/permissionRuleTree",
        method: "get",
        params: query
    });
}

// 保存
export function ruleStatusSave(data, formName, method = "post") {
    let url =
        formName !== "edit"
            ? "event/ruleStatusSave"
            : "event/ruleStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function authPermissionRuleSave(data, formName, method = "post") {
    let url =
        formName !== "edit"
            ? "event/permissionRuleSave"
            : "event/permissionRuleEdit";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除
export function authPermissionRuleDelete(data) {
    return axios({
        url: "event/permissionRuleDelete",
        method: "post",
        data: data
    });
}
