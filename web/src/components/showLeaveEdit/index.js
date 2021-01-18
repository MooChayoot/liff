import React, { Component } from "react";
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import styled from "styled-components";
import "antd/dist/antd.css";
import "./showLeaveEdit.css";
import {
  Row,
  Col,
  // Card,
  // Modal,
  // Menu,
  // Dropdown,
  Button,
  Icon,
  // Select,
  Input,
  Upload,
  // DatePicker
} from "antd";

const { TextArea } = Input;
// const { Option } = Select;
// const { Meta } = Card;

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

class showLeaveEdit extends Component {
  state = {
    loading: true
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  // Upload
  state = {
    fileList: [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: "http://www.baidu.com/xxx.png"
      }
    ]
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
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
    // Upload
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true
    };

    return (
      <div className="all">
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
              style={{ cursor: 'pointer', color: '#fff', padding: '15px', fontSize: '20px'}}
            ></i>
          </Col>
          <Col
            span={18}
            style={{
              textAlign: 'center',
              color: '#fff',
              padding: '10px',
              fontSize: '18px'
            }}
          >
            ลางาน
          </Col>
          <Col span={3} >
              <Icon type="menu"
               onClick={() => this.listMenushow()}
               style={{
                cursor: 'pointer',
                color: '#fff',
                float:'right',
                padding:'15px',
                fontSize: '20px'
                }} />
            </Col>
        </Row>
        
        {/* Menu */}
        {this.state.listMenu ? (
          <div className="listMenu" style={{position: 'absolute', width: '100%', boxShadow: '5px 10px 15px #707070'}}>
            <div className="ul" style={{
                width: '100%',
                background: '#405EA5',
                color: '#fff',
                fontFamily: 'Sukhumvit Set, sans-serif'
            }}>
              <Link to="/home">
                <li style={{borderTop:' 1px solid #707070'}}> วันลาคงเหลือ </li>
              </Link>
              <Link to="/saveLeave">
                <li style={{borderTop:' 1px solid #707070'}}>
                  {" "}
                  ลางาน
                  <Icon type="right" style={{ float: "right" }} />{" "}
                </li>
              </Link>
              <Link to="/proFile">
                <li style={{borderTop:' 1px solid #707070'}}>
                  {" "}
                  บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
                </li>
              </Link>
            </div>
          </div>
        ) : null}


        <div className="in-all">
          {/* Row1 */}
          <Row
            style={{
              width: "94%",
              margin: "20px auto"
            }}
          >
            <Col span={12}>
              <h3 style={{ fontSize: "15px", marginTop: "10px" }}>
                เลือกประเภทการลา:
              </h3>
              <div>
                <Input
                  disabled
                  size="large"
                  placeholder="ลาป่วย"
                  style={{ width: "130px", fontSize: "15px" }}
                />
              </div>
            </Col>

            <Col span={12}>
              <h3
                style={{
                  fontSize: "15px",
                  marginLeft: "5px",
                  marginTop: "10px"
                }}
              >
                วันลาคงเหลือ:
              </h3>
              <div>
                <Input
                  disabled
                  size="large"
                  placeholder="30 วัน"
                  style={{
                    fontSize: "15px",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    width: "130px",
                    marginLeft: "5px"
                  }}
                />
              </div>
            </Col>
          </Row>

          {/* Row2 */}
          <Row
            style={{
              width: "94%",
              margin: "auto",
              marginTop: "-15px"
            }}
          >
            <Col span={12}>
              <h3 style={{ fontSize: "15px", marginLeft: "" }}>
                เลือกวันที่ต้องการลา:
              </h3>
              <div>
                <Input
                  disabled
                  size="large"
                  placeholder="02/05/2020"
                  style={{ fontSize: "15px", width: "130px", marginLeft: "" }}
                />
              </div>
            </Col>
            <Col span={12}>
              <h3 style={{ fontSize: "15px", marginLeft: "5px" }}>
                เลือกช่วงเวลา:
              </h3>
              <div>
                <Input
                  disabled
                  size="large"
                  placeholder="ครึ่งเช้า"
                  style={{
                    fontSize: "15px",
                    width: "130px",
                    marginLeft: "5px"
                  }}
                />
              </div>
            </Col>
          </Row>

          {/* Row3 */}
          <Row
            style={{
              width: "94%",
              margin: "auto",
              marginTop: "5px"
            }}
          >
            <Col span={12}>
              <h3 style={{ fontSize: "15px", marginLeft: "5px" }}>
                ลาถึงวันที่:
              </h3>
              <div>
                <Input
                  disabled
                  size="large"
                  placeholder="02/05/2020"
                  style={{ fontSize: "15px", width: "130px" }}
                />
              </div>
            </Col>
            <Col span={12}>
              <h3 style={{ fontSize: "15px", marginLeft: "5px" }}>
                เลือกช่วงเวลา:
              </h3>
              <div>
                <Input
                  disabled
                  size="large"
                  placeholder="-"
                  style={{
                    fontSize: "15px",
                    width: "130px",
                    marginLeft: "5px"
                  }}
                />
              </div>
            </Col>
          </Row>

          {/* Row4 */}
          <Row
            style={{
              width: "94%",
              margin: "auto",
              marginTop: "5px"
            }}
          >
            <Col span={12}>
              <h3 style={{ fontSize: "15px", marginLeft: "5px" }}>
                จำนวนวันลา:
              </h3>
              <div>
                <Input
                  disabled
                  size="large"
                  placeholder="1 วัน"
                  style={{
                    fontSize: "15px",
                    width: "130px",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    marginLeft: ""
                  }}
                />
              </div>
            </Col>
            <Col span={12}></Col>
          </Row>

          {/* Row5 */}
          <Row
            style={{
              width: "90%",
              margin: "auto",
              marginTop: "5px"
            }}
          >
            <Col span={24}>
              <h3 style={{ fontSize: "15px", marginLeft: "5px" }}>
                หมายเหตุการลา:
              </h3>
              <div>
                <TextArea
                  disabled
                  rows={4}
                  placeholder="ทดสอบระบบการลาของพนักงาน"
                  style={{ fontSize: "15px", width: "300px", height: "100px" }}
                />
              </div>
            </Col>
          </Row>

          {/* Row6 */}
          <Row
            style={{
              width: "94%",
              margin: "auto",
              marginTop: "5px"
            }}
          >
            <Col span={24}>
              <h3 style={{ fontSize: "15px", marginLeft: "5px" }}>
                ไฟล์แนบ:{" "}
                <a
                  style={{
                    fontSize: "12px",
                    marginLeft: "5px",
                    color: "#555555"
                  }}
                >
                  * สามารถแก้ไขไฟล์แนบทีหลังได้ *
                </a>
              </h3>
              <div></div>
            </Col>
          </Row>

          {/* Row7 */}
          <Row
            style={{
              width: "90%",
              margin: "auto",
              marginTop: "5px"
            }}
          >
            <Col span={24}>
              <Upload
                {...props}
                fileList={this.state.fileList}
                style={{
                  color: '#000000',
                  fontWeight: 'bold',
                  padding: '10px'
                }}
              >
                <Button >
                  <Icon type="upload" /> เลือกไฟล์
                </Button>
              </Upload>
              <br />
            </Col>
          </Row>
        </div>
        {/* in-all */}

        {/* Row8 */}
        <Row
          style={{
            width: "90%",
            margin: "auto",
            marginTop: "10px",
            background: "#F0F0F0"
          }}
        >
          <div className="">
            <Col span={12}>
              <div
                style={{ float: "right", marginRight: "-5px", padding: "10px" }}
              >
                <Link to="/homeFollow">
                  <Button
                    style={{ width: "140px", height: "45px", color: "#405EA5" }}
                  >
                    ยกเลิก
                  </Button>
                </Link>
              </div>
            </Col>
            
            <Col span={12}>
              <div
                style={{ float: "left", marginLeft: "-5px", padding: "10px" }}
              >
                <Button
                  style={{
                    background: "#405EA5",
                    width: "140px",
                    height: "45px",
                    color: "#fff"
                  }}
                >
                  ยืนยัน
                </Button>
                <br />
              </div>
            </Col>
          </div>
        </Row>
      </div> // all
    );
  }
}
export default showLeaveEdit;
