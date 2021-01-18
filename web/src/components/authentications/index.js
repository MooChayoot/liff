import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTION from '../../store/actions/action';
import { Row, Col, Button, Input, Menu } from 'antd';

import './index.css';
class Authentications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'login',
        };
    }



    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render() {
        const onRegister = () => {
            console.log('registeration');
            this.props.history.push('/registeration/');
        }
        const onLogin = () => {
            this.props.history.push('/user/profile/');
        }

        return (
            <div id="main-content">
                <Row className="navBar">
                    <Col span={24}>

                    </Col>
                </Row>

                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className="AuthBox">
                    <Menu.Item key="login" className="loginBox">
                        เข้าสู่ระบบ
                            </Menu.Item>

                    <Menu.Item key="register" className="loginBoxRight">
                        สมัครสมาชิก
                            </Menu.Item>
                </Menu>
                {this.state.current == 'login' ? (
                    <div>
                        <Row className="suggesstionFieldAlertBox20">
                            <Col span={24}>
                                <Input size="large" placeholder="หมายเลขโทรศัพท์ หรืออีเมล" />
                            </Col>
                        </Row>
                        <Row className="suggesstionFieldAlertBox20">
                            <Col span={24}>
                                <Input.Password placeholder="รหัสผ่าน" size="large" />
                            </Col>
                        </Row>
                        <Row className="suggesstionFieldAlertBox20">
                            <Col span={24} className="forgotpassword">
                                <Link to={'/'}>ลืมรหัสผ่าน</Link>
                            </Col>
                        </Row>
                        <Row className="suggesstionFieldAlertBox20">
                            <Col span={24}>
                                <Button block className="btnConfirmReserved" onClick={onLogin}>เข้าสู่ระบบ</Button>
                            </Col>
                        </Row>
                    </div>
                ) : (
                        <div>
                            <Row className="suggesstionFieldAlertBox20">
                                <Col span={24}>
                                    <Input size="large" placeholder="ชื่อผู้ใช้งาน" />
                                </Col>
                            </Row>
                            <Row className="suggesstionFieldAlertBox20">
                                <Col span={24}>
                                    <Input placeholder="หมายเลขโทรศัพท์ หรืออีเมล" size="large" />
                                </Col>
                            </Row>
                            <Row className="suggesstionFieldAlertBox20">
                                <Col span={24}>
                                    <Button block className="btnConfirmReserved" onClick={onRegister}>สมัครสมาชิก</Button>
                                </Col>
                            </Row>
                        </div>

                    )}
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentications);