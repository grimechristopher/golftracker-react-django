import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import CourseService from "../../services/CourseService";
import AddCourse from './AddCourse';

import CourseListItem from "./CourseListItem";

const CoursesList = (props) => {

    const [courses, setCourses] = useState([]);

    const retrieveCourses = () => {
        CourseService.getAllCourses()
            .then(response => {
                setCourses(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const addCourse = (title, city, state) => {
        var data = {
            name: title,
            city: city,
            state: state,
        };
      
        CourseService.createCourse(data)
            .then(response => {
                console.log(response.data);
                setCourses([...courses, response.data])
            })
            .catch(e => {
                console.log(e);
        });
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
            <AddCourse addCourseProps={addCourse} />
        </div>
    );
};

export default CoursesList;