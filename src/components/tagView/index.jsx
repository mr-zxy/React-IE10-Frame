import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.scss'
import {NavLink} from 'react-router-dom';
import { Icon} from 'antd'
import {removeTagAll, removeTagItem, removeTagOther} from '../../redux/actions/tagView'
import {TagViewModel} from '@/models/tagView-Hoc'

@TagViewModel()
class TagView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpeFlag: '', // 右键点击导航显示操作栏
            opeLeft: 0,//操作栏左侧位置
            opeTop: 0,// 操作栏右侧位置
            isHomeClose: false, //点击如果时
        }
    }

    componentDidMount() {
        document.addEventListener('click', this._handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClick);
    }

    /**
     * documenu点击事件，关闭导航菜单栏
     * @private
     */
    _handleClick = () => {
        this.setState({
            isOpeFlag: ''
        })
    }

    /**
     *  导航每一项右键点击
     * @param e event
     * @param item 导航点击当前的数据
     */
    navLinkContextItem = (e, item) => {
        e.preventDefault()
        let {offsetX, offsetY} = e.nativeEvent;
        this.setState({
            isOpeFlag: item.key,
            opeLeft: offsetX,
            opeTop: offsetY,
            isHomeClose: item.key === React.$ROUTER_BASE ? false : true
        })
    }

    /**
     * 导航每一项左键点击
     * @param item 导航点击当前的数据
     */
    navLinkClickItem(item) {
        this.setState({
            isOpeFlag: ''
        })
    }

    /**
     * 删除导航某一项
     * @param item 导航点击当前的数据
     */
    removeTagItem = (item) => {
        this.props.removeTagItem(item, (tagViewArr) => {
            this.props.history.push(tagViewArr[tagViewArr.length - 1].key)
        })
    }

    /**
     * 导航删除其他项
     * @returns item 导航点击当前的数据
     */
    removeTagOther = (item) => {
        this.props.removeTagOther(item, () => {
            this.props.history.push(item.key)
        })
    }
    /**
     * 导航删除全部
     * @returns item 导航点击当前的数据
     */
    removeTagAll = (item) => {
        this.props.removeTagAll(item, (tagViewArr) => {
            this.props.history.push(tagViewArr[0].key)
        })
    }

    render() {
        const currentPath = window.location.hash.replace('#/', '');
        let {isOpeFlag, opeLeft, opeTop, isHomeClose} = this.state;
        return (

            <div className={"container-tag-view"} style={{height: React.$TAG_VIEW_PATH + 'px'}}>
                {/*<Scrollbars*/}
                {/*    autoHide*/}
                {/*    autoHideTimeout={1000}*/}
                {/*    autoHideDuration={200}*/}
                {/*    style={{width: 'calc(100wh - ' + React.$TAG_VIEW_OFFSET_WIDTH + 'px)'}}*/}
                {/*>*/}
                {this.props.TagViewData.map(item =>
                    <span key={item.key} className={"wrapper-tagView-item"} style={{'position': 'relative'}}>
                    <NavLink to={'/'+item.key} onContextMenu={(e) => this.navLinkContextItem(e, item)}
                             onClick={() => this.navLinkClickItem(item)}>
                        <span className={`tags-view-item ${currentPath === item.path ? 'enter-view' : 'leave-view'}`}
                        >
                        {
                            currentPath === item.path && (
                                <span className={"circle-active"}></span>
                            )
                        }
                            <span className={"ope-title"}>{item.meta ? item.meta.title : item.title}</span>
                    </span>
                    </NavLink>
                        {
                            currentPath === item.path && currentPath !== React.$ROUTER_BASE.replace('/','') && (
                                <span className={"ico-active"} onClick={() => {
                                    this.removeTagItem(item)
                                }}><Icon type="close" /></span>
                            )
                        }
                        {
                            item.key === isOpeFlag && (
                                <ul className={"wrapper-menu"} style={{top: opeTop + 'px', left: opeLeft + 'px'}}>
                                    {isHomeClose && <li onClick={() => {
                                        this.removeTagItem(item)
                                    }}>关闭</li>}
                                    <li onClick={() => {
                                        this.removeTagOther(item)
                                    }}>关闭其他
                                    </li>
                                    <li onClick={() => {
                                        this.removeTagAll(item)
                                    }}>关闭全部
                                    </li>
                                </ul>
                            )
                        }
                    </span>
                )}
                {/*</Scrollbars>*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        TagViewData: state.TagView
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeTagItem: (item, fun) => dispatch(removeTagItem(item, fun)),
        removeTagOther: (item, fun) => dispatch(removeTagOther(item, fun)),
        removeTagAll: (item, fun) => dispatch(removeTagAll(item, fun))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TagView)
