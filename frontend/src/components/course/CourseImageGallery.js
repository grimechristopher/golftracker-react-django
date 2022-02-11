import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ApiService from "../../services/ApiService";
import AuthService from '../../services/AuthService';

import styles from "./Course.module.css";
import CourseImageForm from './CourseImageForm';

const CourseImageGallery = (props) => {

    const addCourseImage = (img) => {
        var data = {
            image: img,
            course: props.course.id,
            
        };
      
        /*ApiService.create('coursepictures', data, localStorage.getItem('token'))
            .then(response => {
                //retrieveCourse(props.course.id);
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
        });*/

        let form_data = new FormData();
        form_data.append('image', data.image, data.image.name);
        form_data.append('course', data.course);
        //form_data.append('content', this.state.content);

        let url = 'https://golf-api.chrisgrime.com/api/coursepictures/';
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            url = 'http://localhost:8000/api/coursepictures/';
        }

        //let url = 'http://localhost:8000/api/coursepictures/';
        //let url = 'https://golf-api.chrisgrime.com/api/coursepictures/';
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
            .then(res => {
              console.log(res.data);
              props.handleChangeProps();
            })
            .catch(err => console.log(err))
            console.log("Uploaded Image: " + img);
    };

    const deleteCoursePicture = (imageId) => {
        if (!localStorage.getItem('token') ) {
            alert("Deletion of this particular course been disabled for this demonstration.")
        }
        else {
            ApiService.remove('coursepictures', imageId, localStorage.getItem('token'))
            .then(response => {
                //history.push('/courses');
                console.log(response);
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
            });
        }
    }

        const [userId, setUserId] = useState('');
        const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLoggedIn(true);
            
            // Easy way to see if user is the uploader. Also is checked on the backend
            AuthService.user(localStorage.getItem('token'))
            .then(response => {
                //console.log(response.data);
                setUserId(response.data.id);
                //setUserGender(response.data.gender);
            })

        }
    }, []);

    return (
        <div className={styles.coursePictureGallery} >
            { props.course.course_image.map((image, index) => (
                <div className={styles.coursePictureContainer} >
                    <img src={image.image}  />
                    { userId === image.uploaded_by &&
                        <button onClick={() => deleteCoursePicture(image.id)}>Delete</button>
                    }
                    <div>
                    </div>
                </div>
            ))
            }
            { loggedIn &&
                <div className={styles.coursePictureContainer}  >
                    <h2> + Picture</h2>
                    <CourseImageForm
                        //course={props.course}
                        addCoursePictureProps={addCourseImage}
                        //onSubmit={props.onSubmit}
                    />
                </div>
            }

        </div>
    );
};

export default CourseImageGallery;