import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api/";

const getAll = (model) => {
    return axios.get(API_BASE_URL + model + '/');
};

const get = (model, id) => {
    return axios.get(API_BASE_URL + model + '/' + id + '/');
};

const create = (model, data) => {
    return axios.post(API_BASE_URL + model + '/', data);
};

const update = (model, id, data) => {
    return axios.put(API_BASE_URL + model + '/' + id + '/', data);
};

const remove = (model, id) => {
    return axios.delete(API_BASE_URL + model + '/' + id +'/');
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};