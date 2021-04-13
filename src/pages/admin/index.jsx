import React, {Component} from 'react';
import {Layout} from 'antd';
import './index.scss';
import Sidebar from '../../layout/sidebar';
import Header from "../../layout/header";
import SettingSIdeRig from '@/components/settingSideRig'
import TagView from '@/components/tagView'
import {Scrollbars} from 'react-custom-scrollbars';
import memory from "../../utils/memory";
import Logo from "../../layout/sidebar/logo";
import Router from '@/router'
import {Redirect} from 'react-router-dom'
import {actionSetUserMenu} from '@/redux/actions/login'
import {connect} from 'react-redux'
import {GET_ROUTERS,MOCK_GET_ROUTERS} from '@/api/menu'
import {SUCCESS_CODE} from '@/api/code'
import {readToken} from '@/utils/storageUtil'
import Breadcrumb from '@/components/breadcrumb'

const {Footer, Sider} = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount() {
        this.setState({isLoading: true})
        if (readToken()) {
            this.getMenuRouter()
        } else {
            this.props.history.push('/login')
        }
    }

    /**
     *获取路由信息并储存到redux中
     */
    getMenuRouter = () => {
        MOCK_GET_ROUTERS().then(menu => {
            if (menu.code === SUCCESS_CODE) {
                this.props.setMenuRouter(menu.data)
                this.setState({isLoading: false})
            } else {
                console.log('获取路由失败')
            }
        })
    }

    render() {
        /*
        *  isLoading 如果路由没获取到不执行render
        *  因为：router.js 在生命周期获取不到redux值
        * */
        let {isLoading} = this.state
        if (isLoading) {
            return false
        }
        const user = memory.user;
        if (!user || !user.id) {
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider width={React.$SIDEBAR_WIDTH} collapsed={this.props.collapsed}>
                    <Logo/>
                    <Scrollbars className="scrollbars-wrapper"
                                style={{height: 'calc(100% - ' + React.$HEADER_HEIGHT + 'px)'}}>
                        <Sidebar location={this.props.location}/>
                    </Scrollbars>
                </Sider>
                <Layout>
                    <Header>
                        <Breadcrumb routersList={this.props.routersList}></Breadcrumb>
                    </Header>
                    <TagView {...this.props}/>
                    <div style={{
                        height: 'calc( 100% - ' + (React.$FOOTER_HEIGHT + React.$HEADER_HEIGHT + 20) + 'px)',
                        padding: '0 10px'
                    }}>
                        <Scrollbars style={{height: '100%'}} className="view-app-wrapper">
                            <div className="content-wrapper"><Router {...this.props}/></div>
                        </Scrollbars>
                    </div>
                    <SettingSIdeRig/>
                    {/*<Footer className="footer-wrapper" style={{height: React.$FOOTER_HEIGHT + 'px'}}>*/}
                    {/*    <div>*/}
                    {/*        推荐使用谷歌浏览器，可以获得更佳页面操作体验*/}
                    {/*    </div>*/}
                    {/*</Footer>*/}
                </Layout>
            </Layout>
        )
    }
}

let mapStatePropsTo = function (state) {
    return {
        collapsed: state.utils.collapsed,
        routersList: state.login[React.$USER_ROUTER]
    }
}
let mapDispatchPropsTo = function (dispatch) {
    return {
        setMenuRouter: (menu) => dispatch(actionSetUserMenu(menu)),
    }
}
export default connect(mapStatePropsTo, mapDispatchPropsTo)(Admin)
