import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import man from '../../assets/man.png';

import * as ACTION from '../../store/actions/action';
import { Row, Col, Button, Input, Radio , Checkbox } from 'antd';
import backBtn from '../../assets/back.png';
import axios from 'axios';
import kickdudesLogo from '../../assets/logo_kk.png';
import domtoimage from 'dom-to-image';
import moment from 'moment';
import firebaseApp from '../../config/firebaseConfig';
import htmlToImage from 'html-to-image';
import Moment from 'react-moment';
const liff = window.liff;
let day = moment().format("D");
let month = moment().format("MMM");
let year = moment().format("YYYY");
let time = moment().format("HH:mm");
let select = []
class BillingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { name : '',
        userId : '',
        pictureUrl : '',
        statusMessage : '',
        pname: '',
        fname: '',
        lname:'',
        nname:'',
        tel:'',
        position:'',
        company:'',
            timeend2:"",value: 1,fieldid:"",datafield:{field_telephone:"",index:"",field_address:"",field_detail:"",field_zipcode:{$numberLong:""},field_name:"",field_location:{lat:"",lng:""},keywords:"",field_district:"",field_province:"",fields_files:["","",""]}
        };
        this.myRef = React.createRef();
      
    }
  
    async componentDidMount() {
        liff.init(async (data) => {
            let profile = await liff.getProfile();
            await    this.setState({
                name : profile.displayName,
              userId : profile.userId,
              pictureUrl : profile.pictureUrl,
              statusMessage : profile.statusMessage
            });
          }); 
        
      } 
    render() {

        const back = () => {
            this.props.history.goBack();
        }
        const booking = () => {
            const url = `https://us-central1-projecttsg.cloudfunctions.net/adduser?lineid=${this.state.userId}&img=${this.state.pictureUrl}&pname=${this.state.pname}&fname=${this.state.fname}&lname=${this.state.lname}&nname=${this.state.nname}&tel=${this.state.tel}&position=${this.state.position}&company=${this.state.company}`;
        axios.post(url)
        .then((data) => {    
            console.log('this.state')
       
         })
            liff.sendMessages([
                {
                  type:'text',
                  text:'ลงทะเบียนเสร็จสิ้น'
                }
              ])
              .then(() => {
                liff.closeWindow();
              })
              .catch((err) => {
                console.log('error', err);
              });
          }
        
          const booking1 = () => {
            const url = `https://us-central1-projecttsg.cloudfunctions.net/LineBot?userID=${this.state.userId}`;
        axios.post(url)
        .then((data) => {    
            console.log('this.state')
       
         })
            liff.sendMessages([
                {
                  type:'text',
                  text:'ทำการส่งคำขอลางานเสร็จสิ้น'
                }
              ])
              .then(() => {
                liff.closeWindow();
              })
              .catch((err) => {
                console.log('error', err);
              });
          }
        let  onChange = async(e)=> {
            
            if(e.target.checked === true ){
                await  select.push(e.target.value)
            }
           else{
           let posi = select.indexOf(e.target.value)
           if(posi!==-1){

            select.splice(posi, 1);
         }
           console.log(posi);
           }
            console.log(select);
          }

        return (
            <div id="main-content">
                <Row className="navBar">
                    <Col span={4}>
                        <Link to="/?action=all_promotion" ><img src={backBtn} /></Link>
                    </Col>
                    <Col span={20}>
                        <span></span>
                    </Col>
                </Row>

                <Row className="suggesstionFieldBox">
                    <div ref={this.myRef} id="screenShot">
                        <Col span={24} className="lineGreen">
                        </Col>
                        <Col span={24}>
                            <div className="billdetail">
                                <div className="billdetail-logo billdetail-item billdetail-item--logo">
                                    <p><img src={kickdudesLogo} alt="kickdudes" /></p>
                                </div>
                                <Row className="suggesstionFieldAlertBox20">
                    <Col span={5}>
                        <img src={this.state.pictureUrl} />
                    </Col>
                    <Col span={19}>
                    <p>ผู้ทำการจอง : <h3 style={{display:"inline"}}>{this.state.pname}</h3></p>
                    <p>id : <h3 style={{display:"inline"}}>{this.state.userId}</h3></p>
                    <Checkbox value="1" onChange={onChange}>Checkbox</Checkbox>
                    <Checkbox value="2" onChange={onChange}>Checkbox</Checkbox>
                    <Checkbox value="3" onChange={onChange}>Checkbox</Checkbox>
                    <Checkbox value="4" onChange={onChange}>Checkbox</Checkbox>
                    <Input placeholder="default size" name="pname" id="pname" value={this.state.pname} onChange={e=>this.setState({pname:e.target.value})}/>
                    <Input placeholder="default size" name="fname" id="fname" value={this.state.fname} onChange={e=>this.setState({fname:e.target.value})}/>
                    <Input placeholder="default size" name="lname" id="lname" value={this.state.lname} onChange={e=>this.setState({lname:e.target.value})}/>
                    <Input placeholder="default size" name="nname" id="nname" value={this.state.nname} onChange={e=>this.setState({nname:e.target.value})}/>
                    <Input placeholder="default size" name="tel" id="tel" value={this.state.tel} onChange={e=>this.setState({tel:e.target.value})}/>
                    <Input placeholder="default size" name="position" id="position" value={this.state.position} onChange={e=>this.setState({position:e.target.value})}/>
                    <Input placeholder="default size" name="company" id="company" value={this.state.company} onChange={e=>this.setState({company:e.target.value})}/>
                        
                        
                    </Col>
                </Row>
                            </div>

                        </Col>
                      
                    </div>
                </Row>

                <Row className="suggesstionFieldAlertBox20">
                    <Col span={24}>
                    <Button block className="btnConfirmReserved" onClick={booking}>กลับสู่เมนูหลัก</Button>
                    <Button block className="btnConfirmReserved" onClick={booking1}>กลับสู่เมนูหลัก1</Button>
                    </Col>
                </Row> 
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BillingDetail);