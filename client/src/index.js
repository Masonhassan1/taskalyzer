import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'react-notification-alert/dist/animate.css';
import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/css/style.min.css';
import 'assets/css/custom.css';

import store from 'store/store';
import AdminLayout from 'layouts/Admin';
import AuthLayout from 'layouts/Auth';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route
                    path="/admin"
                    render={(props) => <AdminLayout {...props} />}
                />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Redirect from="/" to="/auth/login" />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
