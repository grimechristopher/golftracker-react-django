import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import CourseService from "../../services/CourseService";
import HoleService from "../../services/HoleService";
import TeeService from "../../services/TeeService";

import AddHole from "./AddHole";
import AddTee from "./AddTee";
import CourseForm from "./CourseForm";
import UpdateHole from "./UpdateHole";

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
                retrieveCourse(props.match.params.id);
            })
            .catch(e => {
                console.log(e);
                console.log(e.response.data.non_field_errors[0]);
                alert(e.response.data.non_field_errors[0]);
        });
    }

    const updateHole = (holeId, number, title, mens_par, womens_par) => {
        var data = {
            id: holeId,
            number: number,
            name: title,
            course: props.match.params.id,
            mens_par: mens_par,
            womens_par: womens_par,
        };
      console.log(data);
        HoleService.updateHole(holeId, data)
            .then(response => {
                console.log(response.data);
                retrieveCourse(course.id);
            })
            .catch(e => {
                console.log(e);
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

    const deleteHole = () => {
        console.log(course.holes[holesAmt - 1].id);
        HoleService.deleteHole(course.holes[holesAmt - 1].id)
        .then(response => {
            retrieveCourse(course.id);
        }
        )
    }

    const deleteTee = (id) => {
        console.log(id);
        TeeService.deleteTee(id)
        .then(response => {
            retrieveCourse(course.id);
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
                    <UpdateHole addHoleProps={updateHole} holeId={hole.id} holeNumber={hole.number} />
                    <div>
                        {hole.tees &&
                        hole.tees.map((tee, index) => (
                        <div>
                            <h5>{tee.color}</h5>
                            <h5>{tee.yards} Yards</h5>
                            <button onClick={() => deleteTee(tee.id)}>Delete Tee</button>
                        </div>
                        ))}
                    </div>
                    <AddTee />
                    <hr />
                </div>
                ))}
                {holesAmt > 0 &&
                <button onClick={() => deleteHole()}>Delete Last Hole</button>
                }
                <AddHole addHoleProps={addHole} holesAmt={holesAmt}/>
                <button onClick={() => deleteCourse()}>Delete Course</button>
                <CourseForm addCourseProps={updateCourse} />
            </div>
        </div>
    );
};

export default Course;