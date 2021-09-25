import React, { useState, useEffect } from "react";
import Select from 'react-select'

import TeeColorService from '../../services/TeeColorService';
import TeeService from "../../services/TeeService";

const TeeForm = (props) => {

    const [tee, setTee] = useState({
        tee_color: 1,
        yards: ""
    })

    const[colorOptions, setColorOptions] = useState([]);
    const[isValid, setIsValid] = useState(true);

    //const options = [,];

    const onChange = e => {
        console.log(e.value);
        setTee({
          ...tee,
          [e.target.name]: e.target.value,
        })
    }
    
    const retrieveTeeColors = () => {
        //setColorOptions([]);
        TeeColorService.getAllTeeColors()
        .then(response => {
            response.data.forEach(element => {
                let obj = {};
                obj["value"] = element.id;
                obj["label"] = element.name;
                console.log(obj);
                //options.push(obj);
                colorOptions.push(obj);
                //options.push({value: element.color, label: element.})
            });
            console.log(response.data);
            //setCourse(response.data);
    
            //console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let val = true;
        //console.log(props.teeIds);
        if (props.teeIds.length > 0) {
            props.teeIds.forEach(ele => {
                console.log(ele);
                let colorId = 0;
                TeeService.getTeeById(ele)
                .then(response => {
                    //setTee(response.data);
                    colorId = response.data.tee_color.id;
                    //console.log(response.data);
                    console.log("Tee Color " + tee.tee_color);
                    console.log("color  id " + colorId);
                    if (colorId == tee.tee_color) {
                        setIsValid(false);
                        alert("There is already a tee with this color");
                    }
                    console.log("yards " + tee.yards);
                    if (isNaN(tee.yards) || tee.yards <= 0 || tee.yards >= 1000) {
                        alert("Yards must be greater than 0 and less than 1000.");
                        setIsValid(false);
                    }
    
                })
                .catch(e => {
                    console.log(e);
                });
    
            });
        }
        else {
            if (isNaN(tee.yards) || tee.yards <= 0 || tee.yards >= 1000) {
                alert("Yards must be greater than 0 and less than 1000.");
                setIsValid(false);
                val = false; // State isnt updating before if valid is being checked
            }
        }

        //props.addTeeProps( tee.color, 500);
        if (isValid && val) {
            alert("Valid");
        }
    }
    
    useEffect(() => {
        retrieveTeeColors()
    }, [])

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <select 
                onChange={onChange}
                name="tee_color"
                value={tee.tee_color}
            >
                <option value="1">White</option>
                <option value="2">Red</option>
            </select>
            <input
                type="text"
                className="input-number"
                placeholder=""
                value={tee.yards}
                name="yards"
                onChange={onChange}
            />
        <button className="input-submit">
            Submit
        </button>
        </form>
    );
};

export default TeeForm;