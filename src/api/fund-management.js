/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function cashOrderlist(query) {
    return axios({
        url: "http://apidemo.test/api/event/cashOrderlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashPaysetting(query) {
    return axios({
        url: "http://apidemo.test/api/event/cashPaysetting",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashRakeback(query) {
    return axios({
        url: "http://apidemo.test/api/event/cashRakeback",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashWithdrawlist(query) {
    return axios({
        url: "http://apidemo.test/api/event/cashWithdrawlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function companymoneyList(query) {
    return axios({
        url: "http://apidemo.test/api/event/companymoneyList",
        method: "get",
        params: query
    });
}
// 获取列表
export function fastpaymoneyList(query) {
    return axios({
        url: "http://apidemo.test/api/event/fastpaymoneyList",
        method: "get",
        params: query
    });
}
// 获取列表
export function layerchartIndex(query) {
    return axios({
        url: "http://apidemo.test/api/event/layerchartIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function manualpaySave(query) {
    return axios({
        url: "http://apidemo.test/api/event/manualpaySave",
        method: "get",
        params: query
    });
}
// 获取列表
export function manualpayconfirmList(query) {
    return axios({
        url: "http://apidemo.test/api/event/manualpayconfirmList",
        method: "get",
        params: query
    });
}
// 获取列表
export function payaccountList(query) {
    return axios({
        url: "http://apidemo.test/api/event/payaccountList",
        method: "get",
        params: query
    });
}
// 获取列表
export function paygroupList(query) {
    return axios({
        url: "http://apidemo.test/api/event/paygroupList",
        method: "get",
        params: query
    });
}
// 获取列表
export function transferorderList(query) {
    return axios({
        url: "http://apidemo.test/api/event/transferorderList",
        method: "get",
        params: query
    });
}
// 获取列表
export function tripartiteList(query) {
    return axios({
        url: "http://apidemo.test/api/event/tripartiteList",
        method: "get",
        params: query
    });
}
// 获取列表
export function userbetscheckList(query) {
    return axios({
        url: "http://apidemo.test/api/event/userbetscheckList",
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
export function userbetscheckStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/userbetscheckStatusSave"
            : "http://apidemo.test/api/event/userbetscheckStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function transferorderStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/transferorderStatusSave"
            : "http://apidemo.test/api/event/transferorderStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function manualpayStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/manualpayStatusSave"
            : "http://apidemo.test/api/event/manualpayStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function manualpayconfirmStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/manualpayconfirmStatusSave"
            : "http://apidemo.test/api/event/manualpayconfirmStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function companymoneyStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/companymoneyStatusSave"
            : "http://apidemo.test/api/event/companymoneyStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function rakebackStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/rakebackStatusSave"
            : "http://apidemo.test/api/event/rakebackStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function fastpaymoneyStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/fastpaymoneyStatusSave"
            : "http://apidemo.test/api/event/fastpaymoneyStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 保存
export function cashwithdrawStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/cashwithdrawStatusSave"
            : "http://apidemo.test/api/event/cashwithdrawStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function paysettingSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/paysettingSave"
            : "http://apidemo.test/api/event/paysettingSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 保存
export function depositAccountSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/depositAccountSave"
            : "http://apidemo.test/api/event/depositAccountSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdAccountSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/thirdAccountSave"
            : "http://apidemo.test/api/event/thirdAccountSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function payGroupStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "http://apidemo.test/api/event/payGroupStatusSave"
            : "http://apidemo.test/api/event/payGroupStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除管理员
export function paysettingDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/paysettingDelete",
        method: "post",
        data: data
    });
}
// 删除管理员
export function payaccountDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/payaccountDelete",
        method: "post",
        data: data
    });
}
// 删除管理员
export function tripartiteDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/tripartiteDelete",
        method: "post",
        data: data
    });
}




