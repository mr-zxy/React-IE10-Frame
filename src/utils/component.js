import React from 'react';
import {Modal, message,Icon} from 'antd';
const { confirm } = Modal;

/**
 * 封装confirm全局提示
 * @param title ReactNode
 * @param content ReactNode
 * @param okCallBack func
 * @param cancelCallBack func
 * @param okText   ReactNode
 * @param cancelText   ReactNode
 * @param icon ReactNode
 * @returns {{destroy: () => void; update: (configUpdate: ConfigUpdate) => void}}
 */
React.$confirm = (title,content,okCallBack=()=>{console.log("确定")},cancelCallBack=()=>{console.log("取消")},
                  okText="确定",cancelText="取消",icon=<Icon type="exclamation" />)=> confirm({
    icon: icon,
    title: title,
    content: content,
    okText: okText,
    cancelText:cancelText,
    onOk: okCallBack,
    onCancel: cancelCallBack,
});

/**
 * 封装Message全局提示
 * @param type string
 * @param title ReactNode
 * @param content ReactNode
 * @param duration second
 * @param closeCallBack func
 * @returns {MessageType|*}
 */
React.$message = (type,title,content,duration=3,closeCallBack=()=>{})=> {
    if(type==='success' || type==='warn' || type==='info' || type==='error' || type==='loading'){
        return message[type]({
            title: title,
            content: content,
            duration: duration,
            onClose: closeCallBack
        });
    }else{
        return message.error({
            content: "type类型只能是success、info、error、warn、loading",
            duration: 5
        });
    }
}