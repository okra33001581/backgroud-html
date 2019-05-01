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




