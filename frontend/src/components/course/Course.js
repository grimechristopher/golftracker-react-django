import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import CourseService from "../../services/CourseService";
import HoleService from "../../services/HoleService";

import AddHole from "./AddHole";
import UpdateCourse from "./UpdateCourse";

const Course = (props) => {

    const [course, setCourse] = useState([]);
    const [holesAmt, setHolesAmt] = useState([]);
    //let holesAmt = 0;
    let history = useHistory();

    const retrieveCourse = (id) => {
        CourseService.getCourseById(id)
            .then(response => {
                setCourse(response.data);
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const addHole = (number, title, mens_par, womens_par) => {
        var data = {
            number: number,
            name: title,
            course: props.match.params.id,
            mens_par: mens_par,
            womens_par: womens_par,
        };
      
        HoleService.createHole(data)
            .then(response => {
                console.log(response.data);
                retrieveCourse(props.match.params.id)
            })
            .catch(e => {
                console.log(e);
                console.log(e.response.data.non_field_errors[0]);
                alert(e.response.data.non_field_errors[0]);
        });
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
                
                {course.holes &&
                course.holes.map((hole, index) => (
                <div>
                    <h4>{hole.number}</h4>
                    {hole.name && 
                        <h4>{hole.name}</h4>
                    }
                    <h4>Mens Par: {hole.mens_par}</h4>
                    <h4>Womens Par: {hole.womens_par}</h4>
                   
                   <div>
                        {hole.tees &&
                        hole.tees.map((tee, index) => (
                        <div>
                            <h5>{tee.color}</h5>
                            <h5>{tee.yards} Yards</h5>
                        </div>
                        ))}
                    </div>
                    <hr />
                </div>
                ))}

                <AddHole addHoleProps={addHole} holesAmt={holesAmt}/>
                <button onClick={() => deleteCourse()}>Delete</button>
                <UpdateCourse addCourseProps={updateCourse} ></UpdateCourse>
            </div>
        </div>
    );
};

export default Course;