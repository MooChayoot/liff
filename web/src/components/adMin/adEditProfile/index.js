import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import "./adEditProfile.css";
import "antd/dist/antd.css";
import {
          Row, 
          Col,
          Avatar, 
          Tooltip,   
          Button,
          Input, 
          Select,
          Dropdown ,
          Icon,

        } from 'antd';

 function formatNumber(value) {
      value += '';
      const list = value.split('.');
      const prefix = list[0].charAt(0) === '-' ? '-' : '';
      let num = prefix ? list[0].slice(1) : list[0];
      let result = '';
      while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
      }
      if (num) {
          result = num + result;
          }
        return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
      }

      class NumericInput extends React.Component {
        onChange = e => {
          const { value } = e.target;
          const reg = /^-?[0-9]*(\.[0-9]*)?$/;
          if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
          }
        };
      
        // '.' at the end or only '-' in the input box.
        onBlur = () => {
          const { value, onBlur, onChange } = this.props;
          let valueTemp = value;
          if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
          }
          onChange(valueTemp.replace(/0*(\d+)/, '$1'));
          if (onBlur) {
            onBlur();
          }
        };
      
        render() {
          const { value } = this.props;
          const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
          ) : (
            'Input a number'
          );
          return (
              <Input
                {...this.props}
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholder="0999999999"
                prefix="เบอร์โทร"
                maxLength={10}
                minLength={10}
              />
            
          );
        }}

// const
const { Option } = Select;
const InputGroup = Input.Group;
const selectAfter = (
          <Select defaultValue="1" style={{ width: 90 }} >
            <Option value="1">นาย</Option>
            <Option value="2">นางสาว</Option>
            <Option value="3">นาง</Option>
          </Select>
);
// let op = this.state.allcompany.map(data=>(
//     <Option key={data} value={data}>{data}</Option>
//   ))
//   const compony = (
//     <Select value={this.state.company} onChange={e=>
//     this.setState({company:e})
//     // console.log(e)
//     } style={{ width: 130, border:'none'}}>
//       {op}
//     </Select>
//   );


const Avatars = styled.div`
      width:100%;
      height:20vh;
      background-color:#F0F0F0;
      display:flex;
      align-items:center;
      justify-content:center;
`;

class adEditProfile extends Component {

//input number
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
  //Menu
  constructor(props) {
    super(props);
    this.state = {  value: '',
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
            <Link to="/adViewProfile">
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
           แก้ไขข้อมูลส่วนตัว
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
              <Input disabled prefix="คำนำหน้า :" suffix={<Link to="#" style={{color:'#000000'}}> นาย </Link>} />
              <Input   prefix="ชื่อ :"  placeholder="สมพงษ์" />
              <Input   prefix="นามสกุล :"  placeholder="จันทร์โอชา" />
              <Input   prefix="ชื่อเล่น :"  placeholder="ตู่" />
              <NumericInput style={{ width: '100%',  }} value={this.state.value} onChange={this.onChange}/>
              <Input   prefix="ตำแหน่ง :" placeholder="Programmer"/>
              <Input disabled  prefix="บริษัท :" suffix={<Link to="#" style={{color:'#000000'}}> Twin Synergy </Link>}/>
              <Input disabled prefix="สถานะ :"   />{/* addonAfter={...} */}
             
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
              <Link to="/adViewProfile">
                <Button style={{ width: '150px', height: '45px' }}>ยกเลิก</Button>
              </Link>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ float: "left", marginLeft:'5px' }}>
                <Button type="primary" style={{ width: '150px', height: '45px'}}>
                  แก้ไข
                </Button>
              
              </div>
            </Col>
          </Row>
             </div>
            </div>  
          </div> 
                
       
    )
  }
}
export default adEditProfile;
