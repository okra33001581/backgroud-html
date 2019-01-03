/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 谁最懂我相关

// 列表
export function adList(query) {
    return axios({
        url: "http://apidemo.test/api/event/adIndex",
        method: "get",
        params: query
    });
}

// 保存
export function adSave(data, formName, method = "post") {
    var url = formName === "add" ? "http://apidemo.test/api/event/adSave" : "http://apidemo.test/api/event/adEdit";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除
export function adDelete(data) {
    return axios({
        url: "http://apidemo.test/api/event/adDelete",
        method: "post",
        data: data
    });
}
