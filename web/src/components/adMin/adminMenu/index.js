import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo1 from "./image/1.png";
import logo2 from "./image/2.png";
import logo3 from "./image/3.png";
import logo4 from "./image/4.png";
import logo5 from "./image/5.png";
import logo6 from "./image/6.png";
import logo7 from "./image/7.2.png";
import "antd/dist/antd.css";
import "./adminMenu.css";
import axios from "axios";
import {
  Row,
  Col,
  List,
  Icon,
  Avatar,
  Spin,
  // Button
} from "antd";
const liff = window.liff;
class adminMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    loading: true,
    listMenu: false,
    userId :"",
    id:'',
    status:'',
    statusfail:'',
    username:'',
    leave:[],
    showallow:0,
    showcompany:0,
    show:0,
    allow_complete:[],
    img:"",
    file:'',
    company:'',
  };
} 
  onChange = checked => {
    this.setState({ loading: !checked });
  };
  //Menu{
  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
  //}Menu

//api รับค่า id
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

  render() {



    let loaddata = ()=>{
      if (this.state.id !== "" && this.state.showcompany === 0) {
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/company_One?nameCompany=${this.state.id}`)
        .then( async(data) => {    
          // console.log(data.data)
          await this.setState({
                company:data.data.company[0].data,showcompany:1
          })  
        }).catch(async() => {
                this.setState({showcompany:1})
            });
        } 
        if (this.state.userId != "" && this.state.show === 0) {
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
                        status:data.data.data.status,
                        leave:loop3.length ===0 ? loop1:loop3,
                        nameCompany:data.data.data.company,show:1
                       })
              // console.log(this.state.status);
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
    if (this.state.show === 1 ) {
      if (this.state.showcompany === 1 ) {
        if (this.state.status > 1 && this.state.status !== null && this.state.status !== undefined) {
      return (
        <div className="all-adminMenu">
          <header>
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
              rel="stylesheet"
            />
          </header>
          {/* menuabar */}
          <Row
            className=""
            style={{ background: "#405EA5", position: "relative" , }}
          >
            <Col span={3}>
              {/* ดัก status */}
          <Link to={this.state.status > 4 ? `/companyMenu`:this.state.status === 3 ?`/sumCompany` :`/home` }>
              <i className="fas fa-arrow-left" 
                 style={{ cursor: 'pointer', color: '#fff', padding: '20px',fontSize: '20px' }}>
              </i>
              </Link>
          </Col>
            {/* <Col
              span={8}
              style={{
                textAlign: 'right',
                color: '#fff',
                padding: '10px',
                fontSize: '18px',
                // border:'1px solid red',
              }}
            >      */}
               
                {/* </Col> */}
              <Col 
                  span={18}
                  style={{ 
                    textAlign: '',
                    color: '#fff',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    paddingTop: '5px',
                    fontSize: '18px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight:'1em',
                    marginTop:'2px',
                    fontFamily:"Sukhumvit Set, sans-serif" 
                    }} >
                      <Avatar size={45} icon="user" style={{marginRight:'10px'}} src={this.state.company.imageCompany} /> 
                       {this.state.company.nameCompany}

               </Col>
            <Col span={3} >
              <Icon
                type="menu"
                onClick={() => this.listMenushow()}
                style={{
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: '#fff',
                  float: 'right',
                  padding: '20px',
                  marginTop:'-2px'
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
                      boxShadow: "5px 10px 15px #707070"
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
                      <Link to="/home">
                        <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leave.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                              ลางาน
                            <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif"  }} />
                          </li>
                        </Link> 
                      : null}

                        <Link to={`/proFile/${this.state.userId}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                        
                      {/* admin */}
                      {this.state.status === 2 ?
                        <Link to="#">
                          <li onClick={async(e)=>await this.setState({listMenu:false,status:""},window.location.reload())} style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}
                      {this.state.status === 3 ?
                        <Link to={`/sumCompany/`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}
                      {this.state.status === 4 ?
                        <Link to="#">
                          <li onClick={async(e)=>await this.setState({listMenu:false,status:""},window.location.reload())} style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
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
        
  

          <div className="contentMenu">
            {/* list1 */}

            {this.state.status > 3 ? <div>
            <Link to={`/verify/${this.state.id}`}>
              <List.Item
                style={{
                  background: "#fff",
                  width: "94%",
                  borderRadius: "0.5rem",
                  margin: "10px auto",
                  fontFamily:"Sukhumvit Set, sans-serif" 
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={logo1}
                      style={{ padding: "5px", marginLeft: "10px" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#415CA5",
                        marginRight: "7px",
                        marginTop: "10px",
                        fontFamily:"Sukhumvit Set, sans-serif" 
                      }}
                    >
                      <p>คำขอยืนยันตัวตนสมาชิก รออนุมัติ</p>
                    </div>
                  }
                />
                <div className="" style={{ color: "#415CA5", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  <Icon
                    className="fas fa-angle-right"
                    type="right"
                    style={{
                      float: "right",
                      fontSize: "20px",
                      marginRight: "10px",
                      fontFamily:"Sukhumvit Set, sans-serif" 
                    }}
                  />
                </div>
              </List.Item>
            </Link>
            
  
            {/* list2 */}
            <Link to={`/requestConfirm/${this.state.company.nameCompany}`}>
              <List.Item
                style={{
                  background: "#fff",
                  width: "94%",
                  borderRadius: "0.5rem",
                  margin: "10px auto",
                  fontFamily:"Sukhumvit Set, sans-serif" 
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={logo2}
                      style={{ padding: "5px", marginLeft: "10px" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#415CA5",
                        marginRight: "7px",
                        marginTop: "10px",
                        fontFamily:"Sukhumvit Set, sans-serif" 
                      }}
                    >
                      <p style={{ width: "80%", fontFamily:"Sukhumvit Set, sans-serif"  }}>คำขออนุมัติลางาน รออนุมัติ</p>
                    </div>
                  }
                />
                <div className="" style={{ color: "#415CA5" , fontFamily:"Sukhumvit Set, sans-serif" }}>
                  <Icon
                    className="fas fa-angle-right"
                    type="right"
                    style={{
                      float: "right",
                      fontSize: "20px",
                      marginRight: "10px"
                    }}
                  />
                </div>
              </List.Item>
            </Link>
            </div>  : null}

            {/* list4 */}     {/*  ส่งชื่อ company โดยการ .nameCompany  ไปยังหน้าที่กด*/}
            <Link to={`/HistoryApproval/${this.state.company.nameCompany}`}> 
              <List.Item
                style={{
                  background: "#fff",
                  width: "94%",
                  borderRadius: "0.5rem",
                  margin: "10px auto",
                  fontFamily:"Sukhumvit Set, sans-serif" 
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={logo3}
                      style={{ padding: "5px", marginLeft: "10px" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#415CA5",
                        marginRight: "7px",
                        marginTop: "10px",
                        fontFamily:"Sukhumvit Set, sans-serif" 
                      }}
                    >
                      <p style={{ width: "80%" , fontFamily:"Sukhumvit Set, sans-serif" }}>
                        ประวัติการอนุมัติ อนุมัติ/ไม่อนุมัติ
                      </p>
                    </div>
                  }
                />
                <div className="" style={{ color: "#415CA5", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  <Icon
                    className="fas fa-angle-right"
                    type="right"
                    style={{
                      float: "right",
                      fontSize: "20px",
                      marginRight: "10px"
                    }}
                  />
                </div>
              </List.Item>
            </Link>
            {/* list5 */}
            <Link to={`/statistics/${this.state.company.nameCompany}`}>
              <List.Item
                style={{
                  background: "#fff",
                  width: "94%",
                  borderRadius: "0.5rem",
                  margin: "10px auto",
                  fontFamily:"Sukhumvit Set, sans-serif" 
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={logo4}
                      style={{ padding: "5px", marginLeft: "10px" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#415CA5",
                        marginRight: "7px",
                        marginTop: "25px",
                        fontFamily:"Sukhumvit Set, sans-serif" ,
                      }}
                    >
                      <p>สถิติการลา</p>
                    </div>
                  }
                />
                <div className="" style={{ color: "#415CA5" }}>
                  <Icon
                    className="fas fa-angle-right"
                    type="right"
                    style={{
                      float: "right",
                      fontSize: "20px",
                      marginRight: "10px"
                    }}
                  />
                </div>
              </List.Item>
            </Link>
  
            {/* list6 */}
            <Link to={`/memberList/${this.state.company.nameCompany}`}>
              <List.Item
                style={{
                  background: "#fff",
                  width: "94%",
                  borderRadius: "0.5rem",
                  margin: "10px auto"
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={logo5}
                      style={{ padding: "5px", marginLeft: "10px" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#415CA5",
                        marginRight: "7px",
                        marginTop: "25px",
                        fontFamily:"Sukhumvit Set, sans-serif" 
                      }}
                    >
                      <p>รายชื่อสมาชิก</p>
                    </div>
                  }
                />
                <div className="" style={{ color: "#415CA5" }}>
                  <Icon
                    className="fas fa-angle-right"
                    type="right"
                    style={{
                      float: "right",
                      fontSize: "20px",
                      marginRight: "10px"
                    }}
                  />
                </div>
              </List.Item>
            </Link>
  
            {/* list7 */}
            {this.state.status > 3?
            <Link to={`/settingLeave/${this.state.id}`} >
              <List.Item
                style={{
                  background: "#fff",
                  width: "94%",
                  borderRadius: "0.5rem",
                  margin: "10px auto"
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={logo6}
                      style={{ padding: "5px", marginLeft: "10px" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#415CA5",
                        marginRight: "7px",
                        marginTop: "25px",
                        fontFamily:"Sukhumvit Set, sans-serif" ,
                      }}
                    >
                      <p>ตั้งค่าการลา</p>
                    </div>
                  }
                />
                <div className="" style={{ color: "#415CA5" }}>
                  <Icon
                    className="fas fa-angle-right"
                    type="right"
                    style={{
                      float: "right",
                      fontSize: "20px",
                      marginRight: "10px"
                    }}
                  />
                </div>
              </List.Item>
            </Link>:null}

                     {/* list8 */}
            {this.state.status > 3?
            <Link to={`/position/${this.state.company.nameCompany}`} >
              <List.Item
                style={{
                  background: "#fff",
                  width: "94%",
                  borderRadius: "0.5rem",
                  margin: "10px auto"
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={logo7}
                      style={{ padding: "5px", marginLeft: "10px" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#415CA5",
                        marginRight: "7px",
                        marginTop: "25px",
                        fontFamily:"Sukhumvit Set, sans-serif" ,
                      }}
                    >
                      <p>ตั้งค่าตำแหน่ง</p>
                    </div>
                  }
                />
                <div className="" style={{ color: "#415CA5" }}>
                  <Icon
                    className="fas fa-angle-right"
                    type="right"
                    style={{
                      float: "right",
                      fontSize: "20px",
                      marginRight: "10px"
                    }}
                  />
                </div>
              </List.Item>
            </Link>:null}

          </div>
          {/* contentMenu */}
        </div> // all
      )
    }else{
      return(
        <Spin tip="คุณไม่มีสิทธิ์ เข้าถึงส่วนนี้">
            <div>
          {countdown()}
            </div>
        </Spin>
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
          <div>{loaddata()}
          </div>
      </Spin>
    )
  }
    
  }
}
export default adminMenu;
