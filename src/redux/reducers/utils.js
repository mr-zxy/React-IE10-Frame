import {HAND_TOGGLE_COLLAPSED} from "../action-types";

let utilsFlag = {
    collapsed: false
}
const HandToggleCollapsed = (state = utilsFlag, action) => {
    switch (action.type) {
        // 左侧导航展开收起
        case HAND_TOGGLE_COLLAPSED:
            state['collapsed'] = action.data
            return {...state};
        default:
            return state
    }
}
export default HandToggleCollapsed
