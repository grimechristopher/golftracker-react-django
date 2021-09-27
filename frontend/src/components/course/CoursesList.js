import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import ApiService from "../../services/ApiService";
import CourseForm from './CourseForm';

import CourseListItem from "./CourseListItem";

const CoursesList = (props) => {

    const [courses, setCourses] = useState([]);

    const retrieveCourses = () => {
        ApiService.getAll('courses')
            .then(response => {
                setCourses(response.data);
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
      
        ApiService.create('courses' , data, localStorage.getItem('token'))
            .then(response => {
                retrieveCourses();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }
    const onSubmit = () => {
        retrieveCourses();
    }

    useEffect(() => {
        retrieveCourses();
    }, [])

    return (
        <div>
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