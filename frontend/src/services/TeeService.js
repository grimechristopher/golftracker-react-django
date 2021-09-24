import axios from 'axios';

const Tee_API_BASE_URL = "http://localhost:8000/api/tees/";

const getAllTees = () => {
    return axios.get(Tee_API_BASE_URL);
};

const getTeeById = id => {
    return axios.get(Tee_API_BASE_URL + id + '/');
};

const createTee = data => {
    return axios.post(Tee_API_BASE_URL, data);
};

const updateTee = (id, data) => {
    return axios.put(Tee_API_BASE_URL + id + '/', data);
};

const deleteTee = id => {
    return axios.delete(Tee_API_BASE_URL + id + '/');
};

export default {
    getAllTees,
    getTeeById,
    createTee,
    createTee,
    updateTee,
    deleteTee
};