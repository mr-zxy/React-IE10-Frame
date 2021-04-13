import React from 'react';
import {LOGIN, SET_USER_INFO, SET_USER_MENU} from "../action-types";
import {saveUser, setToken} from "@/utils/storageUtil";
import config from '@/config/config'

let LoginExpress = {}
const LoginState = (state = LoginExpress, action) => {
    switch (action.type) {
        case LOGIN:
            /**
             *  储存登录信息,储存到-localStorage-redux
             */
            let {access_token} = action.data.data
            setToken(access_token)
            state[React.$TOKEN] = access_token;
            return {...state};
            /**
             *  储存用户信息,储存到-localStorage-redux
             *  储存路由信息,储存到-redux,config
             */
        case SET_USER_INFO:
            // 用户信息
            let {data: user} = action;
            saveUser(user)
            state[React.$USER_KEY] = user;
            return {...state}
        case SET_USER_MENU:
            // 用户路由
            let {data: router} = action;
            state[React.$USER_ROUTER] = router;
            state[React.$USER_ROUTER] = state[React.$USER_ROUTER].concat(config.routers)
            return {...state}
        default:
            return state;
    }
}
export default LoginState;
