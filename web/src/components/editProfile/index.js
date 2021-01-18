import React, { Component } from "react";
import {  Link } from "react-router-dom";
import styled from "styled-components";
import "./editProfile.css";
import axios from "axios";
import "antd/dist/antd.css";
import {
          Row, 
          Col,
          message,  
          Button,
          Input, 
          Spin,
          // Modal,
          Select,
          Icon,
        } from 'antd';
// const { confirm } = Modal;
const liff = window.liff;
function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
  result = `,${num.slice(-3)}${result}`;
  num = num.slice(0, num.length - 3);
  }
  if (num) {
      result = num + result;
      }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

  class NumericInput extends React.Component {
    onChange = e => {
      const { value } = e.target;
      const reg = /^-?[0-9]*(\.[0-9]*)?$/;
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.props.onChange(value);
      }
    };

    onBlur = () => {
      const { value, onBlur, onChange } = this.props;
      let valueTemp = value;
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace());
      if (onBlur) {
        onBlur();
      }
    };
  
    render() {
      const { value } = this.props;
      const title = value ? (
      <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span> ) : ( 'Input a number' );
          return (
              <Input {...this.props}
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholder="0999999999"
                prefix="เบอร์โทร"
                maxLength={10}
                minLength={10}
              />
          );
        }}

const Buttons = styled.div`
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Sukhumvit Set, sans-serif ;
`;

class editProfile extends Component {
    constructor(props) {
      super(props);
      this.state = { show:0,
      userId:"",
      listMenu: false,
      loading: true,
      pictureUrl : "",
      dataSource: [],
      positionofcompany:[],
      showposition:0,
      value: '',
      pname:'นาย',
      fname:'',
      lname:'',
      nname:'',
      position:'',
      company:'' ,
      status:'',
      statuslineid:'' ,
      statussub:0 ,
      showlineid:0,
      allcompany:[],
      docid:''};
  }

  onChange = value => {
    this.setState({ value });
  };

  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
  
  async componentDidMount() {
      await  liff.init(async (data) => {
          let profile = await liff.getProfile();
       await   this.setState({
            userId : profile.userId,
            pictureUrl : profile.pictureUrl
          });
        }); 
      const { match: { params } } = this.props;
    await  this.setState({docid:params.id,root:params.root})

      
  } 

render() {

  let check_fname =(e)=>{
    let thai ="ๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝฎฑธ๊ณญฐฤฆฏโฌ็๋ษศซฉฮ์ฒฬฦภถุึคตจขชู"
    let data = thai
    let asd = e.target.value.substring(e.target.value.length-1,e.target.value.length)
    if (this.state.fname.length > e.target.value.length ) {
      this.setState({fname:e.target.value})
    }else{
    if (e.target.value.length === 0){
      this.setState({fname:""})
    }else{
      for (let ind = 0; ind < data.length; ind++) {
        if(asd === data[ind]){
          this.setState({fname:this.state.fname+asd})
        }
      }
    }
  }
  }
  
  let check_lname =(e)=>{
    let thai ="ๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝฎฑธ๊ณญฐฤฆฏโฌ็๋ษศซฉฮ์ฒฬฦภถุึคตจขชู"
    let data = thai
    let asd = e.target.value.substring(e.target.value.length-1,e.target.value.length)
    if (this.state.lname.length > e.target.value.length ) {
      this.setState({lname:e.target.value})
    }else{
    if (e.target.value.length === 0){
      this.setState({lname:""})
    }else{
      for (let ind = 0; ind < data.length; ind++) {
        if(asd === data[ind]){
          this.setState({lname:this.state.lname+asd})
        }
      }
    }
  }
  }
  let check_nname =(e)=>{
      let thai ="ๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝฎฑธ๊ณญฐฤฆฏโฌ็๋ษศซฉฮ์ฒฬฦภถุึคตจขชู"
      let data = thai
      let asd = e.target.value.substring(e.target.value.length-1,e.target.value.length)
      if (this.state.nname.length > e.target.value.length ) {
        this.setState({nname:e.target.value})
      }else{
      if (e.target.value.length === 0){
        this.setState({nname:""})
      }else{
        for (let ind = 0; ind < data.length; ind++) {
          if(asd === data[ind]){
            this.setState({nname:this.state.nname+asd})
          }
        }
      }
    }
    }
  
    let check_position =(e)=>{
      let en = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
      let thai ="ๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝฎฑธ๊ณญฐฤฆฏโฌ็๋ษศซฉฮ์ฒฬฦภถุึคตจขชู"
      let data = en+thai
      let asd = e.target.value.substring(e.target.value.length-1,e.target.value.length)
      if (this.state.position.length > e.target.value.length ) {
        this.setState({position:e.target.value})
      }else{
      if (e.target.value.length === 0){
        this.setState({position:""})
      }else{
        for (let ind = 0; ind < data.length; ind++) {
          if(asd === data[ind]){
            this.setState({position:this.state.position+asd})
          }
        }
      }
    }
    }

let loaddata = ()=>{
  if (this.state.showlineid === 0 && this.state.userId !== '') {
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
                  statusme:data.data.data.status,showlineid:1,
                  statuslineid:data.data.data.status,
                  leave:loop3.length ===0 ? loop1:loop3,
                  companyme:data.data.company
                })
          }).catch(async() => {
        this.setState({showlineid:1})
    });     
  }
  if (this.state.show === 0 &&this.state.docid !== "") {
    axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.docid}`)
    .then((data) => {    
  this.setState({value:data.data.data.tel,
    pname:data.data.data.pname,
    fname:data.data.data.fname,
    lname:data.data.data.lname,
    nname:data.data.data.nname,
    position:data.data.data.position,
    company:data.data.data.company,
    status:data.data.data.status,
    show:1})
    }).catch(async() => {
        this.setState({show:1})
    });
  }
  if (this.state.company !== "" && this.state.showposition === 0) {
    axios.get(`https://us-central1-twin-hr.cloudfunctions.net/show_positionofcompany?company=${this.state.company}`)
    .then((data) => { 
      this.setState({positionofcompany:[]})
      if (data.data.position[0].data.positionType === undefined) {
        this.setState({positionofcompany:[],showposition:1})
      } else {
        for (let index = 0; index < data.data.position.length; index++) {
          this.setState({positionofcompany:[...this.state.positionofcompany,data.data.position[index].data.positionType],showposition:1})
        }
      }
     }).catch(async() => {
       this.setState({showposition:1})
     })
  }
}
console.log(this.state.positionofcompany);

