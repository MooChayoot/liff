import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
// import styled from 'styled-components';
import "./editSettingLeave.css";
import "antd/dist/antd.css";
import {
          Row, 
          Col,  
          Button,
          Input, 
          Icon,  
        } from 'antd';

class editSettingLeave extends Component {

  //Menu
  constructor(props) {
    super(props);
    this.state = {  value: '',
      listMenu: false,
      dataSource: [],
    };
  }
  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
  onChange = value => {
    this.setState({ value });
  };
  
  handleChange = value => {
      this.setState({
        dataSource:
          !value || value.indexOf('@') >= 0
            ? []
            : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`],
      });
    };


  render() {
    const { TextArea } = Input;

    return (
        <div className="all-editProfile">
        <header>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
            rel="stylesheet"
          />
        </header>
       {/* menubar */}
       <Row
          className=""
          style={{ background: '#405EA5', position: 'relative' }}
        >
          <Col span={3}>
            <Link to="/settingLeave">
              <i
                className="fas fa-arrow-left"
                style={{ cursor: 'pointer', color: '#fff', padding: '15px',fontSize: '20px' }}
              ></i>
            </Link>
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
           แก้ไขการลา
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

            <div className="in-alleditProfile" >
              <div style={{ display:'block', margin:' 30px auto', width:'94%', background:'#fff'}}>
               {/* Row1 */}
                    <Row
                    style={{
                        width: "90%",
                        margin: "10px auto",
                    }}
                    >
                    <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft:'5px',marginTop:'20px',borderRight:'none',borderTop:'none',borderRight:'none' }}>
                        หมายเหตุการลา:
                        </h3>
                        <div>
                            <Input placeholder="ลาออก" width="94%" />
                        </div>
                    </Col>
                    </Row>
                    
                 {/* Row2 */}
                    <Row
                    style={{
                        width: "90%",
                        margin: "5px auto",
                    }}
                    >
                    <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft:'5px',marginTop:'5px', }}>
                        จำนวนวันลา:
                        </h3>
                        <div>
                        <Input  size="large"   placeholder="1" style={{ borderTop:'none', borderLeft:'none', borderRight:'none', width:'130px', marginLeft:'',width:'94%'}} />
                        </div>
                    </Col>
                    </Row>
                    <br />
              </div>
              <Row
                style={{
                    width: "90%",
                    margin: "auto",
                    padding:'10px',
                    background:'none'
                      }}
              >
                <Col span={12}>
                <div style={{ float: "right" ,marginRight:'5px'}}>
                <Link to="/settingLeave">
                    <Button style={{ width: '150px', height: '45px',borderRadius:'0.8rem' }}>
                        ยกเลิก
                    </Button>
                </Link>
                </div>
                </Col>
                <Col span={12}>
                <div style={{ float: "left", marginLeft:'5px' }}>
                    <Button type="primary" style={{ width: '150px', height: '45px',borderRadius:'0.8rem'}}>
                        แก้ไขการลา
                    </Button>
              </div>
            </Col>
          </Row>
             
            </div>  
          </div> 
                
       
    )
  }
}
export default editSettingLeave;
