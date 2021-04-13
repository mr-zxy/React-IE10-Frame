import React from 'react';
import {Menu} from "antd";
import {tagViewActions} from "@/redux/actions/tagView";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SvgIcon from '@/components/svgIcon'
import './index.scss'

const {SubMenu} = Menu;

class SidebarItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 当前展开的 SubMenu 菜单项 key 数组
            openKeys: [],
        }
    }

    UNSAFE_componentWillMount() {
        let {routersList} = this.props;
        // 第一级父级菜单key
        this.rootKeys = [];
        // 所有可以展开的父级菜单对象
        this.allParentKeys = [];
        // 第一次进入后要展开的菜单key
        this.openKeys = [];
        // 获得第一级父级菜单key
        routersList.map(item => this.rootKeys.push(item.path));
        // 获取菜单node
        this.menuNodes = this.getMenuNodes(routersList);
        this.getParentPathAll(routersList)
        window.addEventListener('hashchange', this.routerEvent);
    }

    /**
     * 移除监听hashChange 否侧退出登录会报错
     */
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.routerEvent)
    }

    /**
     * 监听hashChange 的变化 防止再输入栏中输入路径菜单不变化
     */
    routerEvent = () => {
        let {routersList} = this.props;
        this.getParentPathAll(routersList)
    }

    /**
     * 路由变化获取当前key和父级key
     */
    getParentPathAll = () => {
        let {routersList} = this.props;
        const currentPath = this.props.location.pathname.replace('/', '')
        let parentPathAllMap = "";
        let parentPathAll = this.getParentsById(routersList, currentPath);
        if (parentPathAll && parentPathAll.length) {
            parentPathAll[0].key = parentPathAll[0].path
            this.props.tagViewActions(parentPathAll[0])
            parentPathAllMap = parentPathAll
                .slice(1, parentPathAll.length)
                .map((item) => item.path);
        } else {
            console.log('数据出现问题了')
            this.props.tagViewActions()
        }
        this.setState({
            openKeys: parentPathAllMap,
        });
    };
    /**
     * 获取所有父级的函数
     * @param list 过滤数组
     * @param key  过滤 key
     * @returns {T[] | string | T[]|*[]}
     */
    getParentsById = (list, key) => {
        for (let i in list) {
            if (list[i].path == key) {
                //查询到就返回该数组对象
                return [list[i]];
            }
            if (list[i].children) {
                let node = this.getParentsById(list[i].children, key);
                if (node != undefined) {
                    //查询到把父节点连起来
                    return node.concat(list[i]);
                }
            }
        }
    };
    /**
     * 获取菜单Node
     * @param menuList
     * @returns {*}
     */
    getMenuNodes = (menuList) => {
        const menus = menuList.map(item => {
            if (item && item.children && item.children.length) {
                return (
                    <SubMenu key={item.path}
                             title={
                                 <span>
                                     <SvgIcon icon={item.meta.icon} className={'layout-icon'} isload={'false'}/>
                                    <span className={/^\//.test(item.path) ? 'getMenuNodes-dom' : ''}>{item.meta.title}</span>
                                 </span>
                             }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    !item.hidden && <Menu.Item key={item.path} title={item.title}>
                        <Link to={'/'+item.path}>
                            <SvgIcon icon={item.meta.icon} className={'layout-icon'} isload={'false'}/>
                            <span>{item.meta.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        });
        return menus;
    }
    /**
     * 菜单展开改变时触发
     * @param keys
     */
    onOpenChange = keys => {
        const latestOpenKey = keys.find(path => this.state.openKeys.indexOf(path) === -1);
        if (this.rootKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys: keys});
        } else {
            this.setState({openKeys: latestOpenKey ? [latestOpenKey] : []});
        }
    }

    render() {
        let getMenuNodesDom = document.getElementsByClassName('getMenuNodes-dom');
        if (getMenuNodesDom && getMenuNodesDom.length) {
            getMenuNodesDom.forEach(item => {
                if (this.props.collapsed) {
                    item.style.opacity = '0'
                } else {
                    item.style.opacity = '1'
                }
            })
        }
        return (
            <Menu mode="inline"
                  theme="dark"
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onOpenChange}
                  className={'menu-theme-wrapper'}
                  selectedKeys={this.props.location.pathname}
            >
                {this.menuNodes}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.utils.collapsed,
        routersList: state.login[React.$USER_ROUTER]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tagViewActions: (path) => dispatch(tagViewActions(path)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem)

