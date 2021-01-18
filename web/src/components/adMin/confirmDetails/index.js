import React, { Component } from "react";
import { Link} from "react-router-dom";
import "antd/dist/antd.css";
import "./confirmDetails.css";
import {
  Row,
  Col,
  Card,
  Modal,
  Button,
  Icon,
  Select,
  Input,

  AutoComplete,
  
} from "antd";

const { TextArea } = Input;
// const { Option } = Select;
// const { Meta } = Card;
// const { confirm } = Modal;
// const AutoCompleteOption = AutoComplete.Option;

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

function showConfirm() {
    Modal.warning({
      title: 'แจ้งเตือน',
      content: (
        <div>
          <p>หมายเหตุ ที่ไม่อนุมัติ :</p>
          <input placeholder="" style={{border:'1px solid #efefef', width:200}}/>
        </div>
      ),
      onOk() {
        window.location.href = "requestConfirm" ;
      },
    });
  }
  


class confirmDetails extends Component {
    // loading: true,
    // redirect: false
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
    // const { size } = this.state;
    
    return (
      <div className="all-leaveDetails " style={{ background: "#F0F0F0" }}>
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
            <Link to="/requestConfirm">
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
            รายละเอียดใบลา
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

        
        {/* Box-head */}
        <div className="in-leaveDetails">
          
            {/* Row1 */}
            <Row
              style={{
                width: "94%",
                margin: "20px auto"
              }}
            >
              <Col span={12}>
                <h3 style={{ fontSize: "15px", marginLeft:'', marginTop:'10px'}}>
                  เลือกประเภทการลา:
                </h3>
                <div>
                <Input disabled size="large" placeholder="ลาป่วย" style={{ borderTop:'none', borderLeft:'none', borderRight:'none', width:'130px', marginLeft:''}} />
                  
                </div>
              </Col>

              <Col span={12}>
                <h3 style={{ fontSize: "15px", marginLeft: '5px', marginTop:'10px' }}>
                  วันลาคงเหลือ:
                </h3>
                <div >
                <Input disabled size="large" placeholder="30 วัน" style={{width:'130px', marginLeft: '5px',}}/>
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
                <h3 style={{ fontSize: "15px", marginLeft: '' }}>
                  เลือกวันที่ต้องการลา:
                </h3>
                <div>
                   <Input disabled size="large" placeholder="02/05/2020" style={{width:'130px', marginLeft:''}}/>
                </div>
              </Col>
              <Col span={12}>
                <h3 style={{ fontSize: "15px", marginLeft: '5px' }}>
                  เลือกช่วงเวลา:
                </h3>
                <div>
                  <Input disabled size="large" placeholder="ครึ่งเช้า" style={{width:'130px', marginLeft:'5px'}}/>
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
                <h3 style={{ fontSize: "15px", marginLeft: '5px' }}>
                  ลาถึงวันที่:
                </h3>
                <div>
                  <Input disabled size="large" placeholder="02/05/2020"  style={{width:'130px'}}/>  
                </div>
              </Col>
              <Col span={12}>
                <h3 style={{ fontSize: '15px', marginLeft: '5px' }}>
                  เลือกช่วงเวลา:
                </h3>
                <div>
                  <Input disabled size="large" placeholder="-" style={{width:'130px', marginLeft:'5px'}}/>
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
                  <Input disabled size="large" placeholder="1 วัน" style={{width:'130px', borderTop:'none', borderLeft:'none', borderRight:'none', marginLeft: ''  }} />
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
                <h3 style={{ fontSize: "15px", marginLeft:'5px' }}>
                  หมายเหตุการลา:
                </h3>
                <div>
                  <TextArea
                   disabled 
                   rows={4}
                   placeholder="ทดสอบระบบการลาของพนักงาน"
                   style={{width:'300px',height:'100px'}}
                    
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
                  <a style={{ fontSize: "12px", marginLeft: "5px", color:'#555555' }}>
                    
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
                <h4 style={{ color:'#BFBFBF',padding:'5px'}}>
                    <Link to="">คลิกดูไฟล์อัพโหลด</Link>
                </h4>
              </Col>
            </Row>
          </div>
          {/* in-all */}
          
          {/* Row8 */}
          <Row
            style={{
              width: '100%',
              marginTop: '10px',
              background: '#F0F0F0'
            }}
          >
            <div className="buttons" >
            <Link to="#">
              <div style={{ marginLeft:'-5px' ,padding:'10px'}}>
                <Button type="primary" style={{ width: 140, height: 45 ,fontSize:'18px' ,margin:'auto', display:'block',borderRadius:'0.8rem' }}>
                    ปิด
                </Button><br />
              </div>
              </Link>
            </div>
          </Row>
        </div>
      
    );
  }
}
export default confirmDetails;

