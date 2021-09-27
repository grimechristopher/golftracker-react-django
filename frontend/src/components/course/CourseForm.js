import React, { useState, useEffect } from "react";

import ApiService from "../../services/ApiService";

const CourseForm = (props) => {

    const [course, setCourse] = useState({
        title: "",
        city: "",
        state: "",
        tee_colors: []
    })

    const[teeColors, setTeeColors] = useState([]);

    const retrieveTeeColors = () => {
      let container = [];
      ApiService.getAll('teecolors')
      .then(response => {
          response.data.forEach(element => {
              let obj = {};
              obj["value"] = element.id;
              obj["label"] = element.name;
              container.push(obj);
          });
          setTeeColors(container);
      })
      .catch(e => {
          console.log(e.message);
      });
  }


    const onChange = e => {
        setCourse({
          ...course,
          [e.target.name]: e.target.value,
        })
    }

    const onMultiSelectChange = e => {
      let options = Array.from(e.target.selectedOptions, option => option.value);
      setCourse({
        ...course,
        [e.target.name]: options,
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
            props.addCourseProps(course.title, course.city, course.state, course.tee_colors);
            props.onSubmit()
        }

    }
    useEffect(() => {

      if (props.course) {
        setCourse({
          ...course,
          title: props.course.name,
          city: props.course.city,
          state: props.course.state,
          tee_colors: props.defaultColors
        })
      }

      retrieveTeeColors();

    }, [props.course, props.defaultColors])

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div>
                <input
                    type="text"
                    className="input-name"
                    placeholder="Course Name"
                    value={course.title}
                    name="title"
                    onChange={onChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    className="input-text"
                    placeholder="City"
                    value={course.city}
                    name="city"
                    onChange={onChange}
                />
                <input
                    type="text"
                    className="input-text"
                    placeholder="State"
                    value={course.state}
                    name="state"
                    onChange={onChange}
                />
            </div>
            <div>
                <select 
                    name="tee_colors"
                    multiple={true} 
                    value={course.tee_colors}
                    onChange={onMultiSelectChange} 
                >
                  {teeColors &&
                      teeColors.map((option) => (
                          <option value={option.value} >
                              {option.label}
                          </option>
                  ))}
                </select>
            </div>
            <div>
                <button className="input-submit">
                    Save Course
                </button>
            </div>
        </form>
    );
};

export default CourseForm;