import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER,
    FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
    return function(dispatch) {
        
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // If request is good..
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch((error) => {
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
        .catch((error) => {
            dispatch(authError(error.response.data.error));
        });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    
    return { type: UNAUTH_USER };
}
// Redux Thunk
export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({ 
                type: FETCH_MESSAGE,
                payload: response.data.message
            });
        })
        .catch(error => {
            console.log(error.response);
        });
    }
}
// Redux Promise
// export function fetchMessage() {
//     const request = axios.get(ROOT_URL, {
//         headers: { authorization: localStorage.getItem('token') }
//     });

//     return {
//         type: FETCH_MESSAGE,
//         payload: request
//     };
// }
// an action creator always return an object (action) 
// and the action has a type

// redux-thunk is a middleware allow us to return a function 
// from an action creator instead of returning an action 