import axios from 'axios';
import {
    PROFILE_ERROR,
    GET_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPOS
} from "./types";
import {setAlert} from './alert'

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Get profile by ID
export const getProfileById = (userId) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Get GITHUB repos
export const getGithubRepos = username => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Create or Update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        };
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (e) {

        const errors = e.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        };
        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience added', 'success'));

        history.push('/dashboard');
    } catch (e) {

        const errors = e.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        };
        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education added', 'success'));

        history.push('/dashboard');
    } catch (e) {

        const errors = e.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Removed', 'success'));
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Removed', 'success'));
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
};

// Delete Account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure you want to delete account? Account will be deleted permanently!')) {
        try {
            await axios.delete('/api/profile');
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: DELETE_ACCOUNT});
            dispatch(setAlert('Account deleted', 'danger'));
        } catch (e) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }
};
