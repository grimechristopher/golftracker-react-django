import React, { useState, useEffect } from "react";

import TeeColorService from "../../services/TeeColorService";

const CourseForm = (props) => {

    const [course, setCourse] = useState({
        title: "",
        city: "",
        state: "",
        tee_colors: ""
    })

    const[colorOptions, setColorOptions] = useState([]);
    const[defaultColors, setDefaultColors] = useState([]);

    const retrieveTeeColors = () => {
      //setColorOptions([]);
      let container = [];
      TeeColorService.getAllTeeColors()
      .then(response => {
          response.data.forEach(element => {
              let obj = {};
              obj["value"] = element.id;
              obj["label"] = element.name;
              console.log(obj);
              //options.push(obj);
              container.push(obj);
              //options.push({value: element.color, label: element.})
          });
          setColorOptions(container);
          console.log(response.data);
          //setCourse(response.data);
  
          //console.log(response.data);
      })
      .catch(e => {
          console.log(e);
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
      console.log(options);
      //console.log("MultiSelect Cghange");
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
            props.addCourseProps(course.title, course.city, course.state, course.tee_colors);
        }

    }

    useEffect(() => {
      retrieveTeeColors();

    }, [])

    useEffect(() => {

      if (props.course) {
        setCourse({
          ...course,
          title: props.course.name,
          city: props.course.city,
          state: props.course.state,
          tee_colors: [props.course.tee_colors]
        })
        console.log("teeColors:");
        console.log(props.course.tee_colors);
        if (props.course.tee_colors) {
          let arr = [];
          props.course.tee_colors.forEach(ele => {
            arr.push(ele.id);
          })
          console.log(arr);
          setDefaultColors(arr);
        }

      }
    }, [props.course])

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

        <select name="tee_colors" multiple={true} onChange={onMultiSelectChange} value={defaultColors}>
          {colorOptions &&
              colorOptions.map((opt, index) => (
                  <option value={opt['value']}>{opt['label']}</option>
              ))}
        </select>

        <button className="input-submit">
            Submit
        </button>
      </form>
    );
};

export default CourseForm;