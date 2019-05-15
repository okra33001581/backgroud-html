/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";

//------------------- 系统参数相关----------------
//获取列表数据
export function sysConfigsList(query) {
    return axios({
        url: "event/sysConfigsList",
        method: "get",
        params: query
    });
}

// 列表数据保存或修改
export function sysConfigsSave(data) {
    return axios({
        url: "event/sysConfigsSave",
        method: "post",
        data: data
    });
}

// 列表数据排序修改
export function sysConfigsSequenceSave(data) {
    return axios({
        url: "event/sysConfigsSequenceSave",
        method: "post",
        data: data
    });
}

// 列表数据状态修改
export function sysConfigsStatusSave(data) {
    return axios({
        url: "event/sysConfigsStatusSave",
        method: "post",
        data: data
    });
}

// 列表数据删除
export function sysConfigsDel(data) {
    return axios({
        url: "event/sysConfigsDel",
        method: "post",
        data: data
    });
}

//------------------- 系统监控相关----------------
//获取列表数据
export function systemMonitorList(query) {
    return axios({
        url: "event/systemMonitorList",
        method: "get",
        params: query
    });
}

// 列表数据es清除修改
export function systemMonitorClear(data) {
    return axios({
        url: "event/systemMonitorClear",
        method: "post",
        data: data
    });
}
