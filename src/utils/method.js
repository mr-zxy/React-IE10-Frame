import React from 'react';

/**
 * 判断是否为空 字符串、对象、数组
 * @param data
 * @returns {boolean}  true 空  false 非空
 */
React.$isEmpty = (data) => {
    if (data == null || data == undefined || data == "" || data == "undefined" || data == "null") {
        return true;
    }
    if (Array.prototype.isPrototypeOf(data) && data.length === 0) {
        return true;
    }
    if (Object.prototype.isPrototypeOf(data) && Object.keys(data).length === 0) {
        return true;
    }
    try {
        return this.isEmpty(data.trim())
    } catch (e) {
    }
    return false
}

/**
 * 获取时间
 * @param time 当前时间戳
 * @param type date  day  time
 * @param sep
 * @returns {string}
 */
React.$formatDate = (time, type = 'date', sep = '-') => {
    if (!time) {
        return '';
    }
    let date = new Date(time);
    let dayString = date.getFullYear() + sep + (date.getMonth() + 1) + sep + date.getDate();
    let timeString = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (type === 'date') {
        return dayString + " " + timeString;
    } else if (type === 'day') {
        return dayString;
    } else if (type === 'time') {
        return timeString;
    } else {
        return dayString + " " + timeString;
    }
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
React.$handleTree = (data, id, parentId, children, rootId) => {
    id = id || 'id'
    parentId = parentId || 'parentId'
    children = children || 'children'
    rootId = rootId || Math.min.apply(Math, data.map(item => {
        return item[parentId]
    })) || 0
    //对源数据深度克隆
    const cloneData = JSON.parse(JSON.stringify(data))
    //循环所有项
    const treeData = cloneData.filter(father => {
        father.title=father.menuName;
        father.key=father.menuId;
        father.value=father.menuId;
        let branchArr = cloneData.filter(child => {
            //返回每一项的子级数组
            return father[id] === child[parentId]
        });
        if (branchArr.length > 0) {
            father.children = branchArr
        } else {
            father.children = ''
        }
        //返回第一层
        return father[parentId] === rootId;
    });
    return treeData != '' ? treeData : data;
}

// 日期格式化
React.$parseTime = (time, pattern) => {
    if (!time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a.less') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

  /**
   * 参数处理
   * @param {*} params  参数
   */
export function tansParams(params) {
	let result = ''
	Object.keys(params).forEach((key) => {
		if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
			result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
		}
	})
	return result
}
/**
 * 给返回的数据加key
 * */
export function addKey(val) {
    val.forEach(item => {
        const map = data => {
            data.key = data.id;
            data.title = data.label;
            data.children && data.children.forEach(child => map(child));
        }
        map(item);
    })
    return val
}

// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return true;
		}
	})
	return actions.join('');
}
