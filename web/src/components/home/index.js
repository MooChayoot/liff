import React, { Component } from "react";
import { Link} from "react-router-dom";
import firebaseApp from '../../config/firebaseConfig'
import "antd/dist/antd.css";
import styled from "styled-components";
import axios from "axios";
import "./home.css";
import IconBack from "./image/Logout.svg";
import moment from "moment"
import { Row, Col, Avatar, Menu, Card, Icon ,Spin ,Tag,Modal,Skeleton,List} from "antd";

const liff = window.liff;
// const { SubMenu } = Menu;
// const { Meta } = Card;
const Avatars = styled.div`
  width: 100%;
  height: 15vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listMenu: false,loading: true,allow:true,show:0,
      userId:'',
      id:'',
      status:'',
      statusfail:'',
      username:'',
      oldname:'',
      waitreq:1,
      leave:[],
      showallow:0,
      allow_wait:[],
      allow_complete:[],
      img:"",
      file:'',
    };
  }

//Menu.Item
 handleClick = e => {
  };
  //Menu
    listMenushow() {
      this.setState({
        listMenu: !this.state.listMenu
      });
     }
//line  รับค่าแล้วส่ง Api
  async componentDidMount() {
      await  liff.init(async (data) => {
          let profile = await liff.getProfile();
       await   this.setState({
            userId : profile.userId
          });
        }); 
   
    } 
  render() {
    let    uploadToFirebase = async() => {
      const storageRef = firebaseApp.storage().ref();
      let oldname = this.state.file.substring(this.state.file.length - 27, this.state.file.length -10)
      let oldname1 = oldname.substring(oldname.length - 3, oldname.length )
        if (oldname1 !== "jpg" && oldname1 !== "pdf") {
          let oldname = this.state.file.substring(this.state.file.length - 28, this.state.file.length -10)
        await  this.setState({oldname:oldname})
        }else{
          let oldname = this.state.file.substring(this.state.file.length - 27, this.state.file.length -10)
        await  this.setState({oldname:oldname})
        }
      
    let lnameold = this.state.oldname.substring(this.state.oldname.length - 3, this.state.oldname.length )
              if (lnameold !== "pdf") {
                let desertRef  = storageRef.child(`certificate/image/${oldname}`);
                desertRef.delete().then(function() {
                }).catch(function(error) {
                  console.log("error : ",error);
                }); 
                } else {
                let desertRef  = storageRef.child(`certificate/file/${oldname}`);
                desertRef.delete().then(function() {
                }).catch(function(error) {
                  console.log("error : ",error);
                });
                }
    }
    const close = () => {
      liff.closeWindow();
    }
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
  const  itemitme = () =>  {
      setTimeout(() => {
        confirm()
      }, 10);
  }
  const confirm = () => {
    let id = this.state.item
    let file = this.state.file
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
        onOk()
        {
          reset()
          axios.get(`https://us-central1-twin-hr.cloudfunctions.net/delleave_request?id=${id}`)
          .then((data) => { 
            loadleave_req()
            loaddataAffterDel()
            if (file !== "") {
              uploadToFirebase()
            }
        }).catch(async() => {
        })
        }
      });
    };
    let reset = ()=>{
      this.setState({waitreq:0})
    }

    //load
    let loadleave_req = () =>{
      axios.get(`https://us-central1-twin-hr.cloudfunctions.net/allowofuser?lineid=${this.state.userId}`)
      .then((data) => {    
        this.setState({allow_wait:data.data.allow_wait,
                   allow_complete:data.data.allow_complete,showallow:1,waitreq:1})
      }).catch(async() => {
          this.setState({showallow:1})
      });
    }
    let loaddata = ()=>{
      if (this.state.show === 0 && this.state.userId !== '') {
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
          username:data.data.data.pname+data.data.data.fname+" "+data.data.data.lname,
                        img:data.data.data.img,
                        status:data.data.data.status,
                        show:1,
                        leave:loop3.length ===0 ? loop1:loop3,
                        companys:data.data.data.company
                      })
            }).catch(async() => {
              this.setState({show:1})
          });     
        }
        if (this.state.showallow === 0 && this.state.userId !== '') {
            axios.get(`https://us-central1-twin-hr.cloudfunctions.net/allowofuser?lineid=${this.state.userId}`)
          .then((data) => {    
            this.setState({allow_wait:data.data.allow_wait,
                       allow_complete:data.data.allow_complete,showallow:1,waitreq:1})
          }).catch(async() => {
              this.setState({showallow:1})
          });    
          
          }
          
    }
    let loaddataAffterDel = ()=>{
      if (this.state.userId !== '') {
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
                        leave:loop3.length ===0 ? loop1:loop3
                      })
            }).catch(async() => {
              this.setState({show:1})
          });     
        }
    }
    // console.log(this.state);
    const { size } = this.state;
      if (this.state.show === 1) {
        if (this.state.showallow === 1 ) {
          if (this.state.status < 1 && this.state.status !== null && this.state.status !== undefined) {
            return (
              <Spin tip="คุณไม่มีสิทธิ์ เข้าถึงส่วนนี้">
                <div className="all-register">
                  {countdown()}
                </div>
              </Spin>
            )    
          } else {
            return (
              <div className="all-home">
                <header>
                  <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                    rel="stylesheet"/>
                </header>
                <Row
                  className=""
                  style={{ background: "#405EA5", position: "relative" ,cursor: "pointer"}}>
                    <Col span={3}>
                      <img src={IconBack}  
                            onClick={close} 
                            style={{
                              cursor: "pointer",
                              color: '#fff',
                              background:'',
                              padding: "15px ",
                              marginTop:"2px",
                              width:'52px',
                              height:'52px',
                            }}>
                      </img>
                    </Col>
                  <Col
                    span={18}
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      padding: "15px",
                      fontSize: "19px"
                    }}>
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
                        fontSize: "20px",
                        marginTop:"1px"
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
                      boxShadow: "5px 10px 15px #707070"}}>
                    <div
                      className="ul"
                      style={{
                        width: "100%",
                        background: "#405EA5",
                        color: "#fff",
                        fontFamily: "Sukhumvit Set, sans-serif"}}>

                      <Link to="#">
                        <li onClick={async(e)=>await this.setState({listMenu:false,show:0},window.location.reload())} style={{ borderTop: " 1px solid #707070" }}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leave.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"}}>
                              ลางาน
                            <Icon type="right" style={{ float: "right" }} />{" "}
                          </li>
                        </Link> 
                      : null}

                        <Link to={`/proFile/${this.state.userId}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>

                        {/* hr */}
                        {this.state.status === 2 ?
                        <Link to={`/adminMenu/${this.state.company}`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* Superhr */}
                      {this.state.status === 3 ?
                        <Link to={`/sumCompany/`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* admin */}
                      {this.state.status === 4 ?
                        <Link to={`/adminMenu/${this.state.company}`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* root */}
                      {this.state.status === 5 ?
                        <Link to={`/companyMenu`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                         </Link>
                      : null}

                    </div>
                  </div>
                ) : null}
        
        
                <div className="in-alls">
                  <Avatars style={{ marginTop: "30px" , position:'relative'}}>
                      <Avatar size={100} src={this.state.img}/>
                  </Avatars>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "30px",
                      fontWeight: "700",
                      fontSize: "18px"
                    }}>
                      {this.state.username}
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
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['1']}
                    >
                    <Menu.Item 
                      key="1" 
                      style={{ 
                        width: "50%",
                        textAlign: "center",
                        borderRight: 'none',
                        fontWeight: "500",
                        borderTop:'none',
                        fontFamily:"Sukhumvit Set, sans-serif"
                      }}>

                        <Link onClick={e=>this.setState({allow:true})} to="#">  วันลาคงเหลือ</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      style={{ width: "50%", textAlign: "center", fontWeight: "500",borderTop:'none',borderLeft:'2px solid #F0F0F0', fontFamily:"Sukhumvit Set, sans-serif" }}>
                      <Link onClick={e=>this.setState({allow:false})} key="mali" to="#"> ติดตามอนุมัติ</Link>
                    </Menu.Item>
                  </Menu>
                    <p style={{margin:"5px",}}></p>
         {this.state.allow === true ? this.state.leave.length !== 0 ? this.state.leave.slice(0, this.state.leave.length).map((item, index) => {
          return (
            <Link to={`/leave-request/${item.leaveType}/user`} key={index}>
              <List.Item style={{ background: "#fff", width: "94%", borderRadius: "0.5rem", margin: "10px auto", fontFamily:"Sukhumvit Set, sans-serif" }}>
                <List.Item.Meta
                  title={ 
                  <div style={{  marginLeft: "15px",marginTop: "5px",fontFamily:"Sukhumvit Set, sans-serif" }}>
                       <p style={{ fontSize: "17px", fontWeight: "bold", marginTop:"8px", fontFamily:"Sukhumvit Set, sans-serif",width:'80%',display:'block'}}>
                          {item.leaveType} :
                        </p>
                        <p style={{ color: "#B1B1B1", marginTop: "-10px",fontFamily:"Sukhumvit Set, sans-serif" }}> คงเหลือ {item.leaveDay} วัน </p>
                    </div>
                  }/>
                  <div className="" style={{ color: "#415CA5", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                   <Icon className="fas fa-angle-right" type="right" style={{ float: "right", fontSize: "20px", marginRight: "10px", color:'#000000', fontFamily:"Sukhumvit Set, sans-serif" , }}/>
                </div>
              </List.Item>
            </Link>
          )
            })
      :
      <Link to="#" key="#">
         <Card size="small" style={{ width: "95%", margin: "5px auto 0", borderRadius: "0.5rem" }}>
           <p style={{ fontSize: "15px", fontWeight: "bold",fontFamily:"Sukhumvit Set, sans-serif" }}>ไม่พบข้อมูล :</p>
           <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif"}}> ไม่พบข้อมูล </p> 
         </Card>
       </Link>
      :
      <div>
        <div className="box-1">
          <h3 style={{
                      width: "97%",
                      margin: "10px auto",
                      marginLeft: "15px",
                      fontSize: "18px",
                      fontFamily: 'Sukhumvit Set", sans-serif' }}>
              คำขอที่กำลังดำเนินการรอ
            </h3>
      {this.state.allow_wait !== undefined ?this.state.waitreq ===1? this.state.allow_wait.length !== 0 ?  this.state.allow_wait.slice(0, this.state.allow_wait.length).map((item, index) => {
              return (
                    <Link to={`/leave-request/${item.id}/user`} key={index}>
                      <Card size="small" style={{ width: '100%', margin:'auto', borderRadius:'' }}>
                                  <Row>
                                      <Col span={18}  >
                                          <div style={{marginLeft:'10px',marginTop:'10px',borderRight:'1px solid #f0f0f0', fontFamily:"Sukhumvit Set, sans-serif"}} >
                                              <p style={{ fontSize: '16px', fontWeight: 'bold', fontFamily:"Sukhumvit Set, sans-serif" }}>
                                                {item.data.leaveType} ({item.data.leaveSum} วัน)
                                              </p>
                                              <p style={{ fontSize: '14px', color: '#B1B1B1', display:'block', overflow:'hidden', textOverflow:'ellipsis',marginTop: '-10px', fontFamily:"Sukhumvit Set, sans-serif" }}>
                                                วันที่ลา : {moment(item.data.dateStart).format('L')} - {moment(item.data.dateEnd).format('L')}
                                              </p>
                                              <p style={{ fontSize: '14px', 
                                                          color: '#B1B1B1',

                                                          display:'block', 
                                                          overflow:'hidden', 
                                                          textOverflow:'ellipsis',
                                                          textDecoration: 'none', 
                                                          whiteSpace: 'nowrap',
                                                          width:"80%",

                                                          marginTop:'-10px', 
                                                          fontFamily:"Sukhumvit Set, sans-serif" }}>
                                                {`${item.data.noteMe}`}
                                              </p>
                                          </div>
                                          </Col>
                                          <Col span={5} style={{float:'right'}} >
                                            <div  style={{textAlign:'center',marginTop: '20px',fontFamily:"Sukhumvit Set, sans-serif"}} >
                                                  <Tag color="#E38546" >รออนุมัติ</Tag><br />
                                                    <Link
                                                      to="#"
                                                      onClick={async(e)=>await this.setState({item:item.id,file:item.data.file},itemitme)}
                                                      style={{
                                                        paddingRight: "10px",
                                                        marginTop: "#",
                                                        fontSize: "15px",
                                                        fontFamily:"Sukhumvit Set, sans-serif"
                                                      }}
                                                    ><p></p>
                                                      ยกเลิก
                                                    </Link>
                                            </div>
                                          </Col>
                                    </Row>
                                </Card>
                    </Link>
          )
          })
          
          : <div>
        <Link to="#" key="#">
          <Card
            size="small"
            style={{ width: "100%", margin: "0px auto 0", fontFamily:"Sukhumvit Set, sans-serif" }}
          >
            <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif" }}>
              ไม่พบข้อมูล
            </p>
            <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
            ไม่พบข้อมูล
            </p>
            <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
            ไม่พบข้อมูล
            </p>
            
            <div
              className="border"
              style={{
                height: "10vh",
                marginTop: "-90px",
                position: "relative",
                width: "25%",
                float: "right",
                fontFamily:"Sukhumvit Set, sans-serif"
                // borderLeft: "1px solid #EAEAEA"
              }}
            >
              <Link
                to=""
                style={{
                  float: "right",
                  paddingRight: "10px",
                  marginTop: "50px",
                  fontSize: "15px"
                }}
              >  
              </Link>
            </div>
          </Card>
        </Link></div>
        : <Card size="small" style={{ width: '100%', margin:'10px auto 0', borderRadius:'', fontFamily:"Sukhumvit Set, sans-serif" }}  >
            <Skeleton avatar active  paragraph={{ rows: 2 }}  />
        </Card>
        : <div><Link to="" key="#">
        <Card
          size="small"
          style={{ width: "100%", margin: "0px auto 0", fontFamily:"Sukhumvit Set, sans-serif" }}
        >
          <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif" }}>
            ไม่พบข้อมูล
          </p>
          <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
          ไม่พบข้อมูล
          </p>
          <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
          ไม่พบข้อมูล
          </p>
          
          <div
            className="border"
            style={{
              height: "10vh",
              marginTop: "-90px",
              position: "relative",
              width: "25%",
              float: "right",
              // borderLeft: "1px solid #EAEAEA"
            }}
          >
            <Link
              to=""
              style={{
                float: "right",
                paddingRight: "10px",
                marginTop: "50px",
                fontSize: "15px"
              }}
            >
            </Link>
          </div>
        </Card>
      </Link></div>
          }        
                  <div className="box-2">
                    <h3
                      style={{
                        width: "97%",
                        margin: "15px auto",
                        marginLeft: "15px",
                        fontSize: "18px",
                        fontFamily: 'Sukhumvit Set", sans-serif'
                      }}
                    >
                      ประวัติการลา
                    </h3>
                    {this.state.allow_complete !== undefined ?this.state.waitreq ===1?this.state.allow_complete.length !== 0 ? 
                    this.state.allow_complete.slice(0, this.state.allow_complete.length).map((item, index) => {
                      return(
                      <Link to={`/leave-request/${item.id}/user`}  key={index}>
                                <Card size="small" style={{ width: '100%', margin:'auto', borderRadius:'', fontFamily:"Sukhumvit Set, sans-serif" }}>
                                  <Row>
                                      <Col span={18}  >
                                          <div style={{marginLeft:'10px',marginTop:'10px',borderRight:'1px solid #f0f0f0', fontFamily:"Sukhumvit Set, sans-serif" }} >
                                              <p style={{ fontSize: '16px', fontWeight: 'bold', fontFamily:"Sukhumvit Set, sans-serif"}}>
                                                  {item.data.leaveType} ({item.data.leaveSum} วัน)
                                              </p>
                                              <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px', fontFamily:"Sukhumvit Set, sans-serif" }}>
                                                  วันที่ลา : {moment(item.data.dateStart).format('L')} - {moment(item.data.dateEnd).format('L')}
                                              </p>

                                                {item.data.status === 1 ? 
                                                  <p style={{ fontSize: '14px', 

                                                              display:'block', 
                                                              overflow:'hidden', 
                                                              textOverflow:'ellipsis',
                                                              textDecoration: 'none', 
                                                              whiteSpace: 'nowrap',
                                                              color: '#F70837', 
                                                              marginTop: "-10px", 
                                                              width:"80%", 
                                                              fontFamily:"Sukhumvit Set, sans-serif" }}>
                                                      {item.data.status === 1 ? item.data.noteAdmin  !== "" ?  item.data.noteAdmin :null  : item.data.noteMe !== "" ? item.data.noteMe : null}
                                                   </p>
                                                  :<div>
                                                  <p style={{ fontSize: '14px',
                                                              display:'block', 
                                                              overflow:'hidden', 
                                                              textOverflow:'ellipsis', 
                                                              textDecoration: 'none', 
                                                              whiteSpace: 'nowrap',
                                                              color: '#B1B1B1',  
                                                              marginTop: "-10px", 
                                                              width:"80%", 
                                                              fontFamily:"Sukhumvit Set, sans-serif" }}>
                                                      {item.data.status === 1 ? item.data.noteAdmin  !== "" ?  item.data.noteAdmin :null  : item.data.noteMe !== "" ? item.data.noteMe : null}
                                                  </p>
                                                  </div>}
                                          </div>
                                          </Col>
                                          <Col span={5} style={{float:'right'}} >
                                            <div  style={{textAlign:'center',marginTop: '40px', fontFamily:"Sukhumvit Set, sans-serif"}} >
                                            {item.data.status === 1 ?

                                                  <div  style={{textAlign:'center',marginTop: '20px', fontFamily:"Sukhumvit Set, sans-serif"}} >
                                                    <Tag color="#F70B1D" >ไม่อนุมัติ</Tag><br />
                                                 </div> : 
                                                 <div  style={{textAlign:'center',marginTop: '20px', fontFamily:"Sukhumvit Set, sans-serif"}} >
                                                    <Tag color="#34B23D" >อนุมัติ</Tag><br />
                                                 </div> }
                                            </div>
                                          </Col>
                                    </Row>
                                </Card>
                    </Link>
                    
                      )
                    }) 
         : 
                    <Link to="" key="#">
                    <Card
                      size="small"
                      style={{ width: "100%", margin: "0px auto 0" }}
                    >
                      <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif" }}>
                        ไม่พบข้อมูล
                      </p>
                      <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                      ไม่พบข้อมูล
                      </p>
                      <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                      ไม่พบข้อมูล
                      </p>
                      
                      <div
                        className="border"
                        style={{
                          height: "10vh",
                          marginTop: "-90px",
                          position: "relative",
                          width: "25%",
                          float: "right",
                          fontFamily:"Sukhumvit Set, sans-serif"
                          // borderLeft: "1px solid #EAEAEA"
                        }}
                      >
                        <Link
                          to="#"
                          style={{
                            float: "right",
                            paddingRight: "10px",
                            marginTop: "50px",
                            fontSize: "15px",
                            fontFamily:"Sukhumvit Set, sans-serif"
                          }}
                        >
                          
                        </Link>
                      </div>
                    </Card>
                  </Link>
                  :
                    <Card size="small" style={{ width: '100%', margin:'10px auto 0', borderRadius:'' }}  >
            <Skeleton avatar active  paragraph={{ rows: 2 }}  />
        </Card>
        : <div><Link to="" key="#">
          <Card
          >
            <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif" }}>
              ไม่พบข้อมูล
            </p>
            <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
            ไม่พบข้อมูล
            </p>
            <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
            ไม่พบข้อมูล
            </p>
            
            <div
              className="border"
              style={{
                height: "10vh",
                marginTop: "-90px",
                position: "relative",
                width: "25%",
                float: "right",
                // borderLeft: "1px solid #EAEAEA"
              }}
            >
              <Link
                to=""
                style={{
                  float: "right",
                  paddingRight: "10px",
                  marginTop: "50px",
                  fontSize: "15px"
                }}
              >
                
              </Link>
            </div>
          </Card>
        </Link>
        </div>}
                    </div>
                  </div>
                  </div>}      
                </div>
              </div>
            )
          }  
        } else {
          return(
            <Spin tip="Loading...">
                <div>{loaddata()}
                </div>
            </Spin>
          )
        }
      } else {
        return(
          <Spin tip="Loading...">
              <div>
                {loaddata()}
              </div>
          </Spin>
        )
      }   
  }
}
export default Home;
