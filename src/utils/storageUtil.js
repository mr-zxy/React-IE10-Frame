import React from 'react';
import store from 'store';

/**
 * 保存登录用户
 * @param user
 */
export const saveUser = (user) => {
    store.set(React.$USER_KEY, user);
}

/**
 * 读取用户信息
 * @returns {any}
 */
export const readUser = () => {
    return store.get(React.$USER_KEY) || {};
}

/**
 * 移除登录用户
 */
export const removeUser = () => {
    store.remove(React.$USER_KEY);
}
/**
 * 设置token
 * @param token
 */
export const setToken = (token) => {
    store.set(React.$TOKEN, token);
}
/**
 * 读取token
 * @param token
 */
export const readToken = () => {
    return store.get(React.$TOKEN);
}

/**
 * 记住密码储存账号
 * @returns {*}
 */
export const setLoginUser = (userName,passWord) => {
    store.set(React.$LOGIN_USERNAME, userName)
    store.set(React.$LOGIN_PASSWORD, passWord);
}
/**
 * 取消记住密码
 * @returns {*}
 */
export const removeLoginUser = () => {
    store.remove(React.$LOGIN_USERNAME);
    store.remove(React.$LOGIN_PASSWORD);
}
/**
 * 移除所有储存
 * 退出登录
 */
export const clearAll = () => {
    // store.clearAll()
    // 删除token
    store.remove(React.$TOKEN);
    // 删除用户信息
    store.remove(React.$USER_KEY)
}
