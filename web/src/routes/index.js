import React, { Component } from 'react';
import history from '../utils/history';
import { Router, Route, withRouter, Switch } from 'react-router-dom';
import * as ACTION from '../store/actions/action';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import HomeUser from '../components/homeFollow/index';

import {
    LineLiffAuth,
    ListFields
} from '../components';
import homeFollow from '../components/homeFollow/index';
import home from '../components/home/index';
import register from '../components/register/index';
import saveLeave from '../components/saveLeave/index';
import showLeave from '../components/showLeave/index';
import showLeaveEdit from '../components/showLeaveEdit/index';
import proFile from '../components/proFile/index';
import editProfile from '../components/editProfile/index';
import testMenu from '../components/testmenu/index';

//admin
import requestConfirm from '../components/adMin/requestConfirm/index';
import adminMenu from '../components/adMin/adminMenu/index';
import verify from '../components/adMin/verify/index';
import verifyMember from '../components/adMin/verifyMember/index';
import leaveDetails from '../components/adMin/leaveDetails/index';
import HistoryApproval from '../components/adMin/HistoryApproval/index';
import confirmDetails from '../components/adMin/confirmDetails/index';
import notConfirmDetails from '../components/adMin/notConfirmDetails/index';
import statistics from '../components/adMin/statistics/index';
import memberList from '../components/adMin/memberList/index';
import adEditProfile from '../components/adMin/adEditProfile/index';
import adViewProfile from '../components/adMin/adViewProfile/index';
import settingLeave from '../components/adMin/settingLeave/index';
import position from '../components/adMin/positions/index';
import editSettingLeave from '../components/adMin/editSettingLeave/index';
import addLeave from '../components/adMin/addLeave/index';
import deleteLeave from '../components/adMin/deleteLeave/index';
//root 
import addCompany from '../components/root/addCompany/index';
import companyManage from '../components/root/companyManage/index';
import companyMenu from '../components/root/companyMenu/index';
import deleteCompany from '../components/root/deleteCompany/index';
import EditCompany from '../components/root/EditCompany/index';

//hr
import sumCompany from '../components/root/sumCompany/index';

//prop up
import moDal from '../components/moDal/index';

const { Content } = Layout;
class Routes extends Component {
    constructor() {
        super();
    }
    render() {

        return (
            <Layout>
                <Router history={history}>
                    <Content>
                        <Switch>
                            <Route path='/' exact render={props => (<LineLiffAuth {...props} />)} />
                            {/* <Route path='/home' render={props => (<HomeUser {...props} />)} /> */}
                            <Route path='/field/List/:name' render={props => (<ListFields {...props} />)} />
                            <Route path='/homefollow' component={homeFollow} />
                            <Route path='/home' component={home} />
                            <Route path='/register' component={register} />
                            <Route path='/leave-request/:id/:root' component={saveLeave} />
                            <Route path='/showLeave' component={showLeave} />
                            <Route path='/showLeaveEdit' component={showLeaveEdit} />
                            <Route path='/proFile/:id/:root' component={proFile} />
                            <Route path='/editProfile/:id/:root' component={editProfile} />
                            <Route path='/testMenu' component={testMenu} />
                            
                            {/* admin */}
                            <Route path='/requestConfirm/:id' component={requestConfirm} />
                            <Route path='/adminMenu/:id' component={adminMenu} />
                            <Route path='/verify/:company' component={verify} />
                            <Route path='/verifyMember/:id' component={verifyMember} />
                            <Route path='/leaveDetails/:id' component={leaveDetails} />
                            <Route path='/HistoryApproval/:id' component={HistoryApproval} />
                            <Route path='/confirmDetails' component={confirmDetails} />
                            <Route path='/notConfirmDetails' component={notConfirmDetails} />
                            <Route path='/statistics/:id' component={statistics} />
                            <Route path='/memberList/:id' component={memberList} />
                            <Route path='/adEditProfile' component={adEditProfile} />
                            <Route path='/adViewProfile' component={adViewProfile} />
                            <Route path='/settingLeave/:company' component={settingLeave} />
                            <Route path='/position/:company' component={position} />
                            <Route path='/editSettingLeave' component={editSettingLeave} />
                            <Route path='/addLeave' component={addLeave} />
                            <Route path='/deleteLeave' component={deleteLeave} />
                            {/* root */}
                            <Route path='/addCompany' component={addCompany} />
                            <Route path='/companyManage' component={companyManage} />
                            <Route path='/companyMenu' component={companyMenu} />
                            <Route path='/deleteCompany' component={deleteCompany} />
                            <Route path='/EditCompany/:nameCompany' component={EditCompany} />
                            {/* hr */}
                            <Route path='/sumCompany' component={sumCompany} />
                            
                            {/* pop up */}
                            <Route path='/moDal' component={moDal}/>
                        </Switch>
                    </Content>
                </Router>
            </Layout>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));