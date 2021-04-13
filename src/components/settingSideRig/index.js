import React, {Component} from 'react';
import {Button, Drawer,Icon} from 'antd';
import './index.scss'
import {THTEMCOLOR} from '../../utils/themeColor'
import Loading from '../../components/loading'
class SettingSideRig extends Component {
    constructor(props) {
        super(props);
        this.width = 300 + 'px';
        this.colorButton = [{name: '红色', theme: 'red'}, {name: '粉色', theme: 'pink'}, {
            name: '青色',
            theme: '#99CCCC'
        }, {name: '默认', theme: 'default'}]
        this.state = {
            visible: false,
            loading: true
        }
    }

    IcontDrawer() {
        this.setState({visible: !this.state.visible})
    }

    colorThemeThunk(colorName) {
        console.log(Loading,'Loading')
        Loading.open({alertTip: "更换主题中..."});
        window.less
            .modifyVars(THTEMCOLOR(colorName))
            .then(() => {
                this.setState({visible: false})
                setTimeout(()=>{
                    Loading.close()
                },3000)

            })
    }
    onClose() {
        console.log('Drawer关闭钩子')
    }
    render() {
        let {visible, loading} = this.state;
        let {width, colorButton} = this;
        return (
            <div id="settingSideRIg">
                <div className={"ant-pro-setting-drawer-handle"} style={visible ? {right: width} : {right: '0px'}}
                     onClick={this.IcontDrawer.bind(this)}>
                    <div className={"icon"}>
                        {
                            visible ? <Icon type="close" /> : <Icon type="setting" />
                        }
                    </div>
                </div>
                <Drawer
                    width={width}
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                    getContainer={'#settingSideRIg'}
                >
                    {colorButton.map((item, index) => <Button type="primary" size={"small"}
                                                              style={{"backgroundColor": item.theme}} key={index}
                                                              onClick={this.colorThemeThunk.bind(this, item.theme)}>{item.name}</Button>)}
                </Drawer>
            </div>
        );
    }
}

export default SettingSideRig
