import {HAND_TOGGLE_COLLAPSED} from "../action-types";

export const setToggleCollapsed = (params) => {
    return {type: HAND_TOGGLE_COLLAPSED, data: params}
}
