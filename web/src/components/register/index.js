import React, { Component } from "react";
// import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./register.css";
import axios from "axios";
import "antd/dist/antd.css";
import {
          Row, 
          Col,
          Avatar, 
          message,  
          Button,
          Input, 
          Spin,
          // Dropdown,Menu,Icon,
          // Modal,
          Select,
        } from 'antd';
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
        <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
      ) : (
        'Input a number'
      );
      return (
          <Input
            {...this.props}
            onChange={this.onChange}
            onBlur={this.onBlur}
            placeholder="Phone Number"
            prefix="เบอร์โทร"
            maxLength={10}
            minLength={10}
          />
        
      );
    }}

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Avatars = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

let company = []
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    id:'',
    status:'', 
    name : '', 
    show:0,
    positionofcompany:[],
    showposition:[],
    userId:"",
    pictureUrl : "",
    statusMessage : '',
    dataSource: [], 
    value: '' ,
    pname:'นาย',
    fname:'',
    lname:'',
    nname:'',
    position:'',
    company:'' ,
    statusfail:'' ,
    allcompany:[]};
  }
  onChange = value => {
    this.setState({ value });
  };
  async componentDidMount() {
  await  liff.init(async (data) => {
        let profile = await liff.getProfile();
     await   this.setState({
            name : profile.displayName,
          userId : profile.userId,
          pictureUrl : profile.pictureUrl,
          statusMessage : profile.statusMessage
        });
      }); 
      await axios.get(`https://us-central1-twin-hr.cloudfunctions.net/company_All`)
      .then(async(data) => {   
       for (let index = 0; index < data.data.company.length; index++) {
             this.setState({allcompany:[...this.state.allcompany ,data.data.company[index].data.nameCompany] })
       }
     await this.setState({company:this.state.allcompany[0]})
     })
     await axios.get(`https://us-central1-twin-hr.cloudfunctions.net/position_All`)
     .then(async(data) => {   
      await this.setState({showposition:data.data.positions})
    })
    for (let index = 0; index < this.state.showposition.length; index++) {
      if (this.state.company === this.state.showposition[index].positionCompany) {
        this.setState({positionofcompany:[...this.state.positionofcompany ,this.state.showposition[index].positionType]})
      }
    }
    await this.setState({position:this.state.positionofcompany[0]})
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
let loadposition =async()=>{
  await this.setState({positionofcompany:[]})
  for (let index = 0; index < this.state.showposition.length; index++) {
    if (this.state.company === this.state.showposition[index].positionCompany) {
      this.setState({positionofcompany:[...this.state.positionofcompany ,this.state.showposition[index].positionType]})
    }
  }
  await this.setState({position:this.state.positionofcompany[0]})
}
const { Option } = Select;
const InputGroup = Input.Group;
const selectAfters = (
    <Select className="" value={this.state.pname} onChange={e=> this.setState({pname:e})} style={{ width:80}}>
      <Option value="นาย">นาย</Option>
      <Option value="นางสาว">นางสาว</Option>
      <Option value="นาง">นาง</Option>
    </Select>
);

let op = this.state.allcompany.map(data=>(
  <Option key={data} value={data}>{data}</Option>
))
const compony = (
  <Select value={this.state.company} onChange={e=>
  this.setState({company:e},loadposition)
  } style={{ width: 130, border:'none'}}>
    {op}
  </Select>
);
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
    const  showConfirm = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
    const loaduser = () => {
      if (this.state.userId !== "") {
        axios.get(`https://us-central1-twin-hr.cloudfunctions.net/displayprofile_lineid?lineid=${this.state.userId}`)
        .then((data) => {    
      this.setState({id:data.data.id,status:data.data.data.status,statusfail:data.data.data.statusfail,show:1})
        }).catch(async() => {
            this.setState({show:1})
        });
      }
    }
    const path = () => {
      this.props.history.push(`/home`)
    }
    const save = () => {
      if (this.state.fname !== "") {
        if (this.state.lname !== "") {
          if (this.state.nname !== "") {
            if (this.state.value.length === 10) {
              if (this.state.position !== "" && this.state.position !== undefined) {
                this.setState({
                  status:0
                })
                axios.get(`https://us-central1-twin-hr.cloudfunctions.net/adduser?lineid=${this.state.userId}&img=${this.state.pictureUrl}&pname=${this.state.pname}&fname=${this.state.fname}&lname=${this.state.lname}&nname=${this.state.nname}&tel=${this.state.value}&position=${this.state.position}&company=${this.state.company}&id=${this.state.id}`)
                .then((data) => {    
                  liff.closeWindow();
             })
              }else{
                message.warning('กรุณาเลือกตำแหน่งงาน หรือติดต่อผู้ดูแลระบบ');
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
    const close = () => {
      liff.closeWindow();
  }
  if(this.state.userId !== '' ){
    if(this.state.show === 1){
     if(this.state.status >= 1) {  
    return (
          <div className="all-register" style={{fontFamily:'Sukhumvit Set, sans-serif'}}>
            <header>
              <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                rel="stylesheet"
              />
            </header>
          {path()}
          </div>
        );
  }else{
    if(this.state.statusfail === -3){
      return (
        <Spin tip="คุณไม่สามารถยืนยันตัวได้">
          <div className="all-register">
          {showConfirm()}
          </div>
        </Spin>
          );
    }else{
      if(this.state.status === 0 ){
        return (
          <Spin tip="รอผู้ดูแลดำเนินการ">
            <div className="all-register">
              {showConfirm()}
            </div>
          </Spin>
            );
      }else{ 
          if(this.state.status === -1 || this.state.id === ""){
            return (
              <div className="all-register">
                <header>
                  <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                    rel="stylesheet"/>
                </header>
                <Row
                  className=""
                  style={{ background: "#405EA5", position: "relative" }}
                >
                  <Col span={3}>
                    <i
                      className="fas fa-arrow-left" onClick={close}
                      style={{ cursor: "pointer", color: "#fff", padding: "15px " }}
                    ></i>
                  </Col>
                  <Col
                    span={18}
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      padding: "10px",
                      fontSize: "18px",
                      fontFamily:'Sukhumvit Set, sans-serif',
                    }}
                  >
                    ยืนยัน ข้อมูลพนักงาน
                  </Col>
                  <Col span={3}>
                  </Col>
                </Row>
                <div className="in-register">
                  <Avatars style={{ marginTop: "20px" }}>
                    <Avatar
                      size={100}
                      src={this.state.pictureUrl}
                    />
                  </Avatars>        
                  <div  className="supermankub" style={{ marginTop: "20px" , fontFamily:"Sukhumvit Set, sans-serif"}}>
                    <Input className="one" disabled prefix="คำนำหน้า :" addonAfter={selectAfters}  style={{fontFamily:"Sukhumvit Set, sans-serif"}}/>
                    <Input prefix="ชื่อ :" 
                           value={this.state.fname} 

                           onChange={check_fname} 
                           placeholder="First Name" 
                           style={{fontFamily:"Sukhumvit Set, sans-serif"}}/>

                    <Input prefix="นามสกุล :" 
                           value={this.state.lname} 
                          //  onChange={e=>this.setState({lname:e.target.value})} 
                           placeholder="Last Name"  
                           style={{fontFamily:"Sukhumvit Set, sans-serif"}}
                           onChange={check_lname}
                           />

                    <Input prefix="ชื่อเล่น :" 
                           value={this.state.nname} 
                          //  onChange={/}
                          //  onChange={e=>this.setState({nname:e.target.value})} 
                           placeholder="Nick Name"  
                           style={{fontFamily:"Sukhumvit Set, sans-serif"}}
                           onChange={check_nname}/>

                    <NumericInput style={{ width: '100%'}} 
                                  value={this.state.value} 
                                  onChange={this.onChange} 
                                  
                                  />
                    
                    <Input className="" 
                           disabled prefix="บริษัท :"  
                           addonAfter={compony}  
                           style={{fontFamily:"Sukhumvit Set, sans-serif"}}/>
                   
                    <Input className="" 
                           disabled prefix="ตำแหน่งงาน :"  
                           addonAfter={position}  
                           style={{fontFamily:"Sukhumvit Set, sans-serif"}}/>
                   
                     <Buttons>
                      <Button type="" 
                              onClick={save} 
                              style={{background:'#405EA5',
                                      width:'180px', 
                                      height:'45px', 
                                      color:'#fff',
                                      borderRadius:'0.8rem',
                                      fontSize:'17px', 
                                      fontFamily:'Sukhumvit Set, sans-serif'                                     
                                    }}>
                                      ยืนยัน
                      </Button>
                  </Buttons>   

                  </div>
                </div>
                                            
              </div>
            )
           }
        else{
          return (
            <Spin tip="พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง...">
            <div className="all-register">
              {showConfirm()}
            </div>
            </Spin>
          )
        }
      }
    }
  }
}else{
  return (
    //spin
    <Spin tip="Loading...">
    <div className="all-register">
    {loaduser()}
    </div>
    </Spin>
  )
} 
  }else{
    return (
      //spin
      <Spin tip="Loading...">
      <div className="all-register">
      {loaduser()}
      </div>
      </Spin>
    )
  } 
}
  }

export default Register;
