import React, { Component } from "react";
import firebaseApp from '../../config/firebaseConfig'
import { Link } from "react-router-dom";
import moment from "moment"
import "antd/dist/antd.css";
import axios from "axios";
import "./saveLeave.css";
import {Spin,
  Row,
  Col,
  Modal,
  message,
  Button,
  Icon,
  Select,
  Input,
  Upload,
  DatePicker
} from "antd";
const liff = window.liff;

class saveLeave extends Component {
  constructor(props) {
    super(props); 
    this.state = {
    fileList: null,
    uploading: false,
    listMenu: false,
    userId: '',
      loading: true,allow:true,show:0,
      status:'',
      company:'',
      newfilelname:'',
      lname:'',
      leaveDay:'',
      noteMe:'',
      noteAdmin:"",
      file:'',
      oldname:'',
      showid:0,
      leave:[],
      leaveType:'',
      username:'',
      dateStart:'',
      dateEnd:'',
      timeStart:1,
      leaveStatus:'',
      timeEnd:1,
      leaveSum:0,
    startValue: null,
    endValue: null,
    id:''
    //endOpen: false,
  }
  this.handleChange = this.handleChange.bind(this);
  this.uploadToFirebase = this.uploadToFirebase.bind(this);
  this.updateToFirebase = this.updateToFirebase.bind(this);
  };
  async  uploadToFirebase() {
    const storageRef = firebaseApp.storage().ref();
    let name = Date.now()+this.state.fileList[0].lastModified
  
    let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
    if (newStr !== "jpg" && newStr !== "pdf") {
      let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -4 , this.state.fileList[0].name.length )
    await  this.setState({newfilelname:newStr})
    }else{
      let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
    await  this.setState({newfilelname:newStr})
    }
  let  filename = name+"."+this.state.newfilelname

