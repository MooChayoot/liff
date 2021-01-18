import React, { Component } from "react";
import {  Link } from "react-router-dom";
import styled from "styled-components";
import "./proFile.css";
import axios from "axios";
import "antd/dist/antd.css";
import {
          Row, 
          Col,
          Avatar,  
          Input, 
          Spin,
          Button,
          // Select,
          Modal,
          Icon,
        } from 'antd';
// const { confirm } = Modal;
  const liff = window.liff;

// const Buttons = styled.div`
//   margin-top: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
const Avatars = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class proFile extends Component {

  constructor(props) {
    super(props);
    this.state = { show:0,
    userId : "",
    listMenu: false,
    loading: true,
    pictureUrl : "",
    dataSource: [],
    value: '' ,
    pname:'นาย',
    fname:'',
    lname:'',
    nname:'',
    position:'',
    statusdocid:'',
    company:'' ,
    companyname:'',
     out:0,
     statusfail:'' ,
     allcompany:[],
     docid:'',
     status:'',
     showlindid:0};
  }

  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }

  async componentDidMount() {
      await  liff.init(async (data) => {
          let profile = await liff.getProfile();
       await   this.setState({
            userId : profile.userId
          });
        }); 
      const { match: { params } } = this.props;
     await this.setState({docid:params.id,root:params.root})
      
  } 

  render() {
const confirm = () => {
  Modal.confirm({
    title: "แจ้งเตือน ",
    content: (
      <div>
        <p style={{ fontWeight: "900", fontFamily:"Sukhumvit Set, sans-serif"  }}>คุณต้องการลบ บัญชีนี้ ใช่หรือไม่</p>
        <p style={{ fontSize: "14px", color: "#9D9D9D", fontFamily:"Sukhumvit Set, sans-serif"  }}>
        กด OK เพื่อยืนยัน การลบ
        </p>
      </div>
    ),
    onOk() {
      deluser()
    }
  });
};
const deluser =async () => {
  if (this.state.docid !== "") {
    await this.setState({out:1})
  await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/deluser?lineid=${this.state.userId}&userid=${this.state.docid}`)
    .then((data) => { 
      path()
    }).catch(async() => {
        this.setState({show:1})
    });
  }
}
    const path = () => {
        if(this.state.root === "root"){
          this.props.history.push(`/memberList/root`)   
        }else if(this.state.root === "user"){
           this.props.history.push(`/home`)
        }else{
           this.props.history.push(`/memberList/${this.state.company}`)  
        }
    }
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
    let loaddata= ()=>{
      if (this.state.show === 0 &&this.state.docid !== "") {
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.docid}`)
        .then((data) => {    
      this.setState({value:data.data.data.tel,
        pictureUrl:data.data.data.img,
        pname:data.data.data.pname,
        fname:data.data.data.fname,
        lname:data.data.data.lname,
        nname:data.data.data.nname,
        position:data.data.data.position,
        company:data.data.data.company,
        statusdocid:data.data.data.status,
        show:1})
        }).catch(async(err) => {
          console.log(err);
          
            this.setState({show:1})
        });
      }
      
      if (this.state.showlindid === 0 && this.state.userId !== '') {
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
        status:data.data.data.status,leave:loop3.length ===0 ? loop1:loop3,companylineid:data.data.data.company,
        showlindid:1})
        }).catch(async() => {
            this.setState({showlindid:1})
        });
      }
    }
    let pathofedit=()=>{
      this.props.history.push(`/proFile/${this.state.userId}/user`)
      window.location.reload()
    }
  if(this.state.out === 0 ){
  if(this.state.show === 1 ){
    if(this.state.showlindid === 1 ){
      if (this.state.status > 0 && this.state.status !== null && this.state.status !== undefined) {
            return (
              <div className="all-register">
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
          <Link to="#">
            <i
             onClick={path}
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
            padding: "15px",
            fontSize: "20px",
            marginTop:"-5px",
            fontFamily: "Sukhumvit Set, sans-serif"
          }}
        >
          {this.state.userId === this.state.docid ? "บัญชีผู้ใช้" : "ข้อมูลพนักงาน"}
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
              marginTop:"-2px",
              padding: "15px"
            }}
          />
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
            
            <Link to="/home">
              <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}> วันลาคงเหลือ </li>
            </Link>

            {this.state.leave.length !== 0 ?
              <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
               <li style={{ borderTop: " 1px solid #707070" , fontFamily:"Sukhumvit Set, sans-serif" }}>
                  ลางาน
                  <Icon type="right" style={{ float: "right" }} />{" "}
               </li>
              </Link> 
              : null}
              {this.state.userId === this.state.docid ?
              <Link to="#">
              <li onClick={async(e)=>await this.setState({listMenu:false,show:0},window.location.reload())} style={{ borderTop: " 1px solid #707070" }}>
                 บัญชีผู้ใช้ <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif"  }} />
              </li>
            </Link> :
                <Link to="#">
                          <li onClick={pathofedit} style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif"}}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>}
            {this.state.status === 2 ?  
              <Link to={`/adminMenu/${this.state.companylineid}`}>
                <li style={{ borderTop: " 1px solid #707070" }}>
                  ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif"  }} />
                </li>
            </Link>
            :null}

            {/* Superhr */}
            {this.state.status === 3 ?
                <Link to={`/sumCompany/`}>
                    <li style={{ borderTop: " 1px solid #707070" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif"  }} />
                    </li>
                </Link>
            : null}

            {/* admin */}
            {this.state.status === 4 ?
                 <Link to={`/adminMenu/${this.state.companylineid}`}>
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


                <div className="in-register">
                  <Avatars style={{ marginTop: "20px" }}>
                    <Avatar
                      size={100}
                      src={this.state.pictureUrl}
                    />
                  </Avatars>        
                  <div style={{ marginTop: "20px", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  <Input
              disabled
              prefix="ข้อมูลส่วนตัว :"
              
              suffix={this.state.userId === this.state.docid ?<Link to={`/editProfile/${this.state.docid}/${this.state.root}`}>แก้ไข</Link>: this.state.status > 3?
              <Link to={`/editProfile/${this.state.docid}/${this.state.root}`}>แก้ไข</Link>:null}
            />
                    <Input disabled prefix="คำนำหน้า :" value={this.state.pname} />
                    <Input disabled prefix="ชื่อ :"  value={this.state.fname} onChange={e=>this.setState({fname:e.target.value})} placeholder="First Name" />
                    <Input disabled prefix="นามสกุล :" value={this.state.lname} onChange={e=>this.setState({lname:e.target.value})} placeholder="Last Name" />
                    <Input disabled prefix="ชื่อเล่น :" value={this.state.nname} onChange={e=>this.setState({nname:e.target.value})} placeholder="Nick Name" />
                    <Input disabled prefix="เบอร์โทร :" value={this.state.value}    />
                    <Input disabled prefix="บริษัท :" value={this.state.company}    />
                    <Input disabled prefix="ตำแหน่งงาน :" value={this.state.position} onChange={e=>this.setState({position:e.target.value})} placeholder="Position" />
                    <Input disabled  prefix="Status :"   value={this.state.statusdocid === 1?"User":
                    this.state.statusdocid === 2?"HR":
                    this.state.statusdocid === 3?"Super HR":
                    this.state.statusdocid === 4?"Admin":"Super Admin"
                    } />
                  </div>
                  {this.state.status >3 ? this.state.status > this.state.statusdocid? 
                  <Button 
            onClick={confirm}
            style={{
                color:'red',
                border:'1px solid red',
                display:'block',
                margin:'20px auto',
                width:'160px',
                height:'45px',
                borderRadius:'1rem',
                fontFamily:"Sukhumvit Set, sans-serif", 
            }}
          >ลบบัญชี</Button>:null:null}
                </div>
                                            
              </div>
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
}else{
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

export default proFile;
