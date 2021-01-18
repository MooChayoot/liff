import React, { Component } from "react";
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./statistics.css";
import moment from "moment";
import axios from "axios";
import DataSet from "@antv/data-set";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide
} from "bizcharts";

import {
  Row,
  Col,
  List,
  Card,
  Modal,
  Spin,
  Icon,
  Select,
  Input,
  DatePicker,
  AutoComplete,
  Radio
} from "antd";

const liff = window.liff;
class statistics extends Component {
  //Menu
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      listMenu: false,
      searchshow: false,
      disabled: false,
      userId : "",
      allone:1,
      showuser:0,
      show:0,
      value: "",
      dateStart: "",
      dateEnd: "",
      allow_complete: [],
      users: [],
      sumday: "",
      dataSource: [],
      q: "",
      id: "",
      status:'',
      statusfail:'',
      username:'',
      leave:[],
      showallow:0,
      img:"",
      file:''
    };
    this.filterList = this.filterList.bind(this);
  }
  async componentDidMount() {
    await  liff.init(async (data) => {
      let profile = await liff.getProfile();
   await   this.setState({
        userId : profile.userId
      });
    }); 
    const {
      match: { params }
    } = this.props;
    await this.setState({ company: params.id ,users:[]});
    await axios
      .get(
        `https://us-central1-twin-hr.cloudfunctions.net/user_All?company=${this.state.company}`
      )
      .then(data => { 
        if(data.data.user !== undefined){
        for (let index = 0; index < data.data.user.length; index++) {
          this.setState({
            users: [
              ...this.state.users,
              {
                name:
                  data.data.user[index].data.pname +
                  data.data.user[index].data.fname +
                  " " +
                  data.data.user[index].data.lname +
                  " ตำแหน่ง " +
                  data.data.user[index].data.position,
                id: data.data.user[index].data.lineid
              }
            ]
          });
        }
      }
      })
      .catch(err => {
        console.log(err);
      });
      if(this.state.searchshow === false){
        if (this.state.dateEnd === "" && this.state.dateStart === "") {
        await  this.setState({allow_complete:[],show:0})

          await axios
            .get(
              `https://us-central1-twin-hr.cloudfunctions.net/company_chartsAll?company=${this.state.company}`
            )
            .then(data => {
              if (data.data.allow_complete !== undefined) {
              for (
                let index = 0;
                index < data.data.allow_complete.length;
                index++
              ) {
                this.setState({
                  allow_complete: [
                    ...this.state.allow_complete,
                    {
                      item: data.data.allow_complete[index].leaveType,
                      count: data.data.allow_complete[index].sum
                    }
                  ],show:1
                });
              }                
            }
            this.setState({show:1})
            })
            .catch(err => {
              console.log(err);
            });
          if (this.state.allow_complete.length !== 0) {
            let sum = [0];
            if (this.state.allow_complete.length !== 0) {
            for (let index = 0; index < this.state.allow_complete.length; index++) {
              let sumday =
                Number(this.state.allow_complete[index].count) + Number(sum[0]);
              sum.unshift(sumday);
            }
            await this.setState({ sumday: sum });
          }
        }else{
          await this.setState({ sumday: [0] });
        }
        }
      }
}
  listMenushow() {
    this.setState({
      listMenu: !this.state.listMenu
    });
  }
