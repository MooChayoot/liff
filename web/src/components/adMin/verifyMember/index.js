import React, { Component } from "react";
import {Link } from "react-router-dom";
import styled from "styled-components";
import "./verifyMember.css";
import "antd/dist/antd.css";
import axios from "axios";
import {
  Row,
  Col,
  Avatar,
  Button,
  Input,
  Spin,
  Icon
} from "antd";

const liff = window.liff;
// const
// const { Option } = Select;
// const InputGroup = Input.Group;

const Avatars = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class verifyMember extends Component {
  constructor() {
    super();
    this.state = {
      userId :"",
      listMenu: false,
      id:'',
      out:0,
      user:[],
      show:0,
      statuserror:0,
      showuser:0,
      allowstatus:"",
      company:'',
      status:'',
      statusfail:'',
      username:'',
      leave:[],
      showallow:0,
      img:"",
      file:''

    };
  }
  async componentDidMount ()  {
      await  liff.init(async (data) => {
          let profile = await liff.getProfile();
       await   this.setState({
            userId : profile.userId
          });
        }); 
    await  this.setState({
      id:this.props.match.params.id
      })
      
    } 
    

  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
  //Menu
  render() {
    let loaddata = ()=>{
      if (this.state.userId !== "" && this.state.show === 0) {
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
        status:data.data.data.status,show:1
        ,companyme:data.data.data.company,
        leaveme:loop3.length ===0 ? loop1:loop3             
                    })
    }).catch(async() => {
      this.setState({
                    show:1             
                    })
        });     
      }
      if (this.state.id !== ""&& this.state.showuser === 0) {
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.id}`)
        .then((data) => {  
      this.setState({
            img:data.data.data.img,
            pname:data.data.data.pname,
            fname:data.data.data.fname ,
            lname:data.data.data.lname,
            tel:data.data.data.tel,
            position:data.data.data.position,
            company:data.data.data.company,
            nname:data.data.data.nname,
            showuser:1
                    })
    }).catch(async() => {
      this.setState({
        showuser:1             
        })
        })    
      }
    }
    let allowuser =async () =>{
      await this.setState({out:1})
      await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/allowlogin?userid=${this.state.id}&allowstatus=${this.state.allowstatus}&lineid=${this.state.userId}`)
        .then((data) => {  
          this.props.history.push(`/verify/${this.state.company}`)
    }).catch(async() => {
        });     
      
    }
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
    if (this.state.out === 0 ) {
      if (this.state.show === 1) {
        if (this.state.showuser === 1) {
          if (this.state.status > 3 && this.state.status !== null && this.state.status !== undefined) {
          return (
      <div className="all-verifyMember" style={{ fontFamily: "Sukhumvit Set" }}>
        <header>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
            rel="stylesheet"
          />
        </header>

        <Row
          className=""
          style={{ background: "#405EA5", position: "relative" }}
        >
          <Col span={3}>
            <Link to={`/verify/${this.state.company}`}>
              <i
                className="fas fa-arrow-left"
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  padding: "15px",
                  fontSize: "20px"
                }}
              ></i>
            </Link>
          </Col>
          <Col
            span={18}
            style={{
              textAlign: "center",
              color: "#fff",
              padding: "10px",
              fontSize: "18px",
              marginTop:"2px",
              fontFamily:"Sukhumvit Set, sans-serif"
            }}
          >
            อนุมัติสิทธิ์เข้าสู่ระบบ
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
                marginTop:"-2px",
                fontSize: "20px"
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
                        <li style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif"}}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leaveme.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leaveme[0].leaveType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ลางาน
                            <Icon type="right" style={{ float: "right" }} />{" "}
                          </li>
                        </Link> 
                      : null}

                        <Link to={`/proFile/${this.state.userId}/user`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
            
                      {/* admin */}
                      {this.state.status === 4 ?
                        <Link to={`/adminMenu/${this.state.company}`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* root */}
                      {this.state.status === 5 ?
                        <Link to={`/companyMenu/${this.state.company}`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                         </Link>
                      : null}

                    </div>
                  </div>
                ) : null}

        <div className="in-allproFile">
          <Avatars style={{ marginTop: "20px" }}>
            <Avatar
              size={100}
              src={this.state.img}
            />
          </Avatars>

          <div style={{ marginTop: "20px" }}>
            <Input
              disabled
              prefix="ข้อมูลส่วนตัว"
              style={{
                fontSize: "18px",
                fontFamily: "Sukhumvit Set",
                fontWeight: "900"
              }}
            />
            <Input
              disabled
              size="large"
              prefix="คำนำหน้า :"
              value={this.state.pname}
            />
            <Input disabled size="large" prefix="ชื่อ :" value={this.state.fname} />
            <Input
              disabled
              size="large"
              prefix="นามสกุล :"
              value={this.state.lname}
            />
            <Input
              disabled
              size="large"
              prefix="ชื่อเล่น :"
              value={this.state.nname}
            />
            <Input
              disabled
              size="large"
              prefix="เบอร์โทร :"
              value={this.state.tel}
              type="text"
            />
            <Input
              disabled
              size="large"
              prefix="ตำแหน่ง :"
              value={this.state.position}
            />
            <Input
              disabled
              size="large"
              prefix="บริษัท :"
              value={this.state.company}
            />
          </div>

          <div className="">
            <Col span={12}>
              <div
                style={{ float: "right", marginRight: "-5px", padding: "10px",fontFamily:"Sukhumvit Set, sans-serif" }}
              >
                <Link to="#">
                  <Button onClick={async(e)=>await this.setState({allowstatus:1},allowuser) } style={{ width: "140px", height: "45px",fontFamily:"Sukhumvit Set, sans-serif" }}>
                    ไม่อนุมัติ
                  </Button>
                </Link>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{ float: "left", marginLeft: "-5px", padding: "10px",fontFamily:"Sukhumvit Set, sans-serif", fontFamily:"Sukhumvit Set, sans-serif" }}
              >
                <Button
                onClick={async(e)=>await this.setState({allowstatus:2},allowuser) }
                  type="primary"
                  style={{ width: "140px", height: "45px" ,fontFamily:"Sukhumvit Set, sans-serif"}}
                >
                  อนุมัติ
                </Button>
                <br />
              </div>
            </Col>
          </div>
        </div>
      </div>
    );
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
  } else {
    return (
      //spin
      <Spin tip="กรุณารอสักครู่">
      <div className="all-register">
      
      </div>
      </Spin>
    )
  }
  }
}
export default verifyMember;
