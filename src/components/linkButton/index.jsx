import React from 'react';
import { Button,Icon } from 'antd';
import './index.scss';
const BUTTON_SIZE='default';
const BUTTON_TYPE='primary';
const BUTTON_FORM_SIZE='default';
const BUTTON_ADD_COLOR='rgb(24,144,255)'
const BUTTON_EDIT_COLOR='rgb(137,231,179)'
const BUTTON_REMOVE_COLOR='rgb(255,164,164)'
const BUTTON_EXPORT_COLOR='rgb(255,164,0)'
const BUTTON_IMPORT_COLOR='rgb(144, 147, 153)'
const BUTTON_LOG_COLOR='rgb(144, 147, 153)'
const BUTTON_CLAERCACHE_COLOR='rgb(255,73,73)'
const TEXT_EDIT_COLOR='rgb(64,158,255)'
const TEXT_REMOVE_COLOR='rgb(64,158,255)'
const BUTTON_FORM_SELECT_COLOR='rgb(72,209,204)'
// 链接
export const LinkButton=(props)=>{
    return <button {...props} className="link-button">{props.children}</button>
}
// 新增
export const ButtonAdd=(props)=>{
    // icon='Download
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{"backgroundColor": BUTTON_ADD_COLOR}} className={'globalButtonBackground'} icon="plus">{props.children?props.children:'新增'}</Button>
}
// 修改
export const ButtonEdit=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{"backgroundColor": BUTTON_EDIT_COLOR}} className={'globalButtonBackground'} icon='edit'>{props.children?props.children:'修改'}</Button>
}
// 删除
export const ButtonRemove=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{'color':'#fff',"backgroundColor": BUTTON_REMOVE_COLOR}} className={'globalButtonBackground'} icon='delete'>{props.children?props.children:'删除'}</Button>
}
// 导出
export const ButtonExport=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{ "backgroundColor": BUTTON_EXPORT_COLOR}} className={'globalButtonBackground'} icon='download'>{props.children?props.children:'导出'}</Button>
}
// 导入
export const ButtonImport=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{'color':'#fff',"backgroundColor": BUTTON_IMPORT_COLOR}} className={'globalButtonBackground'} icon='upload'>{props.children?props.children:'导入'}</Button>
}
// 清理缓存
export const ButtonClearCache=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{"backgroundColor": BUTTON_CLAERCACHE_COLOR}} className={'globalButtonBackground'} icon='reload'>{props.children?props.children:'清理缓存'}</Button>
}
// 清空
export const ButtonClear=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{"backgroundColor": BUTTON_CLAERCACHE_COLOR}} className={'globalButtonBackground'} icon='delete'>{props.children?props.children:'清空'}</Button>
}
// 日志
export const ButtonLog=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{"backgroundColor": BUTTON_LOG_COLOR}} className={'globalButtonBackground'} icon='hdd'>{props.children?props.children:'日志'}</Button>
}
// 搜索
export const ButtonSearch=(props)=>{
    return <Button {...props} className={props.className?props.className:'ButtonFloatRight'} size={BUTTON_SIZE} icon='search' shape="circle"></Button>
}
// 刷新
export const ButtonRefresh=(props)=>{
    return <Button  {...props} className={props.className?props.className:'ButtonFloatRight'} size={BUTTON_SIZE} shape="circle"><Icon type="sync" /></Button>
}
// 生成
export const ButtonCreate=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_SIZE} style={{"backgroundColor": BUTTON_ADD_COLOR}} className={'globalButtonBackground'} icon='download'>{props.children?props.children:'生成'}</Button>
}
//搜索
export const ButtonSearchForm=(props)=>{
    return <Button {...props} type={BUTTON_TYPE} size={BUTTON_FORM_SIZE} style={{"backgroundColor": BUTTON_FORM_SELECT_COLOR}} className={'globalButtonBackground'} icon='search'>{props.children?props.children:'搜索'}</Button>
}
//重置
export const ButtonRefreshForm=(props)=>{
    return <Button {...props} size={BUTTON_FORM_SIZE}  className={'globalButtonBackground'} icon='sync'>{props.children?props.children:'重置'}</Button>
}




// 修改
export const TextEdit=(props)=>{
    return <span {...props} style={{"color": TEXT_EDIT_COLOR}} className={'globalButtonTextColor'}><Icon type="edit" />{props.children?props.children:'修改'}</span>
}
// 删除
export const TextRemove=(props)=>{
    return <span {...props} style={props.style?props.style:{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="delete" />{props.children?props.children:'删除'}</span>
}
// 重置
export const TextRefresh=(props)=>{
    return <span {...props} style={props.style?props.style:{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="key" />{props.children?props.children:'重置'}</span>
}
// 数据权限
export const DataPermission=(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="check-circle" />{props.children?props.children:'数据权限'}</span>
}
// 新增
export const TextAdd=(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="plus" />{props.children?props.children:'新增'}</span>
}
// 详情
export const TextDetails=(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="eye" />{props.children?props.children:'详情'}</span>
}
// 预览
export const TextPreview=(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="eye" />{props.children?props.children:'预览'}</span>
}
// 强退
export const TextStrongBack=(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="delete" />{props.children?props.children:'强退'}</span>
}
// 执行一次
export const TextExecuteOnce=(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="caret-right" />{props.children?props.children:'执行一次'}</span>
}
// 同步
export const TextSyn =(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="sync" />{props.children?props.children:'同步'}</span>
}
// 生成代码
export const TextCodeGen =(props)=>{
    return <span {...props} style={{"color": TEXT_REMOVE_COLOR}} className={'globalButtonTextColor'}><Icon type="download" />{props.children?props.children:'生成代码'}</span>
}
