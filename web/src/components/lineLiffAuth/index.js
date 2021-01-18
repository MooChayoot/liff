import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTION from '../../store/actions/action';
import { Row, Col, Button, Typography, Card, Carousel } from 'antd';
import ListFields from '../listFields/index';
import Authen from '../authentications/index';
import RegisterUser from '../register/index';
import ProFile from '../proFile/index';
import {  Link } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import {  
    Modal,Spin
  } from 'antd';

const liff = window.liff;
class LineLiffAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userLineID: '',
            pictureUrl: '',
            statusMessage: '',
            action: '',
            status:0,
            releaveDay:0,
            year:'',
            showlindid:'',
            leave:[]
        };
    }

    closeLIFF() {
        liff.closeWindow();
    }
 async   componentDidMount() {
     await   liff.init(async () => {
            let getProfile = await liff.getProfile();
            await    this.setState({
                userLineID: getProfile.userId,
            });
        });
        const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
  const params = new URLSearchParams(queryString);
    await    this.setState({
            action: params.get('action')
        })
        if (this.state.userLineID !== "") {
            await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.userLineID}`)
              .then((data) => { 
                let loop1 = []
                let loop2 = []
                let loop3 = []
                if (data.data.data.pname === "นาย") {
                data.data.data.leave.filter(function(user) {
                  let select = user.leaveType.toLowerCase().search("ลาคลอด") !== -1; 
                  if (select === false) {
                    loop1.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                  }
                  return;
                })
                } else {
                  data.data.data.leave.filter(function(user) {
                    let select = user.leaveType.toLowerCase().search("ภริยา") !== -1; 
                    if (select === false) {
                      loop1.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                    }
                    return;
                  })
                  loop1.filter(function(user) {
                    let select = user.leaveType.toLowerCase().search("เตรียมพล") !== -1; 
                    if (select === false) {
                      loop2.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                    }
                    return;
                  })
                  loop2.filter(function(user) {
                    let select = user.leaveType.toLowerCase().search("ทหาร") !== -1; 
                    if (select === false) {
                      loop3.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                    }
                    return;
                  })
                }  
            this.setState({
                leave:loop3.length ===0 ? loop1:loop3,
                status:data.data.data.status,
                year:data.data.data.year,
                company:data.data.data.company,
                showlindid:1})
              }).catch(async() => {
                  this.setState({showlindid:1})
              });
            }
    }
    render() { 

        const loaduser = () => {
            if (this.state.userLineID !== "") {
              axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.userLineID}`)
              .then((data) => {  
                let loop1 = []
                let loop2 = []
                let loop3 = []
                if (data.data.data.pname === "นาย") {
                data.data.data.leave.filter(function(user) {
                  let select = user.leaveType.toLowerCase().search("ลาคลอด") !== -1; 
                  if (select === false) {
                    loop1.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                  }
                  return;
                })
                } else {
                  data.data.data.leave.filter(function(user) {
                    let select = user.leaveType.toLowerCase().search("ภริยา") !== -1; 
                    if (select === false) {
                      loop1.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                    }
                    return;
                  })
                  loop1.filter(function(user) {
                    let select = user.leaveType.toLowerCase().search("เตรียมพล") !== -1; 
                    if (select === false) {
                      loop2.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                    }
                    return;
                  })
                  loop2.filter(function(user) {
                    let select = user.leaveType.toLowerCase().search("ทหาร") !== -1; 
                    if (select === false) {
                      loop3.push({leaveType:user.leaveType,leaveDay:user.leaveDay})
                    }
                    return;
                  })
                } 
            this.setState({
                leave:loop3.length ===0 ? loop1:loop3,
                status:data.data.data.status,
                year:data.data.data.year,
                company:data.data.data.company,
                showlindid:1})
              }).catch(async() => {
                  this.setState({showlindid:1})
              });
            }
          }
          const confirm = () => {
              
            Modal.warning({
                content: (
                    <div style={{}}>
                        <h3>เกิดข้อผิดพลาด</h3>
                       <h3>ไม่สามารถดำเนินการได้เนื่องจากคุณไม่มีสิทธิ์</h3>
                        <h3>ในการเข้าถึงฝ่ายบุคคล</h3>
                        <br/>
                        <hr  /> 
                    </div>
                ),
                onOk(){liff.closeWindow()},
                okText:"ตกลง",
                okType:Link,
            })
          }
          const leave0 = () => {
              
            Modal.warning({
                content: (
                    <div style={{}}>
                        <h3>เกิดข้อผิดพลาด</h3>
                       <h3>ไม่สามารถดำเนินการได้เนื่องจากบริษัทคุณ</h3>
                        <h3>ยังไม่ได้ตั้งค่าการลา</h3>
                        <br/>
                        <hr  /> 
                    </div>
                ),
                onOk(){liff.closeWindow()},
                okText:"ตกลง",
                okType:Link,
            })
          }
          let reDay = ()=>{
            let dateY = new Date();
            let getY = dateY.getFullYear();
      if (this.state.showlindid === 1 && this.state.year !== '' && this.state.releaveDay === 0 && this.state.year !== null && this.state.year !== undefined && this.state.year !== getY ) {
      console.log("Y",this.state.year,getY)
      axios.get(`https://us-central1-twin-hr.cloudfunctions.net/updateLeave_of_year?lineid=${this.state.userLineID}&company=${this.state.company}&year=${getY}`)
              .then((data) => {  
            this.setState({releaveDay:1})
              }).catch(async() => {
                  this.setState({releaveDay:1})
              });
      }else{
       this.setState({releaveDay:1})
      }
          }
          if (this.state.showlindid ===1) {
            if (this.state.releaveDay ===1) {
              return (
                <Spin tip="Check User...">
                <div id="main-content">
    
                    <Row>
                        { 
                        this.state.status > 0 && this.state.status !== undefined && this.state.status !== null && this.state.status !== ''  ? 
                        this.state.action === 'allowleave' ? this.state.status >3 ? this.props.history.push(`/requestConfirm/${this.state.company}`) : confirm() :
                        this.state.action === 'allowuser'  ? this.state.status >3 ? this.props.history.push(`/verify/${this.state.company}`): confirm():
                        this.state.action === 'history'  ? this.state.status >1 ? this.props.history.push(`/HistoryApproval/${this.state.company}`): confirm():
                        this.state.action === 'profile' ? this.props.history.push(`/proFile/${this.state.userLineID}/user`) :
                        this.state.action === 'home' ? this.props.history.push(`/home`) : 
                        this.state.action === 'statistics' ? this.state.status >1 ? this.props.history.push(`/statistics/${this.state.company}`) : confirm(): 
                        this.state.action === 'memberList' ? this.state.status >1 ? this.props.history.push(`/memberList/${this.state.company}`) : confirm() : 
                        this.state.action === 'leave' ? this.state.leave.length >0 ? this.props.history.push(`/leave-request/${this.state.leave[0].leaveType}/user`) : leave0() : 
                        this.state.action === 'register' ? this.props.history.push(`/register`) : 
                        this.state.action.substring(0,9) === 'allowuser'  ? this.state.status >3 ? this.props.history.push(`/verify/${this.state.action.substring(10,this.state.action.length)}`): confirm():
                        this.state.action.substring(0,10) === 'allowleave' ? this.state.status >3 ? this.props.history.push(`/requestConfirm/${this.state.action.substring(19,this.state.action.length)}`) : confirm() :
                        this.state.status === 2 ? this.props.history.push(`/adminMenu/${this.state.company}`) : 
                        this.state.status === 3 ? this.props.history.push(`/sumCompany/`) : 
                        this.state.status === 4 ? this.props.history.push(`/adminMenu/${this.state.company}`) : 
                        this.state.status === 5 ? this.props.history.push(`/companyMenu/`) : 
                        confirm()
                        : this.props.history.push(`/register`) }
                        {/* {this.state.action === 'profile' ? <ProFile {...this.props} /> : ''}
                        {this.state.action === 'register' ? <RegisterUser {...this.props} /> : ''} */}
                        {/* {this.state.action === 'booking' ? <ListFields {...this.props} /> : ''} */}
                        {/* {this.state.action == 'pin_promotion' ? <ListPromotions {...this.props} /> : ''}
                        {this.state.action == 'all_promotion' ? <Wallet {...this.props} /> : ''} */}
                        {/* {this.state.action === 'user' ? <Authen {...this.props} /> : ''} */}
                    </Row>
    
                </div>
                </Spin>
            );
            } else {
              return(
                <Spin tip="Updae Leave day...">
                    <div>
                      {reDay()}
                    </div>
                </Spin>
              )
            }
          } else {
            return(
              <Spin tip="Check user...">
                  <div>
                    {loaduser()}
                  </div>
              </Spin>
            )
          }
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
    export default connect(mapStateToProps, mapDispatchToProps)(LineLiffAuth);
