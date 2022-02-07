import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import ApiService from "../../services/ApiService";

import CourseRatingForm from "./CourseRatingForm";

const CourseRating = (props) => {

    const [userRating, setUserRating] = useState([]);
    const [editing, setEditing] = useState(false);

    const retrieveRating = () => {
        //setLoading(true);
        ApiService.getAll('courseratings', localStorage.getItem('token'))
            .then(response => {
                console.log(response.data);
                //console.log(props.course.id);
                let d = response.data.filter( rating => rating.course == props.course.id);
                setUserRating(d);
                //setLoading(false);
                console.log(d);
                //setLoading(false);
            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

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
            //rated_by: 0, // Should be overwritten // handled by the backend
            rating: r,
            course: props.course.id,
        };
      
        console.log(data);
        ApiService.update('courseratings', userRating[0].id, data, localStorage.getItem('token'))
            .then(response => {
                //retrieveCourse(course.id);
                props.handleChangeProps()
            })
            .catch(e => {
                console.log(e.data);
        });
    }

    const addCourseRating = (r) => {
        var data = {
            rating: r,
            course: props.course.id,
        };
      
        ApiService.create('courseratings', data, localStorage.getItem('token'))
            .then(response => {
                //retrieveCourse(props.course.id);
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    let viewMode = {}
    let editMode = {}
    
    if (editing) {
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }

    const handleEditing = () => {
        if (localStorage.getItem('token') != null) {
            setEditing(!editing)
        }
    }

    useEffect(() => {
        retrieveRating();
    }, [props.course])  

    return (
        <div>

        { props.course.rating_average < 1 ?
            <Link onClick={handleEditing} to='#'>Be the first to rate this course</Link>
        :
            <h4>Rating: {props.course.rating_average}/5</h4>
        }
        {
            userRating.length > 0 &&
            <Link onClick={handleEditing} to='#'>Your Rating: {userRating[0].rating}</Link>
        }
        { editing && localStorage.getItem('token') != null &&
            <CourseRatingForm
                courseId={props.course.id}
                //handleChangeProps={handleChange} 
                handleSubmit={handleRatingChange}
            />
        }
        </div>
    );
};

export default CourseRating;