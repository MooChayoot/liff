import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./addCompany.css";
import firebaseApp from '../../../config/firebaseConfig'
import "antd/dist/antd.css";
import axios from "axios";
import {
  Spin,
          Row,
          message, 
          Col,   
          Button,
          Input, 
          Icon,  
          Upload,
        } from 'antd';

        const liff = window.liff;

//Upload
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
  }   
class addCompany extends Component {
  //Menu
  constructor(props) {
    super(props);
    this.state = {  value: '',
      listMenu: false,
      dataSource: [],
      loading: false,
      fileList: [],
      uploading: false,
      userId:"",
      newfilelname:'',
      nameCompany:'',
      statusme:'',
      statusfail:'',
      username:'',
      oldname:'',
      leave:[],
      showallow:0,
      show:0,
      allow_wait:[],
      allow_complete:[],
      img:"",
      file:'',
    };
    this.uploadToFirebase = this.uploadToFirebase.bind(this);
  }
  async componentDidMount() {
      await  liff.init(async (data) => {
          let profile = await liff.getProfile();
       await   this.setState({
            userId : profile.userId
          });
        }); 
        
    } 
  async  uploadToFirebase() {
    let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
    if (this.state.nameCompany !== "") {
    if (newStr === "jpg" || newStr === "peg" || newStr === "png") {
      this.setState({status:99})
    const storageRef = firebaseApp.storage().ref();
    let name = Date.now()+this.state.fileList[0].lastModified
  
    let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
    if (newStr !== "jpg" && newStr !== "png" && newStr === "peg") {
      let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -4 , this.state.fileList[0].name.length )
    await  this.setState({newfilelname:newStr})
    }else{
      let newStr = this.state.fileList[0].name.substring(this.state.fileList[0].name.length -3 , this.state.fileList[0].name.length )
    await  this.setState({newfilelname:newStr})
    }
  let  filename = name+"."+this.state.newfilelname
            storageRef.child(`company/${filename}`).put(this.state.fileList[0]).then(async(snapshot) => {
              await  axios.get(`https://us-central1-twin-hr.cloudfunctions.net/addcompany?imageCompany=${filename}&nameCompany=${this.state.nameCompany}&lineid=${this.state.userId}`)
            .then((data) => {    
              this.props.history.push(`/companyManage`)
        }).catch(async() => {
              // console.log("error")
            })
            }).catch(function(error) {
              console.log("error : ",error);
            }); 
          }else{
            message.warning('เลือกไฟล์ได้เฉพาะนามสกุล .png .jpeg และ.jpg เท่านั้น');
          }   
        }else{
          message.warning('กรุณากรอกชื่อบริษัท');
        }       
}
  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
    //Upload
    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }));
      }
    }


  render() {
    let check_nameCompany = (e) =>{
      // console.log(e.target.value)
      let en = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
      let thai ="ๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝฎฑธ๊ณญฐฤฆฏโฌ็๋ษศซฉฮ์ฒฬฦภถุึคตจขชู"
      let number ="1234567890๑๒๓๔๕๖๗๘๙"

      let data =en+thai+number+" "+'.'
      let asd = e.target.value.substring(e.target.value.length-1,e.target.value.length)
      if (this.state.nameCompany.length > e.target.value.length ) {
        this.setState({nameCompany:e.target.value})
      }else{
      if (e.target.value.length === 0){
        this.setState({nameCompany:""})
      }else{
        for (let ind = 0; ind < data.length; ind++) {
          if(asd === data[ind]){
            this.setState({nameCompany:this.state.nameCompany+asd})
          }
        }
      }
    }

  }

    //Upload
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    
  const imageUrl = this.state.imageUrl;
  // console.log(imageUrl);
  const { uploading, fileList } = this.state;
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
            fileList: [ file],
          }));
          getBase64(file, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
          // console.log(file);
          return false;
        },
        fileList,
      };
      const  countdown = () =>  {
        setTimeout(() => {
          liff.closeWindow();
        }, 3000);
      }
      let loaddata =()=>{
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
                        id:data.data.id,
                        statusme:data.data.data.status,
                        statusfail:data.data.data.statusfail,show:1,
                        leave:loop3.length ===0 ? loop1:loop3,
                        companyme:data.data.data.company,
                        lineid:data.data.data.lineid
                      })
            }).catch(async() => {
              this.setState({show:1})
          });     
        } 
      }
      //Upload
