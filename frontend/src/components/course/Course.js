import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import ApiService from "../../services/ApiService";

import HolesList from "./HolesList";
import CourseForm from "./CourseForm";


const Course = (props) => {

    const [editing, setEditing] = useState(false);
    const [course, setCourse] = useState([]);
    const [enabledColors, setEnabledColors] = useState([]);

    let history = useHistory();

    const retrieveCourse = (id) => {
        ApiService.get('courses', id)
            .then(response => {
                setCourse(response.data);

                let arr = [];
                if (response.data.tee_colors) {
                    response.data.tee_colors.map(element => (
                        arr.push(element.id)
                    ))
                }
                setEnabledColors(arr);


            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

    const handleChange = () => {
        retrieveCourse(course.id);
    }

    const deleteCourse = () => {
        ApiService.remove('courses', course.id)
            .then(response => {
                history.push('/courses');
            })
            .catch(e => {
                console.log(e.response.data);
            });
    }


    const updateCourse = (title, city, state, colors) => {
        var data = {
            name: title,
            city: city,
            state: state,
            tee_colors: colors
        };
      
        ApiService.update('courses', course.id, data)
            .then(response => {
                retrieveCourse(course.id);
            })
            .catch(e => {
                console.log(e.response.data);
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

    return (
        <div>
            <Link to="/courses/">All Courses</Link>
            <div>
                <div style={viewMode} >
                    <h2>{course.name}</h2>
                    <h3>{course.city}, {course.state}</h3>
                </div>
                <div style={editMode}>
                    <CourseForm  
                        addCourseProps={updateCourse} 
                        course={course} 
                        defaultColors={enabledColors}
                        onSubmit={handleEditing}
                    />
                </div>
                { editing &&
                <button onClick={() => deleteCourse()}>Delete Course</button>
                }
                { !editing &&
                <button onClick={handleEditing}>Edit info</button>
                }

                <HolesList
                    course={course} 
                    holes={course.holes} 
                    handleChangeProps={handleChange} 
                />
                
                
                <hr />
                <h4>TeeColors: </h4>
                {course.tee_colors &&
                course.tee_colors.map((colors, index) => (
                    <h5>{colors.name}</h5>
                ))}
                
            </div>
        </div>
    );
};

export default Course;