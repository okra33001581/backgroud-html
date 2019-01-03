/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";
// 获取信息
export function userInfo(id, token) {
    return axios({
        url: "http://apidemo.test/api/event/loginInfoa",
        method: "get",
        // headers: {
        //     "x-adminid": "*",
        //     "cache-control": "no-cache"
        // },
        params: { id, token }
    });
}

export function loginName(userName, pwd) {
    return axios({
        url: "http://apidemo.test/api/event/loginIndex",
        method: "post",
        data: { userName, pwd }
    });
}

export function logout(uid, token) {
    return axios({
        url: "http://apidemo.test/api/event/out",
        method: "post",
        data: { uid, token }
    });
}

export function password(data) {
    return axios({
        url: "http://apidemo.test/api/event/password",
        method: "post",
        data: data
    });
}
