import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

//Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from './actions/auth'

//Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
// import Alert from "./components/layout/alert";
// import Dashboard from "./components/dashboard/dashboard";
// import PrivateRoute from "./components/routing/PrivateRoute";
// import CreateProfile from "./components/profile-form/CreateProfile";
// import EditProfile from "./components/profile-form/EditProfile";
// import AddExperience from "./components/profile-form/AddExperience";
// import AddEducation from "./components/profile-form/AddEducation";
// import Profiles from "./components/profiles/Profiles";
// import Profile from "./components/profile/profile";
// import Posts from "./components/posts/Posts";
// import Post from "./components/post/Post";
// import NotFound from "./components/layout/NotFound";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Switch>
                        <Route exact path='/' component={Landing}/>
                        <Route component={Routes}/>
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    )
};

export default App;
