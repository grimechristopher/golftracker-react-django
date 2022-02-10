import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import ApiService from "../../services/ApiService";
import axios from 'axios';
//import raw from '../../../../debugswitch.txt';

import CourseForm from './CourseForm';

import CourseListItem from "./CourseListItem";

const CoursesList = (props) => {

    const coursesLink = "http://localhost:8000/api/courses/"
    fetch('../../../../debugswitch.txt')
        .then(r => r.text())
        .then(text => {
          console.log('text decoded:', text);
          if (text == "False") {
            coursesLink = "https://golf-api.chrisgrime.com/api/courses/"
          }
        });

    const [courses, setCourses] = useState([]);
    //const [filteredCourses, setFilteredCourses] = useState([]);
    const [prevPage, setPrevPage] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [addingCourse, setAddingCourse] = useState(false);

    const handleAddingCourse = () => {
        if (localStorage.getItem('token') != null) {
            setAddingCourse(!addingCourse)
        }
    }

    const retrieveCourses = (link) => {
        axios.get(link)
            .then(response => {
                setCourses(response.data.results);
                    setPrevPage(response.data.previous);

                    setNextPage(response.data.next);
                
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
      
        ApiService.create('courses', data, localStorage.getItem('token'))
            .then(response => {
                retrieveCourses( coursesLink);
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const onSubmit = () => {
        retrieveCourses( coursesLink);
        setAddingCourse(!addingCourse);
    }

    // Basic search function
    const onChangeSearch = (e) => {
        // Initial solution only worked on non paginated results
        let query = e.target.value;
        query = query.toLowerCase().split(' ').join('');
        //let result = courses.filter(course => course.name.toLowerCase().includes(query) 
        //                                   || course.city.toLowerCase().includes(query) 
        //                                   || course.state.toLowerCase().includes(query) );
        //setFilteredCourses(result);
        // Uses the django backend search
        retrieveCourses( coursesLink + '?search=' + query);
        
    }

    useEffect(() => {
        retrieveCourses( coursesLink);
    }, [])

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    onChange={onChangeSearch}
                />
            </div>
            <div>
                { prevPage &&
                <button onClick={() => retrieveCourses(prevPage)} >prev</button>
                }
                { nextPage && 
                <button onClick={() => retrieveCourses(nextPage)}>next</button>
                }
            </div>
            {courses &&
                courses.map((course, index) => (
                <Link to={`/courses/${course.id}/`}>
                    <CourseListItem 
                        key={course.id}
                        course={course}
                    />
                </Link>
            ))}

            { !addingCourse && localStorage.getItem('token') != null &&
                <button onClick={handleAddingCourse}>Add A Course</button>
            }
            { addingCourse && localStorage.getItem('token') != null &&
                <CourseForm 
                addCourseProps={addCourse}
                onSubmit={onSubmit}
                />            
            }            

        </div>
    );
};

export default CoursesList;