/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function userInfolist(query) {
    return axios({
        url: "event/userInfolist",
        method: "get",
        params: query
    });
}

// 获取列表
export function getUserQuota(query) {
    return axios({
        url: "event/getUserQuota",
        method: "get",
        params: query
    });
}

// 获取列表
export function userInoutcash(query) {
    return axios({
        url: "event/userInoutcash",
        method: "get",
        params: query
    });
}
// 获取列表
export function userMainlist(query) {
    return axios({
        url: "event/userMainlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function userMonitor(query) {
    return axios({
        url: "event/userMonitor",
        method: "get",
        params: query
    });
}
// 获取列表
export function userReviewlist(query) {
    return axios({
        url: "event/userReviewlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function userUsercard(query) {
    return axios({
        url: "event/userUsercard",
        method: "get",
        params: query
    });
}
// 获取列表
export function userUserlayer(query) {
    return axios({
        url: "event/userUserlayer",
        method: "get",
        params: query
    });
}
// 获取列表
export function userValiduser(query) {
    return axios({
        url: "event/userValiduser",
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
export function userSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/userSave"
            : "event/userSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function userLevelSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/userLevelSave"
            : "event/userLevelSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 保存
export function bankCardSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/bankCardSave"
            : "event/bankCardSave";
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

// 保存
export function bankcardStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/bankcardStatusSave"
            : "event/bankcardStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function userStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/userStatusSave"
            : "event/userStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 保存
export function usersafetyStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/usersafetyStatusSave"
            : "event/usersafetyStatusSave";
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
export function userlayerDelete(data) {
    return axios({
        url: "event/userlayerDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function usercardDelete(data) {
    return axios({
        url: "event/usercardDelete",
        method: "post",
        data: data
    });
}

// 删除管理员
export function userQuotaSave(data) {
    return axios({
        url: "event/userQuotaSave",
        method: "post",
        data: data
    });
}

// 删除管理员
export function userTopParentSave(data) {
    return axios({
        url: "event/userTopParentSave",
        method: "post",
        data: data
    });
}
export function userRebateSave(data) {
    return axios({
        url: "event/userRebateSave",
        method: "post",
        data: data
    });
}

export function userLockSave(data) {
    return axios({
        url: "event/userLockSave",
        method: "post",
        data: data
    });
}


