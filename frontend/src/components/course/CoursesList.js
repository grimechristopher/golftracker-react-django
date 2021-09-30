import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import ApiService from "../../services/ApiService";
import axios from 'axios';

import CourseForm from './CourseForm';

import CourseListItem from "./CourseListItem";

const CoursesList = (props) => {

    const [courses, setCourses] = useState([]);
    const [prevPage, setPrevPage] = useState("");
    const [nextPage, setNextPage] = useState("");

    const retrieveCourses = (link) => {
        axios.get(link)
            .then(response => {
                setCourses(response.data.results);
                    setPrevPage(response.data.previous);

                    setNextPage(response.data.next);
                
            })
            .catch(e => {
                console.log(e);
            });
    };

    const addCourse = (title, city, state, colors) => {
        var data = {
            name: title,
            city: city,
            state: state,
            tee_colors: colors
        };
      
        ApiService.create('courses', data, localStorage.getItem('token'))
            .then(response => {
                retrieveCourses("http://localhost:8000/api/courses/");
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const onSubmit = () => {
        retrieveCourses("http://localhost:8000/api/courses/");
    }

    useEffect(() => {
        retrieveCourses("http://localhost:8000/api/courses/");
    }, [])

    return (
        <div>
            <div>
                { prevPage &&
                <button onClick={() => retrieveCourses(prevPage)} >prev</button>
                }
                { nextPage && 
                <button onClick={() => retrieveCourses(nextPage)}>next</button>
                }
            </div>
            {courses &&
                courses.map((course, index) => (
                <Link to={`/courses/${course.id}/`}>
                    <CourseListItem 
                        key={course.id}
                        course={course}
                    />
                </Link>
            ))}
            { localStorage.getItem('token') != null &&
            <CourseForm 
            addCourseProps={addCourse}
            onSubmit={onSubmit}
            />
            }
        </div>
    );
};

export default CoursesList;