          if (this.state.newfilelname === "pdf") {
            storageRef.child(`certificate/file/${filename}`).put(this.state.fileList[0]).then(async(snapshot) => {
              
            }).catch(function(error) {
            }); 
            }else{
              storageRef.child(`certificate/image/${filename}`).put(this.state.fileList[0]).then(async(snapshot) => {
                
              }).catch(function(error) {
              }); 
            }
            await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/addleave_request?timeEnd=${this.state.timeEnd}&timeStart=${this.state.timeStart}&dateEnd=${this.state.dateEnd}&dateStart=${this.state.dateStart}&leaveSum=${this.state.leaveSum}&leaveType=${this.state.leaveType}&lineid=${this.state.userId}&company=${this.state.company}&noteMe=${this.state.noteMe}&file=${filename}&leaveDay=${this.state.leaveDay}`)
            .then((data) => {    
              this.props.history.push(`/home`)
        }).catch(async() => {
            })
}

async  updateToFirebase() {
  const storageRef = firebaseApp.storage().ref();
  let name = Date.now()+this.state.fileList[0].lastModified

  let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
  if (newStr !== "jpg" && newStr !== "pdf") {
    let newStr1 = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -4 , this.state.fileList[0].name.length )
  await  this.setState({newfilelname:newStr1})
  }else{
    let newStr1 = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
  await  this.setState({newfilelname:newStr1})
  }

  let oldname = this.state.file.substring(this.state.file.length - 27, this.state.file.length -10)
  let oldname1 = oldname.substring(oldname.length - 3, oldname.length )
  if (oldname1 !== "jpg" && oldname1 !== "pdf") {
    let oldname = this.state.file.substring(this.state.file.length - 28, this.state.file.length -10)
  await  this.setState({oldname:oldname})
  }else{
    let oldname = this.state.file.substring(this.state.file.length - 27, this.state.file.length -10)
  await  this.setState({oldname:oldname})
  }

  let lnameold = this.state.oldname.substring(this.state.oldname.length - 3, this.state.oldname.length )
  if (lnameold !== "jpg" && lnameold !== "pdf") {
    let lname = oldname.substring(this.state.oldname.length - 4, this.state.oldname.length )
  await  this.setState({fileLname:lname})
  }else{
    let lname = oldname.substring(this.state.oldname.length - 3, this.state.oldname.length )
  await  this.setState({fileLname:lname})
  }
let filename=name+"."+this.state.newfilelname

  if(this.state.file.length > 50 ){
      if(this.state.newfilelname === "pdf" ){
      await  storageRef.child(`certificate/file/${filename}`).put(this.state.fileList[0]).then(async(snapshot) => {
          if (this.state.fileLname === "pdf") {
            let desertRef  = storageRef.child(`certificate/file/${this.state.oldname}`);
            desertRef.delete().then(async function() {
              
            }).catch(function(error) {
            }); 
            
            }else{
              let desertRef  = storageRef.child(`certificate/image/${this.state.oldname}`);
              desertRef.delete().then(async function() {
                
              }).catch(function(error) {
              }); 
            }
           })
           await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/changeleave_request?id=${this.state.id}&file=${filename}`)
          .then((data) => {   
            this.props.history.push(`/home`)
      }).catch(async() => {
          })
          } else{
        storageRef.child(`certificate/image/${filename}`).put(this.state.fileList[0]).then(async(snapshot) => {
          if (this.state.fileLname === "pdf") {
            let desertRef  = storageRef.child(`certificate/file/${this.state.oldname}`);
            desertRef.delete().then(async function() {
              
            }).catch(function(error) {
            }); 
            
            }else{
              let desertRef  = storageRef.child(`certificate/image/${this.state.oldname}`);
              desertRef.delete().then(async function() {
                
              }).catch(function(error) {
              }); 
              
            }
          })
          await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/changeleave_request?id=${this.state.id}&file=${filename}`)
          .then((data) => {    

            this.props.history.push(`/home`)
      }).catch(async() => {
          })
            }
          
  }else{
    if (this.state.newfilelname === "pdf") {
      storageRef.child(`certificate/file/${filename}`).put(this.state.fileList[0]).then(async(snapshot) => {
        
      }).catch(function(error) {
      }); 
      await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/changeleave_request?id=${this.state.id}&file=${filename}`)
    .then((data) => {    
      this.props.history.push(`/home`)
}).catch(async() => {
    })
      }else{
        storageRef.child(`certificate/image/${filename}`).put(this.state.fileList[0]).then(async(snapshot) => {
          
        }).catch(function(error) {
        }); 
        await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/changeleave_request?id=${this.state.id}&file=${filename}`)
      .then((data) => {    
        this.props.history.push(`/home`)
  }).catch(async() => {
      })
      }
    }  
}
 // up
 handleChange(event) {
  const fileList = event.target.files[0];
  this.setState({ fileList });
}
  //date
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    let dateY = new Date();
            let getY = dateY.getFullYear();
            let newyear = moment(`01/01/${getY+1}`, "DD/MM/YYYY").format("x")
    if (!endValue) {
      return startValue < moment().subtract(1,'day') || startValue >newyear
    }else{
          return  startValue < moment().subtract(1,'day')  || startValue.valueOf() >= endValue.valueOf() || startValue >newyear
    }
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    let dateY = new Date();
            let getY = dateY.getFullYear();
            let newyear = moment(`01/01/${getY+1}`, "DD/MM/YYYY").format("x")
    if (!startValue) {
      return endValue < moment().subtract(1,'day') || endValue >newyear
    }
    return endValue.valueOf() <=  startValue.valueOf() || endValue >newyear
  };

  onenChange =async (field, value,dateString) => {
    let date =  moment(dateString, "DD/MM/YYYY").format("x")
    await  this.setState({
      [field]: value,dateEnd:Number(date)
    });
    if(this.state.dateStart !== '' && this.state.dateEnd !=='' ){
        let sumday = (((this.state.endValue-this.state.startValue)/86400000)+1)
        let ceilDay = parseInt(sumday)
        let day = []
        for (let index = 0; index < ceilDay; index++) {
          let sumday = this.state.startValue+(86400000*index)
          let dayStr = moment(sumday).format("dddd")
          if (dayStr !== "Saturday" && dayStr !== "Sunday" ) {
            day.push(dayStr)
          }
        }
      if(this.state.dateStart === this.state.dateEnd && this.state.timeStart === 2 ){
        this.setState({leaveSum:0.5})
      }else{
        if(this.state.timeStart === 1 ){
          if(this.state.timeEnd ===1){
            this.setState({leaveSum:day.length})
          }else{
            this.setState({leaveSum:day.length-0.5})
          }
        }else{
          if(this.state.timeEnd ===1){
            this.setState({leaveSum:day.length-0.5})
          }else{
            this.setState({leaveSum:day.length-1})
          }
        }
        }
      }
  };
  onstChange = async(field, value,dateString) => {
    let date = moment(dateString, "DD/MM/YYYY").format("x")
    await  this.setState({
      [field]: value,dateStart:Number(date)
    });
    if(this.state.timeStart === 2 ){
      await  this.setState({
        dateEnd:Number(date),leaveSum:0.5
      });
    }
    if(this.state.dateStart !== '' && this.state.dateEnd !== '' ){
        let sumday = (((this.state.endValue-this.state.startValue)/86400000)+1)
        let ceilDay = parseInt(sumday)
        let day = []
        for (let index = 0; index < ceilDay; index++) {
          let sumday = this.state.startValue+(86400000*index)
          let dayStr = moment(sumday).format("dddd")
          if (dayStr !== "Saturday" && dayStr !== "Sunday" ) {
            day.push(dayStr)
          }
        }
      if(this.state.dateStart === this.state.dateEnd && this.state.timeStart === 2 ){
        this.setState({leaveSum:0.5})
      }else{
        if(this.state.timeStart === 1 ){
          if(this.state.timeEnd ===1){
            this.setState({leaveSum:day.length})
          }else{
            this.setState({leaveSum:day.length-0.5})
          }
        }else{
          if(this.state.timeEnd ===1){
            this.setState({leaveSum:day.length-0.5})
          }else{
            this.setState({leaveSum:day.length-1})
          }
        }
        }
      }
      
  };

  onStartChange = (value,dateString) => {
    this.onstChange('startValue', value,dateString);
  };

  onEndChange = (value,dateString) => {
    this.onenChange('endValue', value,dateString);
  };
 //Menu 
  listMenushow() {
    this.setState({
     listMenu: !this.state.listMenu
  });
 }
      //Menu
      async componentDidMount() {
          await  liff.init(async (data) => {
              let profile = await liff.getProfile();
           await   this.setState({
                userId : profile.userId
              });
            }); 
            const { match: { params } } = this.props;
            await  this.setState({leaveType:params.id,root:params.root})
        
        
    }

  render() {

    const path = () => {
      if(this.state.root === "user"){
        this.props.history.push(`/home`)   
      }else {
        this.props.history.push(`/HistoryApproval/${this.state.companyofreq}`)   
      }
  }
  let loaddata =()=>{
    if (this.state.show === 0 &&this.state.userId !== "") {
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
        for(let id = 0; id < data.data.data.leave.length; id++){
          if(data.data.data.leave[id].leaveType === this.state.leaveType){
            this.setState({company:data.data.data.company,leaveDay:data.data.data.leave[id].leaveDay})
          }
        }
    this.setState({username:data.data.data.pname+data.data.data.fname +" "+data.data.data.lname,show:1,status:data.data.data.status,leave:loop3.length ===0 ? loop1:loop3,leavess:loop3.length ===0 ? loop1:loop3,
    statusss:data.data.data.status,
    userIdss:data.data.data.lineid,
    companyss:data.data.data.company})
  }).catch(() => {
          this.setState({show:0})
      });
    }
    if(this.state.show !== 1){
      axios.get(`https://us-central1-twin-hr.cloudfunctions.net/showone_leave_request?id=${this.state.leaveType}`)
      .then(async(data) => {  
          this.setState({
            noteMe:data.data.data.noteMe,noteAdmin:data.data.data.noteAdmin,
            leaveType:data.data.data.leaveType
            ,leaveSum:data.data.data.leaveSum
            ,dateStart:data.data.data.dateStart
            ,dateEnd:data.data.data.dateEnd
            ,timeStart:data.data.data.timeStart
            ,timeEnd:data.data.data.timeEnd
            ,id:data.data.id,showid:1
            ,file:data.data.data.file
            ,leaveStatus:data.data.data.status
            ,noteAdmin:data.data.data.noteAdmin,
            companyofreq:data.data.data.company
            })
            if (data.data.data.leaveDay !== "") {
              this.setState({
                leaveDay:data.data.data.leaveDay
                })  
            }
      }).catch(() => {
        this.setState({showid:0})
    });
  }
  }
    // const { size } = this.state;
    const { TextArea } = Input;
    const { Option } = Select;
    // const { Meta } = Card;
    let dateSStart = moment(this.state.dateStart).format('L')
    let dateSEnd = moment(this.state.dateEnd).format('L')
    let 
    updateleave_req =async () => {
      if(this.state.fileList !== null){
    let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
        if (newStr === "jpg" ||newStr === "pdf" || newStr === "peg" ) {
          await  this.setState({status:99})
           await this.updateToFirebase()
        } else {
          message.warning('แนบไฟล์นามสกุล .jpeg .jpg และ .pdf เท่านั้น');
        }
      }else{
        message.warning('เลือกไฟล์')
      }
    }
    let success = async () =>{
      if(this.state.dateStart !== ''){
        if(this.state.dateEnd !== ''){
          if(this.state.leaveSum > 0){
            if(this.state.leaveSum <= this.state.leaveDay){
          if(this.state.fileList !== null){
    let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )

    if (newStr === "jpg" ||newStr === "pdf" || newStr === "peg") {
              await  this.setState({status:99})
           await this.uploadToFirebase()
          }
           else {
            message.warning('แนบไฟล์นามสกุล .jpeg .jpg และ .pdf เท่านั้น');
          }
          }else{
            await  this.setState({status:99})
            await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/addleave_request?timeEnd=${this.state.timeEnd}&timeStart=${this.state.timeStart}&dateEnd=${this.state.dateEnd}&dateStart=${this.state.dateStart}&leaveSum=${this.state.leaveSum}&leaveType=${this.state.leaveType}&lineid=${this.state.userId}&company=${this.state.company}&noteMe=${this.state.noteMe}&file=&leaveDay=${this.state.leaveDay}`)
            .then((data) => {    
              this.props.history.push(`/home`)
        }).catch(async() => {
            })
          }
        }else{
          message.warning('จำนวนวันลาไม่พอ')
       }
      }else{
        message.warning('เลือกวันที่อีกครั้งเนื่องจาก จำนวนวันที่ต้องการลาน้อยกว่าหรือเท่ากับ 0')
     }
        }else{
          message.warning('เลือกลาถึงวันที่')
        }
      }else{
        message.warning('เลือกวันที่ต้องการลา')
      }
    }
    let handleStartChange = async(value) =>{
      if(Number(value) === 2 ){
      await  this.setState({dateEnd:this.state.dateStart,sum:0,leaveSum:0.5,endValue:null})
      }else{
        await  this.setState({dateEnd:'',sum:"null",leaveSum:0,endValue:null})
      }
      this.setState({timeStart:value})
      if(this.state.dateStart !== '' && this.state.dateEnd !== '' && Number(value) !== 2 ){
        let sumday = (((this.state.endValue-this.state.startValue)/86400000)+1)
        let ceilDay = parseInt(sumday)
        let day = []
        for (let index = 0; index < ceilDay; index++) {
          let sumday = this.state.startValue+(86400000*index)
          let dayStr = moment(sumday).format("dddd")
          if (dayStr !== "Saturday" && dayStr !== "Sunday" ) {
            day.push(dayStr)
          }
        }
        if(this.state.dateStart === this.state.dateEnd && this.state.timeStart === 2 ){
          this.setState({leaveSum:0.5})
        }else{
          if(this.state.timeStart === 1 ){
            if(this.state.timeEnd ===1){
              this.setState({leaveSum:day.length})
            }else{
              this.setState({leaveSum:day.length-0.5})
            }
          }else{
            if(this.state.timeEnd ===1){
              this.setState({leaveSum:day.length-0.5})
            }else{
              this.setState({leaveSum:day.length-1})
            }
          }
          }
        }
    }
    let handleEndChange = async(value)=> {
     await this.setState({timeEnd:value})
      if(this.state.dateStart !== '' && this.state.dateEnd !== '' ){
        let sumday = (((this.state.endValue-this.state.startValue)/86400000)+1)
        let ceilDay = parseInt(sumday)
        let day = []
        for (let index = 0; index < ceilDay; index++) {
          let sumday = this.state.startValue+(86400000*index)
          let dayStr = moment(sumday).format("dddd")
          if (dayStr !== "Saturday" && dayStr !== "Sunday" ) {
            day.push(dayStr)
          }
        }
        if(this.state.dateStart === this.state.dateEnd && this.state.timeStart === 2 ){
          this.setState({leaveSum:0.5})
        }else{
          if(this.state.timeStart === 1 ){
            if(this.state.timeEnd ===1){
              this.setState({leaveSum:day.length})
            }else{
              this.setState({leaveSum:day.length-0.5})
            }
          }else{
            if(this.state.timeEnd ===1){
              this.setState({leaveSum:day.length-0.5})
            }else{
              this.setState({leaveSum:day.length-1})
            }
          }
          }
        }
    }

    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }
    let pathofedit=()=>{
      this.props.history.push(`/leave-request/${this.state.leave[0].leaveType}/user`)
      window.location.reload()
    }
    const { fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [file],  
        }));
        return false;
      },
      fileList,
    };

let op = this.state.leave.map(data=>(
  <Option key={data.leaveType} value={data.leaveType}>{data.leaveType}</Option>
))
    //date
    const { startValue, endValue, } = this.state;
      if (this.state.show !== 0 ) {
        if(this.state.status === 99){
          return (
            //spin
            <Spin tip="กรุณารอสักครู่">
            <div className="all-register">

            </div>
            </Spin>
          )
        }else{
          //แก้ไข
          if (this.state.status > 0 && this.state.status !== null && this.state.status !== undefined) {
            if (this.state.id !== '' && this.state.leaveStatus < 1) {
              return (
                <div className="all-saveLeave" style={{ background: "#F0F0F0" }}>
                  <header>
                    <link
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                      rel="stylesheet"
                    />
                  </header>
                  {/* menubar */}
                  <Row
                    className=""
                    style={{ background: "#405EA5", position: "relative" }}
                  >
                    <Col span={3}>
                    <Link to="/home">
                      <i
                        className="fas fa-arrow-left"
                        style={{ cursor: "pointer", color: "#fff",  marginTop:"2px",padding: "15px " ,fontSize: '20px'}}
                      ></i>
                      </Link>
                    </Col>
                    <Col
                      span={18}
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        padding: "15px",
                        fontSize: "18px",
                        marginTop:"1px",
                        fontFamily:"Sukhumvit Set, sans-serif"
                      }}
                    >
                      แก้ไขไฟล์แนบ
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
                          marginTop:""
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
              <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}> วันลาคงเหลือ </li>
            </Link>

            {this.state.leave.length !== 0 ?
              <Link to="#">
              <li onClick={pathofedit} style={{ borderTop: " 1px solid #707070" ,fontFamily:"Sukhumvit Set, sans-serif"}}>
                 ลางาน
                 <Icon type="right" style={{ float: "right" }} />{" "}
              </li>
             </Link>
              : null}

            <Link to={`/proFile/${this.state.userId}/user`}>
              <li style={{ borderTop: " 1px solid #707070" }}>
                บัญชีผู้ใช้ <Icon type="right" style={{ float: "right",fontFamily:"Sukhumvit Set, sans-serif" }} />
              </li>
            </Link>
            {this.state.status === 2 ?  
              <Link to={`/adminMenu/${this.state.company}`}>
                <li style={{ borderTop: " 1px solid #707070" }}>
                  ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif" }} />
                </li>
            </Link>
            :null}

            {/* Superhr */}
            {this.state.status === 3 ?
                <Link to={`/sumCompany/`}>
                    <li style={{ borderTop: " 1px solid #707070" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right", fontFamily:"Sukhumvit Set, sans-serif" }} />
                    </li>
                </Link>
            : null}

            {/* admin */}
            {this.state.status === 4 ?
                 <Link to={`/adminMenu/${this.state.company}`}>
                    <li style={{ borderTop: " 1px solid #707070" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" , fontFamily:"Sukhumvit Set, sans-serif"}} />
                     </li>
                </Link>
            : null}

            {/* root */}
            {this.state.status === 5 ?
                 <Link to={`/companyMenu`}>
                    <li style={{ borderTop: " 1px solid #707070" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" , fontFamily:"Sukhumvit Set, sans-serif"}} />
                    </li>
                </Link>
            : null}          

          </div>
        </div>
      ) : null}
          
                  <div className="in-saveLeave">
                    {/* Row1 */}
                    <Row  style={{ width: "94%", margin: "20px auto" }}>
                      <Col span={24}>  {/* ประเภทการลา: */}
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", marginTop:'20px', fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ประเภทการลา:
                        </h3>
                        <div className="superman">
                          <Select
                            value={this.state.leaveType}
                            disabled
                            style={{ width: "98%", margin:" -3px auto", display:"block", fontFamily:"Sukhumvit Set, sans-serif"}}
                            onChange={e=>{
                              for(let id = 0; id < this.state.leave.length; id++){
                                if(this.state.leave[id].leaveType === e){
                                  this.setState({leaveType:e,leaveDay:this.state.leave[id].leaveDay})
                                }
                              }
                            }}>
                           {op}
                          </Select>
                        </div>
                      </Col>        
                    </Row>     
                    
                    <Row  style={{ width: "94%", margin: "-15px auto" }}>
                    <Col span={24}> {/* วันลาคงเหลือ: */}
                        <h3 style={{ fontSize: "15px", marginLeft: "5px" , marginTop:'3px', fontFamily:"Sukhumvit Set, sans-serif"}}>
                          วันลาคงเหลือ:
                        </h3>
                        <div>
                          <Input
                            disabled
                            value={`${this.state.leaveDay} วัน`}
                            size="large"
                            placeholder="30 วัน"
                            style={{
                              fontSize: "15px",
                              marginLeft: "5px",
                              marginTop:'-2px',
                              width: "47.5%",
                              // borderTop: "none",
                              // borderLeft: "none",
                              // borderRight: "none",
                              height:"30px"
                            }}
                          />
                        </div>
                      </Col>
                    </Row>     


                    {/* Row2 */}
                    <Row
                      style={{
                        width: "94%",
                        margin: "15px auto",
                      
                      }}
                    >
                      <Col span={12}> {/* วันที่ต้องการลา */}
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",marginTop:"8px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          วันที่ต้องการลา:
                        </h3>
                        <div styl={{ marginLeft: "" }}>
                          <DatePicker
                           disabled
                            disabledDate={this.disabledStartDate}
                            format="DD/MM/YYYY"
                            value={startValue}
                            placeholder={dateSStart}
                            onChange={this.onStartChange}
                            style={{ width: "95%", marginLeft: "5px" ,marginTop:"-7px",}}
                          />
                        </div>
                      </Col>
                      <Col span={12}> {/* ช่วงเวลา */}    
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",marginTop:"8px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ช่วงเวลา:
                        </h3>
                        <div className="superman-leave">
                          <Select
                            disabled
                            value={this.state.timeStart}
                            style={{ width: "95%", marginLeft: "5px", marginTop:"-2px",}}
                            onChange={handleStartChange}
                            type="date">

                            <Option value={1}>เต็มวัน</Option>
                            <Option value={2}>ครึ่งเช้า</Option>
                            <Option value={3}>ครึ่งบ่าย</Option>
                          </Select>
                        </div>
                      </Col>
                    </Row> 

                    {/* Row3 */}
                    <Row style={{ width: "94%",  margin: "auto", marginTop: "5px" }} >
                      {this.state.timeStart === 2 ? null : 
                      <Col span={12}> {/* ลาถึงวันที่ */}
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",marginTop:"-8px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ลาถึงวันที่:
                        </h3>
                        <div>
                          <DatePicker
                          disabled
                            disabledDate={this.disabledEndDate}
                            format="DD/MM/YYYY"
                            value={endValue}
                            placeholder={dateSEnd}
                            onChange={this.onEndChange}
                            style={{ width: "95%", marginLeft: "5px",marginTop:'-5px' }}
                          />
                        </div>
                      </Col>}
                      {this.state.timeStart === 2 ? null : this.state.dateStart !==  this.state.dateEnd  ? 
                      <Col span={12}> {/* ช่วงเวลา */}
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", marginTop:"-8px",fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ช่วงเวลา:
                        </h3>
                        <div className="superman-leave">
                          <Select
                            value={this.state.timeStart === 2 ? " - ": this.state.timeEnd}
                            style={{ width: "95%", marginLeft: "5px", marginTop:'' }}
                            onChange={handleEndChange}
                            disabled
                            // {this.state.timeStart == 2 ? disabled : null}
                          >
                            {this.state.timeStart !== 2 ? <Option value={1}>เต็มวัน</Option>
                            : null}
                            {this.state.timeStart !== 2 ? 
                                                          <Option value={2}>ครึ่งเช้า</Option> : null}
                          </Select>
                        </div>
                      </Col> :  null}
                    </Row>
          
                    {/* Row4 */}
                    <Row style={{ width: "94%", margin: "auto", marginTop: "5px" }}>
                      <Col span={12}> {/* จำนวนวันลา */}
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",marginTop:"3px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          จำนวนวันลา:
                        </h3>
                        <div>
                          <Input
                            disabled
                            size="large"
                            value={`${this.state.leaveSum} วัน`}
                            placeholder="1 วัน"
                            style={{
                              fontSize: "16px",
                               width: "95%",
                               marginTop:"-3px",
                               height:"30px",
                              // borderTop: "none",
                              // borderLeft: "none",
                              // borderRight: "none",
                              marginLeft: "5px"
                            }}
                          />
                        </div>
                      </Col>
                      
                    </Row>
          
                    {/* Row5 */}
                    <Row style={{ width: "90%", margin: "auto", marginTop: "8px" }} >
                      <Col span={24}> {/* หมายเหตุการลา */}
                        <h3 style={{ fontSize: "15px", marginLeft: "", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          หมายเหตุการลา:
                        </h3>
                        <div>
                          <TextArea disabled
                            rows={4} value={this.state.noteMe} onChange={e=>this.setState({noteMe:e.target.value})}
                            placeholder="รายละเอียด"
                          />
                        </div>
                      </Col>
                    </Row>

                    {/* Row6 */}
                    <Row style={{ width: "94%", margin: "10px", marginTop: "8px" }} >
                      <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft: "10px", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                          ไฟล์แนบ:   <a className="aa" rel="noopener noreferrer">{"* สามารถแก้ไขไฟล์แนบทีหลังได้ * "}</a>
                          
                        </h3>
                        <div></div>
                      </Col>
                    </Row>
          
                    {/* Row7 */}
                    <Row style={{ width: "90%", margin: "5px auto", padding:"8px", marginLeft:"10px"}}>
                      <Col span={24}>
                        <Upload
                          {...props} 
                          style={{ color: "#000000", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                          <Button >
                            <Icon type="upload" /> เลือกไฟล์
                          </Button>
                        </Upload>
                        <div style={{padding:"15px" ,paddingLeft:"",paddingRight:"none"}}>
                        {this.state.file.length >   50?  <a href={this.state.file} style={{marginTop:"10px"}}>คลิกเพื่อดูไฟล์อัพโหลด</a> : null}
                        </div>
                      </Col>
                     
                    </Row>
                  </div>
                  {/* in-all */}
                  {/* Row8 */}
                  <Row style={{ width: '90%', margin: 'auto', marginTop: '10px', background: '#F0F0F0' }}>
                    <div className="">
                      <Col span={12}>
                        <div
                          style={{ float: 'right', marginRight: '-5px', padding: '10px' , fontFamily:"Sukhumvit Set, sans-serif" }}
                        >
                          <Link to="/home">
                            <Button style={{ width: '140px', height: '45px' , fontFamily:"Sukhumvit Set, sans-serif" }}>ยกเลิก</Button>
                          </Link>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          style={{ float: 'left', marginLeft: '-5px', padding: '10px' , fontFamily:"Sukhumvit Set, sans-serif" }}
                        >
                          <Button 
                            type="primary" 
                            onClick={updateleave_req}
                            style={{ width: '140px' , height: '45px', fontFamily:"Sukhumvit Set, sans-serif"  }}>
                            ยืนยัน
                          </Button>
                          <br />
                        </div>
                      </Col>
                    </div>
                  </Row>
                  
                </div>
              )
            } 
            //บันทึก
            else  if(this.state.id === '' && this.state.leaveStatus === ''){
              return (
                <div className="all-saveLeave" style={{ background: "#F0F0F0" }}>
                  <header>
                    <link
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                      rel="stylesheet"
                    />
                  </header>
                  {/* menubar */}
                  <Row
                    className=""
                    style={{ background: "#405EA5", position: "relative" }}
                  >
                    <Col span={3}>
                    <Link to="/home">
                      <i
                        className="fas fa-arrow-left"
                        style={{ cursor: "pointer", color: "#fff", padding: "15px " ,fontSize: '20px'}}
                      ></i>
                      </Link>
                    </Col>
                    <Col
                      span={18}
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        padding: "15px",
                        fontSize: "18px",
                        marginTop:"-5px",
                        fontFamily:"Sukhumvit Set, sans-serif"
                      }}
                    >
                      ลางาน
                    </Col>
                    <Col span={3} >
                        <Icon type="menu"
                         onClick={() => this.listMenushow()}
                         style={{
                          cursor: 'pointer',
                          color: '#fff',
                          float:'right',
                          padding:'15px',
                          marginTop:"-2px",
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
              <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}> วันลาคงเหลือ </li>
            </Link>

            {this.state.leave.length !== 0 ?
              <Link to="#">
               <li onClick={async(e)=>await this.setState({listMenu:false,show:0},window.location.reload())} style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  ลางาน
                  <Icon type="right" style={{ float: "right" }} />{" "}
               </li>
              </Link> 
              : null}

            <Link to={`/proFile/${this.state.userId}/user`}>
                <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                   บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
                </li>
            </Link>

            {this.state.status === 2 ?  
              <Link to={`/adminMenu/${this.state.company}`}>
                <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                  ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                </li>
            </Link>
            :null}

            {/* Superhr */}
            {this.state.status === 3 ?
                <Link to={`/sumCompany/`}>
                    <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                    </li>
                </Link>
            : null}

            {/* admin */}
            {this.state.status === 4 ?
                 <Link to={`/adminMenu/${this.state.company}`}>
                    <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                     </li>
                </Link>
            : null}

            {/* root */}
            {this.state.status === 5 ?
                 <Link to={`/companyMenu/`}>
                    <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif"  }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                    </li>
                </Link>
            : null}          

          </div>
        </div>
      ) : null}
          
                  <div className="in-saveLeave" >
                    {/* เลือกประเภทการลา */}
                    <Row style={{ width: "91%", margin: "20px auto", display:"block", }}>
                      <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft: "", marginTop:'20px', fontFamily:"Sukhumvit Set, sans-serif" }}>
                          เลือกประเภทการลา:
                        </h3>
                        <div>
                          <Select
                            value={this.state.leaveType}
                            style={{ width: "100%",
                                     marginLeft: "" , 
                                     marginTop:'',
                                     fontFamily:"Sukhumvit Set, sans-serif"
                                    }}
                            onChange={e=>{
                              for(let id = 0; id < this.state.leave.length; id++){
                                if(this.state.leave[id].leaveType === e){
                                  this.setState({leaveType:e,leaveDay:this.state.leave[id].leaveDay})
                                }
                              }
                            }}
                          >
                           {op}
                          </Select>
                        </div>
                      </Col>
                    </Row>
                    {/* วันลาคงเหลือ */}
                    <Row style={{ width: "94%", margin: "-15px auto" }}>
                      <Col span={24}>
                          <h3 style={{ fontSize: "15px", marginLeft: "5px" , marginTop:'3px',fontFamily:"Sukhumvit Set, sans-serif"}}>
                            วันลาคงเหลือ:
                          </h3>
                          <div>
                            <Input
                              disabled
                              value={`${this.state.leaveDay} วัน`}
                              size="large"
                              placeholder="30 วัน"
                              style={{
                                marginTop:'',
                                fontSize: "15px",
                                marginLeft: "5px",
                                height:"30px",
                                width: "47.5%",
                                fontFamily:"Sukhumvit Set, sans-serif"
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    
          
                    {/* Row2 */}
                    <Row
                      style={{
                        width: "94%",
                        margin: "auto",
                        marginTop: "15px"
                      }}
                    >
                      <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",marginTop: "8px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          เลือกวันที่ต้องการลา:
                        </h3>
                        <div styl={{ marginLeft: "" }}>
                          <DatePicker
                            type="date"
                            disabledDate={this.disabledStartDate}
                            format="DD/MM/YYYY"
                            value={startValue}
                            onkeydown="return false"
                            placeholder="เลือกวันที่"
                            onChange={this.onStartChange}
                            style={{marginTop:'-8px', width: "95%", marginLeft: "5px",fontFamily:"Sukhumvit Set, sans-serif",fontSize: "15px" }}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        {this.state.startValue !== null ? <div>
                        <h3 style={{ fontSize: "15px",marginTop: "8px", marginLeft: "5px",fontFamily:"Sukhumvit Set, sans-serif" }}>
                          เลือกช่วงเวลา:
                        </h3>
                        <div>
                          <Select
                            value={this.state.timeStart}
                            style={{ width: "95%", marginLeft: "5px", marginTop: "-3px", fontFamily:"Sukhumvit Set, sans-serif" }}
                            onChange={handleStartChange}
                          >
                            <Option value={1}>เต็มวัน</Option>
                            <Option value={2}>ครึ่งเช้า</Option>
                            <Option value={3}>ครึ่งบ่าย</Option>
                          </Select>
                        </div>
                        </div>
                        :null}
                      </Col>
                    </Row>
          
                    {/* Row3 */}
                    <Row
                      style={{
                        width: "94%",
                        margin: "auto",
                        marginTop: "5px"
                      }}
                    >
                      {this.state.timeStart === 2 || this.state.startValue === null ? null : <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", marginTop: "2px",fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ลาถึงวันที่:
                        </h3>
                        <div>
                          <DatePicker
                            disabled={this.state.timeStart === 2 ?true : false}
                            disabledDate={this.disabledEndDate}
                            format="DD/MM/YYYY"
                            onkeydown="return false"
                            value={endValue}
                            placeholder="เลือกวันที่"
                            onChange={this.onEndChange}
                            style={{ width: "95%", marginTop: "-8px", marginLeft: "5px",fontFamily:"Sukhumvit Set, sans-serif",fontSize: "15px" }}
                          />
                        </div>
                      </Col>}
                      {this.state.timeStart === 2 ? null : this.state.dateStart !==  this.state.dateEnd  ?
                       <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginTop: "2px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          เลือกช่วงเวลา:
                        </h3>
                        <div>
                          <Select
                            value={this.state.timeStart === 2 ? " - ": this.state.timeEnd}
                            style={{ width: "95%", marginLeft: "5px", marginTop: "-3px",fontFamily:"Sukhumvit Set, sans-serif"  }}
                            onChange={handleEndChange}
                            disabled={ this.state.dateStart === this.state.dateEnd ? true : false}
                            // {this.state.timeStart == 2 ? disabled : null}
                          >
                            {this.state.timeStart !== 2 ? <Option value={1}>เต็มวัน</Option>
                            : null}
                            {this.state.timeStart !== 2 ? 
                            <Option value={2}>ครึ่งเช้า</Option> : null}
                        
                          </Select>
                        </div>
                      </Col> :  null}
                    </Row>
          
                    {/* Row4 */}
                    <Row
                      style={{
                        width: "94%",
                        margin: "2px auto",
                        fontFamily:"Sukhumvit Set, sans-serif"
                      }}
                    >
                      <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px",float:'left',marginTop: "3px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          จำนวนวันลา:
                        </h3>
                        <div >
                          <Input
                            disabled
                            size="large"
                            value={`${this.state.leaveSum} วัน`}
                            placeholder="1 วัน"
                            style={{
                              fontSize: "15px",
                              width: "95%",
                              height:"30px",
                              marginTop: "",
                              // borderTop: "none",
                              // borderLeft: "none",
                              // borderRight: "none",
                              marginLeft: "5px",
                              fontFamily:"Sukhumvit Set, sans-serif"
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={12}></Col>
                    </Row>
          
                    {/* Row5 */}
                    <Row
                      style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "5px",
                      }}
                    >
                      <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft:"" ,marginTop: "2px", fontFamily:"Sukhumvit Set, sans-serif"}}>
                          หมายเหตุการลา:
                        </h3>
                        <div>
                          <TextArea
                            rows={4} 
                            value={this.state.noteMe} 
                            onChange={e=>this.setState({noteMe:e.target.value})}
                            placeholder="รายละเอียด"
                            style={{marginTop: "",}}
                          />
                        </div>
                      </Col>
                    </Row>
                    {/* Row6 */}
                    <Row
                      style={{
                        width: "94%",
                        margin: "10px",
                        marginTop: "5px"
                        // marginTop: "15px"
                      }}
                    >
                      <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginTop: "5px" ,marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                        ไฟล์แนบ:   <a className="aa" rel="noopener noreferrer">{"* สามารถแก้ไขไฟล์แนบทีหลังได้ * "}</a>                         
                        </h3>
                        <div></div>
                      </Col>
                    </Row>
          
                    {/* Row7 */}
                    <Row
                      style={{
                        width: "90%",
                        margin: "auto",
                        padding:"", 
                      }}
                    >
                      <Col span={24}>
                        <Upload {...props} style={{ color: "#000000", marginLeft:"", fontWeight: "bold", fontFamily:"Sukhumvit Set, sans-serif"}}>
                          <Button style={{fontFamily:"Sukhumvit Set, sans-serif", marginLeft:"",}}>
                            <Icon type="upload" /> เลือกไฟล์
                          </Button>
                        </Upload>
                        <br/>
                      </Col>
                    </Row>
                  </div>
                  {/* in-all */}
                  {/* Row8 */}
                  <Row
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
                          <Link to="/home">
                            <Button style={{ width: '140px', height: '45px', fontFamily:"Sukhumvit Set, sans-serif" }}>ยกเลิก</Button>
                          </Link>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          style={{ float: 'left', marginLeft: '-5px', padding: '10px', fontFamily:"Sukhumvit Set, sans-serif" }}
                        >
                          <Button 
                            type="primary" 
                            onClick={success}
                            style={{ width: '140px' , height: '45px', fontFamily:"Sukhumvit Set, sans-serif" }}>
                            ยืนยัน
                          </Button>
                          <br />
                        </div>
                      </Col>
                    </div>
                  </Row>
                  
                </div>
              )
           
            //show
           
          
          
          }else{
            //Show
              return (
                <div className="all-saveLeave" style={{ background: "#F0F0F0" }}>
                  <header>
                    <link
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
                      rel="stylesheet"
                    />
                  </header>
                  {/* menubar */}
                  <Row
                    className=""
                    style={{ background: "#405EA5", position: "relative" }}
                  >
                    <Col span={3}>
                    <Link to="#">
                      <i
                      onClick={path}
                        className="fas fa-arrow-left"
                        style={{ cursor: "pointer", color: "#fff", padding: "15px " ,fontSize: '20px'}}
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
                          marginTop:'-2px',
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
              <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}> วันลาคงเหลือ </li>
            </Link>

            {this.state.leave.length !== 0 ?
              <Link to="#">
              <li onClick={pathofedit} style={{ borderTop: " 1px solid #707070" , fontFamily:"Sukhumvit Set, sans-serif" }}>
                 ลางาน
                 <Icon type="right" style={{ float: "right" }} />
              </li>
             </Link> 
              : null}

            <Link to={`/proFile/${this.state.userIdss}/user`}>
                <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                 บัญชีผู้ใช้ <Icon type="right" style={{ float: "right" }} />
              </li>
            </Link>
            {this.state.status === 2 ?  
              <Link to={`/adminMenu/${this.state.companyss}`}>
                <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                  ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                </li>
            </Link>
            :null}

            {/* Superhr */}
            {this.state.status === 3 ?
                <Link to={`/sumCompany/`}>
                    <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                    </li>
                </Link>
            : null}

            {/* admin */}
            {this.state.status === 4 ?
                 <Link to={`/adminMenu/${this.state.companyss}`}>
                    <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                     </li>
                </Link>
            : null}

            {/* root */}
            {this.state.status === 5 ?
                 <Link to={`/companyMenu/`}>
                    <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                      ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                    </li>
                </Link>
            : null}          
          </div>
        </div>
      ) : null} {/* shot if all */}

          {/* this.state.leaveStatus */}

                  <div className="in-saveLeave">
                    {/* Row1 */}
                    <Row style={{ width: "94%", margin: "20px auto" }} >
                    <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", marginTop:'20px', fontFamily:"Sukhumvit Set, sans-serif" }}>
                         {this.state.root === 'user' ? 'ประเภทการลา:': 'ชื่อ-สกุล:'} 
                        </h3>
                        <div className="superman">
                            <Input
                                disabled
                                size="large"  
                                value={this.state.root !== 'user' ? this.state.root : this.state.leaveType } 
                                placeholder="1 วัน"
                                style={{
                                  fontSize: "15px",
                                  width: "97%",
                                  height:"30px",
                                  fontFamily:"Sukhumvit Set, sans-serif",
                                  margin:"-5px auto", 
                                  display:"block",
                                  // borderTop: "none",
                                  // borderLeft: "none",
                                  // borderRight: "none",
                                }}
                              />
                        </div>
                      </Col> 
                    </Row>
                  <Row style={{ width: "94%", margin: "-10px auto"}}>
                    <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", marginTop:'', fontFamily:"Sukhumvit Set, sans-serif" }}>
                        {this.state.root === 'user' ? 'วันลาคงเหลือ:':'ประเภทการลา:'} 
                        </h3>
                        <div className="superman">
                          <Select
                            value={this.state.root !== 'user' ? this.state.leaveType  : this.state.leaveDay +' วัน '}
                            disabled
                            style={{ width: "97%", margin:"-5px auto", display:"block",fontFamily:"Sukhumvit Set, sans-serif" }}
                            onChange={e=>{
                              for(let id = 0; id < this.state.leave.length; id++){
                                if(this.state.leave[id].leaveType === e){
                                  this.setState({leaveType:e,leaveDay:this.state.leave[id].leaveDay})
                                }
                              }
                            }}
                          >
                           {op}
                          </Select>
                        </div>
                      </Col> 
                  </Row>
                      
          
                    {/* Row2 */}
                    <Row
                      style={{
                        width: "94%",
                        margin: "auto",
                        marginTop: "15px"
                      }}
                    >
                      <Col span={12}>
                        <h3 style={{ marginTop: "3px",fontSize: "15px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          วันที่ต้องการลา:
                        </h3>
                        <div styl={{ marginLeft: "" }}>
                          <DatePicker
                          disabled
                            disabledDate={this.disabledStartDate}
                            format="DD/MM/YYYY"
                            value={startValue}
                            placeholder={dateSStart}
                            onChange={this.onStartChange}
                            style={{ 
                                    width: "95%",
                                    marginLeft: "5px" ,
                                    marginTop: "-10px",
                                  }}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <h3 style={{ marginTop: "3px",fontSize: "15px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ช่วงเวลา:
                        </h3>
                        <div className="supermans">
                          <Select
                            disabled
                            value={this.state.timeStart}
                            style={{
                                    marginTop: "-8px",
                                    fontSize: "15px", 
                                    width: "94%", 
                                    marginLeft: "5px", 
                                    fontFamily:"Sukhumvit Set, sans-serif"
                                   }}
                            onChange={handleStartChange}
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
                        marginTop: "5px",
                      }}
                    >
                      {this.state.timeStart === 2 ? null : <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ลาถึงวันที่:
                        </h3>
                        <div>
                          <DatePicker
                          disabled
                            disabledDate={this.disabledEndDate}
                            format="DD/MM/YYYY"
                            value={endValue}
                            placeholder={dateSEnd}
                            onChange={this.onEndChange}
                            style={{ width: "95%", 
                                     marginLeft: "5px", 
                                     marginTop: "-10px",
                                     fontFamily:"Sukhumvit Set, sans-serif" }}
                          />
                        </div>
                      </Col>}
                      {this.state.timeStart === 2 ? null : this.state.dateStart !==  this.state.dateEnd  ? <Col span={12}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          ช่วงเวลา:
                        </h3>
                        <div className="supermans">
                          <Select
                            value={this.state.timeStart === 2 ? " - ": this.state.timeEnd}
                            style={{ width: "94%", 
                                     marginLeft: "5px", 
                                     marginTop: "-8px",
                                     fontFamily:"Sukhumvit Set, sans-serif" }}
                            onChange={handleEndChange}
                            disabled
                            // {this.state.timeStart == 2 ? disabled : null}
                          >
                            {this.state.timeStart !== 2 ? <Option value={1}>เต็มวัน</Option>
                            : null}
                            {this.state.timeStart !== 2 ? 
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
                        marginTop: "5px"
                      }}
                    >
                      <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          จำนวนวันลา:
                        </h3>
                        <div>
                          <Input
                            disabled
                            size="large"
                            value={`${this.state.leaveSum} วัน`}
                            placeholder="1 วัน"
                            style={{
                              fontSize: "16px",
                              width: "47.5%",
                              height:"30px",
                              marginTop: "-10px",
                              // borderTop: "none",
                              // borderLeft: "none",
                              // borderRight: "none",
                              marginLeft: "5px"
                            }}
                          />
                        </div>
                      </Col>
                      
                    </Row>
          
                    {/* Row5 */}
                    <Row
                      style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "5px"
                      }}
                    >
                      <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft: "", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          หมายเหตุการลา:
                        </h3>
                        <div>
                          <TextArea disabled
                            rows={4} 
                            value={this.state.noteMe} 
                            onChange={e=>this.setState({noteMe:e.target.value})}
                            placeholder="รายละเอียด"
                            style={{marginTop:"-3px"}}
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
                        <h3 style={{ fontSize: "15px", marginLeft: "10px",marginTop:'5px', fontFamily:"Sukhumvit Set, sans-serif"}}>
                          ไฟล์แนบ:
                          <Link
                          to="#"
                            style={{
                              fontSize: "12px",
                              marginLeft: "5px",
                              color: "#555555",
                              marginTop:"-5px",
                            }}
                          >
                          </Link>
                        </h3>
                        <div></div>
                      </Col>
                    </Row>
          
                    {/* Row7 */}
                    <Row
                      style={{
                        width: "100%",
                        margin: "-10px auto",
                        padding: "8px",
                      }}>
                      <Col span={24} style={{ marginTop:"-10px",marginLeft:"15px",fontSize: "12px",fontFamily:"Sukhumvit Set, sans-serif"}}><br/>
                      <div>
                        {this.state.file.length >   50?  <a href={this.state.file} >คลิกเพื่อดูไฟล์อัพโหลด</a> : <h4 style={{color:'EAEAEA'}}>ไม่มีไฟล์แนบ</h4>}
                        </div>
                      </Col>
                    </Row>
                      {this.state.noteAdmin !== "" && this.state.leaveStatus === 1 ? <Row
                      style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "5px"
                      }}>
                      <Col span={24}>
                        <h3 style={{ fontSize: "15px", marginLeft: "5px", fontFamily:"Sukhumvit Set, sans-serif" }}>
                          หมายเหตุไม่อนุมัติ:
                        </h3>
                        <div>
                          <TextArea disabled
                            rows={2} value={this.state.noteAdmin} onChange={e=>this.setState({noteMe:e.target.value})}
                            placeholder="รายละเอียด"
                          />
                        </div>
                        <br/>
                      </Col>
                    </Row> : null}
                    
                  </div>
                  {/* in-all */}
                  {/* Row8 */}
                  <Row
                    style={{
                      width: '90%',
                      margin: '25px auto',
                      background: '#F0F0F0',
                      fontFamily:"Sukhumvit Set, sans-serif"
                    }}
                  >
                    <div className=""  >
                          <Button 
                            type="primary" 
                            onClick={path}
                            style={{ width: '140px' , height: '45px' ,display:'block',
                            margin:'auto', fontFamily:"Sukhumvit Set, sans-serif"
                           }}>
                            ปิด
                          </Button>
                          <br />
                       
                    </div>
                  </Row>
                </div>
              )
            }
          }else{
            return(
              <Spin tip="คุณไม่มีสิทธิ์ เข้าถึงส่วนนี้">
                  <div>
                {countdown()}
                  </div>
              </Spin>
            )
          } 
        }
        } else {
          return (
            //spin
            <Spin tip="Loading...">
            <div className="all-register">
            {loaddata()}
            </div>
            </Spin>
          )
        }   
  }
}
export default saveLeave;
