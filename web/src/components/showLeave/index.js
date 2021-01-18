import React, { Component } from "react";
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./showLeave.css";
import {
  Row,
  Col,
  Card,
  // Modal,
  // Menu,
  // Dropdown,
  Button,
  Icon,
  Select,
  Input,
  Upload,
  // DatePicker
} from "antd";




class showLeave extends Component {

  constructor() {
    super();
    this.state = {
      listMenu: false,
      loading: true,
      startValue: null,
      endValue: null,
      endOpen: false
    };
  }

//date
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };


  onStartChange = value => {
    this.onChange("startValue", value);
    console.log(value);
    
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

    //Menu
    
    listMenushow() {
      this.setState({
        listMenu: !this.state.listMenu
      });
    }
    //Menu
    

  render() {
    // const { size, startValue, endValue, endOpen  } = this.state;
    const { TextArea } = Input;
    const { Option } = Select;
    const { Meta } = Card;

      function handleChange(value) {
        console.log(`selected ${value}`);
      }

      const { uploading, fileList } = this.state;
      const props = {
        onRemove: file => {
          this.setState(state => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: file => {
          this.setState(state => ({
            fileList: [file],
            
          }));console.log(file);
          return false;
        },
        fileList,
      };


    return (
      <div className="all-showLeave " style={{ background: "#F0F0F0" }}>
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
            <Link to="/homeFollow">
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
          <div className="listMenu" style={{position: 'absolute', width: '100%',boxShadow: '5px 10px 15px #707070'}}>
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

        
        {/* Box-head */}
        <div className="in-showLeave">
          
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
                  <Input disabled size="large" placeholder="ลาป่วย" style={{width:'130px'}}/>
                </div>
              </Col>

              <Col span={12}>
                <h3 style={{ fontSize: "15px", marginLeft: '5px', marginTop:'10px' }}>
                  วันลาคงเหลือ:
                </h3>
                <div >
                  <Input disabled size="large" placeholder="30 วัน" style={{ borderTop:'none', borderLeft:'none', borderRight:'none', width:'130px', marginLeft:'5px'}} />
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
                style={{color:'#000000', fontWeight: 'bold'}}>
                  <Button>
                    <Icon type="upload" /> เลือกไฟล์
                  </Button>
                </Upload>
              </Col>
            </Row>
          </div>{" "}
          {/* in-all */}
          
          {/* Row8 */}
          <Row
            style={{
              width: '90%',
              margin: 'auto',
              marginTop: '10px',
              background: '#F0F0F0'
            }}
          >
            <div className="">
            <Col span={12}>
              <div style={{ float: 'right' ,marginRight:'-5px',padding:'10px'}}>
              <Link to="/homeFollow">
                <Button style={{ width: 140, height: 45 }}>ยกเลิก</Button>
              </Link>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ float: 'left', marginLeft:'-5px' ,padding:'10px'}}>
                <Button type="primary" 
                        onClick={this.handleUpload}
                        loading={uploading}
                        style={{ width: 140, height: 45 
                        
                        }}>
                  ยืนยัน
                </Button><br />
              </div>
            </Col>
            </div>
          </Row>
        </div>
      
    );
  }
}
export default showLeave;
