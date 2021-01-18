import React, { Component } from "react";
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import back from "./image/back.png";
import "antd/dist/antd.css";
import "./homeFollow.css";
import { Row, Col, Avatar, Menu, Card, Icon, Tag, Modal } from "antd";

const confirm = () => {
  Modal.confirm({
    title: "แจ้งเตือน ",
    content: (
      <div>
        <p style={{ fontWeight: "900" }}>คุณต้องการยกเลิก การลา ใช่หรือไม่ ?</p>
        <p style={{ fontSize: "14px", color: "#9D9D9D" }}>
          กด OK เพื่อยืนยัน ยกเลิกการลา{" "}
        </p>
      </div>
    ),
    onOk() {}
  });
};


const Avatars = styled.div`
  width: 100%;
  height: 15vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class homefollow extends Component {
  state = {
    loading: true
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  //Menu
  constructor() {
    super();
    this.state = {
      listMenu: false
    };
  }
  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
  //Menu

  render() {
    const { size } = this.state;
    return (
      <div className="all-followhome">
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
            <i
              className="fas fa-arrow-left"
              style={{
                cursor: "pointer",
                color: "#fff",
                padding: "15px",
                fontSize: "20px"
              }}
            ></i>
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
            วันลาคงเหลือ
          </Col>
          <Col span={3}>
            <Icon
              type="menu"
              onClick={() => this.listMenushow()}
              style={{
                cursor: "pointer",
                color: "#fff",
                float: "right",
                padding: "15px",
                fontSize: "20px"
              }}
            />
          </Col>
        </Row>

        {/* Menu */}
        {this.state.listMenu ? (
          <div
            className="listMenu"
            style={{
              position: "absolute",
              width: "100%",
              boxShadow: "5px 10px 15px #707070"
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
              <Link to="/home">
                <li style={{ borderTop: " 1px solid #707070" }}> วันลาคงเหลือ </li>
              </Link>
              <Link to="/saveLeave">
                <li style={{ borderTop: " 1px solid #707070" }}>
                  {" "}
                  ลางาน
                  <Icon type="right" style={{ float: "right" }} />{" "}
                </li>
              </Link>
              <Link to="/proFile">
                <li style={{ borderTop: " 1px solid #707070" }}>
                  {" "}
                  บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
                </li>
              </Link>
            </div>
          </div>
        ) : null}

        <div className="in-allhomefollow">
          <Avatars style={{ marginTop: "20px" }}>
            <Avatar
              size={100}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </Avatars>
          <h3
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontWeight: "700",
              fontSize: "18px"
            }}
          >
            {" "}
            สมพงษ์ จันทร์โอชา{" "}
          </h3>
          <Menu
            style={{
              width: "95%",
              padding: "10px",
              margin: "25px auto 0",
              borderRadius: "0.4rem",
              fontSize: "18px"
            }}
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item
              key="sumday"
              style={{
                width: "50%",
                textAlign: "center",
                borderRight: "1px solid #F0F0F0",
                fontWeight: "500"
              }}
            >
              <Link to="/home"> วันลาคงเหลือ</Link>
            </Menu.Item>

            <Menu.Item
              key="follow"
              style={{ width: "50%", textAlign: "center", fontWeight: "500" }}
            >
              <Link to="/homefollow"> ติดตามอนุมัติ </Link>
            </Menu.Item>
          </Menu>
          <div className="box-1">
            <h3
              style={{
                width: "97%",
                margin: "auto",
                marginTop: "10px",
                fontSize: "18px",
                fontFamily: 'Sukhumvit Set", sans-serif'
              }}
            >
              คำขอที่กำลังดำเนินการรอ
            </h3>
            <Link to="/showLeave">
              <Card
                size="small"
                style={{ width: "100%", margin: "0px auto 0" }}
              >
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  ลาป่วย (0.5 วัน){" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  วันที่ลา : 17/05/2020 - 17/05/2020
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  เทสระบบการลาของพนักงาน
                </p>
                <Tag
                  color="#E38546"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "-80px",
                    fontSize: ""
                  }}
                >
                  รออนุมัติ
                </Tag>
                <div
                  className="border"
                  style={{
                    height: "10vh",
                    marginTop: "-90px",
                    position: "relative",
                    width: "25%",
                    float: "right",
                    borderLeft: "1px solid #EAEAEA"
                  }}
                >
                  <Link
                    to="#"
                    onClick={confirm}
                    style={{
                      float: "right",
                      paddingRight: "10px",
                      marginTop: "50px",
                      fontSize: "15px"
                    }}
                  >
                    ยกเลิก
                  </Link>
                </div>
              </Card>
            </Link>

            <Link to="/showLeave">
              <Card
                size="small"
                style={{ width: "100%", margin: "0px auto 0" }}
              >
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  ลาป่วย (0.5 วัน){" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  วันที่ลา : 17/05/2020 - 17/05/2020
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  เทสระบบการลาของพนักงาน
                </p>
                <Tag
                  color="#E38546"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "-80px",
                    fontSize: ""
                  }}
                >
                  รออนุมัติ
                </Tag>
                <div
                  className="border"
                  style={{
                    height: "10vh",
                    marginTop: "-90px",
                    position: "relative",
                    width: "25%",
                    float: "right",
                    borderLeft: "1px solid #EAEAEA"
                  }}
                >
                  <Link
                    to="#"
                    onClick={confirm}
                    style={{
                      float: "right",
                      paddingRight: "10px",
                      marginTop: "50px",
                      fontSize: "15px"
                    }}
                  >
                    ยกเลิก
                  </Link>
                </div>
              </Card>
            </Link>

            <Link to="/showLeave">
              <Card size="small" style={{ width: "100%", margin: "auto" }}>
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  ลาป่วย (0.5 วัน){" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  วันที่ลา : 17/05/2020 - 17/05/2020
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  เทสระบบการลาของพนักงาน
                </p>
                <Tag
                  color="#E38546"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "-80px",
                    fontSize: ""
                  }}
                >
                  รออนุมัติ
                </Tag>

                <div
                  className="border"
                  style={{
                    height: "10vh",
                    marginTop: "-90px",
                    position: "relative",
                    width: "25%",
                    float: "right",
                    borderLeft: "1px solid #EAEAEA"
                  }}
                >
                  <Link
                    to="#"
                    onClick={confirm}
                    style={{
                      float: "right",
                      paddingRight: "10px",
                      marginTop: "50px",
                      fontSize: "15px"
                    }}
                  >
                    ยกเลิก
                  </Link>
                </div>
              </Card>
            </Link>
          </div>{" "}
          {/* คำขอที่กำลังดำเนินการรอ */}
          <div className="box-2">
            <h3
              style={{
                width: "97%",
                margin: "auto",
                marginTop: "15px",
                fontSize: "18px",
                fontFamily: 'Sukhumvit Set", sans-serif'
              }}
            >
              ประวัติการลา
            </h3>
            <Link to="/showLeave">
              <Card
                size="small"
                style={{ width: "100%", margin: "5px auto 0" }}
              >
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  ลาป่วย (0.5 วัน){" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  วันที่ลา : 17/05/2020 - 17/05/2020
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  เทสระบบการลาของพนักงาน
                </p>
                <Tag
                  color="#34B23D"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "-50px",
                    fontSize: ""
                  }}
                >
                  อนุมัติ
                </Tag>
                <div
                  className="border"
                  style={{
                    height: "10vh",
                    marginTop: "-90px",
                    position: "relative",
                    width: "25%",
                    float: "right",
                    borderLeft: "1px solid #EAEAEA"
                  }}
                ></div>
              </Card>
            </Link>

            <Link to="/showLeave">
              <Card
                size="small"
                style={{ width: "100%", margin: "-25px auto" }}
              >
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  ลาป่วย (0.5 วัน){" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  วันที่ลา : 17/05/2020 - 17/05/2020
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  เทสระบบการลาของพนักงาน
                </p>
                <Tag
                  color="#34B23D"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "-50px",
                    fontSize: ""
                  }}
                >
                  อนุมัติ
                </Tag>
                <div
                  className="border"
                  style={{
                    height: "10vh",
                    marginTop: "-90px",
                    position: "relative",
                    width: "25%",
                    float: "right",
                    borderLeft: "1px solid #EAEAEA"
                  }}
                ></div>
              </Card>
            </Link>

            <Link to="/showLeave">
              <Card size="small" style={{ width: "100%", margin: "auto" }}>
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  {" "}
                  ลาป่วย (0.5 วัน){" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  {" "}
                  วันที่ลา : 17/05/2020 - 17/05/2020{" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  {" "}
                  เทสระบบการลาของพนักงาน{" "}
                </p>
                <Tag
                  color="#34B23D"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "-50px",
                    fontSize: ""
                  }}
                >
                  อนุมัติ
                </Tag>
                <div
                  className="border"
                  style={{
                    height: "10vh",
                    marginTop: "-90px",
                    position: "relative",
                    width: "25%",
                    float: "right",
                    borderLeft: "1px solid #EAEAEA"
                  }}
                ></div>
              </Card>
            </Link>
            <Link to="#">
              <Card
                size="small"
                style={{ width: "100%", margin: "-25px auto" }}
              >
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                  {" "}
                  ลาป่วย (0.5 วัน){" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  {" "}
                  วันที่ลา : 17/05/2020 - 17/05/2020{" "}
                </p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                  {" "}
                  เทสระบบการลาของพนักงาน{" "}
                </p>
                <Tag
                  color="#F70B1D"
                  style={{
                    float: "right",
                    fontSize: "20px",
                    marginTop: "-50px",
                    fontSize: ""
                  }}
                >
                  ไม่อนุมัติ
                </Tag>
                <div
                  className="border"
                  style={{
                    height: "10vh",
                    marginTop: "-90px",
                    position: "relative",
                    width: "25%",
                    float: "right",
                    borderLeft: "1px solid #EAEAEA"
                  }}
                ></div>
              </Card>
            </Link>
          </div>{" "}
          {/* ประวัติการลา */}
        </div>
      </div>
    );
  }
}
export default homefollow;
