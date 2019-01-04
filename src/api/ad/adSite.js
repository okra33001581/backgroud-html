/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 谁最懂我相关

// 列表
export function adSiteList(query) {
    return axios({
        url: "http://apidemo.test/api/event/siteIndex",
        method: "get",
        params: query
    });
}

// 广告列表
export function adSiteAdList(query) {
    return axios({
        url: "http://apidemo.test/api/event/siteAdList",
        method: "get",
        params: query
    });
}

// 保存
export function adSiteSave(data, formName, method = "post") {
    var url =
        formName === "add" ? "http://apidemo.test/api/event/siteSave" : "http://apidemo.test/api/event/siteEdit";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除
export function adSiteDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/siteDelete",
        method: "post",
        data: data
    });
}
