import ajax,{METHOD_DELETE, METHOD_PUT, METHOD_POST} from '@/api/ajax';
// 获取路由 {}
export const MOCK_GET_ROUTERS = (data) => ajax("system/menu/getRouters");


