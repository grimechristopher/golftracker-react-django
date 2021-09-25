import axios from 'axios';

const TeeColor_API_BASE_URL = "http://localhost:8000/api/teecolors/";

const getAllTeeColors = () => {
    return axios.get(TeeColor_API_BASE_URL);
};

const getTeeColorById = id => {
    return axios.get(TeeColor_API_BASE_URL + id + '/');
};

const createTeeColor = data => {
    return axios.post(TeeColor_API_BASE_URL, data);
};

const updateTeeColor = (id, data) => {
    return axios.put(TeeColor_API_BASE_URL + id + '/', data);
};

const deleteTeeColor = id => {
    return axios.delete(TeeColor_API_BASE_URL + id + '/');
};

export default {
    getAllTeeColors,
    getTeeColorById,
    createTeeColor,
    createTeeColor,
    updateTeeColor,
    deleteTeeColor
};