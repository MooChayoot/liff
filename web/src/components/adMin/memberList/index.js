import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./memberList.css";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Menu,
  Icon,
  Input,
  Avatar,
  Spin,
} from "antd";

const liff = window.liff;
class memberList extends Component { 
      constructor() {
        super();
        this.state = {
          listMenu: false,
          value: '',
          loading: true,
          allow: true,
          showuser: 0,
          showadmin:0,
          show:0,
          userId : "",
          id: "",
          status: "",
          statusfail: "",
          username: "",
          leave: [],
          showallow: 0,
          allow_wait: [""],
          allow_complete: [],
          img: "",
          users:[],
          admin:[],
          usersshow:[],
          adminshow:[],
          dataSource: [],
          q: "",
        };
        this.filterList = this.filterList.bind(this);
        this.onChange = this.onChange.bind(this);
      }

      //Menu.Item
      handleClick = e => {
        // console.log('click ', e);
      };
    
      onChange(event) {
        const q = event.target.value.toLowerCase();
        this.setState({ q }, () => this.filterList());
      }
    
      filterList() {
        let users = this.state.users;
        let admin = this.state.admin;
        let q = this.state.q;
        let data = [];
        if (users.length > 0) {
        users.filter(function(user) {
          
          let select = user.name.toLowerCase().search(q) !== -1; 
          if (select === true) {
            // console.log(user.name.toLowerCase());
            data.push({nameshow:user.nameshow,id:user.id,img:user.img,positionshow:user.positionshow,company:user.company});
          }
          return;
        });
      }
        let dataadmin = [];
        if (admin.length > 0) {
        admin.filter(function(admins) {
          let select = admins.name.indexOf(q) != -1; // returns true or false
          if (select === true) {
            dataadmin.push({nameshow:admins.nameshow,id:admins.id,img:admins.img,positionshow:admins.positionshow,company:admins.company});
          }
          return;
        });
      }
        this.setState({ adminshow: dataadmin ,usersshow:data});
      }
      //Menu
      listMenushow() {
        this.setState({
          listMenu: !this.state.listMenu
        });
      } 

async componentDidMount(){
  await this.setState({
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
          status:data.data.data.status,show:1,
          leave:loop3.length ===0 ? loop1:loop3,
          companyme:data.data.data.company
                      })
            }).catch(async() => {
              this.setState({show:1})
          });     
        }
        if(this.state.id !== "" && this.state.showuser === 0){
          if (this.state.id !== "root") {
           axios.get(`https://us-central1-twin-hr.cloudfunctions.net/user_2tpye?company=${this.state.id}`)
          .then((data) => { 
            this.setState({users:[],admin:[]})
            if(data.data.user.length !== 0 ){
            for (let index = 0; index < data.data.user.length; index++) {
              this.setState({
                users: [
                  ...this.state.users,
                  {
                    name:
                      data.data.user[index].data.pname.toLowerCase() +
                      data.data.user[index].data.fname.toLowerCase() +
                      " " +
                      data.data.user[index].data.lname.toLowerCase() +
                      " ตำแหน่ง " +
                      data.data.user[index].data.position.toLowerCase()
                      ,positionshow:data.data.user[index].data.position,
                      nameshow:data.data.user[index].data.fname +
                      " " +
                      data.data.user[index].data.lname,
                    id: data.data.user[index].data.lineid,
                    img:data.data.user[index].data.img,
                    company:data.data.user[index].data.company
                  }
                ]
           ,
                usersshow: [
                  ...this.state.users,
                  {
                    name:
                      data.data.user[index].data.pname +
                      data.data.user[index].data.fname +
                      " " +
                      data.data.user[index].data.lname +
                      " ตำแหน่ง " +
                      data.data.user[index].data.position
                      ,positionshow:data.data.user[index].data.position,
                      nameshow:data.data.user[index].data.fname +
                      " " +
                      data.data.user[index].data.lname,
                    id: data.data.user[index].data.lineid,
                    img:data.data.user[index].data.img,
                    company:data.data.user[index].data.company
                  }
                ]
              });
            } 
            }
            if(data.data.admin.length !== 0 ){
            for (let index = 0; index < data.data.admin.length; index++) {
              this.setState({
                admin: [
                  ...this.state.admin,
                  {
                    name:
                      data.data.admin[index].data.pname.toLowerCase() +
                      data.data.admin[index].data.fname.toLowerCase() +
                      " " +
                      data.data.admin[index].data.lname.toLowerCase() +
                      " ตำแหน่ง " +
                      data.data.admin[index].data.position.toLowerCase()
                      ,positionshow:data.data.admin[index].data.position,
                      nameshow:data.data.admin[index].data.fname +
                      " " +
                      data.data.admin[index].data.lname,
                    id: data.data.admin[index].data.lineid,
                    img:data.data.admin[index].data.img,
                    company:data.data.admin[index].data.company
                  }
                ] 
              ,
                adminshow: [
                  ...this.state.admin,
                  {
                    name:
                      data.data.admin[index].data.pname +
                      data.data.admin[index].data.fname +
                      " " +
                      data.data.admin[index].data.lname +
                      " ตำแหน่ง " +
                      data.data.admin[index].data.position
                      ,positionshow:data.data.admin[index].data.position,
                      nameshow:data.data.admin[index].data.fname +
                      " " +
                      data.data.admin[index].data.lname,
                    id: data.data.admin[index].data.lineid,
                    img:data.data.admin[index].data.img,
                    company:data.data.admin[index].data.company
                  }
                ] 
              });
            } 
            }
            this.setState({showuser:1})
              }).catch(async(err) => {
                console.log(err);
                
                      this.setState({showuser:1})
                  });
         }else  {
           axios.get(`https://us-central1-twin-hr.cloudfunctions.net/showuser?company=${this.state.id}`)
           .then((data) => {
             this.setState({users:[],admin:[]})
             if (data.data.user.length >0) {
           for (let index = 0; index < data.data.user.length; index++) {
             this.setState({
              users: [
                ...this.state.users,
                {
                  name:
                    data.data.user[index].data.pname.toLowerCase() +
                    data.data.user[index].data.fname.toLowerCase() +
                    " " +
                    data.data.user[index].data.lname.toLowerCase() +
                    " ตำแหน่ง " +
                    data.data.user[index].data.position.toLowerCase()+ " บริษัท "+data.data.user[index].data.company.toLowerCase()
                    ,positionshow:data.data.user[index].data.position,
                    nameshow:data.data.user[index].data.fname +
                    " " +
                    data.data.user[index].data.lname,
                  id: data.data.user[index].data.lineid,
                  img:data.data.user[index].data.img,
                  company:data.data.user[index].data.company
                }
              ],
              usersshow: [
                ...this.state.users,
                {
                  name:
                    data.data.user[index].data.pname +
                    data.data.user[index].data.fname +
                    " " +
                    data.data.user[index].data.lname +
                    " ตำแหน่ง " +
                    data.data.user[index].data.position+ " บริษัท "+data.data.user[index].data.company
                    ,positionshow:data.data.user[index].data.position,
                    nameshow:data.data.user[index].data.fname +
                    " " +
                    data.data.user[index].data.lname,
                  id: data.data.user[index].data.lineid,
                  img:data.data.user[index].data.img,
                  company:data.data.user[index].data.company
                }
              ]
             });
           }    
          }
          if (data.data.admin.length >0) {
           for (let index = 0; index < data.data.admin.length; index++) {
             this.setState({
              admin: [
                ...this.state.admin,
                {
                  name:
                    data.data.admin[index].data.pname.toLowerCase() +
                    data.data.admin[index].data.fname.toLowerCase() +
                    " " +
                    data.data.admin[index].data.lname.toLowerCase() +
                    " ตำแหน่ง " +
                    data.data.admin[index].data.position.toLowerCase()+ " บริษัท "+data.data.admin[index].data.company.toLowerCase()
                    ,positionshow:data.data.admin[index].data.position,
                    nameshow:data.data.admin[index].data.fname +
                    " " +
                    data.data.admin[index].data.lname,
                  id: data.data.admin[index].data.lineid,
                  img:data.data.admin[index].data.img,
                  company:data.data.admin[index].data.company
                }
              ] ,
              adminshow: [
                ...this.state.admin,
                {
                  name:
                    data.data.admin[index].data.pname +
                    data.data.admin[index].data.fname +
                    " " +
                    data.data.admin[index].data.lname +
                    " ตำแหน่ง " +
                    data.data.admin[index].data.position+ " บริษัท "+data.data.admin[index].data.company
                    ,positionshow:data.data.admin[index].data.position,
                    nameshow:data.data.admin[index].data.fname +
                    " " +
                    data.data.admin[index].data.lname,
                  id: data.data.admin[index].data.lineid,
                  img:data.data.admin[index].data.img,
                  company:data.data.admin[index].data.company
                }
              ] 
             });
           } 
          }
           this.setState({showuser:1})
            }).catch(async(err) => {
              console.log(err);
              
                    this.setState({showuser:1})
                });
          }
         }
    }
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
        const { dataSource, value } = this.state;
        const { Search } = Input;
        const { size } = this.state;
