import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import styles from "./Course.module.css"

import CourseService from "../../services/CourseService";

import HolesList from "./HolesList";
import CourseForm from "./CourseForm";


const Course = (props) => {

    const [editing, setEditing] = useState(false);
    const [course, setCourse] = useState([]);
    const [holesAmt, setHolesAmt] = useState([]);
    const [enabledColors, setEnabledColors] = useState([]);

    let history = useHistory();

    const retrieveCourse = (id) => {
        CourseService.getCourseById(id)
            .then(response => {
                setCourse(response.data);
                let arr = [];
                console.log("course.tee_colors: ");
                console.log(response.data.tee_colors);
                if (response.data.tee_colors) {
                    response.data.tee_colors.forEach(ele => {
                        arr.push(ele.id);
                      })
                      setEnabledColors(arr);
                }
        
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


    const updateCourse = (title, city, state, colors) => {
        var data = {
            name: title,
            city: city,
            state: state,
            tee_colors: colors
        };

        console.log(data);
      
        CourseService.updateCourse(course.id, data)
            .then(response => {
                console.log(response.data);
                retrieveCourse(course.id);
            })
            .catch(e => {
                console.log(e);
        });
    }

    const handleEditing = () => {
        setEditing(!editing)
    }

    let viewMode = {}
    let editMode = {}
    
    if (editing) {
        viewMode.display = "none"
    } else {
    editMode.display = "none"
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
                <div style={viewMode} >
                    <h2>{course.name}</h2>
                    <h3>{course.city}, {course.state}</h3>
                </div>
                <div style={editMode}>
                    <CourseForm  addCourseProps={updateCourse} course={course} />
                </div>
                { editing &&
                <>
                    <button onClick={handleEditing}>Save info</button>
                    <button onClick={() => deleteCourse()}>Delete Course</button>
                </>
                }
                { !editing &&
                    <button onClick={handleEditing}>Edit info</button>
                }


                <HolesList 
                    holes={course.holes} 
                    handleChangeProps={handleChange} 
                    holesLength={holesAmt}
                    courseId={course.id}
                    enabledColors={enabledColors}
                />
                
                <h4>TeeColors: </h4>
                {course.tee_colors &&
                course.tee_colors.map((c, index) => (
                    <h5>{c.name}</h5>
                ))}
                
            </div>
        </div>
    );
};

export default Course;