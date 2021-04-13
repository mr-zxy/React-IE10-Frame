import React from 'react';
import './index.scss';
import {Avatar, Dropdown, Icon, Menu} from 'antd';
import {clearAll} from '@/utils/storageUtil'

export default class AvatarDropdown extends React.Component {
    onMenuClick = (event) => {
        const {key} = event;
        console.log("onMenuClick-key", key);
        if (key === 'logout') {
            const {dispatch} = this.props;
            console.log("onMenuClick", dispatch);
            return;
        }
        // history.push(`/account/${key}`);
    };
    /**
     * 登出
     */
    logout = () => {
        React.$confirm('警告', '您是否确认退出登录？', () => {
                clearAll()
                window.location.reload()
            }
        )
    }
    render() {
        const userName = "东方不败";
        const menuHeaderDropdown = (
            <Menu className="menu" selectedKeys={[]} onClick={this.onMenuClick}>
                {(
                    <Menu.Item key="center">
                        <Icon type="user"/>
                        个人中心
                    </Menu.Item>
                )}
                {(
                    <Menu.Item key="settings">
                        <Icon type="setting"/>
                        个人设置
                    </Menu.Item>
                )}
                {<Menu.Divider/>}
                <Menu.Item key="logout" onClick={() => this.logout()}>
                    <Icon type="logout"/>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menuHeaderDropdown} placement="bottomCenter">
                <div className="avatar">
                    <Avatar size="small" icon='userOutlined' alt="avatar"/>
                    <div className="avatar-username">{userName}</div>
                </div>
            </Dropdown>
        );
    }
}