async  searchshow() {
  if (this.state.searchshow === false) {
      await  this.setState({show:2})
    }else{
      await  this.setState({show:0})
    }
  await  this.setState({
      searchshow: !this.state.searchshow,sumday:[0],dateEnd:"",dateStart:"",endValue:null,startValue:null
    })
    await this.componentDidMount()
    
  }
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        users: nextProps.users,
        dataSource: nextProps.users
      },
      () => this.filterList()
    );
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onenChange = async (field, value, dateString) => {
    let date = moment(dateString, "DD/MM/YYYY").format("x");
    await this.setState({
      [field]: value,
      dateEnd: Number(date)
    });
    if(this.state.searchshow ===true){
      if (this.state.id !== "") {
        if (this.state.dateStart !== "" && this.state.dateEnd !== "") {
          await this.setState({allow_complete:[],show:0})
        await axios
          .get(
            `https://us-central1-twin-hr.cloudfunctions.net/company_chartsOne_OrderByDate?company=${this.state.company}&dateStart=${this.state.dateStart}&dateEnd=${this.state.dateEnd}&userid=${this.state.id}`
          )
          .then(data => {
            if(data.data.allow_complete !== undefined ){
            for (
              let index = 0;
              index < data.data.allow_complete.length;
              index++
            ) {
              this.setState({
                allow_complete: [
                  ...this.state.allow_complete,
                  {
                    item: data.data.allow_complete[index].leaveType,
                    count: data.data.allow_complete[index].sum
                  }
                ],
                show:1
              });
            }
          }
          this.setState({show:1})
          })
          .catch(err => {
            console.log(err);
          });
        if (this.state.allow_complete.length !== 0) {
          let sum = [0];
          for (let index = 0; index < this.state.allow_complete.length; index++) {
            let sumday =
              Number(this.state.allow_complete[index].count) + Number(sum[0]);
            sum.unshift(sumday);
          }
          await this.setState({ sumday: sum });
        }else{
          await this.setState({ sumday: [0] });
        }
        } else {
          await this.setState({allow_complete:[],show:0})
          await axios
            .get(
              `https://us-central1-twin-hr.cloudfunctions.net/company_chartsOne?company=${this.state.company}&userid=${this.state.id}`
            )
            .then(data => {
              if(data.data.allow_complete !== undefined ){
              for (
                let index = 0;
                index < data.data.allow_complete.length;
                index++
              ) {
                this.setState({
                  allow_complete: [
                    ...this.state.allow_complete,
                    {
                      item: data.data.allow_complete[index].leaveType,
                      count: data.data.allow_complete[index].sum
                    }
                  ],
                  show:1
                });
              }
            }
            this.setState({show:1})
            })
            .catch(err => {
              console.log(err);
            });
          if (this.state.allow_complete.length !== 0) {
            let sum = [0];
            for (let index = 0; index < this.state.allow_complete.length; index++) {
              let sumday =
                Number(this.state.allow_complete[index].count) + Number(sum[0]);
              sum.unshift(sumday);
            }
            await this.setState({ sumday: sum });
          }else{
            await this.setState({ sumday: [0] });
          }
      }
    }
    }else{
      if (this.state.dateStart !== "" && this.state.dateEnd !== "") {
        await this.setState({allow_complete:[],show:0})
        await axios
          .get(
            `https://us-central1-twin-hr.cloudfunctions.net/company_chartsAll_OrderByDate?company=${this.state.company}&dateStart=${this.state.dateStart}&dateEnd=${this.state.dateEnd}`
          )
          .then(data => {
            if(data.data.allow_complete !== undefined ){
            for (
              let index = 0;
              index < data.data.allow_complete.length;
              index++
            ) {
              this.setState({
                allow_complete: [
                  ...this.state.allow_complete,
                  {
                    item: data.data.allow_complete[index].leaveType,
                    count: data.data.allow_complete[index].sum
                  }
                ],
                show:1
              });
            }
          }
          this.setState({show:1})
          })
          .catch(err => {
            console.log(err);
          });
        if (this.state.allow_complete.length !== 0) {
          let sum = [0];
          for (let index = 0; index < this.state.allow_complete.length; index++) {
            let sumday =
              Number(this.state.allow_complete[index].count) + Number(sum[0]);
            sum.unshift(sumday);
          }
          await this.setState({ sumday: sum });
        }else{
          await this.setState({ sumday: [0] });
        }
      } 
    }
  };
  onstChange = async (field, value, dateString) => {
    let date = moment(dateString, "DD/MM/YYYY").format("x");
    await this.setState({
      [field]: value,
      dateStart: Number(date)
    });
    if(this.state.searchshow ===true){
    if (this.state.id !== "") {
      if (this.state.dateStart !== "" && this.state.dateEnd !== "") {
        await this.setState({allow_complete:[],show:0})
      await axios
        .get(
          `https://us-central1-twin-hr.cloudfunctions.net/company_chartsOne_OrderByDate?company=${this.state.company}&dateStart=${this.state.dateStart}&dateEnd=${this.state.dateEnd}&userid=${this.state.id}`
        )
        .then(data => {
          if(data.data.allow_complete !== undefined ){
          for (
            let index = 0;
            index < data.data.allow_complete.length;
            index++
          ) {
            this.setState({
              allow_complete: [
                ...this.state.allow_complete,
                {
                  item: data.data.allow_complete[index].leaveType,
                  count: data.data.allow_complete[index].sum
                }
              ],
              show:1
            });
          }
        }
        this.setState({show:1})
        })
        .catch(err => {
          console.log(err);
        });
      if (this.state.allow_complete.length !== 0) {
        let sum = [0];
        for (let index = 0; index < this.state.allow_complete.length; index++) {
          let sumday =
            Number(this.state.allow_complete[index].count) + Number(sum[0]);
          sum.unshift(sumday);
        }
        await this.setState({ sumday: sum });
      }else{
        await this.setState({ sumday: [0] });
      }
      }
  }
  }else{
    if (this.state.dateStart !== "" && this.state.dateEnd !== "") {
      await this.setState({allow_complete:[],show:0})
      await axios
        .get(
          `https://us-central1-twin-hr.cloudfunctions.net/company_chartsAll_OrderByDate?company=${this.state.company}&dateStart=${this.state.dateStart}&dateEnd=${this.state.dateEnd}`
        )
        .then(data => {
          if(data.data.allow_complete !== undefined ){
          for (
            let index = 0;
            index < data.data.allow_complete.length;
            index++
          ) {
            this.setState({
              allow_complete: [
                ...this.state.allow_complete,
                {
                  item: data.data.allow_complete[index].leaveType,
                  count: data.data.allow_complete[index].sum
                }
              ],
              show:1
            });
          }
        }
        this.setState({show:1})
        })
        .catch(err => {
          console.log(err);
        });
      if (this.state.allow_complete.length !== 0) {
        let sum = [0];
        for (let index = 0; index < this.state.allow_complete.length; index++) {
          let sumday =
            Number(this.state.allow_complete[index].count) + Number(sum[0]);
          sum.unshift(sumday);
        }
        await this.setState({ sumday: sum });
      }else{
        await this.setState({ sumday: [0] });
      }
    } 
  }
  };

  onStartChange = (value, dateString) => {
    this.onstChange("startValue", value, dateString);
  };

  onEndChange = (value, dateString) => {
    this.onenChange("endValue", value, dateString);
  };

  //auto complete
  onSearch = searchText => {
    const q = searchText.toLowerCase();
    this.setState({ q }, () => this.filterList());
  };

  filterList() {
    let users = this.state.users;
    let q = this.state.q;
    let data = [];
    users.filter(function(user) {
      let select = user.name.indexOf(q) !== -1; // returns true or false
      if (select === true) {
        data.push(user.name);
      }
      return;
    });
    this.setState({ dataSource: data });
  }

  onSelect = async value => {
    let position = [];
    for (let index = 0; index < this.state.users.length; index++) {
      let positionname = this.state.users[index].name.indexOf(value);
      if (positionname !== -1) {
        position.push(this.state.users[index].id);
      }
    }
    await this.setState({ id: position[0] });
    if(this.state.searchshow ===true){
      if (this.state.id !== "") {
        if (this.state.dateStart !== "" && this.state.dateEnd !== "") {
          await this.setState({allow_complete:[],show:0})
        await axios
          .get(
            `https://us-central1-twin-hr.cloudfunctions.net/company_chartsOne_OrderByDate?company=${this.state.company}&dateStart=${this.state.dateStart}&dateEnd=${this.state.dateEnd}&userid=${this.state.id}`
          )
          .then(data => {
            if(data.data.allow_complete !== undefined ){
            for (
              let index = 0;
              index < data.data.allow_complete.length;
              index++
            ) {
              this.setState({
                allow_complete: [
                  ...this.state.allow_complete,
                  {
                    item: data.data.allow_complete[index].leaveType,
                    count: data.data.allow_complete[index].sum
                  }
                ],
                show:1
              });
            }
            }
            this.setState({show:1})
          })
          .catch(err => {
            console.log(err);
          });
        if (this.state.allow_complete.length !== 0) {
          let sum = [0];
          for (let index = 0; index < this.state.allow_complete.length; index++) {
            let sumday =
              Number(this.state.allow_complete[index].count) + Number(sum[0]);
            sum.unshift(sumday);
          }
          await this.setState({ sumday: sum });
        }
        } else {
          await this.setState({allow_complete:[],show:0})
          await axios
            .get(
              `https://us-central1-twin-hr.cloudfunctions.net/company_chartsOne?company=${this.state.company}&userid=${this.state.id}`
            )
            .then(async(data) => {
              if(data.data.allow_complete !== undefined ){
                for (
                        let index = 0;
                        index < data.data.allow_complete.length;
                        index++
                      ) {
                        this.setState({
                          allow_complete: [
                            ...this.state.allow_complete,
                            {
                              item: data.data.allow_complete[index].leaveType,
                              count: data.data.allow_complete[index].sum
                            }
                          ],
                          show:1
                        });
                      }
              }else{
                await  this.setState({
                  allow_complete: [
                  ...this.state.allow_complete,
                  {
                    item: 0,
                    count:0
                  }
                ],
                show:1});
                }
            })
            .catch(err => {
              console.log(err);
            });
          if (this.state.allow_complete.length !== 0) {
            let sum = [0];
            for (let index = 0; index < this.state.allow_complete.length; index++) {
              let sumday =
                Number(this.state.allow_complete[index].count) + Number(sum[0]);
              sum.unshift(sumday);
            }
            await this.setState({ sumday: sum });
          }
      }
    }
    }
  };

  render() {
    //check user
    let loaduser = () =>{
      if (this.state.userId !== "" && this.state.showuser ===0) {
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
                      idme:data.data.id,
                      status:data.data.data.status,
                      showuser:1,
                      leave:loop3.length ===0 ? loop1:loop3,
                      companyme:data.data.data.company,
                      lineid:data.data.data.lineid
                    })
          //  console.log(data.data);
          // loadleave_req()
          }).catch(async() => {
            this.setState({showuser:1})
        });     
      } 
    }
    //auto complete
    const { dataSource, value } = this.state;

    // const { size } = this.state;
    const { startValue, endValue, endOpen } = this.state;
    const dateFormat = "YYYY/MM/DD";

    //const
    const { TextArea } = Input;
    const { Search } = Input;
    const { Option } = Select;
    const { Meta } = Card;
    const { confirm } = Modal;
    const AutoCompleteOption = AutoComplete.Option;

    // charts
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = this.state.allow_complete;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + "%";
          return val;
        }
      }
    };
    const  countdown = () =>  {
      setTimeout(() => {
        liff.closeWindow();
      }, 3000);
    }

    if (this.state.sumday !== "") {
      if (this.state.showuser === 1) {
        if (this.state.status > 1 && this.state.status !== null && this.state.status !== undefined) {
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
            style={{background: "#405EA5", position: "relative" }}
          >
            <Col span={3}>
              <Link to={`/adminMenu/${this.state.company}`}>
                <i
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
                marginTop:"2px",
                fontFamily:"Sukhumvit Set, sans-serif"
              }}
            >
              สถิติการลา
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
                        fontFamily:"Sukhumvit Set, sans-serif"
                      }}
                    >
                      <Link to="/home">
                        <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}> วันลาคงเหลือ </li>
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
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              บัญชีผู้ใช้ 
                            <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>

                        {/* hr */}
                        {this.state.status === 2 ?
                        <Link to={`/adminMenu/${this.state.companyme}`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
                              ฝ่ายบุคคล <Icon type="right" style={{ float: "right" }} />
                          </li>
                        </Link>
                      : null}

                      {/* Superhr */}
                      {this.state.status === 3 ?
                        <Link to={`/sumCompany/`}>
                          <li style={{ borderTop: " 1px solid #707070",fontFamily:"Sukhumvit Set, sans-serif" }}>
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

          {/* Box-head */}
          <div className="Radio">
            {/* Radio */}
            <Row
              style={{
                width: "94%",
                margin: "auto",
                marginTop: "10px"
              }}
            >
              <Col span={24}>
                <div style={{ padding: "15px",fontFamily:"Sukhumvit Set, sans-serif" }}>
                  ประเภทสถิติ :{" "}
                  {
                    <Radio.Group name="radiogroup" defaultValue={1}>
                      <Radio onChange={async() =>await this.searchshow()} value={1}>
                        ทั้งหมด
                      </Radio>
                      <Radio onClick={async() =>await this.searchshow()} value={2}>
                        รายบุคคล
                      </Radio>
                    </Radio.Group>
                  }
                </div>
              </Col>
            </Row>
            {/* searchshow */}
            {this.state.searchshow ? (
              <Row
                style={{
                  width: "94%",
                  margin: "auto",
                  marginTop: "10px",
                  fontFamily:"Sukhumvit Set, sans-serif"
                }}
              >
                <Col span={24}>
                  <AutoComplete
                    dataSource={dataSource}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    onSelect={this.onSelect}
                    onSearch={this.onSearch}
                    style={{ width: "100%", border: "none" ,fontFamily:"Sukhumvit Set, sans-serif"}}
                  >
                    <Input
                      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>}
                      placeholder="เช่น ชื่อ,ตำแหน่ง,บริษัท"
                      onKeyDown={ (evt) => evt.key === ''|| 
                                                evt.key === ' \ ' || evt.key === '+'||evt.key === '?' ||evt.key === '!' ||evt.key === '@'||evt.key === '#'||
                                                evt.key === '$'||evt.key === '%' ||evt.key === '^' ||evt.key === '&' ||evt.key === '*'||evt.key === '('||evt.key === ')'||
                                                evt.key === '='||evt.key === '-' ||evt.key === '[' ||evt.key === ']'  ||evt.key === '|'||evt.key === '/'||
                                                evt.key === '>' ||evt.key === ';' ||evt.key === ','||evt.key === '{' ||evt.key === '}'||evt.key === ':'||
                                                evt.key === '<'||evt.key === '฿' ||evt.key === '.'  ||evt.key === '%'  ||evt.key === '_' ||evt.key === '€'||
                                                evt.key === '0' ||evt.key === '1'  ||evt.key === '2'  ||evt.key === '3'  ||evt.key === '4' ||evt.key === '5'||
                                                evt.key === '6' ||evt.key === '7'  ||evt.key === '8'  ||evt.key === '9'  ||evt.key === '¥' ||
                                                evt.key === '•'? evt.preventDefault():{} }
                      style={{ width: "100%", 
                               textAlign: "left" ,
                               fontFamily:"Sukhumvit Set, sans-serif"}}
                    />
                  </AutoComplete>
                </Col>
              </Row>
            ) : null}
          </div>
          <div
            style={{
              padding: "10px",
              width: "98%",
              display: "block",
              margin: "auto",
              fontFamily:"Sukhumvit Set, sans-serif"
            }}
          >
            <Row style={{}} type="flex">
              <Col span={11}>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  format="DD/MM/YYYY"
                  value={startValue}
                  placeholder="start"
                  onChange={this.onStartChange}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={11} offset={2}>
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  format="DD/MM/YYYY"
                  value={endValue}
                  placeholder="stop"
                  onChange={this.onEndChange}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </div>

          <div
            className="charts"
            style={{
              background: "#fff",
              width: "94%",
              margin: "auto",
              display: "block"
            }}
          >
            {this.state.show !== 0?  this.state.sumday[0] !== 0?
            <Chart
              height={500}
              marginTop={-9}
              data={dv}
              scale={cols}
              padding={[10, 80, 80, 80]}
              position={["50%", "50%"]}
              forceFit
            >
              <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
              <Axis name="percent" />
              <Legend
                position="bottom"
                offsetY={2 / 400}
                offsetX={0}
                padding={[20]}
              />
              <Tooltip
                showTitle={false}
                itemTpl='<li style=" color: #000"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
              <Guide>
                <Html
                  position={["50%", "47%"]}
                  html={`<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;><br><span style=&quot;color:#262626;top:-10px;font-size:1em&quot;>${this.state.sumday[0]}</span></div>`}
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
                color="item"
                tooltip={[
                  "item*percent",
                  (item, percent) => {
                    let percent1 = (percent * 100).toFixed(2) / 100;
                    let percent2 = (
                      Number(percent1) * Number(this.state.sumday[0])
                    ).toFixed(1);
                    let day = [];
                    let substr = percent2.substring(
                      percent2.length - 1,
                      percent2.length
                    );
                    if (Number(substr) !== 0) {
                      day.push("≈" + percent2 + "วัน");
                    } else {
                      let substr1 = percent2.substring(0, percent2.length - 2);
                      day.push("≈" + substr1 + "วัน");
                    }
                    return {
                      name: item,
                      value: day[0]
                    };
                  }
                ]}
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
              >
                <Label
                  content="percent"
                  formatter={(val, item) => {
                    return item.point.item + ": " + val;
                  }}
                />
              </Geom>
            </Chart>
            :
            this.state.show !== 2 ? 
            <List.Item
              style={{
                background: "#fff",
                width: "94%",
                borderRadius: "0.5rem",
                margin: "10px auto",
                fontFamily:"Sukhumvit Set, sans-serif"
              }}
            >
              <List.Item.Meta
                
                title={
                  <div
                    style={{
                      fontSize: "14px",
                      marginRight: "7px",
                      marginTop: "10px",
                      fontFamily:"Sukhumvit Set, sans-serif"
                    }}
                  ><p style={{ width: "100%" }}>{this.state.startValue !==null && this.state.endValue !==null ? "ค้นหาข้อมูลเสร็จสิ้น แต่ไม่พบสถิติการลาในช่วงเวลาที่เลือก": "ค้นหาข้อมูลเสร็จสิ้น แต่ไม่พบสถิติการลา"}</p>
                  </div>
                }
              />
              
            </List.Item>
            : 
            <List.Item
              style={{
                background: "#fff",
                width: "94%",
                borderRadius: "0.5rem",
                margin: "10px auto",
                fontFamily:"Sukhumvit Set, sans-serif"
              }}
            >
              <List.Item.Meta
                
                title={
                  <div
                    style={{
                      fontSize: "14px",
                      marginRight: "7px",
                      marginTop: "10px",
                      fontFamily:"Sukhumvit Set, sans-serif"
                    }}
                  >
                    <p style={{ width: "100%" }}>ไม่มีข้อมูล กรุณาเลือกบุคคล</p>
                  </div>
                }
              />
            </List.Item>
            :
            <Spin tip="Loading...">
            <div className="all-register">
            </div>
            </Spin>}
          </div>
          {/* in-all */}
        </div>
      );
    }else{
      return(
        <Spin tip={`คุณไม่มีสิทธิ์ เข้าถึงส่วนนี้`}>
            <div>
          {countdown()}
            </div>
        </Spin>
      )
    }
    } else {
      return (
        //spin
        <Spin tip="Loading... ...">
          <div className="all-register">
          {loaduser()}
          </div>
        </Spin>
      );
    }
    } else {
      return (
        //spin
        <Spin tip="Loading...">
          <div className="all-register">
          {loaduser()}
          </div>
        </Spin>
      );
    }
  }
}
export default statistics;
