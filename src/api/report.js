/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function profitIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/profitIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function issueProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/issueProfitsIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function lotteryProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/lotteryProfitsIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function monthProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/monthProfitsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function lotteryMonthProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/lotteryMonthProfitsIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function teamProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/teamProfitsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function userProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/userProfitsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function userMonthProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/userMonthProfitsIndex",
        method: "get",
        params: query
    });
}



// 获取角色列表
export function teamMonthProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/teamMonthProfitsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function userLotteryProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/userLotteryProfitsIndex",
        method: "get",
        params: query
    });
}



// 获取角色列表
export function teamLotteryProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/teamLotteryProfitsIndex",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function wayProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/wayProfitsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function lotteryWayProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/lotteryWayProfitsIndex",
        method: "get",
        params: query
    });
}


// 获取角色列表
export function userLotteryWayProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/userLotteryWayProfitsIndex",
        method: "get",
        params: query
    });
}




// 获取角色列表
export function teamLotteryWayProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/teamLotteryWayProfitsIndex",
        method: "get",
        params: query
    });
}




// 获取角色列表
export function terminalProfitsIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/terminalProfitsIndex",
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
