import React, { Component } from 'react'
import {  Link } from "react-router-dom";
// import styled from "styled-components";
import "./moDal.css";
import "antd/dist/antd.css";
import {
    // Row, 
    // Col, 
    // Input, 
    // Button,
    Modal,
    // Icon,
  } from 'antd';
// const liff = window.liff;


 class moDal extends Component {
       constructor() {
            super();
            this.state = {
              dataSource: [],
              listMenu: false,
              loading: true,
              leave_request:[],
            };
          }

    render() {
        

        const confirm = () => {
            Modal.warning({
                content: (
                    <div style={{}}>
                        <h3>เกิดข้อผิดพลาด</h3>
                       <h3>ไม่สามารถดำเนินการได้เนื่องจากคุณไม่มีสิทธิ์</h3>
                        <h3>ในการเข้าถึงฝ่ายบุคคล</h3>
                        <br/>
                        <hr style={{fontSize:'1px'}} /> 
                    </div>
                ),
                // onOk: {},
                okText:"ตกลง",
                okType:Link,
                zIndex:999
            });
          };

        return (
           
      <div>
      <div>
        {confirm()}
      </div>
      </div>
        )
    }
}
export default moDal ;