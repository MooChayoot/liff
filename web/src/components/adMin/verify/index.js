import React, { Component } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./verify.css";
import axios from "axios";
import {
  Row,
  Tag,
  Col,
  Card,
  Avatar,
  Icon,
  Spin,
} from "antd";
const liff = window.liff;
class verify extends Component {
  state = {
    loading: true
  };
  onChange = checked => {
    this.setState({ loading: !checked });
  };

  //Menu
  constructor() {
    super();
    this.state = {
      userId : "",
      listMenu: false,
      company:'',
      user:[],
      showcompany:0,
      id:'',
      show:0,
      statusme:'',
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
          company:this.props.match.params.company
      })
      
    } 

//Menu
  listMenushow() {  
    this.setState({
      listMenu: !this.state.listMenu
    });
  }

render() {
  let loaddata=()=>{
    if (this.state.company !== "" && this.state.showcompany === 0) {
      axios.get(`https://us-central1-twin-hr.cloudfunctions.net/show_allowofcompany?company=${this.state.company}`)
    .then((data) => { 
  this.setState({user:data.data.user,showcompany:1})
    }).catch(async() => {
        this.setState({showcompany:1})
    });
    }
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
                    statusme:data.data.data.status,
                    show:1,
                    leaveme:loop3.length ===0 ? loop1:loop3,
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
if (this.state.show === 1) {
  if (this.state.showcompany === 1) {
    if (this.state.statusme > 3 && this.state.statusme !== null && this.state.statusme !== undefined) {
    return (
      <div className="all-requsetConfirm">
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
            <Link to={`/adminMenu/${this.state.company}`}>
              <i 
              className="fas fa-arrow-left"
              style={{
                cursor: "pointer",
                color: "#fff",
                padding: "15px",
                fontSize: "20px",
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
              fontFamily: "Sukhumvit Set, sans-serif",
            }}
          >
            คำขอยืนยันตัวตน
          </Col>
          <Col span={3}>
            <Icon
              type="menu"
              onClick={() => this.listMenushow()}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "#fff",
                float: "right",
                padding: "15px",
                marginTop:"-2px",
                fontFamily:"Sukhumvit Set, sans-serif"
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
                      boxShadow: "5px 10px 15px #707070",
                      fontFamily:"Sukhumvit Set, sans-serif"
                    }}
                  >
                    <div
                      className="ul"
                      style={{
                        width: "100%",
                        background: "#405EA5",
                        color: "#fff",
                        fontFamily: "Sukhumvit Set, sans-serif",
                        
                      }}
                    >
                      <Link to="/home">
                        <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leaveme.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leaveme[0].leaveType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
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
                      {this.state.statusme === 4 ?
                        <Link to={`/adminMenu/${this.state.companyme}`}>
                          <li style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* root */}
                      {this.state.statusme === 5 ?
                        <Link to={`/companyMenu/${this.state.companyme}`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                         </Link>
                      : null}

                    </div>
                  </div>
                ) : null}
        

        <div className="content">
          {/* card1 */}
          {this.state.user !== undefined ?this.state.user.length !== 0  ?this.state.user.slice(0, this.state.user.length).map((item, index) => {
          return (
          <Link to={`/verifyMember/${item.data.lineid}`} key={index}>
          <Card size="small" style={{ width: '94%', margin:'10px auto 0', borderRadius:'0.5rem' ,cursor:'pointer',fontFamily:'Sukhumvit Set, sans-serif' }}>
                    <Row>
                      <Col span={5}>
                        <Avatar size={50} style={{marginTop:16 ,margin:'15px auto', display:'block',fontFamily:'Sukhumvit Set, sans-serif' }} src={item.data.img} />
                      </Col>
                      <Col span={13}  >
                        <div style={{marginLeft:'5px',marginTop:'10px',borderRight:'1px solid #f0f0f0',fontFamily:'Sukhumvit Set, sans-serif' }} >
                          <p style={{ fontSize: '15px', fontWeight: 'bold',fontFamily:'Sukhumvit Set, sans-serif' }}>{item.data.fname} {item.data.lname}</p>
                          <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px' ,fontFamily:'Sukhumvit Set, sans-serif'}}>{item.data.position}</p>
                          <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px' ,fontFamily:'Sukhumvit Set, sans-serif'}}>{item.data.company}</p>
                        </div>
                      </Col>
                      <Col span={5} offset={1} style={{float:'right'}} >
                        <div  style={{textAlign:'center',marginTop: '40px',fontFamily:'Sukhumvit Set, sans-serif'}} >
                           <Tag color="#E38546" >รออนุมัติ</Tag>
                        </div>
                      </Col>
                    </Row>
                  </Card>
          </Link>)})
 :<Link to="#">
 <Card size="small" style={{ width: '94%', margin:'10px auto 0', borderRadius:'0.5rem' ,cursor:'pointer',fontFamily:'Sukhumvit Set, sans-serif' }}>
           <Row>
             <Col span={24}  >
               <div style={{marginLeft:'5px',marginTop:'10px',borderRight:'',fontFamily:'Sukhumvit Set, sans-serif' }} >
                 <p style={{ fontSize: '16px', fontWeight: '500',fontFamily:'Sukhumvit Set, sans-serif' }}>ไม่พบคำขอสมัครสมาชิก</p>
                 <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px',fontFamily:'Sukhumvit Set, sans-serif' }}>ไม่พบข้อมูล</p>
                 <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px',fontFamily:'Sukhumvit Set, sans-serif'}}>ไม่พบข้อมูล</p>
               </div>
             </Col>
           </Row>
         </Card>
 </Link>
 :<Link to="#">
 <Card size="small" style={{ width: '94%', margin:'10px auto 0', borderRadius:'0.5rem' ,cursor:'pointer',fontFamily:'Sukhumvit Set, sans-serif' }}>
           <Row>
             <Col span={24}  >
               <div style={{marginLeft:'5px',marginTop:'10px',borderRight:'',fontFamily:'Sukhumvit Set, sans-serif' }} >
                 <p style={{ fontSize: '16px', fontWeight: 'bold',fontFamily:'Sukhumvit Set, sans-serif' }}>ไม่พบคำขอสมัครสมาชิก</p>
                 <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px',fontFamily:'Sukhumvit Set, sans-serif' }}>ไม่พบข้อมูล</p>
                 <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px',fontFamily:'Sukhumvit Set, sans-serif' }}>ไม่พบข้อมูล</p>
               </div>
             </Col>
           </Row>
         </Card>
 </Link>
 }
         
        </div>{" "}
        {/* content */}
      </div> // all
    );
            // }
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
  }
}
export default verify;
