import {LOGIN, SET_USER_INFO, SET_USER_MENU} from "../action-types";
import {LOGIN_AJAX} from '@/api/login'
import {MOCK_LOGIN_AJAX} from '@/api/login/index'
import {SUCCESS_CODE} from '@/api/code'
//登录
export const actionLogin = (data, fn) => {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            MOCK_LOGIN_AJAX(data).then(res => {
                if (res.code === SUCCESS_CODE) {
                    resolve(res.code)
                    dispatch({type: LOGIN, data: res})
                }else {
                    resolve(res.code)
                }
            })
        })
    }
}
// 获取用户信息
export const actionSetUserInfo = (infoData) => {
    return {type: SET_USER_INFO, data: infoData}
}
// 获取用户路由信息
export const actionSetUserMenu = (menuData) => {
    return {type: SET_USER_MENU, data: menuData}
}

