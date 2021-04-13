import ajax, {METHOD_DELETE, METHOD_PUT, METHOD_POST} from '@/api/ajax';

// mock 数据
export const MOCK_GET_AUTH_CODE = (data) => ajax("code");
export const MOCK_LOGIN_AJAX = (data) => ajax("auth/login",data,METHOD_POST);
export const MOCK_GET_USER_INFO = (data) => ajax("system/user/getInfo",data);
