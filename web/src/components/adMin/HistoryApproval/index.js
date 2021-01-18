import React, { Component } from 'react'
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import { Link, Redirect  } from "react-router-dom";
// import styled from "styled-components";
import "antd/dist/antd.css";
import "./HistoryApproval.css";
import axios from "axios";
import moment from "moment"
import {
  Row,
  Col,
  Card,
  Menu,
  Button,
  Icon,
  Avatar, 
  Spin, 
  Tag,
  Modal,
} from "antd";

const liff = window.liff;
const { Meta } = Card;
class HistoryApproval extends Component {   
      constructor() {
        super();
        this.state = {
          userId : "",
          listMenu: false,
          loading: true,
          allow: true,
          show: 0,
          id: "",
          q:'',
          leave:[],
          showallow:0,
          allow_wait: [""],
          allow_complete: [],
          allow_not: [],
          img: "",
          users:[],
          dataSource:'',
          user:[],
          userallshow:0,
          statuserror:0,
          showuser:0,
          status:'',
          statusfail:'',
          username:'',
          file:''
        };
      } 
          
      //Menu.Item
      handleClick = e => {
        // console.log('click ', e);
      };

      onChange = checked => {
        this.setState({ loading: !checked });
      };

      //Men
      listMenushow() {
        this.setState({
          listMenu: !this.state.listMenu
        });
      }
     
  async componentDidMount ()  { 
    await  this.setState({
              id:this.props.match.params.id
        }) 
          await  liff.init(async (data) => {
              let profile = await liff.getProfile();
           await   this.setState({
                userId : profile.userId
              });
            }); 
        
      } 

    //ส่งค่า from ผ่าน from
  filterId = (user, data)=> {
    let tmp = data.filter(i => i.id === user);
    if(tmp.length >0){
      return tmp[0].img ? tmp[0].img : "";
    }
  }

  filterName = (user, data)=> {
    let tmp = data.filter(i => i.id === user);
    if(tmp.length >0){
      return tmp[0].name ? tmp[0].name : "";
    }
  }

