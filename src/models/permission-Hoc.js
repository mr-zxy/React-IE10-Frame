import React, {Component} from 'react'
import {readToken} from "@/utils/storageUtil";
import {GET_USER_INFO} from '@/api/login'
import {SUCCESS_CODE} from '@/api/code'
import {MOCK_GET_USER_INFO} from '@/api/login/index'
const isValidateLogin = function (path) {
    if (/\/login/.test(path)) {
        return true
    } else {
        return false
    }
}
/**
 * react 高阶组件实现路由守卫
 * @type {Array}
 */
// 白名单开发时使用，生产环境切记要数组清空掉
const whitePath = [];
export const permissionAuth = param => WrappedComponent => class extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let currentPath = this.props.history.location.pathname;
        //白名单
        if (whitePath.includes(currentPath)) {
            this.props.history.push(currentPath)
        } else {
            if (readToken()) {
                if (isValidateLogin(currentPath) === false) {
                    this.props.history.push(currentPath)
                    // 获取用户信息
                    MOCK_GET_USER_INFO().then(infoResult => {
                        if (infoResult.code === SUCCESS_CODE) {
                            param.userInfo(infoResult.user, this.props)
                        } else {
                            console.log('获取用户信息失败')
                        }
                    })
                } else {
                    // 有token情况下不允许跳转到login
                    this.props.history.push(React.$ROUTER_BASE)
                }
            } else {
                // 如果跳转路由没有token权限,跳回到login
                if (isValidateLogin(currentPath) === false) {
                    this.props.history.push('/login')
                }
            }
        }
    }

    render() {
        return (<WrappedComponent {...this.props}></WrappedComponent>)
    }
}
