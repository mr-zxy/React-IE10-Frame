import React, {Component, Suspense} from 'react';
import loadable from '@loadable/component';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import NotFound from "@/pages/404";
import {permissionAuth} from '@/models/permission-Hoc'
import {connect} from 'react-redux'
import {actionSetUserInfo} from '@/redux/actions/login'

// 懒加载引入路由
@permissionAuth({
    userInfo: (infoAndRouter, _this) => {
        let {setUserInfoData} = _this;
        setUserInfoData(infoAndRouter)
    }
})
class Router extends Component {
    constructor(props) {
        super(props)
        this.menuList = [];
        this.state = {
            menuNodes: [],
        }
    }

    UNSAFE_componentWillMount() {
        let {routersList} = this.props
        this.getMenuNodes(routersList);
    }

    /**
     * 获取菜单Node
     * @param menuList
     * @returns {*}
     */
    getMenuNodes = (menuList) => {
        menuList.forEach(item => {
            if (item && item.children && item.children.length) {
                this.getMenuNodes(item.children)
            } else {
                this.menuList.push(item)
            }
        });
    }

    componentDidMount() {
        console.log(this.menuList)
        this.setState({
            menuNodes: this.menuList
        })
    }

    render() {
        return (
            <HashRouter>
                {/*  fallback={<Spin/>}  懒加载跳转显示loading*/}
                <Suspense fallback={''}>
                    <Switch>
                        {/*<Route path="/home" render={props => <Home {...props}/>}/>*/}
                        <Redirect exact from="/" to={React.$ROUTER_BASE} />
                        {this.state.menuNodes.map(item => <Route key={item.path} path={"/" + item.path} component={loadable(() => import(`@/pages/${item.component}`))}/>
                        )}
                        <Route component={NotFound}/>
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}

const mapStatePropTo = (state) => {
    return {
        routersList: state.login[React.$USER_ROUTER]
    }
}
const mapDispatchPropTo = (dispatch) => {
    return {
        setUserInfoData: (userInfoData) => dispatch(actionSetUserInfo(userInfoData))
    }
}
export default connect(mapStatePropTo, mapDispatchPropTo)(Router)
