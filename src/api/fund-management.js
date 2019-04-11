/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

// 获取列表
export function cashOrderlist(query) {
    return axios({
        url: "event/cashOrderlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashPaysetting(query) {
    return axios({
        url: "event/cashPaysetting",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashRakeback(query) {
    return axios({
        url: "event/cashRakeback",
        method: "get",
        params: query
    });
}
// 获取列表
export function cashWithdrawlist(query) {
    return axios({
        url: "event/cashWithdrawlist",
        method: "get",
        params: query
    });
}
// 获取列表
export function companymoneyList(query) {
    return axios({
        url: "event/companymoneyList",
        method: "get",
        params: query
    });
}
// 获取列表
export function fastpaymoneyList(query) {
    return axios({
        url: "event/fastpaymoneyList",
        method: "get",
        params: query
    });
}
// 获取列表
export function layerchartIndex(query) {
    return axios({
        url: "event/layerchartIndex",
        method: "get",
        params: query
    });
}
// 获取列表
export function manualpaySave(query) {
    return axios({
        url: "event/manualpaySave",
        method: "get",
        params: query
    });
}
// 获取列表
export function manualpayconfirmList(query) {
    return axios({
        url: "event/manualpayconfirmList",
        method: "get",
        params: query
    });
}
// 获取列表
export function payaccountList(query) {
    return axios({
        url: "event/payaccountList",
        method: "get",
        params: query
    });
}
// 获取列表
export function paygroupList(query) {
    return axios({
        url: "event/paygroupList",
        method: "get",
        params: query
    });
}
// 获取列表
export function transferorderList(query) {
    return axios({
        url: "event/transferorderList",
        method: "get",
        params: query
    });
}
// 获取列表
export function tripartiteList(query) {
    return axios({
        url: "event/tripartiteList",
        method: "get",
        params: query
    });
}
// 获取列表
export function userbetscheckList(query) {
    return axios({
        url: "event/userbetscheckList",
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
export function userbetscheckStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/userbetscheckStatusSave"
            : "event/userbetscheckStatusSave";
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
            ? "event/transferorderStatusSave"
            : "event/transferorderStatusSave";
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
            ? "event/manualpayStatusSave"
            : "event/manualpayStatusSave";
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
            ? "event/manualpayconfirmStatusSave"
            : "event/manualpayconfirmStatusSave";
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
            ? "event/companymoneyStatusSave"
            : "event/companymoneyStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function sequenceSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/sequenceSave"
            : "event/sequenceSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
// 保存
export function payAccountSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/payAccountSequence"
            : "event/payAccountSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
// 保存
export function propertySave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/propertySave"
            : "event/propertySave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}
// 保存
export function paytypeAliasSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/paytypeAliasSave"
            : "event/paytypeAliasSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function payAccountStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/payAccountStatusSave"
            : "event/payAccountStatusSave";
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
            ? "event/rakebackStatusSave"
            : "event/rakebackStatusSave";
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
            ? "event/fastpaymoneyStatusSave"
            : "event/fastpaymoneyStatusSave";
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
            ? "event/cashwithdrawStatusSave"
            : "event/cashwithdrawStatusSave";
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
            ? "event/paysettingSave"
            : "event/paysettingSave";
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
            ? "event/depositAccountSave"
            : "event/depositAccountSave";
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
            ? "event/thirdAccountSave"
            : "event/thirdAccountSave";
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
            ? "event/payGroupStatusSave"
            : "event/payGroupStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除管理员
export function paysettingDelete(data) {
    return axios({
        url: "event/paysettingDelete",
        method: "post",
        data: data
    });
}
// 删除管理员
export function payaccountDelete(data) {
    return axios({
        url: "event/payaccountDelete",
        method: "post",
        data: data
    });
}
// 删除管理员
export function tripartiteDelete(data) {
    return axios({
        url: "event/tripartiteDelete",
        method: "post",
        data: data
    });
}
export function thirdAccountStatusSave(data) {
    return axios({
        url: "event/thirdAccountStatusSave",
        method: "post",
        data: data
    });
}

export function thirdAccountIsTopSave(data) {
    return axios({
        url: "event/thirdAccountIsTopSave",
        method: "post",
        data: data
    });
}

export function thirdAccountIsTopSave(data) {
    return axios({
        url: "event/thirdAccountIsTopSave",
        method: "post",
        data: data
    });
}


