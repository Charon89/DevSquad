import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {getCurrentProfile} from "../../actions/profile";
import Spinner from '../layout/spinner'
import DashboardActions from './dashboardActions'
import Experience from "./Experience";
import Education from "./Education";
import {deleteAccount} from "../../actions/profile";

const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile: {profile, loading}}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <div className='post my-2'>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {profile !== null ? <Fragment>
                    <img className='round-img' style={{margin: '0 auto'}} src={profile.user.avatar} alt=""/>
                </Fragment> : <Spinner/>}
                <small>Manage your avatar using </small>
                <a className='text-center do-text-center' href="https://en.gravatar.com/" target='_blank'
                   rel="noopener noreferrer">Gravatar</a>
            </div>
            <p className="lead do-text-center">{' '}Welcome {user && user.name}</p>
        </div>
        {profile !== null ?
            <Fragment>
                <DashboardActions/>
                <Experience experience={profile.experience}/>
                <Education education={profile.education}></Education>
                <div className="my-2">
                    <button onClick={() => deleteAccount()} className="btn btn-danger"><i
                        className="fas fa-user-minus"></i> {" "} Delete Account
                    </button>
                </div>
            </Fragment> :
            <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>Create profile</Link>
            </Fragment>}
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
