import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./adViewProfile.css";
import "antd/dist/antd.css";
import {
  Row,
  Col,
  Avatar,
  Button,
  Input,
  // Select,
  Icon,
  Modal
} from "antd";

// const { Option } = Select;
// const InputGroup = Input.Group;

const Avatars = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class adViewProfile extends Component {
  //Menu
  constructor() {
    super();
    this.state = {
      listMenu: false,
      dataSource: []
    };
  }
  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
  //Menu
 
  render() {
    const confirm = () => {
        Modal.confirm({
          title: "แจ้งเตือน ",
          content: (
            <div>
              <p style={{ fontWeight: "900" }}>คุณต้องการลบ บัญชีนี้ ใช่หรือไม่</p>
              <p style={{ fontSize: "14px", color: "#9D9D9D" }}>
              กด OK เพื่อยืนยัน การลบ
              </p>
            </div>
          ),
          onOk() {
            window.location.href = "memberList"
          }
        });
      };

      
    return (
      <div className="all-proFile">
        <header>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
            rel="stylesheet"
          />
        </header>

        <Row
          className=""
          style={{ background: "#405EA5", position: "relative" }}
        >
          <Col span={3}>
            <Link to="/memberList">
              <i
                className="fas fa-arrow-left"
                style={{ cursor: 'pointer', color: '#fff', padding: '15px',fontSize: '20px' }}
              ></i>
            </Link>
          </Col>
          <Col
            span={18}
            style={{
              textAlign: "center",
              color: "#fff",
              padding: "10px",
              fontSize: "18px"
            }}
          >
            จั๋นติ๊บ วงไฮโล
          </Col>
          <Col span={3}>
            <Icon
              type="menu"
              onClick={() => this.listMenushow()}
              style={{
                cursor: 'pointer',
                color: '#fff',
                float: 'right',
                padding: '15px',
                fontSize: '20px'
              }}
            />
          </Col>
        </Row>

        {/* Menu */}
        {this.state.listMenu ? (
          <div
            className="listMenu"
            style={{
              position: 'absolute',
              width: '100%',
              boxShadow: '5px 10px 15px #707070'
            }}
          >
            <div
              className="ul"
              style={{
                width: "100%",
                background: "#405EA5",
                color: "#fff",
                fontFamily: "Sukhumvit Set, sans-serif"
              }}
            >
              <Link to="/">
                <li style={{ borderTop: " 1px solid #707070" }}> วันลาคงเหลือ </li>
              </Link>
              <Link to="/">
                <li style={{ borderTop: " 1px solid #707070" }}>
                  {" "}
                  ลางาน
                  <Icon type="right" style={{ float: "right" }} />{" "}
                </li>
              </Link>
              <Link to="/">
                <li style={{ borderTop: " 1px solid #707070" }}>
                  {" "}
                  บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
                </li>
              </Link>
              <Link to="/">
                <li style={{ borderTop: " 1px solid #707070" }}>
                  {" "}
                  ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                </li>
              </Link>
            </div>
          </div>
        ) : null}


        <div className="in-allproFile">
          <Avatars style={{ marginTop: "20px" }}>
            <Avatar
              size={100}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </Avatars>

          <div style={{ marginTop: "20px" }}>
            <Input
              disabled
              prefix="ข้อมูลส่วนตัว :"
              suffix={<Link to="/adEditProfile">แก้ไข</Link>}
            />
            <Input
              disabled
              size="large"
              prefix="คำนำหน้า :"
              placeholder="สมพงษ์"
            />
            <Input disabled size="large" prefix="ชื่อ :" placeholder="นาย" />
            <Input
              disabled
              size="large"
              prefix="นามสกุล :"
              placeholder="จันทร์โอชา"
            />
            <Input
              disabled
              size="large"
              prefix="ชื่อเล่น :"
              placeholder="ตู่"
            />
            <Input
              disabled
              size="large"
              prefix="เบอร์โทร :"
              placeholder="089-6969696"
              type="text"
            />
            <Input
              disabled
              size="large"
              prefix="ตำแหน่ง :"
              placeholder="Programmer"
            />
            <Input
              disabled
              size="large"
              prefix="บริษัท :"
              placeholder="Twin Synergy"
            />
            <Input
              disabled
              size="large"
              prefix="สถานะ :"
              placeholder="Hr"
            />
          </div>

          <Button 
            onClick={confirm}
            style={{
                color:'red',
                border:'1px solid red',
                display:'block',
                margin:'20px auto',
                width:'160px',
                height:'45px',
                borderRadius:'1rem',
            }}
          >ลบบัญชี</Button>
        </div>
      </div>
    );
  }
}
export default adViewProfile;
