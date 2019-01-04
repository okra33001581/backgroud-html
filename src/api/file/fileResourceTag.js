/**
 * 资源分组相关
 */
import axios from "../../utils/axios";

// 列表
export function fileResourceTagList(query) {
    return axios({
        url: "http://apidemo.test/api/event/resourceTagIndex",
        method: "get",
        params: query
    });
}

// 创建分组
export function fileResourceTagAdd(data) {
    return axios({
        url: "http://apidemo.test/api/event/resourceTagAdd",
        method: "post",
        data: data
    });
}
