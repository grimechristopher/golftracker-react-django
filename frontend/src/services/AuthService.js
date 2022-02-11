import axios from 'axios';


let AUTH_BASE_URL = "https://golf-api.chrisgrime.com/auth/";
fetch('../../../debugswitch.txt')
    .then(r => r.text())
    .then(text => {
      console.log('text decoded:', text);
      if (text === "True") {
        AUTH_BASE_URL = "http://localhost:8000/auth/";
      }
});
//const AUTH_BASE_URL = "http://localhost:8000/auth/";
//const AUTH_BASE_URL = "https://golf-api.chrisgrime.com/auth/";

const login = (data) => {
    return axios.post(AUTH_BASE_URL + 'login/', data);
}

const register = (data) => {
    return axios.post(AUTH_BASE_URL + 'register/', data);
}

const user = (token) => {
    return axios.get(AUTH_BASE_URL + 'user/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    });
}

const logout = (token) => {
    return axios.post(AUTH_BASE_URL + 'logout/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    })
}

export default {
    login,
    register,
    user,
    logout
};