/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";



// 获取列表
export function agLogList(query) {
    return axios({
        url: "event/agLogList",
        method: "get",
        params: query
    });
}

// 获取列表
export function agUserTurnoverList(query) {
    return axios({
        url: "event/agUserTurnoverList",
        method: "get",
        params: query
    });
}

// 获取列表
export function gameTypeDetailList(query) {
    return axios({
        url: "event/gameTypeDetailList",
        method: "get",
        params: query
    });
}

// 获取类型列表
export function gameTypesList(query) {
    return axios({
        url: "event/gameTypesList",
        method: "get",
        params: query
    });
}


// 获取列表
export function basketballList(query) {
    return axios({
        url: "event/basketballList",
        method: "get",
        params: query
    });
}

// 获取列表
export function footballList(query) {
    return axios({
        url: "event/footballList",
        method: "get",
        params: query
    });
}

// 获取列表
export function gaUserTurnoverList(query) {
    return axios({
        url: "event/gaUserTurnoverList",
        method: "get",
        params: query
    });
}

// 获取列表
export function gameTypeList(query) {
    return axios({
        url: "event/gameTypeList",
        method: "get",
        params: query
    });
}

// 获取列表
export function merchantGameList(query) {
    return axios({
        url: "event/merchantGameList",
        method: "get",
        params: query
    });
}

// 获取列表
export function thirdPlatList(query) {
    return axios({
        url: "event/thirdPlatList",
        method: "get",
        params: query
    });
}

// 保存
export function thirdBallSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdBallSequence"
            : "event/thirdBallSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdPlatsSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdPlatsSequence"
            : "event/thirdPlatsSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdGameTypesSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdGameTypesSequence"
            : "event/thirdGameTypesSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 修改排序值
export function thirdMerchantGameSequence(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdMerchantGameSequence"
            : "event/thirdMerchantGameSequence";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 修改游戏费用值
export function thirdMerchantGameFee(data) {
    return axios({
        url: "event/thirdMerchantGameFee",
        method: "post",
        data: data
    });
}
// 修改游戏费用明细值
export function thirdMerchantGameSubFee(data) {
    return axios({
        url: "event/thirdMerchantGameSubFee",
        method: "post",
        data: data
    });
}
// 保存
export function thirdGameTypesSubStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdGameTypesSubStatusSave"
            : "event/thirdGameTypesSubStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdBallStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdBallStatusSave"
            : "event/thirdBallStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdGameSetStatusSave(data) {
    return axios({
        url: "event/thirdGameSetStatusSave",
        method: "post",
        data: data
    });
}
// 保存
export function thirdGameTypesStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdGameTypesStatusSave"
            : "event/thirdGameTypesStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 保存
export function thirdMerchantGameStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdMerchantGameStatusSave"
            : "event/thirdMerchantGameStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}


// 保存
export function thirdPlatsStatusSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdPlatsStatusSave"
            : "event/thirdPlatsStatusSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdBallSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdBallSave"
            : "event/thirdBallSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdGameTypesSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdGameTypesSave"
            : "event/thirdGameTypesSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdGameTypesDetailSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdGameTypesDetailSave"
            : "event/thirdGameTypesDetailSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdMerchantgameSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdMerchantgameSave"
            : "event/thirdMerchantgameSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 保存
export function thirdPlatsSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "event/thirdPlatsSave"
            : "event/thirdPlatsSave";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

export function thirdPlatsDel(data) {
    return axios({
        url: "event/thirdPlatsDel",
        method: "post",
        data: data
    });
}

export function thirdMerchantgameDel(data) {
    return axios({
        url: "event/thirdMerchantgameDel",
        method: "post",
        data: data
    });
}

export function thirdGameTypesDetailDel(data) {
    return axios({
        url: "event/thirdGameTypesDetailDel",
        method: "post",
        data: data
    });
}

export function thirdGameTypesDel(data) {
    return axios({
        url: "event/thirdGameTypesDel",
        method: "post",
        data: data
    });
}

export function thirdGameSetDel(data) {
    return axios({
        url: "event/thirdGameSetDel",
        method: "post",
        data: data
    });
}

export function thirdBallDel(data) {
    return axios({
        url: "event/thirdBallDel",
        method: "post",
        data: data
    });
}

// 获取列表
export function gameTypeSetList(query) {
    return axios({
        url: "event/gameTypeSetList",
        method: "get",
        params: query
    });
}
// 获取列表
export function gameProfitList(query) {
    return axios({
        url: "event/gameProfitList",
        method: "get",
        params: query
    });
}

export function thirdGameSetSave(data) {
    return axios({
        url: "event/thirdGameSetSave",
        method: "post",
        data: data
    });
}
