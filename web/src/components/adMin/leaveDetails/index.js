import React, { Component } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./leaveDetails.css";
import axios from "axios";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Modal,
  Button,
  Icon,
  Select,
  Input,
  Spin,
  DatePicker,
} from "antd";
const liff = window.liff;
// const { TextArea } = Input;
// const { Option } = Select;
// const { Meta } = Card;
// const { confirm } = Modal;
// const AutoCompleteOption = AutoComplete.Option;

class leaveDetails extends Component {
    //Menu
    constructor() {
      super();
      this.state = {
        listMenu: false,
        loading: true,
        redirect: false,
        userId : "",
        q:'',
        statusfail:'',
        allow:true,show:0,
        status:'',
        username:'',
        company:'',
        leaveDay:[],
        user:[],
        noteMe:'',
        noteAdmin:"",
        statuserror:0,
        file:'',
        showid:0,
        leaveType:[],
        dateStart:[],
        dateEnd:[],
        timeStart:1,
        leaveStatus:'',
        editAt:[],
        timeEnd:1,
        leaveSum:0,
        id:'',
        out:0,
        showallow:0,
        showuser:0,
      };
      
    }
    listMenushow() {
      this.setState({
        listMenu: !this.state.listMenu
      });
    }
    //Menu
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
      }
      if (this.state.id !== "" && this.state.showallow ===0) {
          axios.get(`https://us-central1-twin-hr.cloudfunctions.net/showone_leave_request?id=${this.state.id}`)
          .then((data) =>{
            this.setState({ 
              leaveType: data.data.data.leaveType,
              leaveSum:data.data.data.leaveSum,
              leaveDay:data.data.data.leaveDay,
              timeStart:data.data.data.timeStart,
              timeEnd:data.data.data.timeEnd,
              dateStart:data.data.data.dateStart,
              dateEnd:data.data.data.dateEnd,
              file:data.data.data.file,
              noteAdmin:data.data.data.noteAdmin,
              noteMe:data.data.data.noteMe,
              company:data.data.data.company,
              createAt:data.data.data.createAt,
              status:data.data.data.status,
              editAt:data.data.data.editAt,
              lineid:data.data.data.lineid,
              showallow:1
          })
        }).catch(async() =>{
          this.setSetate({showallow:1})
      });
    }
    if( this.state.lineid !== undefined && this.state.showuser === 0) { 
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.lineid}`)
      .then((data) =>{
        this.setState({
              username:data.data.data.fname + " " + data.data.data.lname,
              showuser:1
        })
      }).catch(async() =>{
        this.setSetate({showuser:1})
    });
    }
    }
  let  showConfirm=()=> {
      Modal.confirm({
        title: 'แจ้งเตือน',
        content: (
          <div>
            <p>หมายเหตุ ที่ไม่อนุมัติ :</p>
            <input placeholder=""  
                   onChange={e=>this.setState({noteAdmin:e.target.value})} 
                   style={{border:'1px solid #efefef', width:200}}
                  //  onKeyDown={ (evt) => evt.key === ' \ '|| 
                  //  evt.key === '+'||evt.key === '?' ||evt.key === '!' ||evt.key === '@'||evt.key === '#'||
                  //  evt.key === '$'||evt.key === '%' ||evt.key === '^' ||evt.key === '&' ||evt.key === '*'||evt.key === '('||
                  //  evt.key === '='||evt.key === '[' ||evt.key === ']'  ||evt.key === '|'||evt.key === '/'||evt.key === ')'||
                  //  evt.key === '>'||evt.key === ';' ||evt.key === ','||evt.key === '{' ||evt.key === '}'||evt.key === ':'||
                  //  evt.key === '<'||evt.key === '฿' ||evt.key === '.'  ||evt.key === '%'  ||evt.key === '_' ||evt.key === '€'||
                  //  evt.key === '0'||evt.key === '1'  ||evt.key === '2'  ||evt.key === '3'  ||evt.key === '4' ||evt.key === '5'||
                  //  evt.key === '6' ||evt.key === '7'  ||evt.key === '8'  ||evt.key === '9'  ||evt.key === '¥' ||evt.key === '•'||
                  //  evt.key === '๑' ||evt.key === '๒'  ||evt.key === '๓'  ||evt.key === '๔'  ||evt.key === '๕' ||evt.key === '๖'||
                  //  evt.key === '๗'||evt.key === '๘'||evt.key === '๙'|| evt.key === '\u00a9'||evt.key === '\u00ae'||evt.key === '[\u2000-\u3300]'||
                  //  evt.key === '\ud83c[\ud000-\udfff]'||evt.key === '\ud83d[\ud000-\udfff]'||evt.key === '\ud83e[\ud000-\udfff]'||
                  //  evt.key === '-'? evt.preventDefault():{} }
                   />
          </div>
        ),
        onOk() {
          allow()
        },
      });
    }
  let  allow = async () => {
    await this.setState({out:99})
    await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/allowleave_request?id=${this.state.id}&allowstatus=${this.state.allowstatus}&noteAdmin=${this.state.noteAdmin}&lineid=${this.state.userId}`)
      .then(async(data) =>{
      await  this.props.history.push(`/requestConfirm/${this.state.company}`)
    }).catch(async() =>{
      await  this.props.history.push(`/requestConfirm/${this.state.company}`)
  });
      }

    const { size } = this.state;
    const { TextArea } = Input;
    const { Option } = Select;
    const { Meta } = Card;
    let dateSStart = moment(this.state.dateStart).format('L')
    let dateSEnd = moment(this.state.dateEnd).format('L')
    const { startValue, endValue, endOpen } = this.state;
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
    if(this.state.out === 0){
      if(this.state.showuser === 1){
      if(this.state.showallow === 1 ){
        if(this.state.show === 1){
        
          
            if (this.state.statusme > 3 && this.state.statusme !== null && this.state.statusme !== undefined) {
    return (
      <div className="all-leaveDetails " style={{ background: "#F0F0F0" }}>
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
            <Link to={`/requestConfirm/${this.state.company}`}>
              <i
                className="fas fa-arrow-left"
                style={{ cursor: 'pointer', color: '#fff', padding: '15px',fontSize: '20px' }}
              ></i>
            </Link>
          </Col>
          <Col
            span={18}
            style={{
              textAlign: 'center',
              color: '#fff',
              padding: '10px',
              fontSize: '18px',
              marginTop:'2px',
              fontFamily:'Sukhumvit Set, sans-serif'
            }}
          >
            รายละเอียดใบลา
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
                marginTop:'-2px'
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
                            <Icon type="right" style={{ float: "right" }} />{" "}
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
                      {this.state.statusme === 4 ?
                        <Link to={`/adminMenu/${this.state.company}`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* root */}
                      {this.state.statusme === 5 ?
                        <Link to={`/companyMenu`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                         </Link>
                      : null}

                    </div>
                  </div>
                ) : null}


        
        {/* Box-head */}
        <div className="in-leaveDetails">
            {/* Row1 */}
            <Row style={{ width: "94%", margin: "20px auto"}}>
              <Col span={24}>
                <h3 style={{ fontSize: "15px", marginLeft: "5px", marginLeft: '5px', marginTop:'20px', fontFamily:'Sukhumvit Set, sans-serif', overflow:'none'}}>
                  ชื่อ-นามสกุล :
                </h3>
                <div>
                <Input disabled size="large" 
                       value={`${this.state.username}`} 
                       style={{ width: "97%", 
                                margin:"-5px auto", 
                                display:"block", 
                                height:"30px",
                                fontFamily:"Sukhumvit Set, sans-serif", 
                                // borderTop: "none",
                                // borderLeft: "none", 
                                // borderRight: "none"
                               }} 
                                />
                </div>
              </Col>
              
            </Row>
            <Row  style={{ width: "94%", margin: "auto" }}>
            <Col span={24}>
                <h3 style={{ fontSize: "15px", marginLeft: '5px', marginTop:'-10px', fontFamily:'Sukhumvit Set, sans-serif' }}>
                  ประเภทการลา :
                </h3>
                <div className="types">
                <Input  disabled size="large"  
                        value={`${this.state.leaveType}`}
                        style={{width:'97%',
                                fontSize: "15px",
                                overflow:'none',
                                marginLeft: "5px",
                                marginTop:'-5px',
                                height:"30px"
                                }}/>
                </div>
              </Col>
            </Row>


            {/* Row2 */}
            <Row style={{  width: "94%" ,margin:"auto" }} >
                      <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px" ,marginTop:"5px",fontFamily:"Sukhumvit Set, sans-serif"  }}>
                          วันที่ต้องการลา :
                        </h3>
                        <div styl={{ marginLeft: "" }}>
                          <DatePicker
                          disabled
                            disabledDate={this.disabledStartDate}
                            format="DD/MM/YYYY"
                            value={startValue}
                            placeholder={dateSStart}
                            onChange={this.onStartChange}
                            style={{ width: "95%", marginLeft: "5px" ,fontSize: "15px", marginTop:"-10px",}}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",marginTop:"5px", fontFamily:"Sukhumvit Set, sans-serif" ,fontSize: "15px",  }}>
                          ช่วงเวลา :
                        </h3>
                        <div>
                          <Select
                          disabled
                            value={this.state.timeStart}
                            style={{ width: "95%", 
                                     marginLeft: "5px", 
                                     fontFamily:"Sukhumvit Set, sans-serif",
                                     fontSize: "15px", 
                                     marginTop:"-10px",}}
                            // onChange={handleStartChange}
                          >
                            <Option value={1}>เต็มวัน</Option>
                            <Option value={2}>ครึ่งเช้า</Option>
                            <Option value={3}>ครึ่งบ่าย</Option>
                          </Select>
                        </div>
                      </Col>
                    </Row>
                    
                    {/* Row3 */}
                    <Row
                      style={{
                        width: "94%",
                        margin: "auto",
                        fontFamily:"Sukhumvit Set, sans-serif" 
                      }}
                    >
                      {this.state.timeStart === 2 ? null : <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",marginTop:"5px", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                          ลาถึงวันที่ :
                        </h3>
                        <div>
                          <DatePicker
                          disabled
                            disabledDate={this.disabledEndDate}
                            format="DD/MM/YYYY"
                            value={endValue}
                            placeholder={dateSEnd}
                            onChange={this.onEndChange}
                            style={{ width: "95%", fontSize: "15px", marginLeft: "5px",marginTop:"-8px", }}
                          />
                        </div>
                      </Col>}
                      {this.state.timeStart === 2 ? null : this.state.dateStart !==  this.state.dateEnd  ? <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", textAlign:'left',marginTop:"5px", fontFamily:'Sukhumvit Set, sans-serif'}}>
                          ช่วงเวลา :
                        </h3>
                        <div>
                          <Select
                            value={this.state.timeStart == 2 ? " - ": this.state.timeEnd}
                            style={{ width: "95%", marginLeft: "5px",fontSize: "15px", marginTop:"-3px",fontFamily:"Sukhumvit Set, sans-serif"  }}
                            // onChange={handleEndChange}
                            disabled
                            // {this.state.timeStart == 2 ? disabled : null}
                          >
                            {this.state.timeStart != 2 ? <Option value={1}>เต็มวัน</Option>
                            : null}
                            {this.state.timeStart != 2 ? 
                                                          <Option value={2}>ครึ่งเช้า</Option> : null}
                          </Select>
                        </div>
                      </Col> :  null}
                    </Row>
            {/* Row4 */}
            <Row
              style={{
                width: "94%",
                margin: "auto",
                // marginLeft: "5px",
                // marginTop: "25px"
              }}
            >
              <Col span={12}>
                <h3 style={{ fontSize: "15px", marginLeft: "5px", marginTop:"5px", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  จำนวนวันลา : 
                </h3>
                <div>
                  <Input disabled size="large" 
                         placeholder={`${this.state.leaveSum} วัน`}
                         style={{width:'95%', 
                                //  borderTop:'none', 
                                //  borderLeft:'none', 
                                //  borderRight:'none',
                                height:"30px",
                                marginTop:"-3px",
                                 fontSize: "13px",
                                 fontFamily:"Sukhumvit Set, sans-serif" , 
                                 marginLeft: '5px'  }} />
                </div>
              </Col>
              <Col span={12}></Col>
            </Row>

            {/* Row5 */}
            <Row
              style={{
                width: "92%",
                margin: "auto",
                marginTop: "5px"
              }}
            >
              <Col span={24}>
                <h3 style={{ width:"100%",display:"block",margin:"auto",fontSize: "15px", marginLeft:"", fontFamily:"Sukhumvit Set, sans-serif" }}>
                  หมายเหตุการลา :
                </h3>
                <div>
                  <TextArea
                    disabled 
                    rows={4}
                    placeholder={`${this.state.noteMe}`}
                    style={{
                            fontSize: '15px',
                            marginTop:'5px',
                            width:'100%',
                            height:'100px',
                            fontFamily:"Sukhumvit Set, sans-serif" }}
                      
                  />
                </div>
              </Col>
            </Row>
            
            {/* Row6 */}
            <Row
              style={{
                width: "94%",
                margin: "auto",
                marginTop: "5px"
              }}
            >
              <Col span={24}>
                <h3 style={{ fontSize: "15px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  ไฟล์แนบ :{" "}
                  {/* tag a*/}
                  <a style={{ fontSize: "12px", marginLeft: "5px", color:'#555555',fontFamily:'Sukhumvit Set, sans-serif' }}>
                  </a>
                </h3>
                <div></div>
              </Col>
            </Row>

            {/* Row7 */}
            <Row
              style={{
                width: "90%",
                margin: " -10px auto",
                padding:"10px",
                paddingLeft:"none",
                paddingRight:"none",
                fontSize:"12px",
                fontFamily:"Sukhumvit Set, sans-serif" 
              }}
            >
              
              <Col span={24}>
              {this.state.file.length >   50?  <a href={this.state.file} >คลิกเพื่อดูไฟล์อัพโหลด</a> : <h4 >ไม่มีไฟล์แนบ</h4>}
              
              </Col>
            </Row>
          </div>
          {/* in-all */}
          
          {/* Row8 */}
          <Row
            style={{
              width: '90%',
              margin: '25px auto',
              background: '#F0F0F0',
              fontFamily:'Sukhumvit Set, sans-serif'
            }}
          >
            <div className="">
            <Col span={12}>
                <Link to="#">
              <div className="pimmaryConfirm" style={{ float: 'right' ,marginRight:'-5px',padding:'10px', fontFamily:'Sukhumvit Set, sans-serif' }}>
                   <Button onClick={e=>this.setState({allowstatus:1},showConfirm)} style={{ width: 140, height: 45 }}>ไม่อนุมัติ</Button>
              </div>
              </Link>
            </Col>
            <Col span={12}>
            <Link to="#">
              <div style={{ float: 'left', marginLeft:'-5px' ,padding:'10px' ,fontFamily:'Sukhumvit Set, sans-serif'}}>
                <Button type="primary" onClick={e=>this.setState({allowstatus:2},allow)} style={{ width: 140, height: 45 }}>
                    อนุมัติ
                </Button><br />
              </div>
              </Link>
            </Col>
            </div>
          </Row>
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
 
}else{
  return(
    <Spin tip="Loading...">
          <div >{loaddata()}
          </div>
    </Spin>
    )
}   

  }else{
    return(
      <Spin tip="Loading...">
            <div >{loaddata()}
            </div>
      </Spin>
      )
  }
}else{
    return(
      <Spin tip="Loading...">
            <div >{loaddata()}
            </div>
      </Spin>
      )
  }  
}else{
  return(
    <Spin tip="กรุณารอสักครู่">
          <div >
          </div>
    </Spin>
    )
}
  }
}
export default leaveDetails;
