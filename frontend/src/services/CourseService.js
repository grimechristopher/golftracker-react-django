import axios from 'axios';

const COURSE_API_BASE_URL = "http://localhost:8000/api/courses/";

const getAllCourses = () => {
    return axios.get(COURSE_API_BASE_URL);
};

const getCourseById = id => {
    return axios.get(COURSE_API_BASE_URL + id + '/');
};

const createCourse = data => {
    return axios.post(COURSE_API_BASE_URL, data);
};

const updateCourse = (id, data) => {
    return axios.put(COURSE_API_BASE_URL + id + '/', data);
};

const deleteCourse = id => {
    return axios.delete(COURSE_API_BASE_URL + id +'/');
};

export default {
    getAllCourses,
    getCourseById,
    createCourse,
    createCourse,
    updateCourse,
    deleteCourse
};