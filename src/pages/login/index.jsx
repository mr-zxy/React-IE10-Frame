import React, {Component} from "react";
import './login.scss';
import {Button, Checkbox, Col, Form, Icon, Input, Row} from 'antd';
import SvgIcon from '@/components/svgIcon'
import {permissionAuth} from '@/models/permission-Hoc'
import {GET_AUTH_CODE,MOCK_GET_AUTH_CODE} from '@/api/login'
import {SUCCESS_CODE} from '@/api/code'
import {connect} from 'react-redux'
import {actionLogin} from '@/redux/actions/login'
import {injectUnount} from '@/models/injectUnount-Hoc'
import {removeLoginUser, setLoginUser} from '@/utils/storageUtil'

@permissionAuth()
@injectUnount
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authImgUrl: '',
            iconLoading: false,
            loginForm: {
                username: JSON.parse(localStorage.getItem(React.$LOGIN_USERNAME)) || '',
                password: JSON.parse(localStorage.getItem(React.$LOGIN_PASSWORD)) || '',
                code: '',
                uuid: ''
            }
        }
    }

    UNSAFE_componentWillMount() {
        this.getAuthCode()
    }

    /**
     * 获取验证码
     */
    getAuthCode = () => {
        MOCK_GET_AUTH_CODE().then(res => {
            if (res.code === SUCCESS_CODE) {
                let {img, uuid} = res;
                this.setState({
                    authImgUrl: img,
                    loginForm: Object.assign({}, this.state.loginForm, {uuid: uuid})
                })
            } else {
                console.log(res,'验证码获取失败')
            }
        })
    }
    /**
     * 登录
     */
    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {code, password: loginPassword, username: loginUsername, remember} = values;
                this.setState({
                    iconLoading: true,
                    loginForm: Object.assign({}, this.state.loginForm, {
                        code: code,
                        password: loginPassword,
                        username: loginUsername
                    })
                }, () => {
                    let {loginForm} = this.state;
                    this.setRemember(remember, loginUsername, loginPassword)
                    this.props.handleLogin(loginForm, this.resetForm, this)
                })
            }
        });
        /*
        * loginInfo.username=encrypt(loginForm.username)
          loginInfo.password=encrypt(loginForm.password)
        * */
    }
    /**
     * 记住密码储存在localStorage
     * @param userName
     * @param passWord
     */
    setRemember = (isRem, userName, passWord) => {
        if (isRem) {
            setLoginUser(userName, passWord)
        } else {
            removeLoginUser(userName, passWord)
        }
    }
    /**
     * 登录失败重试表单/按钮
     */
    resetForm = () => {
        this.getAuthCode();
        this.setState({
            iconLoading: false
        })
    }

    render() {
        let {authImgUrl, loginForm, iconLoading} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <section className="login-content">
                    <h3 className="content-title">React-IE10-Frame</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onSubmit={this.handleLogin}
                    >
                        <Form.Item>
                            {getFieldDecorator('username', {
                                initialValue: loginForm.username,
                                rules: [{required: true, message: '请输入账户!'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="请输入账户"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                initialValue: loginForm.password,
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('code', {
                                rules: [{required: true, message: '请输入验证码!'}],
                            })(
                                <Row className={"authCode"}>
                                    <Col span={14}>
                                        <Input
                                            prefix={<SvgIcon icon={'validCode'} className={'login-icon'}
                                                             isload={'false'}/>}
                                            type="text"
                                            placeholder="验证码"
                                        />
                                    </Col>
                                    <Col span={6} push={4} style={{height: '30px'}} onClick={() => this.getAuthCode()}>
                                        <img src={'data:image/gif;base64,' + authImgUrl}/>
                                    </Col>
                                </Row>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(<Checkbox>记住密码</Checkbox>)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    loading={iconLoading}>
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (form, resetForm, _self) => dispatch(actionLogin(form)).then(type => {
            type === SUCCESS_CODE ? _self.props.history.push(React.$ROUTER_BASE) : resetForm()
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({name: 'login'})(Login))