const { Option } = Select;
const InputGroup = Input.Group;
let position_map = this.state.positionofcompany.map(data=>(
  <Option key={data} value={data}>{data}</Option>
))
const position = (
  <Select disabled={this.state.position === '' || this.state.position === undefined?true:false} value={this.state.position === '' || this.state.position === undefined?"ไม่มีข้อมูล":this.state.position} onChange={e=>
  this.setState({position:e})
  } style={{ width: 130, border:'none'}}>
    {position_map}
  </Select>
);
const selectAfters = (
  <Select value={this.state.pname} onChange={e=> this.setState({pname:e})} style={{ width: 100 ,textAlign:'right', fontFamily:"Sukhumvit Set, sans-serif" }}>
    <Option value="นาย">นาย</Option>
    <Option value="นางสาว">นางสาว</Option>
    <Option value="นาง">นาง</Option>
  </Select>
);
const compony = (
  <Select  value={this.state.status}
  disabled={this.state.statuslineid <= this.state.status? true:false}
    onChange={e=>
  this.setState({status:e})
  // console.log(e)
  } style={{ width: 130, border:'none',fontFamily:"Sukhumvit Set, sans-serif" }}>
    <Option key={1} value={1}>User</Option>
    <Option key={2} value={2}>HR</Option>
    <Option key={3} value={3}>Super HR</Option>
    <Option key={4} value={4}>Admin</Option>
    {this.state.status === 5 ?<Option  key={5} value={5}>Super Admin</Option>:null}
  </Select>
);
const compony1 = (
  <Select  value={this.state.status}
    disabled={this.state.statuslineid <= this.state.status || this.state.status >2? true:false}
    onChange={e=>
  this.setState({status:e})
  // console.log(e)
  } style={{ width: 130, border:'none',fontFamily:"Sukhumvit Set, sans-serif" }}>
    <Option key={1} value={1}>User</Option>
    <Option key={2} value={2}>HR</Option>
    {this.state.status === 3 ?<Option disabled key={3} value={3}>Super HR</Option>:null}
    {/* <Option key={4} value={4}>Admin</Option> */}
    {this.state.status === 4 ?<Option disabled key={4} value={4}>Admin</Option>:null}
    {this.state.status === 5 ?<Option disabled key={5} value={5}>Super Admin</Option>:null}
  </Select>
);

    const path = () => {
      this.props.history.push(`/proFile/${this.state.docid}/${this.state.root}`)  
    }
    const pathsub = () => {
      setTimeout(() => {
        this.props.history.push(`/proFile/${this.state.docid}/${this.state.root}`)
        }, 3000);
    }
    const changeprofile = () => {
      if (this.state.fname !== "") {
        if (this.state.lname !== "") {
          if (this.state.nname !== "") {
            if (this.state.value.length === 10  && this.state.status !== "") {
              if (this.state.position !== "") {
                this.setState({statussub:1})
                axios.get(`https://us-central1-twin-hr.cloudfunctions.net/changeuser?lineid=${this.state.userId}&userid=${this.state.docid}&fname=${this.state.fname}&lname=${this.state.lname}&nname=${this.state.nname}&tel=${this.state.value}&position=${this.state.position}&status=${this.state.status}&img=${this.state.pictureUrl}`)
                .then((data) => {    
                // console.log(data.data);
                }).catch(async() => {
                    // this.setState({show:1})
                });
              }else{
                message.warning('กรุณากรอก ตำแหน่ง');
              }
            }else{
              message.warning('กรุณากรอก เบอร์โทร');
            }
          }else{
            message.warning('กรุณากรอก ชื่อเล่น');
          }
        }else{
          message.warning('กรุณากรอก นามสกุล');
        }
      }else{
        message.warning('กรุณากรอก ชื่อ');
      }      
    }
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
  if(this.state.statussub !== 1){
  if(this.state.showlineid === 1 ){
    if(this.state.show === 1 ){
      if(this.state.showposition === 1 ){
      if (this.state.statusme > 0 && this.state.status !== null && this.state.status !== undefined) {
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
            <i onClick={path}
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
            fontSize: "19px",
            fontFamily: "Sukhumvit Set, sans-serif"
          }}
        >
          แก้ไขบัญชี
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
              <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif"  }}> วันลาคงเหลือ </li>
            </Link>

            {this.state.leave.length !== 0 ?
              <Link to={`/leave-request/${this.state.leave[0].leaveType}/user`}>
               <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  ลางาน
                  <Icon type="right" style={{ float: "right" }} />{" "}
               </li>
              </Link> 
              : null}

            <Link to={`/proFile/${this.state.userId}/user`}>
              <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif"  }}>
                บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
              </li>
            </Link>
            {this.state.statusme === 2 ?  
              <Link to={`/adminMenu/${this.state.companyme}`}>
                <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                </li>
            </Link>
            :null}

            {/* Superhr */}
            {this.state.statusme === 3 ?
                <Link to={`/sumCompany/`}>
                    <li style={{ borderTop: " 1px solid #707070" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif"  }} />
                    </li>
                </Link>
            : null}

            {/* admin */}
            {this.state.statusme === 4 ?
                 <Link to={`/adminMenu/${this.state.companyme}`}>
                    <li style={{ borderTop: " 1px solid #707070" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right",fontFamily:"Sukhumvit Set, sans-serif"  }} />
                     </li>
                </Link>
            : null}

            {/* root */}
            {this.state.statusme === 5 ?
                 <Link to={`/companyMenu`}>
                    <li style={{ borderTop: " 1px solid #707070" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif"  }} />
                    </li>
                </Link>
            : null}          

          </div>
        </div>
      ) : null}


                <div className="in-register">     
                  <div  className="super-input" style={{ marginTop: "20px", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  <Input disabled prefix="คำนำหน้า :" value={this.state.pname} />
                    <Input prefix="ชื่อ :" 
                           value={this.state.fname} 
                           onChange={check_fname} 
                           placeholder="First Name" />

                    <Input prefix="นามสกุล :" 
                           value={this.state.lname}
                           onChange={check_lname} 
                           placeholder="Last Name" />

                    <Input prefix="ชื่อเล่น :" 
                           value={this.state.nname} 
                           onChange={check_nname} 
                           placeholder="Naick Name" />

                    <NumericInput style={{ width: '100%'}} value={this.state.value} format="08x-xxxxxxx"  onChange={this.onChange}/>
                    <Input disabled prefix="บริษัท :" value={this.state.company}  />
                    <div className="bigSuper">
                    <Input disabled prefix="ตำแหน่งงาน :" 
                           addonAfter={position}   />
                         </div>  
                    <div className="bigSuper">
                    {this.state.statuslineid >=3  ? this.state.statuslineid === 5? <Input disabled  prefix="Status :"   addonAfter={compony} />:
                    <Input disabled  prefix="Status :"   addonAfter={compony1} />: null}
                    </div>
                    <Buttons ><Row
                    style={{
                      width: '90%',
                      margin: 'auto',
                      marginTop: '10px',
                      background: '#F0F0F0'
                    }}
                  >
                    <div className="">
                      <Col span={12}>
                        <div
                          style={{ float: 'right', marginRight: '-5px', padding: '10px', fontFamily:"Sukhumvit Set, sans-serif" }}
                        >
                          <Link to="#" onClick={path}>
                            <Button style={{ width: '140px', height: '45px' }}>ยกเลิก</Button>
                          </Link>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          style={{ float: 'left', marginLeft: '-5px', padding: '10px', fontFamily:"Sukhumvit Set, sans-serif"  }}
                        >
                          <Button 
                            // disabled={this.state.fname?  this.state.lname?  this.state.nname?  this.state.value.length== 10?  this.state.position? false  : true : true : true:true : true} 
                            type="primary" 
                            onClick={changeprofile}
                            style={{ width: '140px' , height: '45px', fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            แก้ไข
                          </Button>
                          <br />
                        </div>
                      </Col>
                    </div>
                  </Row>
                  </Buttons> 
                        

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
    {pathsub()}
    </div>
    </Spin>
  )
}
  }
  }
export default editProfile;
