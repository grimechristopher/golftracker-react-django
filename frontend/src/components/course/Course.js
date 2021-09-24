import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import CourseService from "../../services/CourseService";

import HolesList from "./HolesList";
import CourseForm from "./CourseForm";


const Course = (props) => {

    const [course, setCourse] = useState([]);
    const [holesAmt, setHolesAmt] = useState([]);

    let history = useHistory();

    const retrieveCourse = (id) => {
        CourseService.getCourseById(id)
            .then(response => {
                setCourse(response.data);

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        console.log(course.holes);
    };

    const handleChange = (id) => {
        retrieveCourse(id);
        console.log("Change Handled" + id);
    }





    const deleteCourse = () => {
        console.log(course.id);
        CourseService.deleteCourse(course.id)
            .then(response => {
                history.push('/courses');
            }
        )
    }




    const updateCourse = (title, city, state) => {
        var data = {
            name: title,
            city: city,
            state: state,
        };
      
        CourseService.updateCourse(course.id, data)
            .then(response => {
                console.log(response.data);
                retrieveCourse(course.id);
            })
            .catch(e => {
                console.log(e);
        });
    }

    useEffect(() => {
        retrieveCourse(props.match.params.id);
    }, [])

    useEffect(() => {
        if (typeof course.holes != 'undefined') {
            setHolesAmt(course.holes.length);
            
        }
      }, [retrieveCourse]);

    return (
        <div>
            <Link to="/courses/">All Courses</Link>
            <div>
                <h2>{course.name}</h2>
                <h3>{course.city}, {course.state}</h3>
                
                <HolesList 
                    holes={course.holes} 
                    handleChangeProps={handleChange} 
                    holesLength={holesAmt}
                    courseId={course.id}
                />
                
                <button onClick={() => deleteCourse()}>Delete Course</button>
                <CourseForm addCourseProps={updateCourse} />
            </div>
        </div>
    );
};

export default Course;