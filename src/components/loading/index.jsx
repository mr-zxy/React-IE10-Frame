import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import {Spin} from 'antd';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        this.alertTip = '加载中...'
    }

    open(params) {
        /**
         * @params
         * isLoading 是否显示 默认true
         * isMask 是否显示这遮挡层 默认true
         * alertTip 默认显示的文字 加载中...
         * */
        if (params.isMask || params.isMask === undefined) {
            this.isMask = true
        } else {
            this.isMask = false
        }
        this.alertTip = params.alertTip;
        this.setState({
            isLoading: true,
        })
    }

    close() {
        this.setState({
            isLoading: false
        })
    }

    render() {
        let {isLoading} = this.state;
        if (isLoading) {
            return (
                <div id="loading">
                    {this.isMask && <div className={'loading-drawer-mask'}></div>}
                    <div className={'LoadingSpin'}>
                        <Spin tip={this.alertTip}></Spin>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }

    }
}

let div = document.createElement('div');
document.body.appendChild(div);
let Box = ReactDOM.render(React.createElement(
    Loading,
    {}
), div);
export default Box
