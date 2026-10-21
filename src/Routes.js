import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import dashboard from './dashboard';
import SidebarAndHeader from './Components/SidebarAndHeader';
import Buttons from './Components/buttons';
import AddMember from './Components/AddMember';
import Main from './Components/Main';
import MemberDashboard from './Components/MemberDashboard';
import Test from './Components/Test';
import AddCertificate from './Components/AddCertificate';
import AddFiles from './Components/AddFiles';


const Routes = () => {
    return (
        <Router>
            <SidebarAndHeader>
                <Switch>
                    <Route exact path="/dashboard" component={dashboard} />
                    <Route path="/dashboard/Member" component={MemberDashboard} />
                    <Route path="/dashboard/Testing" component={Test} />
                    <Route path="/dashboard/AddMember" component={AddMember} />
                    <Route path="/dashboard/AddCertificate" component={AddCertificate} />
                    <Route path="/dashboard/AddFiles" component={AddFiles} />
                    <Route path="/dashboard/Main" component={Main} />
                </Switch>

            </SidebarAndHeader>
        </Router>);
}

export default Routes;