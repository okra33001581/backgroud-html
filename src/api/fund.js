/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function accoundIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/accoundIndex",
        method: "get",
        params: query
});
}

// 获取角色列表
export function transactionIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/transactionIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function dispositIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/dispositIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function bankDepositIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/bankDepositIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function exceptionDepositIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/exceptionDepositIndex",
        method: "get",
        params: query
    });
}
// 获取角色列表
export function menuDepositIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/menuDepositIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function manuWithdrawalsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/manuWithdrawalsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function manuDividends(query) {
    return axios({
        url: "http://apidemo.test/api/event/manuDividends",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function loseCommissionsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/loseCommissionsIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function commissionsStatisticsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/commissionsStatisticsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function platTransferRecordsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/platTransferRecordsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function withdrawalsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/withdrawalsIndex",
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
