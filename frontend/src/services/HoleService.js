import axios from 'axios';

const Hole_API_BASE_URL = "http://localhost:8000/api/holes/";

const getAllHoles = () => {
    return axios.get(Hole_API_BASE_URL);
};

const getHoleById = id => {
    return axios.get(Hole_API_BASE_URL + id + '/');
};

const createHole = data => {
    return axios.post(Hole_API_BASE_URL, data);
};

const updateHole = (id, data) => {
    return axios.put(Hole_API_BASE_URL + id + '/', data);
};

const deleteHole = id => {
    return axios.delete(Hole_API_BASE_URL + id + '/');
};

export default {
    getAllHoles,
    getHoleById,
    createHole,
    createHole,
    updateHole,
    deleteHole
};