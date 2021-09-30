import React, { useState, useEffect } from "react";

import ApiService from '../../services/ApiService';

const RoundForm = (props) => {

    const [round, setRound] = useState({
        title: null,
        course: "",
        tee_color: 1
    })

    const [teeColors, setTeeColors] = useState([]);
    const [courses, setCourses] = useState([]);

    const retrieveCourses = () => {
        let container = [];
        ApiService.getAll('courses')
        .then(response => {
            response.data.results.forEach(element => {
                let obj = {};
                obj["value"] = element.id;
                obj["label"] = element.name;
                setRound({...round, course: element.id}); //quick way to get a default selected
                container.push(obj);
            });
            setCourses(container);
        })
        .catch(e => {
            console.log(e.message);
        });
    }

    const retrieveTeeColors = () => {
        let container = [];
        ApiService.getAll('teecolors')
        .then(response => {
            response.data.forEach(element => {
                let obj = {};
                obj["value"] = element.id;
                obj["label"] = element.name;
                console.log(element.id);
                container.push(obj);
            });
            setTeeColors(container);
        })
        .catch(e => {
            console.log(e.message);
        });
    }

    
    const handleSubmit = e => {
        e.preventDefault()

        console.log(round);

        let isValidated = true;

        if (round.course == "") {
            alert("Course must be selected");
            isValidated = false;
        }

        if (round.tee_color == "") {
            alert("Tee Color must be selected");
            isValidated = false;
        }

        if (isValidated) {
            console.log(round);
            props.addRoundProps(round.title, round.course, round.tee_color);
            props.onSubmit()
        }
    }

    const onChange = e => {
        setRound({
          ...round,
          [e.target.name]: e.target.value,
        })
        console.log(e.target.name);
    }

    const onSelectChange = e => {
        setRound({
            ...round,
            [e.target.name]: e.target.selectedValue,
          })
          console.log(e.target.selectedValue);
      }

    useEffect(() => {

        //if (props.round) {
        //  setRound({
        //    ...round,
        //    title: props.round.name,
        //      course: props.round.course,
        //    tee_color: props.round.tee_color
        //  })
        //}
  
        retrieveCourses();
        retrieveTeeColors();
  
      }, [])

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div>
                <input
                    type="text"
                    className="input-name"
                    placeholder="Round Name (Optional)"
                    value={round.title}
                    name="title"
                    onChange={onChange}
                />
            </div>
            <div>
                <select 
                    name="course"
                    value={round.course}
                    onChange={onChange} 
                >
                {courses &&
                    courses.map((option) => (
                    <option value={option.value} >
                        {option.label}
                    </option>
                ))}
                </select>
            </div>
            <div>
                <select 
                    name="tee_color"
                    value={round.tee_color}
                    onChange={onChange} 
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
                    Start Round
                </button>
            </div>
        </form>
    );
};

export default RoundForm;