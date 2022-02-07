import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import ApiService from "../../services/ApiService";

import HolesList from "./HolesList";
import CourseForm from "./CourseForm";
import CourseRatingForm from "./CourseRatingForm";


const Course = (props) => {

    const [editing, setEditing] = useState(false);
    const [course, setCourse] = useState([]);
    const [enabledColors, setEnabledColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState([]);

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
                setLoading(false);

            })
            .catch(e => {
                //console.log(e.response.data);
            });
    };

    const retrieveRating = () => {
        //setLoading(true);
        ApiService.getAll('courseratings', localStorage.getItem('token'))
            .then(response => {
                console.log(response.data);
                console.log(course.id);
                let d = response.data.filter( rating => rating.course == course.id);
                setUserRating(d);
                //setLoading(false);
                console.log(d);
                setLoading(false);
            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

    /*const retrieveRatings = () => {
        axios.get("http://localhost:8000/api/courseratings/?search=" + course.id)
            .then(response => {
                setUserRating(response.data.results);
                    setPrevPage(response.data.previous);

                    setNextPage(response.data.next);
                
            })
            .catch(e => {
                console.log(e);
            });
    };*/

    const handleChange = () => {
        retrieveCourse(course.id);
    }

    const deleteCourse = () => {
        ApiService.remove('courses', course.id, localStorage.getItem('token'))
            .then(response => {
                history.push('/courses');
            })
            .catch(e => {
                console.log(e.response.data);
            });
    }

    const handleRatingChange = (rating) => {
        console.log("Handle Rating Chane");
        if (userRating.length == 0) {
            console.log("Rating is being added");
            addCourseRating(rating);
        }
        else {
            console.log("Rating is being updated");
            updateCourseRating(rating);
        }
    }

    // It is at this point that I realize CourseRating should be its own Component... 
    // I'm learning
    const updateCourseRating = (r) => {
        var data = {
            //rated_by: 0, // Should be overwritten
            rating: r,
            course: course.id,
            //rated_by: // handled by the backend
        };
      
        console.log(data);
        ApiService.update('courseratings', userRating[0].id, data, localStorage.getItem('token'))
            .then(response => {
                retrieveCourse(course.id);
            })
            .catch(e => {
                console.log(e.data);
        });
    }

    const addCourseRating = (r) => {
        var data = {
            rating: r,
            course: course.id,
        };
      
        ApiService.create('courseratings', data, localStorage.getItem('token'))
            .then(response => {
                retrieveCourse(course.id);
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
      
        ApiService.update('courses', course.id, data, localStorage.getItem('token'))
            .then(response => {
                retrieveCourse(course.id);
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const handleEditing = () => {
        if (localStorage.getItem('token') != null) {
            setEditing(!editing)
        }
        //retrieveCourse(course.id); // To refresh the score card ... Didnt work
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
        retrieveRating();
    }, [course])  

    useEffect(() => {
        console.log("User Rating:");
        console.log(userRating);
        //userRating.filter( uR => { return uR.course.id === course.id });
        //userRating.Array.filter( rating => rating.course.id === course.id)
        //console.log(userRating);
    }, [userRating])  

    return (
        <div>
            {loading === false && (
                <>
                <Link to="/courses/">All Courses</Link>
                <div>
                    <div style={viewMode} >
                        <h2>{course.name}</h2>
                        <h3>{course.city}, {course.state}</h3>
                    </div>
                    <div>
                        { course.rating_average < 1 ?
                            <h4>Be the first to rate this course</h4>
                        :
                            <h4>Rating: {course.rating_average}/5</h4>
                        }
                        {
                            userRating.length > 0 &&
                            <h4>Your Rating: {userRating[0].rating}</h4>
                        }
                        <CourseRatingForm
                            courseId={course.id}
                            //addRatingProps={handleRatingChange}
                            handleChangeProps={handleChange} 
                            handleSubmit={handleRatingChange}
                        />

                    </div>
                    <div style={editMode}>
                        <CourseForm  
                            addCourseProps={updateCourse} 
                            course={course} 
                            defaultColors={enabledColors}
                            onSubmit={handleEditing}
                        />
                    </div>
                    { editing && localStorage.getItem('token') != null &&
                    <button onClick={() => deleteCourse()}>Delete Course</button>
                    }
                    { !editing && localStorage.getItem('token') != null &&
                    <button onClick={handleEditing}>Edit info</button>
                    }

                    <HolesList
                        course={course} 
                        //holes={course.holes} 
                        tee_colors={course.tee_colors}
                        handleChangeProps={handleChange} 
                    />
                    {localStorage.getItem('token') === null &&
                    <div>
                        <p>Login to edit course details</p>
                    </div>
                    }
                    
                    <hr />

                    
                </div>
                </>
                )}

        </div>
    );
};

export default Course;