//use function Loop
if (this.state.showuser === 1 ) {
  if (this.state.show === 1 ) {
  if (this.state.status >1 && this.state.status !== null && this.state.status !== undefined ) {
      return (
      <div className="all-home">
        <header>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
            rel="stylesheet"
          />
        </header>
        <Row className="" style={{ background: "#405EA5", position: "relative" }} >
          <Col span={3}>
            <Link to={this.state.id !== "root"?`/adminMenu/${this.state.id}`:`/companyMenu`}>
                <i className="fas fa-arrow-left"
                    style={{
                    cursor: "pointer",
                    color: "#fff",
                    padding: "15px ",
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
              fontSize: "19px",
              marginTop: "2px",
              fontFamily:"Sukhumvit Set, sans-serif" 
            }}
          >
            รายชื่อสมาชิก
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
                <li style={{ borderTop: " 1px solid #707070" }}> วันลาคงเหลือ </li>
              </Link>
              {this.state.leave.length !== 0 ?
                <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
                  <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                    ลางาน
                    <Icon type="right" style={{ float: "right" }} />{" "}
                  </li>
                </Link> 
              : null}

                <Link to={`/proFile/${this.state.userId}/user`}>
                  <li style={{ borderTop: " 1px solid #707070" , fontFamily:"Sukhumvit Set, sans-serif"}}>
                    บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
                  </li>
                </Link>
                {this.state.status === 3 ?
                        <Link to={`/sumCompany/`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}
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
                  <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                  </li>
                </Link>
              : null}

            </div>
          </div>
      ) : null}


        <div className="in-alls">
          <Menu
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "0.4rem",
              fontSize: "18px",
              fontFamily:"Sukhumvit Set, sans-serif"
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
                borderRight: "1px solid #F0F0F0",
                fontWeight: "500",
                fontFamily:"Sukhumvit Set, sans-serif"
              }}
            >
              <Link onClick={e => this.setState({ allow: true })} to="#">
                {/* <Button style={{width:'100%',height:'45px',border:'none',fontSize:'18px'}}> */}
                    สมาชิก
                {/* </Button> */}
              </Link>
            </Menu.Item>

            <Menu.Item
              key="2"
              style={{
                width: "50%",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              <Link onClick={e => this.setState({ allow: false})} to="#">
                {/* <Button style={{width:'100%',height:'45px',border:'none',fontSize:'18px'}}> */}
                  ผู้ดูแลระบบ
                {/* </Button> */}
              </Link>
            </Menu.Item>
          </Menu>
          {/* ค้นหา */}
              <div style={{ background:'f0f0f0',marginTop:'10px',width:'94%', margin: '10px auto',fontFamily:'Sukhumvit Set, sans-serif'}}>
              <Row >
                <Col>
                <div  className="warppers">
                        <Input className="seacsh" 
                               placeholder="ชื่อ - สกุล" 
                               value={this.state.q} 
                               onChange={this.onChange} 
                               onKeyDown={ (evt) => evt.key === ' \ '|| 
                                                evt.key === '+'||evt.key === '?' ||evt.key === '!' ||evt.key === '@'||evt.key === '#'||
                                                evt.key === '$'||evt.key === '%' ||evt.key === '^' ||evt.key === '&' ||evt.key === '*'||evt.key === '('||
                                                evt.key === '='||evt.key === '[' ||evt.key === ']'  ||evt.key === '|'||evt.key === '/'||evt.key === ')'||
                                                evt.key === '>'||evt.key === ';' ||evt.key === ','||evt.key === '{' ||evt.key === '}'||evt.key === ':'||
                                                evt.key === '<'||evt.key === '฿' ||evt.key === '.'  ||evt.key === '%'  ||evt.key === '_' ||evt.key === '€'||
                                                evt.key === '0'||evt.key === '1'  ||evt.key === '2'  ||evt.key === '3'  ||evt.key === '4' ||evt.key === '5'||
                                                evt.key === '6' ||evt.key === '7'  ||evt.key === '8'  ||evt.key === '9'  ||evt.key === '¥' ||evt.key === '•'||
                                                evt.key === '๑' ||evt.key === '๒'  ||evt.key === '๓'  ||evt.key === '๔'  ||evt.key === '๕' ||evt.key === '๖'||
                                                evt.key === '๗'||evt.key === '๘'||evt.key === '๙'|| evt.key === '\u00a9'||evt.key === '\u00ae'||evt.key === '[\u2000-\u3300]'||
                                                evt.key === '\ud83c[\ud000-\udfff]'||evt.key === '\ud83d[\ud000-\udfff]'||evt.key === '\ud83e[\ud000-\udfff]'||
                                                evt.key === '-'? evt.preventDefault():{} }
                               prefix={<Icon type="search" 
                               className="certain-category-icon" 
                               style={{textAlign:"left" ,
                                       float:"left" }}/>}/>   
                </div>
                </Col>
              </Row>
              </div>
          <p></p>
          {this.state.allow === true ? this.state.usersshow.length !== 0 ? this.state.usersshow.slice(0, this.state.usersshow.length).map((item, index) => {
          return (
            <Link to={`/proFile/${item.id}/${this.state.id}`} key={index}>
                    <Card size="small" style={{ width: '94%', margin:'10px auto 0', borderRadius:'0.5rem',fontFamily:'Sukhumvit Set, sans-serif' }}>
                        <Row>
                            <Col span={5}>
                              <Avatar size={60} style={{marginTop:16 ,margin:'15px auto', display:'block' }} src={item.img} />
                            </Col>
                            <Col span={13}  >
                              <div style={{marginLeft:'5px',marginTop:'10px',fontFamily:'Sukhumvit Set, sans-serif' }} >
                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.nameshow} </p>
                                <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px', fontFamily:'Sukhumvit Set, sans-serif' }}>{item.positionshow}</p>
                                <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px', fontFamily:'Sukhumvit Set, sans-serif' }}>{item.company}</p>
                              </div>
                            </Col>
                            <Col span={5} style={{float:'right'}} >
                                <Icon className="fas fa-angle-right" type="right" style={{ float: "right", fontSize: "20px", marginTop: "40px" }}/>
                            </Col>
                         </Row>
                        </Card>
                  </Link>
           )
          })
          :
          <Link to="#" key="#">
              <Card  size="small" style={{ width: "95%", margin: "5px auto 0", borderRadius: "0.5rem", fontFamily:"Sukhumvit Set, sans-serif" }}>
                <p style={{ fontSize: "17px", fontWeight: "600", fontFamily:"Sukhumvit Set, sans-serif" }}>ไม่พบข้อมูลสมาชิก</p>
                <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}> ไม่พบข้อมูล </p>
              </Card>
         </Link>
          : 
          <div>
              <div className="box-1">
                    {this.state.admin !== undefined ? this.state.adminshow.length !== 0 ? this.state.adminshow.slice(0, this.state.adminshow.length).map((item, index) => {
                       return (
                    <Link to={`/proFile/${item.id}/${this.state.id}`} key={index}>
                      <Card size="small" style={{  width: '94%', margin:'10px auto 0', borderRadius:'0.5rem', fontFamily:'Sukhumvit Set, sans-serif' }}>
                        <Row>
                            <Col span={5}>
                              <Avatar size={60} style={{marginTop:16 ,margin:'15px auto', display:'block' }} src={item.img} />
                            </Col>
                            <Col span={13}  >
                              <div style={{marginLeft:'5px',marginTop:'10px',fontFamily:'Sukhumvit Set, sans-serif' }} >
                              <p style={{ fontSize: '16px', fontWeight: 'bold',fontFamily:'Sukhumvit Set, sans-serif' }}>{item.nameshow}</p>
                              <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px',fontFamily:'Sukhumvit Set, sans-serif' }}>{item.positionshow}</p>
                              <p style={{ fontSize: '14px', color: '#B1B1B1', marginTop: '-10px', fontFamily:'Sukhumvit Set, sans-serif' }}>{item.company}</p>
                              </div>
                            </Col>
                            <Col span={5} style={{float:'right'}} >
                                <Icon className="fas fa-angle-right" type="right" style={{ float: "right", fontSize: "20px", marginTop: "40px" }}/>
                            </Col>
                         </Row>
                        </Card>
                    </Link>
          )
        })
        : 
        <div>
          <Link to="#" key="#">
            <Card  size="small" style={{ width: "95%", margin: "5px auto 0", borderRadius: "0.5rem" ,fontFamily:"Sukhumvit Set, sans-serif"}}>
              <p style={{ fontSize: "17px", fontWeight: "600", fontFamily:"Sukhumvit Set, sans-serif" }}>ไม่พบข้อมูลผู้ดูแลระบบ</p>
              <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}> ไม่พบข้อมูล </p>
            </Card>
          </Link>
        </div>
        : 
        <div>
          <Link to="" key="#"></Link>
      </div>
          }        
    </div>
   </div>}      
  </div> 
 </div> //all
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
    <Spin tip={this.state.id === "root" ?"Loading..." :"Loading"}>
      <div>{loaddata()}
      </div>
    </Spin>
        )
      }
    } 
  }

          
        
   
export default  memberList;
