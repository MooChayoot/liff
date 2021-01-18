import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./sumCompany.css";
import "antd/dist/antd.css";
import axios from "axios";
import {
          Row, 
          Col,
          Avatar, 
          Icon,   
          List,
          Spin,
          Button,
        } from 'antd';

const liff = window.liff;

class sumCompany extends Component {
//Menu
  constructor(props) {
    super(props);
    this.state = {  
      value: '',
      dataSource: [],
      listMenu: false,
      loading: true,
      allow:true,show:0,
      userId : '',
      id:'',
      status:'',
      statusfail:'',
      username:'',
      leave:[],
      showcompany:0,
      company:[],
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
//api
async componentDidMount () {
  await  liff.init(async (data) => {
      let profile = await liff.getProfile();
   await   this.setState({
        userId : profile.userId
      });
    }); 

}

  render() {
    let loaddata = ()=>{
      if(this.state.showcompany === 0){
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/company_All`)
             .then((data) => {     
               this.setState({company:[]})
               if (data.data.company !== undefined) {
                 for (let index = 0; index < data.data.company.length; index++ ) {
                 this.setState({
                   company:[...this.state.company, 
                               {id:data.data.company[index].id,
                                nameCompany:data.data.company[index].data.nameCompany,
                                imageCompany:data.data.company[index].data.imageCompany
                           
                               }],showcompany:1           
                 })
               }
               } else {
                  this.setState({showcompany:1})
               }  
           }).catch(async() => {
                     this.setState({showcompany:1})
                 });
       }else{
         if (this.state.showcompany === 0) {
           this.componentDidMount()
         }
       }
       if (this.state.userId != ""&& this.state.show ===0) {
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
                       companyme:data.data.data.company,
                       leave:loop3.length ===0 ? loop1:loop3,show:1,
                     })
           }).catch(async() => {
             this.setState({show:1})
         });     
       }else {
         if (this.state.show === 0) {
           this.componentDidMount()
         }
       }
    }
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
    if (this.state.showcompany === 1) {
      if (this.state.show === 1) {
        if (this.state.statusme === 3 && this.state.statusme !== null && this.state.statusme !== undefined) {
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
                  onClick={e=>this.props.history.push(`/home`)}
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
              fontSize: '18px'
            }}
          >
           {'บริษัททั้งหมด'}
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
                        <li style={{ borderTop: " 1px solid #707070" }}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leave.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070" }}>
                              ลางาน
                            <Icon type="right" style={{ float: "right" }} />{" "}
                          </li>
                        </Link> 
                      : null}

                        <Link to={`/proFile/${this.state.userId}/user`}>
                          <li style={{ borderTop: " 1px solid #707070" }}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                        
                      {/* admin */}
                      {this.state.statusme === 3 ?
                        <Link to="#">
                          <li onClick={async(e)=>await this.setState({listMenu:false},window.location.reload())} style={{ borderTop: " 1px solid #707070" }}>
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
                {this.state.company.slice(0, this.state.company.length).map((item, index) => { 
                   return(
                   <Link to={`/adminMenu/${item.nameCompany}`} key={index}>
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
                                <Avatar size={60} style={{ padding: "5px", marginLeft: "10px" }} src={item.imageCompany} />
                            }
                            title={
                              <div
                                  style={{
                                  fontSize: "17px",
                                  color: "#415CA5",
                                  marginRight: "7px",
                                  marginTop: "25px"
                                  }}
                              >
                                  <p> {item.nameCompany} </p>
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
                )
            }
        )
    }         
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
export default sumCompany;
