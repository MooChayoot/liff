import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
// import styled from 'styled-components';
import "./deleteLeave.css";
import "antd/dist/antd.css";
import {
          Row, 
          Checkbox,
          Col,
          // Avatar, 
          // Tooltip,   
          Button,
          // Input, 
          // Select,
          // Dropdown ,
          Icon,  
          // Menu, 
          Card, 
          // Spin, 
          // Tag,
          Modal,
        } from 'antd';

  
class deleteLeave extends Component {

  //Menu
  constructor(props) {
    super(props);
    this.state = {  
      value: '',
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



  render() {
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }

      const confirm = () => {
        Modal.confirm({
          title: "แจ้งเตือน ",
          content: (
            <div>
              <p style={{ fontWeight: "900" }}>คุณต้องการลบ (......)ใช่หรือไม่</p>
              <p style={{ fontSize: "14px", color: "#9D9D9D" }}>
              กด OK เพื่อยืนยัน การลบ
              </p>
            </div>
          ),
          onOk() {
            window.location.href = ""
          }
        });
      };

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
            <Link to="/adminMenu">
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
           ลบการลา
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
              <div style={{marginTop:'20px'}}>
               
                        <Card size="small" 
                            style={{
                                width: "95%",
                                margin: "5px auto 0",
                                borderRadius: "0.5rem"
                            }}
                        > {/* {item.leaveType}  */}
                        <p style={{ fontSize: "17px", fontWeight: "bold" }}>ลากิจ :</p>
                        <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                            คงเหลือ  วัน
                        </p>

                        <Checkbox 
                            style={{ float: "right",
                                     fontSize: "20px", 
                                     marginTop: "-50px" 
                            }}
                            onChange={onChange}/>
                        </Card>
                    
                    <Card size="small" 
                            style={{
                                width: "95%",
                                margin: "5px auto 0",
                                borderRadius: "0.5rem"
                            }}
                        > {/* {item.leaveType}  */}
                        <p style={{ fontSize: "17px", fontWeight: "bold" }}>ลากิจ :</p>
                        <p style={{ color: "#B1B1B1", marginTop: "-10px" }}>
                            คงเหลือ  วัน
                        </p>
                      
                        <Checkbox 
                            style={{ float: "right",
                                     fontSize: "20px", 
                                     marginTop: "-50px" 
                            }}
                            onChange={onChange}/>

                        </Card>
                    

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
                    <Button style={{ width: '150px', height: '45px', borderRadius:'0.8rem'}}>
                         ยกเลิก
                    </Button>
                </Link>
                </div>
                </Col>

                <Col span={12}>
                  <Link to="#">
                <div style={{ float: "left", marginLeft:'5px' }}>
                    <Button type="primary" 
                            onClick={confirm}
                            style={{ width: '150px', height: '45px', borderRadius:'0.8rem'}}>
                        ลบการลา
                    </Button>
              </div>
              </Link>
            </Col>
          </Row>
             </div>
            </div>  
          </div> 
                
       
    )
  }
}
export default deleteLeave;
