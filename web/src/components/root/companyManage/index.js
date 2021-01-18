import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import firebaseApp from '../../../config/firebaseConfig'
import "./companyManage.css";
import "antd/dist/antd.css";
import axios from "axios";
import {
          Row, 
          Col,
          Avatar, 
          Checkbox,   
          Button,
          // Input, 
          // Select,
          // Dropdown,
          Icon,
          // Menu, 
          // Card, 
          Spin, 
          // Tag,
          Modal,
          List,
        } from 'antd';

const liff = window.liff;
class companyManage extends Component {

  //Menu
  constructor(props) {
    super(props);
    this.state = {  value: '',
      listMenu: false,
      dataSource: [],
      loading: true,
      allow:true,
      userId :"",
      id:'',
      del:false,
      status:'',
      showcompany:0,
      username:'',
      show:0,
      leave:[],
      companyDel:[],
      showallow:0,
      company:'',
      allow_complete:[],
      img:"",
      file:''
    };
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
    
    } 

  render() {
let loaddata = ()=>{
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
                  status:data.data.data.status,
                  show:1,
                  leave:loop3.length ===0 ? loop1:loop3,
                  companyme:data.data.data.company
                })
      }).catch(async() => {
        this.setState({show:1})
    });     
  } 
  if(this.state.showcompany === 0){
    axios.get(`https://us-central1-twin-hr.cloudfunctions.net/company_All`)
    .then((data) => {  

        this.setState({
          company:data.data.company,showcompany:1         
        })
  }).catch(async() => {
            this.setState({showcompany:1})
        });
  } 
}
let deleteCompany= async() =>{
  await this.setState({status:99})
  const storageRef = firebaseApp.storage().ref();
for (let index = 0; index < this.state.file.length; index++) {
  // console.log(this.state.file[index]);
      let desertRef  = storageRef.child(`company/${this.state.file[index]}`);
          desertRef.delete().then(async function() {
            
          }).catch(function(error) {
            console.log("error : ",error);
          }); 
    }
    await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/delcompany?data=${this.state.data}&lineid=${this.state.userId}&nameshow=${this.state.nameshow}`)
        .then((data) => {    
          window.location.reload()
    }).catch(async() => {
          // console.log("error")
        })
}
const confirm =async () => {
  await this.setState({file:[]})
  let name = []
  let nameshow = []
  for (let index = 0; index < this.state.companyDel.length; index++) {
    let newStr = this.state.companyDel[index].imageCompany.substring(this.state.companyDel[index].imageCompany.length -27 , this.state.companyDel[index].imageCompany.length -10) 
    let lname = newStr.substring(newStr.length -3 , newStr.length)
    if (lname !== "jpg") {
      let newStr = this.state.companyDel[index].imageCompany.substring(this.state.companyDel[index].imageCompany.length -28 , this.state.companyDel[index].imageCompany.length -10)
    await  this.setState({file:[...this.state.file,newStr]})
    }else{
      let newStr = this.state.companyDel[index].imageCompany.substring(this.state.companyDel[index].imageCompany.length -27 , this.state.companyDel[index].imageCompany.length -10 )
    await  this.setState({file:[...this.state.file,newStr]})
    }
    if (this.state.companyDel.length === 1) {
      name.push('["'+this.state.companyDel[index].nameCompany+'"]')
      nameshow.push(this.state.companyDel[index].nameCompany)
    }else{
    if (index === 0) {
      name.push('["'+this.state.companyDel[index].nameCompany+'"')
      nameshow.push(this.state.companyDel[index].nameCompany)
    }else if (index !== 0 && index < this.state.companyDel.length-1) {
      name.push('"'+this.state.companyDel[index].nameCompany+'"')
      nameshow.push(', '+this.state.companyDel[index].nameCompany)
    }else {
      name.push('"'+this.state.companyDel[index].nameCompany+'"]')
      nameshow.push(' และ'+this.state.companyDel[index].nameCompany)
    }
  }
}
let nameStr = name.toString()
// var newStr = asd.replace(/\s+/g, '');
 await this.setState({data:nameStr,nameshow:nameshow})

  Modal.confirm({
    title: "แจ้งเตือน ",
    content: (
      <div>
        <p style={{ fontWeight: "900" }}>คุณต้องการลบบริษัท {this.state.nameshow} ใช่หรือไม่</p>
        <p style={{ fontSize: "14px", color: "#9D9D9D" }}>
        กด OK เพื่อยืนยัน การลบ 
        </p>
      </div>
    ),
   onOk() {
    
      deleteCompany() 
    }
  });
};


    if(this.state.status === 99){
      return (
        //spin
        <Spin tip="กรุณารอสักครู่">
        <div className="all-register">

        </div>
        </Spin>
      )
    }else{
      if (this.state.show === 1) {
        if (this.state.showcompany === 1) {
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
          <Button
                  type="link"
                  onClick={async(e)=> this.state.del ===false? this.props.history.push(`/companyMenu`):await this.setState({del:!this.state.del,companyDel:[]})}
                >
                  <i
                    className="fas fa-arrow-left"
                    style={{
                      cursor: 'pointer',
                      color: '#fff',
                      paddingTop: '15px',
                      fontSize: '20px'
                    }}
                  ></i>
              </Button>
          </Col>
          <Col
            span={18}
            style={{
              textAlign: 'center',
              color: '#fff',
              padding: '10px',
              marginTop:'2px',
              fontSize: '19px',
              fontFamily:'Sukhumvit Set, sans-serif'
            }}
          >
           บริษัททั้งหมด
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

                      <Link to="/home">
                        <li style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif"}}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leave.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ลางาน
                            <Icon type="right" style={{ float: "right" }} />{" "}
                          </li>
                        </Link> 
                      : null}

                        <Link to={`/proFile/${this.state.userId}/user`}>
                          <li style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif"}}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>

                      {/* admin */}
                      {this.state.status === 4 ?
                        <Link to={`/adminMenu/${this.state.companyme}`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* root */}
                      {this.state.status === 5 ?
                        <Link to={`/companyMenu`}>
                          <li style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif"}}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                         </Link>
                      : null}

                    </div>
                  </div>
                ) : null}

            <div className="in-alleditProfile" >
              <div style={{marginTop:'20px'}}>
                {/* list1 */}
             {this.state.del === false && this.state.company !== "" && this.state.company !== undefined? this.state.company.slice(0, this.state.company.length).map((item, index) => {
               return(
                <Link  to={this.state.del === false ?`/EditCompany/${item.data.nameCompany}`:"#"} key={index}>
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
                                <Avatar size={60} style={{  marginLeft: "10px" }} src={item.data.imageCompany} />
                            }
                            title={
                            <div
                                style={{
                                fontSize: "17px",
                                color: "#415CA5",
                                marginRight: "7px",
                                marginTop: "25px"
                                ,fontFamily:"Sukhumvit Set, sans-serif"
                                }}
                            >
                                <p>{item.data.nameCompany}</p>
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
                                marginRight: "10px",fontFamily:"Sukhumvit Set, sans-serif"
                            }}
                            />
                        </div>
                        </List.Item>
                    </Link>
             )}):this.state.company !== "" && this.state.company !== undefined ? this.state.company.slice(0, this.state.company.length).map((item, index) => {
              return(
                       <List.Item key={index}
                       style={{
                           background: "#fff",
                           width: "94%",
                           borderRadius: "0.5rem",
                           margin: "10px auto",fontFamily:"Sukhumvit Set, sans-serif"
                       }}
                       >
                       <List.Item.Meta
                           avatar={
                               <Avatar size={60} style={{ marginLeft: "10px" }} src={item.data.imageCompany} />
                           }
                           title={
                           <div
                               style={{
                               fontSize: "17px",
                               color: "#415CA5",
                               marginRight: "7px",
                               marginTop: "25px",fontFamily:"Sukhumvit Set, sans-serif"
                               }}
                           >
                               <p>{item.data.nameCompany}</p>
                           </div>
                           }
                       />
                       <div className="" style={{ color: "#415CA5" }}>
                       <Checkbox 
                           style={{ float: "",
                                    fontSize: "20px", 
                                    margin: "20px",fontFamily:"Sukhumvit Set, sans-serif"
                                     
                           }}

                           onChange={async(e)=>e.target.checked === true ? await this.setState({companyDel:[...this.state.companyDel,{nameCompany:item.data.nameCompany,imageCompany:item.data.imageCompany}]})  :<div> {await this.state.companyDel.splice(this.state.companyDel.indexOf(item.data.nameCompany), 1)}
                           {await this.setState({companyDel:this.state.companyDel})} </div>
                            }/>
                       </div>
                       </List.Item>
            )}):null}
            {this.state.company === undefined || this.state.company === "" ? <Link  to="#" key={1}>
                        <List.Item
                        style={{
                            background: "#fff",
                            width: "94%",
                            borderRadius: "0.5rem",
                            margin: "10px auto",fontFamily:"Sukhumvit Set, sans-serif"
                        }}
                        >
                        <List.Item.Meta
                            avatar={
                                <Avatar size={60} style={{ padding: "5px", marginLeft: "10px" }} src="" />
                            }
                            title={
                            <div
                                style={{
                                fontSize: "17px",
                                color: "#415CA5",
                                marginRight: "7px",
                                marginTop: "25px",fontFamily:"Sukhumvit Set, sans-serif"
                                }}
                            >
                                <p>ยังไม่มีข้อมูล</p>
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
                                marginRight: "10px",fontFamily:"Sukhumvit Set, sans-serif"
                            }}
                            />
                        </div>
                        </List.Item>
                    </Link>:null}
                    </div>
                          
              <Row
                style={{
                    width: "90%",
                    margin: "auto",
                    padding:'10px',
                    background:'none',fontFamily:"Sukhumvit Set, sans-serif"
                      }}
              >
                <Col span={12}>
                <div style={{ float: "right" ,marginRight:'5px'}}>
                {/* <Link to="#"> */}
                    <Button style={{ width: '150px', height: '45px', borderRadius:'0.8rem',fontFamily:'Sukhumvit Set, sans-serif'}} onClick={e=>this.setState({del:!this.state.del,companyDel:[]})} disabled={this.state.company === "" || this.state.company === undefined ? true : false } >
                       {this.state.del === false ? "ลบบริษัท" : "ยกเลิก"}
                    </Button>
                {/* </Link> */}
                </div>
                </Col>

                <Col span={12}>
                  <Link to={this.state.del === false ?`/addcompany`:"#"} >
                <div style={{ float: "left", marginLeft:'5px',fontFamily:'Sukhumvit Set, sans-serif' }}>
                    <Button type="primary" onClick={this.state.del === false ? null:confirm} disabled={this.state.del === false ? false:this.state.companyDel.length !== 0 ? false : true} style={{ width: '150px', height: '45px', borderRadius:'0.8rem'}}>
                    {this.state.del === false ? "เพิ่มบริษัท" : "ยืนยัน"}
                    </Button>
              </div>
              </Link>
            </Col>
          </Row>
             
            </div>  
          </div> 
    );
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
}
export default companyManage;
