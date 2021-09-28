import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api/";

const getAll = (model, token) => {
    if (token) {
        return axios.get(API_BASE_URL + model + '/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            }
        })
    }
    return axios.get(API_BASE_URL + model + '/');
};

const get = (model, id, token) => {
    if (token) {
        return axios.get(API_BASE_URL + model + '/' + id + '/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            }
        })
    }
    return axios.get(API_BASE_URL + model + '/' + id + '/');
};

const create = (model, data, token) => {
    return axios.post(API_BASE_URL + model + '/', data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    })
};

const update = (model, id, data, token) => {
    return axios.put(API_BASE_URL + model + '/' + id + '/', data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    })
};

const remove = (model, id, token) => {
    return axios.delete(API_BASE_URL + model + '/' + id +'/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    })
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};