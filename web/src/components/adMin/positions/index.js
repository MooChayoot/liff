import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import "./settingLeave.css";
import "antd/dist/antd.css";
import axios from "axios";
import {
          Row, 
          Col,
          Button,
          Input, 
          Icon,  
          Spin, 
          Checkbox,
          Modal,
          Card,
          List,
        } from 'antd';
const liff = window.liff;        

class position extends Component {
  constructor() {
    super();
    this.state = {
      userId : "",
      listMenu: false,
      position:[],
      positionDel:[],
      company:'',
      user:[],
      status:0,
      showposition:0,
      id:'',
      positionType:undefined,
      action:'',
      statusfail:'',
      username:'',
      oldname:'',
      statuss:'',
      show:0,
      showallow:0,
      img:"",
      file:''
    };
  }

   //Menu
  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
  async componentDidMount ()  {
    await  this.setState({
          company:this.props.match.params.company
      })
        await  liff.init(async (data) => {
            let profile = await liff.getProfile();
         await   this.setState({
              userId : profile.userId
            });
          }); 
      
    } 
  render() {

    let check_positionType =(e)=>{
      let en = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
      let thai ="ๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝฎฑธ๊ณญฐฤฆฏโฌ็๋ษศซฉฮ์ฒฬฦภถุึคตจขชู"
      let number ="1234567890"
      let data =thai+en+" "+'/'
      let asd = e.target.value.substring(e.target.value.length-1,e.target.value.length)
      if (this.state.positionType === undefined) {
        for (let ind = 0; ind < data.length; ind++) {
          if(asd === data[ind]){
            this.setState({positionType:asd})
          }
        } 
      }else{
        if (this.state.positionType.length > e.target.value.length ) {
          this.setState({positionType:e.target.value})
        }else{
        if (e.target.value.length === 0){
          this.setState({positionType:""})
        }else{
          for (let ind = 0; ind < data.length; ind++) {
            if(asd === data[ind]){
              this.setState({positionType:this.state.positionType+asd})
            }
          }
        }
      }
    }
  }

    const { TextArea } = Input;
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
    let loaddata = ()=>{
      if (this.state.company !== "" && this.state.showposition === 0) {
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/show_positionofcompany?company=${this.state.company}`)
        .then((data) => { 
          if(data.data.position !== undefined){
             this.setState({position:data.data.position})
          }else{
            this.setState({position:[]})
          }
          if (this.state.showposition ===0) {
            this.setState({showposition:1,status:0,positionType:undefined,action:"",positionDel:[],data:"",nameshow:""})
          }
         }).catch(async() => {
           this.setState({showposition:1})
         })
      }
      if (this.state.userId !== "" &&this.state.show === 0) {
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.userId}`)
        .then((data) => {  let loop1 = []
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
              statusme :data.data.data.status,
              statusfail :data.data.data.statusfail,show:1,
              leaveme :loop3.length ===0 ? loop1:loop3,
              companyme :data.data.data.company
                        })
              }).catch(async() => {
          this.setState({show:1})
        });     
      }
    }
    let add =async () =>{
      await this.setState({status:99,showposition:0})
        await axios.get(`https://us-central1-twin-hr.cloudfunctions.net/addposition?positionCompany=${this.state.company}&positionType=${this.state.positionType}&lineid=${this.state.userId}`)
          .then(async(data) => { 
            loaddata()
         }).catch(async() => {
           loaddata()
         })
    }
    let edit =async () =>{
      await this.setState({status:99,showposition:0})
          if (this.state.positionType !== undefined) {
       await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/changeposition?positionCompany=${this.state.company}&positionType=${this.state.positionType}&lineid=${this.state.userId}&id=${this.state.docid}`)
         .then(async(data) => { 
         loaddata()
         }).catch(async(err) => {
         loaddata()
        }); 
      }  
    }
    let del =async () =>{
      let name=[]
      let nameshow=[]
      for (let index = 0; index < this.state.positionDel.length; index++) {
        if (this.state.positionDel.length === 1) {
          name.push('["'+this.state.positionDel[index]+'"]')
          nameshow.push(this.state.positionDel[index])
        }else{
        if (index === 0) {
          name.push('["'+this.state.positionDel[index]+'"')
          nameshow.push(this.state.positionDel[index])
        }else if (index !== 0 && index < this.state.positionDel.length-1) {
          name.push('"'+this.state.positionDel[index]+'"')
          nameshow.push(","+this.state.positionDel[index])
        }else {
          name.push('"'+this.state.positionDel[index]+'"]')
          nameshow.push(' และ'+this.state.positionDel[index])
        }
      }
    }
    
let nameStr = name.toString()
 await this.setState({data:nameStr,nameshow:nameshow})
 Modal.confirm({
  title: "แจ้งเตือน ",
  content: (
    <div>
      <p style={{ fontWeight: "900" }}>คุณต้องการลบตำแหน่งงาน {this.state.nameshow} ใช่หรือไม่</p>
      <p style={{ fontSize: "14px", color: "#9D9D9D" }}>
      กด OK เพื่อยืนยัน การลบ 
      </p>
    </div>
  ),
 onOk() {
    deleteposition()
  }
});
    }
    let deleteposition= async() =>{
        await this.setState({status:99,showposition:0})
        await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/delete_position?data=${this.state.data}&lineid=${this.state.userId}&positionCompany=${this.state.company}&datashow=${this.state.nameshow}`)
            .then(async(data) => { 
                loaddata()
        }).catch(async() => {
            loaddata()
            })
    }
    if(this.state.status === 0 ){
      if(this.state.showposition === 1 ){
        if(this.state.show ===1){
          if (this.state.statusme > 3 && this.state.statusme !== null && this.state.statusme !== undefined) {
    return (
        <div className="all-editProfile">
        <header>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
            rel="stylesheet"
          />
        </header>
       {/* menubar */}
       <Row className="" style={{ background: '#405EA5', position: 'relative' }}>
          <Col span={3}>
            <Link to={this.state.action === "" ?`/adminMenu/${this.state.company}`:"#"}
            onClick={this.state.action !== ""?async(e)=>await this.setState({action:'',positionType:undefined,positionDel:[],data:"",nameshow:""}) : null}>
              <i 
                className="fas fa-arrow-left"
                style={{ cursor: 'pointer', color: '#fff', padding: '15px',fontSize: '20px' }}
              ></i>
            </Link>
          </Col>
          <Col span={18}  style={{  textAlign: 'center', color: '#fff', padding: '10px', fontSize: '19px', marginTop:'2px',fontFamily:'Sukhumvit Set, sans-serif' }} >
    {this.state.action === ''?"ตั้งค่าตำแหน่งงาน":this.state.action === 'del'?'ลบตำแหน่งงาน':this.state.action === 'add'?'เพิ่มตำแหน่งงาน':'แก้ไขตำแหน่งงาน'}
          </Col>
          <Col span={3} >
              <Icon type="menu" 
               onClick={() => this.listMenushow()}
               style={{
                cursor: 'pointer',
                color: '#fff',
                float:'right',
                padding:'15px',
                fontSize: '20px',
                marginTop:'-2px',
                }} />
            </Col>
        </Row>
       
              {/* Menu */}
        {this.state.listMenu ? (
                  <div className="listMenu"
                    style={{
                      position: "absolute",
                      width: "100%",
                      boxShadow: "5px 10px 15px #707070" }}>
                    <div className="ul"
                      style={{
                        width: "100%",
                        background: "#405EA5",
                        color: "#fff",
                        fontFamily: "Sukhumvit Set, sans-serif"}} >
                      <Link to="/home">
                        <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}> วันลาคงเหลือ </li>
                      </Link>
                      {this.state.leaveme.length !== 0 ?
                        <Link to={`/leave-request/${this.state.leaveme[0].positionType}/user`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
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
                        {this.state.statusme === 2 ?
                        <Link to={`/adminMenu/${this.state.companyme}`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* Superhr */}
                      {this.state.statusme === 3 ?
                        <Link to={`/sumCompany/`}>
                          <li style={{ borderTop: " 1px solid #707070" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif" }} />
                          </li>
                        </Link>
                      : null}

                      {/* admin */}
                      {this.state.statusme === 4 ?
                        <Link to={`/adminMenu/${this.state.companyme}`}>
                          <li style={{ borderTop: " 1px solid #707070" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif" }} />
                          </li>
                        </Link>
                      : null}

                      {/* root */}
                      {this.state.statusme === 5 ?
                        <Link to={`/companyMenu`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                         </Link>
                      : null}

                    </div>
                  </div>
                ) : null}

            <div className="in-alleditProfile" >
              <div style={{marginTop:'20px'}}>
                {this.state.action === 'del'? this.state.position.slice(0, this.state.position.length).map((item, index) => {
                  return(
                        <Card key={index} size="small"
                          style={{
                              width: "95%",
                              margin: "5px auto 0",
                              borderRadius: "0.5rem",
                              height:"114px",
                              fontFamily:"Sukhumvit Set, sans-serif"}}>
                            {/* {item.leaveType}  */}
                        <p style={{ fontSize: "17px",width:"80%",fontWeight: "700", marginTop:"30px",fontFamily:"Sukhumvit Set, sans-serif" }}>{item.data.positionType} :</p>
                        <div className="" style={{ color: "#415CA5" }}>
                       <Checkbox 
                           style={{ float: "right",
                           fontSize: "20px", 
                           marginTop: "-45px",
                           position:"relative", 
                            }}
                           onChange={async(e)=>e.target.checked === true ? await this.setState({positionDel:[...this.state.positionDel,item.data.positionType]})  : await this.state.positionDel.splice(this.state.positionDel.indexOf(item.data.positionType), 1)
                            }/>
                       </div>
                        </Card>)})
                   :null}

                   {/* /แสดง/ */}
              { this.state.position !== undefined && this.state.position.length !== 0 ? this.state.action === ''?
              this.state.position.slice(0, this.state.position.length).map((item, index) => {
                return(
                <Link to="#" onClick={async(e)=>await this.setState({id:index,action:'edit',docid:item.id})} key={index}>
                      
                  <List.Item style={{ background: "#fff", width: "94%", borderRadius: "0.5rem", margin: "10px auto", fontFamily:"Sukhumvit Set, sans-serif" }}>
                    <List.Item.Meta
                      title={ 
                      // <div style={{  marginLeft: "15px", width:"80%",border:"1px solid red", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          <p style={{ marginLeft: "15px", marginTop:"30px",fontSize: "17px",width:"80%", display:'block', fontWeight: "bold" , fontFamily:"Sukhumvit Set, sans-serif"}}>{item.data.positionType} :</p>

                      // </div>
                      }/>
                      <div className="" style={{ color: "#000000", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                      <Icon
                            className="fas fa-angle-right"
                            type="right"
                            style={{  float: "right", fontSize: "20px", marginRight:"15px",marginTop: "-35px",color:"#000000", fontFamily:"Sukhumvit Set, sans-serif" }} />
                      </div>}}>
                      </List.Item>

                    </Link>)})
                   :null
                    : this.state.action === ''?
                    <Link to="#">
                        <Card
                        size="small"
                        style={{
                            width: "95%",
                            margin: "5px auto 0",
                            borderRadius: "0.5rem",
                            fontFamily:"Sukhumvit Set, sans-serif"
                        }}
                        >
                            {/* {item.leaveType}  */}
                        <p style={{ fontSize: "17px", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif" }}>ไม่พบข้อมูล :</p>
                        <p style={{ color: "#B1B1B1", marginTop: "-10px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                        ไม่พบข้อมูล
                        </p>
                        {/* <Icon
                            className="fas fa-angle-right"
                            type="right" */}
                            {/* style={{ float: "right", fontSize: "20px", marginTop: "-40px", fontFamily:"Sukhumvit Set, sans-serif" }} */}
                        {/* /> */}
                        </Card>
                    </Link>:null
              }
              {/* edit */}
              {this.state.action === "edit" || this.state.action === "add"? this.state.action === "edit"?
              <div style={{ display:'block', margin:' 30px auto', width:'94%', background:'#fff'}}>
              {/* Row1 */}
                   <Row
                   style={{
                       width: "90%",
                       margin: "10px auto",
                       fontFamily:"Sukhumvit Set, sans-serif"
                   }}
                   >
                   <Col span={24} >
                       <h3 style={{ fontSize: "15px", marginLeft:'5px',marginTop:'20px',borderRight:'none',borderTop:'none',borderRight:'none', fontFamily:'Sukhumvit Set, sans-serif' }}>
                       ตำแหน่งงาน:
                       </h3>
                       <div>
                           <Input placeholder="" 
                                  value={this.state.positionType === undefined? this.state.position[this.state.id].data.positionType:this.state.positionType } 
                                  onChange={check_positionType} width="94%" 
                                  // onKeyDown={chack}
                                  />
                       </div>
                   </Col>
                   </Row>
                   <br></br>
             </div> : 
             <div style={{ display:'block', margin:' 30px auto', width:'94%', background:'#fff', fontFamily:'Sukhumvit Set, sans-serif'}}>
             {/* Row1 */}
                  <Row
                  style={{
                      width: "90%",
                      margin: "10px auto",
                      fontFamily:"Sukhumvit Set, sans-serif"
                  }}
                  >
                  <Col span={24}>
                      <h3 style={{ fontSize: "15px", marginLeft:'5px',marginTop:'20px',borderRight:'none',borderTop:'none',borderRight:'none', fontFamily:'Sukhumvit Set, sans-serif' }}>
                      ตำแหน่งงาน:
                      </h3>
                      <div>
                          <Input placeholder="" 
                                 value={this.state.positionType} 
                                 onChange={check_positionType} 
                                 width="94%" 
                                
                                 />
                      </div>
                  </Col>
                  </Row>
                  <br></br>
            </div>
              :null}
              
              
          {this.state.action == ''? <Row
                style={{
                    width: "90%",
                    margin: "auto",
                    padding:'10px',
                    background:'none',
                    fontFamily:'Sukhumvit Set, sans-serif'
                      }}
              >
                <Col span={12}>
                <div style={{ float: "right" ,marginRight:'5px', fontFamily:'Sukhumvit Set, sans-serif'}}>
                <Link to="#"  onClick={e=>this.setState({action:"del"})}>
                    <Button disabled={this.state.position === undefined || this.state.position.length ===0 ?true:false} style={{ width: '150px', height: '45px', borderRadius:'0.8rem'}}>
                        ลบตำแหน่งงาน
                    </Button>
                </Link>
                </div>
                </Col>

                <Col span={12}>
                  <Link to="#">
                <div style={{ float: "left", marginLeft:'5px',fontFamily:'Sukhumvit Set, sans-serif' }}>
                    <Button type="primary"  onClick={e=>this.setState({action:"add"})} style={{ width: '150px', height: '45px', borderRadius:'0.8rem'}}>
                        เพิ่มตำแหน่งงาน
                    </Button>
              </div>
              </Link>
            </Col>
          </Row> :null}
          {this.state.action == 'del'? <Row
                style={{
                    width: "90%",
                    margin: "auto",
                    padding:'10px',
                    background:'none',
                    fontFamily:'Sukhumvit Set, sans-serif'
                      }}
              >
                <Col span={12}>
                <div style={{ float: "right" ,marginRight:'5px', fontFamily:'Sukhumvit Set, sans-serif'}}>
                <Link to="#" onClick={async(e)=>await this.setState({action:'',positionType:undefined,positionDel:[],data:"",nameshow:""})}>
                    <Button style={{ width: '150px', height: '45px', borderRadius:'0.8rem', fontFamily:'Sukhumvit Set, sans-serif'}}>
                        ยกเลิก
                    </Button>
                </Link>
                </div>
                </Col>

                <Col span={12}>
                  <Link to="#">
                <div style={{ float: "left", marginLeft:'5px' , fontFamily:'Sukhumvit Set, sans-serif'}}>
                    <Button type="primary" onClick={del} style={{ width: '150px', height: '45px', borderRadius:'0.8rem', fontFamily:'Sukhumvit Set, sans-serif'}}>
                        ลบตำแหน่งงาน
                    </Button>
              </div>
              </Link>
            </Col>
          </Row> :null}
          {this.state.action == 'add'? <Row
                style={{
                    width: "90%",
                    margin: "auto",
                    padding:'10px',
                    background:'none',
                    fontFamily:'Sukhumvit Set, sans-serif'
                      }}
              >
                <Col span={12}>
                <div style={{ float: "right" ,marginRight:'5px',fontFamily:'Sukhumvit Set, sans-serif'}}>
                <Link to="#" onClick={async(e)=>await this.setState({action:'',positionType:undefined,positionDel:[],data:"",nameshow:""})}>
                    <Button style={{ width: '150px', height: '45px', borderRadius:'0.8rem',fontFamily:'Sukhumvit Set, sans-serif'}}>
                        ยกเลิก
                    </Button>
                </Link>
                </div>
                </Col>

                <Col span={12}>
                  <Link to="#">
                <div style={{ float: "left", marginLeft:'5px',fontFamily:'Sukhumvit Set, sans-serif' }}>
                    <Button type="primary" disabled={this.state.positionType === undefined || this.state.positionType === '' ?true:false}  style={{ width: '150px', height: '45px',  borderRadius:'0.8rem',fontFamily:'Sukhumvit Set, sans-serif'}}onClick={add}>
                        เพิ่มตำแหน่งงาน
                    </Button>
              </div>
              </Link>
            </Col>
          </Row> :null}
          {this.state.action == 'edit'? <Row
                style={{
                    width: "90%",
                    margin: "auto",
                    padding:'10px',
                    background:'none',
                    fontFamily:'Sukhumvit Set, sans-serif'
                      }}>
                <Col span={12}>
                <div style={{ float: "right" ,marginRight:'5px',fontFamily:'Sukhumvit Set, sans-serif'}}>
                <Link to="#" onClick={async(e)=>await this.setState({action:'',positionType:undefined,positionDel:[],data:"",nameshow:""})}>
                    <Button style={{ width: '150px', height: '45px', borderRadius:'0.8rem',fontFamily:'Sukhumvit Set, sans-serif'}}>
                        ยกเลิก
                    </Button>
                </Link>
                </div>
                </Col>

                <Col span={12}>
                  <Link to="#">
                <div style={{ float: "left", marginLeft:'5px',fontFamily:'Sukhumvit Set, sans-serif' }}>
                    <Button type="primary" disabled={ this.state.positionType === undefined ?true:false} onClick={edit} style={{ width: '150px', height: '45px', borderRadius:'0.8rem',fontFamily:'Sukhumvit Set, sans-serif'}}>
                        แก้ไข
                    </Button>
              </div>
              </Link>
            </Col>
          </Row> :null}
             </div>
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
export default position;