    render() {
      let loaddata =()=>{
        if (this.state.showallow === 0 &&  this.state.id !== "") {
          axios.get(`https://us-central1-twin-hr.cloudfunctions.net/allowofhr?company=${this.state.id}`)
              .then((data) => {   
                // console.log(data.data);
                this.setState({
                  allow_not:data.data.allow_not,       
                  allow_complete:data.data.allow_complete,showallow:1
                        })          
            }).catch(async() => {
                this.setState({showallow:1})
            });
          }
          if (this.state.userallshow === 0 && this.state.id !== "") {
            axios.get(`https://us-central1-twin-hr.cloudfunctions.net/user_All?company=${this.state.id}`)
              .then(data => {
                  this.setState({
                    users:[]
                  })
                  if(data.data.user !== undefined){
                   for (let index = 0; index < data.data.user.length; index++) {
                  this.setState({
                    users: [
                      ...this.state.users,
                      {
                        name:
                        data.data.user[index].data.fname + " " + data.data.user[index].data.lname ,  
                        id: data.data.user[index].data.lineid,
                        img:data.data.user[index].data.img,
                      }
                    ],
                    userallshow:1
                  });
                } 
                  }else{
                    this.setState({userallshow:1})
                  }
              })
              .catch(err => {
                console.log(err);
              });
            }
            if (this.state.show === 0 && this.state.userId !== "") {
              axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.userId}`)
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
                            status:data.data.data.status,show:1,
                            leave:loop3.length ===0 ? loop1:loop3,
                            companyme:data.data.data.company
                          })
                }).catch(async() => {
                  this.setState({show:1})
              });     
            }
      }
      const  countdown = () =>  {
        setTimeout(() => {
          liff.closeWindow();
        }, 3000);
      }


      if (this.state.showallow === 1) {
        if(this.state.show === 1 ){
          if (this.state.userallshow === 1) {
            if (this.state.status > 1 && this.state.status !== null && this.state.status !== undefined) {
            return (
              <div className="all-home">
                <header>
                  <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                    rel="stylesheet"
                  />
                </header>
                <Row
                  className=""
                  style={{ background: "#405EA5", position: "relative" ,cursor: "pointer"}}>
                    <Col span={3}>
                    <Link to={`/adminMenu/${this.state.id}`}>
                        <Button type="link" >
                         
                            <i className="fas fa-arrow-left" style={{ cursor: 'pointer', color: '#fff', paddingTop: '15px', fontSize: '20px'}}/>
                           
                        </Button>
                    </Link>
                    </Col>
                  <Col span={18} style={{marginTop:"2px",textAlign: "center", color: "#fff", padding: "10px", fontSize: "19px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                    ประวัติการอนุมัติ
                  </Col>
                  <Col span={3}>
                    <Icon type="menu" onClick={() => this.listMenushow()} style={{ cursor: "pointer", color: "#fff", float: "right", padding: "15px", fontSize: "20px",marginTop:"-2px"}}/>
                  </Col>
                </Row>


                {/* Menu */}
                {this.state.listMenu ? (
                  <div className="listMenu" style={{ position: "absolute", width: "100%", boxShadow: "5px 10px 15px #707070"}}>
                    <div className="ul" style={{ width: "100%", background: "#405EA5",color: "#fff",fontFamily: "Sukhumvit Set, sans-serif"}}>
                      <Link to="/home">
                        <li style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif" }}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leave.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ลางาน <Icon type="right" style={{ float: "right" }} />{" "}
                          </li>
                        </Link> 
                      : null}

                        <Link to={`/proFile/${this.state.userId}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>

                        {/* hr */}
                        {this.state.status === 2 ?
                        <Link to={`/adminMenu/${this.state.id}`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* Superhr */}
                      {this.state.status === 3 ?
                        <Link to={`/sumCompany/`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* admin */}
                      {this.state.status === 4 ?
                        <Link to={`/adminMenu/${this.state.id}`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* root */}
                      {this.state.status === 5 ?
                        <Link to={`/companyMenu`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                         </Link>
                      : null}
                    </div>
                  </div>
                ) : null} 
        


                <div className="in-alls">   
                <Menu style={{ width: "100%", padding: "10px",borderRadius: "0.4rem",fontSize: "18px" }} 
                      onClick={this.handleClick} 
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['1']}
                      mode="horizontal">
            <Menu.Item
              key="1"
              style={{
                width: "50%",
                textAlign: "center",
                borderRight: "1px solid #F0F0F0",
                fontWeight: "500",
                fontFamily:"Sukhumvit Set, sans-serif" 
              }}>
              <Link onClick={e => this.setState({ allow: true })} to="#">
                {/* <Button style={{width:'100%',height:'45px',border:'none',fontSize:'18px'}}> */}
                    อนุมัติแล้ว
                {/* </Button> */}
              </Link>
            </Menu.Item>

            <Menu.Item
              key="2"
              style={{
                width: "50%",
                textAlign: "center",
                fontWeight: "500",
                fontFamily:"Sukhumvit Set, sans-serif" 
              }}>
              <Link onClick={e => this.setState({ allow: false})} to="#">
                {/* <Button style={{width:'100%',height:'45px',border:'none',fontSize:'18px'}}> */}
                  ไม่อนุมัติ
                {/* </Button> */}
              </Link>
            </Menu.Item>
          </Menu>
      <p></p>

         {this.state.allow === true ? this.state.allow_complete.length !== 0 ? this.state.allow_complete.slice(0, this.state.allow_complete.length).map((item, index) => {
          //  console.log('item', item)
          return (   
            <Link to={`/leave-request/${item.id}/${this.filterName(item.data.lineid, this.state.users)}`}  key={index}>
                  <Card size="small" style={{ width: '94%', display:'block', margin:'10px auto 0', borderRadius:'0.5rem', fontFamily:"Sukhumvit Set, sans-serif"  }}>
                    <Row>
                      <Col span={4}>
                          <Avatar size={50} style={{margin:'15px auto', display:'block',justifyContent:"center" }} src={this.filterId(item.data.lineid, this.state.users)} />
                      </Col>                  
                      <Col span={15}  >                  
                          <div style={{marginLeft:'10px',marginTop:'10px',borderRight:'1px solid #f0f0f0',fontFamily:'Sukhumvit Set, sans-serif'  }} >
                            <p style={{ fontSize: '16px', fontWeight: 'bold', fontFamily:'Sukhumvit Set, sans-serif'  }}> {this.filterName(item.data.lineid, this.state.users)} </p>
                            <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px', fontFamily:'Sukhumvit Set, sans-serif'}}> {item.data.leaveType} ({item.data.leaveSum} วัน) </p>
                            <p style={{ fontSize: '12px', color: '#B1B1B1', marginTop: '-10px',fontFamily:'Sukhumvit Set, sans-serif' }}>
                                        วันที่ลา : {moment(item.data.dateStart).format('L')} - {moment(item.data.dateEnd).format('L')}
                            </p>
                          </div>
                      </Col>
                      <Col span={5} style={{float:'right'}} >
                          <div  style={{textAlign:'center',marginTop:'35px',}} >
                            <div  style={{textAlign:'center',marginTop: '20px',fontFamily:'Sukhumvit Set, sans-serif'}} >
                              <Tag color="#34B23D" >อนุมัติ</Tag>
                            </div> 
                          </div>
                      </Col>
                    </Row>
                  </Card>
            </Link>
          )
        })
         : <div>
                  <Link to="" key="#">
                    <Card size="small" style={{ width: '94%', display:'block', margin:'10px auto 0', borderRadius:'0.5rem', fontFamily:'Sukhumvit Set, sans-serif'}} >
                      <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif"}}> ไม่พบข้อมูล</p>
                      <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif"}}> ไม่พบข้อมูลการอนุมัติ </p>
                      <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif"}}> โปรดตรวจสอบว่ามีการอนุมัติหรือไม่ </p>
                    </Card>
                  </Link>
                </div>
        : <div>
                  <div className="box-1">
                    <h3 style={{ width: "97%", margin: "auto", marginTop: "10px", fontSize: "18px",fontFamily: 'Sukhumvit Set", sans-serif'}}>
                    </h3>
                  <div className="box-2">
                    {this.state.allow_not !== undefined ?this.state.allow_not.length !== 0 ? this.state.allow_not.slice(0, this.state.allow_not.length).map((item, index) => {
                      return(
                      <Link to={`/leave-request/${item.id}/${this.filterName(item.data.lineid, this.state.users)}`}  key={index}>
                              <Card size="small" style={{ width: '94%', display:'block', margin:'10px auto 0', borderRadius:'0.5rem' ,fontFamily:'Sukhumvit Set, sans-serif' }}>
                                    <Row>
                                      <Col span={4}>
                                          <Avatar size={50} style={{marginTop:16 ,margin:'15px auto', display:'block' }} src={this.filterId(item.data.lineid, this.state.users)} />
                                      </Col>                  
                                      <Col span={15}  >                  
                                          <div style={{marginLeft:'10px',marginTop:'10px',borderRight:'1px solid #f0f0f0', fontFamily:'Sukhumvit Set, sans-serif'}} >
                                            <p style={{ fontSize: '16px', fontWeight: 'bold' , fontFamily:'Sukhumvit Set, sans-serif'}}> {this.filterName(item.data.lineid, this.state.users)} </p>
                                            <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px', fontFamily:'Sukhumvit Set, sans-serif' }}> {item.data.leaveType} ({item.data.leaveSum} วัน) </p>
                                            <p style={{ fontSize: '12px', color: '#B1B1B1', marginTop: '-10px', fontFamily:'Sukhumvit Set, sans-serif' }}>
                                                   วันที่ลา : {moment(item.data.dateStart).format('L')} - {moment(item.data.dateEnd).format('L')}
                                            </p>
                                          </div>
                                      </Col>
                                      <Col span={5} style={{float:'right'}} >
                                          <div  style={{textAlign:'center',marginTop:'35px',}} >
                                            <div  style={{textAlign:'center',marginTop: '20px',fontFamily:'Sukhumvit Set, sans-serif'}} >
                                              <Tag color="#F70B1D" >ไม่อนุมัติ</Tag>
                                            </div> 
                                          </div>
                                      </Col>
                                    </Row>
                                </Card>
            </Link>
                      )
                    }):
                  <div>
                    <Link to="" key="#">
                      <Card size="small" style={{ width: '94%', display:'block', margin:'10px auto 0', borderRadius:'0.5rem', fontFamily:'Sukhumvit Set, sans-serif'}}>
                        <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif"  }}> ไม่พบข้อมูล</p>
                        <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif"  }}> ไม่พบข้อมูลไม่อนุมัติ </p>
                        <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif"  }}> โปรดตรวจสอบว่ามีรายการไม่อนุมัติหรือไม่ </p>
                
                        <div  className="border" style={{ height: "10vh", marginTop: "-90px", position: "relative",width: "25%",float: "right", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          <Link to="#" style={{ float: "right", paddingRight: "10px", marginTop: "50px", fontSize: "15px"}}>
                          </Link>
                        </div>
                      </Card>
                  </Link>
                  </div>
                  :
                   <div>
                     <Link to="" key="#">
          <Card size="small" style={{ width: "100%", margin: "0px auto 0", fontFamily:"Sukhumvit Set, sans-serif"  }} >
              <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif"  }}> ไม่พบข้อมูล </p>
              <p style={{ color: "#B1B1B1", marginTop: "-10px" , fontFamily:"Sukhumvit Set, sans-serif" }}> ไม่พบข้อมูล </p>
              <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif"  }}> ไม่พบข้อมูล </p>
            <div className="border" style={{ height: "10vh", marginTop: "-90px", position: "relative", width: "25%", float: "right", fontFamily:"Sukhumvit Set, sans-serif" }}>
              <Link to="" style={{ float: "right", paddingRight: "10px", marginTop: "50px",fontSize: "15px", fontFamily:"Sukhumvit Set, sans-serif" }}> 
              </Link>
            </div>
          </Card>
        </Link>
        </div>
      }
                    </div>
                  </div>
                  </div>}      
                </div>
              </div>
            )   
          } else {
            return (
              //spin
              <Spin tip="คุณไม่มีสิทธิ์ เข้าถึงส่วนนี้">
                <div className="all-register">
                  {countdown()}
                </div>
              </Spin>
            ) 
          }
        } else {
          return (
            //spin
            <Spin tip="Loading...">
            <div className="all-register"> {loaddata()}
            </div>
            </Spin>
          )
        }    
      } else {
        return (
          //spin
          <Spin tip="Loading...">
          <div className="all-register">{loaddata()}
          </div>
          </Spin>
        )
      }
    } else {
      return (
        //spin
        <Spin tip="Loading...">
        <div className="all-register">{loaddata()}
        </div>
        </Spin>
      )
    }      
  }
}
export default  HistoryApproval;
