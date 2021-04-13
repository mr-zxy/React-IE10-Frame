const express=require('express');
const app=express();
// 获取验证码
app.get('/code',function (req,res) {
    res.send({
        "code": 500,
        "msg": "验证码获取失败，但可以正常登录",
    })
})
// 登录接口
app.post('/auth/login',function (req,res) {
    res.send({
        "code": 200,
        "msg": null,
        "data": {"access_token": "d77ca1d5", "expires_in": 43200}
    })
})
// 获取用户信息
app.get('/system/user/getInfo',function (req,res) {
    res.send({
        "msg": "操作成功", "code": 200, "permissions": ["*:*:*"], "roles": ["admin"], "user": {
            "searchValue": null,
            "createBy": "admin",
            "createTime": "2018-03-16 11:33:00",
            "updateBy": null,
            "updateTime": null,
            "remark": "管理员",
            "params": {},
            "userId": 1,
            "deptId": 103,
            "userName": "admin",
            "nickName": "管理员",
            "email": "admin@163.com",
            "phonenumber": "15888888888",
            "sex": "0",
            "avatar": "2",
            "password": "123",
            "salt": null,
            "status": "0",
            "delFlag": "0",
            "loginIp": "127.0.0.1",
            "loginDate": "2018-03-16T11:33:00.000+08:00",
            "dept": {
                "searchValue": null,
                "createBy": null,
                "createTime": null,
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "deptId": 103,
                "deptCode": null,
                "parentId": 101,
                "parentDeptCode": null,
                "ancestors": null,
                "deptName": "研发部门",
                "deptType": null,
                "deptTypeName": null,
                "orderNum": "1",
                "leader": "admin",
                "phone": null,
                "email": null,
                "status": "0",
                "delFlag": null,
                "provinceCode": null,
                "provinceName": null,
                "cityCode": null,
                "cityName": null,
                "areaCode": null,
                "areaName": null,
                "addr": null,
                "parentName": null,
                "children": [],
                "isAddressbook": null
            },
            "roles": [{
                "searchValue": null,
                "createBy": null,
                "createTime": null,
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "roleId": 1,
                "roleName": "超级管理员",
                "roleKey": "admin",
                "roleSort": "1",
                "dataScope": "1",
                "menuCheckStrictly": false,
                "deptCheckStrictly": false,
                "status": "0",
                "delFlag": null,
                "flag": false,
                "menuIds": null,
                "deptIds": null,
                "admin": true
            }],
            "roleIds": null,
            "postIds": null,
            "admin": true
        }
    })
})
// 获取路由信息
app.get('/system/menu/getRouters',function (req,res) {
    res.send({
        "msg": "操作成功", "code": 200, "data": [{
            "name": "System",
            "path": "/system",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {"title": "系统管理", "icon": "system", "noCache": false},
            "children": [{
                "name": "Role",
                "path": "role",
                "hidden": false,
                "component": "role/index",
                "meta": {"title": "角色管理", "icon": "peoples", "noCache": false}
            }]
        }]
    })
})

app.listen('2323',()=>console.log('服务启动成功！！！'))
