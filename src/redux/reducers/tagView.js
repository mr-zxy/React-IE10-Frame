import {REMOVE_TAG_All, REMOVE_TAG_ITEM, REMOVE_TAG_OTHER, TAG_VIEW_PATH} from "../action-types";
import React from 'react'
import config from '@/config/config'

let ArrTagView = []
const TagViewPath = (state = ArrTagView, action) => {
    /**
     * 验证数组key 是否包含初始要加载的页面(首页) 如果包含return 否则添加进去
     * @param routerTagView 数组 *必须包含key
     * @returns {boolean}
     */
    let isRouterRedirect = (arrRouterTagView) => {
        if (arrRouterTagView.some(item => item.key === React.$ROUTER_BASE)) {
            return arrRouterTagView;
        } else {
            let routerContent = config.routers.filter(item => item.key === React.$ROUTER_BASE);
            arrRouterTagView.unshift(...routerContent)
            return arrRouterTagView
        }
    }
    switch (action.type) {
        case TAG_VIEW_PATH: {
            let ArrTagView = [].concat(state)
            if (action.data) {
                ArrTagView.push(action.data)
            }
            let routerTagView = [...new Set(ArrTagView)];
            return isRouterRedirect(routerTagView);
        }
        case REMOVE_TAG_ITEM:
            var ArrTagView = [].concat(state)
            ArrTagView.filter((item, index) => {
                if (item.key == action.data.data.key) {
                    ArrTagView.splice(index, 1)
                }
            })
            action.data.fn(ArrTagView)
            return ArrTagView
        case REMOVE_TAG_OTHER: {
            let ArrTagView = [].concat(state)
            ArrTagView = ArrTagView.filter(item => item.key === action.data.data.key)
            action.data.fn()
            return isRouterRedirect(ArrTagView)
        }
        case REMOVE_TAG_All: {
            let ArrTagView = []
            isRouterRedirect(ArrTagView)
            action.data.fn(ArrTagView)
            return ArrTagView
        }
        default:
            return state;
    }
}

export default TagViewPath;



