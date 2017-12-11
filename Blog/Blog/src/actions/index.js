import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete-post';

/*whenever we're thinking to make a network requests inside of an action creator
we have to install axios to make the actual request and we have to install
redux-promise to handle the asynchronus nature of the request itself
*/
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=JAVIER1234';

export function fetchPosts() { // fetch a list of posts and returning to a reducer
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}
//para darle la lista de publicaciones

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback()); //for navigate to the post's list
    return {
        type: CREATE_POST,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => callback()); //for navigate to the post's list

    return {
        type: DELETE_POST,
        payload: id
    }
}