if (this.state.show === 1) {
if (this.state.status === 99) {
  return (
    //spin
    <Spin tip="กรุณารอสักครู่">
    <div className="all-register">

    </div>
    </Spin>
  )
}else {
  if (this.state.statusme === 5 && this.state.statusme !== null && this.state.statusme !== undefined) {
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
          style={{background:'#405EA5', position:'relative'}}
        >
          <Col span={3}>
            <Link to="/companyManage">
              <i
                className="fas fa-arrow-left"
                style={{ cursor:'pointer',color:'#fff',padding:'15px',fontSize:'20px'}}
              ></i>
            </Link>
          </Col>
          <Col
            span={18}
            style={{
              textAlign:'center',
              color:'#fff',
              padding:'10px',
              fontSize:'19px',
              amrginTop:'2px',
              fontFamily:'Sukhumvit Set, sans-serif',
            }}
          >
           เพิ่มบริษัท
          </Col>
          <Col span={3} >
              <Icon type="menu"
               onClick={() => this.listMenushow()}
               style={{
                cursor:'pointer',
                color:'#fff',
                float:'right',
                padding:'15px',
                marginTop:'-2px',
                fontSize:'20px'
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
                        <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}> วันลาคงเหลือ </li>
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
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>

                      {/* admin */}
                      {this.state.statusme === 4 ?
                        <Link to={`/adminMenu/${this.state.companyme}`}>
                          <li style={{ borderTop: " 1px solid #707070", fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
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
                <div style={{ marginTop:'10%'  }}>
                  
                  <Upload {...props}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                  >
                    {imageUrl ? <img style={{borderRadius:'50%',width:'100%' ,height:'110px', }} src={imageUrl} alt=""  /> : uploadButton}
                  </Upload>
               
                </div>

              <div style={{ display:'block',margin:'30px auto',width:'94%', background:'#fff',fontFamily:'Sukhumvit Set, sans-serif'}}>
               {/* Row1 */}
                    <Row
                    style={{
                        width:"90%",
                        margin:"10px auto",
                    }}
                    >
                    <Col span={24}>
                        <h3 style={{fontSize:"15px",marginLeft:'5px',marginTop:'20px',borderTop:'none',borderRight:'none',fontFamily:'Sukhumvit Set, sans-serif' }}>
                          ชื่อบริษัท
                        </h3>
                        <div style={{fontFamily:'Sukhumvit Set, sans-serif' }}>
                            <Input placeholder="ชื่อบริษัท" 
                                   value={this.state.nameCompany} 
                                   onChange={check_nameCompany} 
                                   width="94%"  style={{fontSize:'12px' ,fontFamily:'Sukhumvit Set, sans-serif'}}/>
                        </div>
                    </Col>
                    </Row>
                    <br />
              </div>
              <Row
                style={{
                    width:"90%",
                    margin:"auto",
                    padding:'10px',
                    background:'none'
                      }}>
                <Col span={12}>
                <div style={{float:"right",marginRight:'5px',fontFamily:'Sukhumvit Set, sans-serif'}}>
                <Link to="/companyManage">
                    <Button style={{width:'150px',height:'45px',borderRadius:'0.8rem',fontFamily:'Sukhumvit Set, sans-serif' }}>
                        ยกเลิก
                    </Button>
                </Link>
                </div>
                </Col>
                <Col span={12}>
                <div style={{float:"left",marginLeft:'5px' }}>
                    <Button type="primary" 
                            onClick={this.uploadToFirebase}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{width:'150px',height:'45px',borderRadius:'0.8rem' ,fontFamily:'Sukhumvit Set, sans-serif'         
                            }}>
                          เพิ่มบริษัท
                    </Button>
              </div>
            </Col>
          </Row>
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
export default addCompany;
