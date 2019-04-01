/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function userInfolist(query) {
    return axios({
        url: "http://apidemo.test/api/event/userInfolist",
        method: "get",
        params: query
    });
}
// 获取列表
export function userInoutcash(query) {
    return axios({
        url: "http://apidemo.test/api/event/userInoutcash",
        method: "get",
        params: query
    });
}
// 获取列表
export function userMainlist(query) {
    return axios({
        url: "http://apidemo.test/api/event/userMainlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function userMonitor(query) {
    return axios({
        url: "http://apidemo.test/api/event/userMonitor",
        method: "get",
        params: query
    });
}
// 获取列表
export function userReviewlist(query) {
    return axios({
        url: "http://apidemo.test/api/event/userReviewlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function userUsercard(query) {
    return axios({
        url: "http://apidemo.test/api/event/userUsercard",
        method: "get",
        params: query
    });
}
// 获取列表
export function userUserlayer(query) {
    return axios({
        url: "http://apidemo.test/api/event/userUserlayer",
        method: "get",
        params: query
    });
}
// 获取列表
export function userValiduser(query) {
    return axios({
        url: "http://apidemo.test/api/event/userValiduser",
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
export function userSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/userSave"
            : "http://apidemo.test/api/event/userSave";
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
            ? "http://apidemo.test/api/event/userLevelSave"
            : "http://apidemo.test/api/event/userLevelSave";
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
            ? "http://apidemo.test/api/event/bankCardSave"
            : "http://apidemo.test/api/event/bankCardSave";
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
            ? "http://apidemo.test/api/event/adminSave"
            : "http://apidemo.test/api/event/adminEdit";
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
            ? "http://apidemo.test/api/event/bankcardStatusSave"
            : "http://apidemo.test/api/event/bankcardStatusSave";
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
            ? "http://apidemo.test/api/event/userStatusSave"
            : "http://apidemo.test/api/event/userStatusSave";
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
            ? "http://apidemo.test/api/event/usersafetyStatusSave"
            : "http://apidemo.test/api/event/usersafetyStatusSave";
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