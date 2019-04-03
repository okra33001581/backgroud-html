/**
 * 资源分组相关
 */
import axios from "../../utils/axios";

// 列表
export function fileResourceTagList(query) {
    return axios({
        url: "event/resourceTagIndex",
        method: "get",
        params: query
    });
}

// 创建分组
export function fileResourceTagAdd(data) {
    return axios({
        url: "event/resourceTagAdd",
        method: "post",
        data: data
    });
}
