import { TAG_VIEW_PATH,REMOVE_TAG_ITEM,REMOVE_TAG_OTHER,REMOVE_TAG_All} from "../action-types";

export const tagViewActions = (path) => {
    return {type: TAG_VIEW_PATH,data: path}
}
export const removeTagItem=(params,fun)=>{
    return {type: REMOVE_TAG_ITEM,data: {data:params,fn:fun}}
}
export const removeTagOther=(params,fun)=>{
    return {type: REMOVE_TAG_OTHER,data: {data:params,fn:fun}}
}
export const removeTagAll=(params,fun)=>{
    return {type: REMOVE_TAG_All,data: {data:params,fn:fun}}
}