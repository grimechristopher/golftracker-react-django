import React, { useState } from "react";

const AddCourse = (props) => {

    const [course, setCourse] = useState({
        title: "",
        city: "",
        state: "",
    })

    const onChange = e => {
        setCourse({
          ...course,
          [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        let isValidated = true;

        if (course.title.trim()) {
          setCourse({
            title: "",
          })
        } else {
          alert("Name cannot be blank.");
          isValidated = false;
        }

        if (course.city.trim()) {
            setCourse({
              city: "",
            })
        } else {
            alert("City cannot be blank.");
            isValidated = false;
        }

        if (course.state.trim()) {
            setCourse({
              state: "",
            })
        } else {
            alert("State cannot be blank.");
            isValidated = false;
        }

        if (isValidated) {
            props.addCourseProps(course.title, course.city, course.state);
        }

    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
        <input
            type="text"
            className="input-name"
            placeholder="Course Name"
            value={course.title}
            name="title"
            onChange={onChange}
        />
        <input
            type="text"
            className="input-city"
            placeholder="City"
            value={course.city}
            name="city"
            onChange={onChange}
        />
        <input
            type="text"
            className="input-state"
            placeholder="State"
            value={course.state}
            name="state"
            onChange={onChange}
        />
        <button className="input-submit">
            Submit
        </button>
      </form>
    );
};

export default AddCourse;