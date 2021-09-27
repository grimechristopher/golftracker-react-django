import React, { useState, useEffect } from "react";

import styles from "./Course.module.css";

import TeeColorService from '../../services/TeeColorService';

const TeeForm = (props) => {

    const [tee, setTee] = useState({
        tee_color: 1,
        yards: ""
    })

    const[colorOptions, setColorOptions] = useState([]);
    const[isValid, setIsValid] = useState(true);

    const onChange = e => {
        setTee({
          ...tee,
          [e.target.name]: e.target.value,
        })
    }
    
    const retrieveTeeColors = () => {
        let container = [];
        TeeColorService.getAllTeeColors()
        .then(response => {
            response.data.forEach(element => {
                let obj = {};
                obj["value"] = element.id;
                obj["label"] = element.name;
                container.push(obj);
            });
            setColorOptions(container);
        })
        .catch(e => {
            console.log(e.response.data);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (props.tees) {
            if (props.tees.length > 0) {
                props.tees.forEach(tee_prop => {
                    if (tee_prop.tee_color.id == tee.tee_color) { 
                        setIsValid(false);
                        alert("There is already a tee with this color");
                    }
                    if (isNaN(tee.yards) || tee.yards <= 0 || tee.yards >= 1000) {
                        alert("Yards must be greater than 0 and less than 1000.");
                        setIsValid(false);
                    }
        
                });
            }
            else {
                if (isNaN(tee.yards) || tee.yards <= 0 || tee.yards >= 1000) {
                    alert("Yards must be greater than 0 and less than 1000.");
                    setIsValid(false);
                }
            }



        }
        else {
            if (isNaN(tee.yards) || tee.yards <= 0 || tee.yards >= 1000) {
                alert("Yards must be greater than 0 and less than 1000.");
                setIsValid(false);
            }
            
            //props.handleSubmit();

        }

        if (isValid) {
            props.addTeeProps(tee.tee_color, tee.yards);
            setTee({
                ...tee,
                yards: ""
            })
        }

        props.handleSubmit();

    }
    
    useEffect(() => {
        
    }, [])

    useEffect(() => {
        if (props.color) {
            setTee({
                ...tee,
                tee_color: props.color,
            })
        }  
        if (props.tee) {
            setTee({
                ...tee,
                yards: props.yards,
            })
        }  
        retrieveTeeColors();
  
      }, [props.tee])

    return (
        <form onSubmit={handleSubmit} className="form-container">

        {/* Spent so much time getting this to work and now I dont even need it....
            I'm keeping it here. 

            {props.tees &&
            <select 
            onChange={onChange}
            name="tee_color"
            value={tee.tee_color}
            >
                {colorOptions &&
                colorOptions.map((opt, index) => (
                    <option value={opt['value']}>{opt['label']}</option>
                ))}
            </select>
            }

        */}
            <input
                type="text"
                //className="input-number"
                className={styles.holeinput}
                placeholder="yards"
                value={tee.yards}
                name="yards"
                onChange={onChange}
            />
            <button type="submit">Submit Tee</button>
        </form>
    );
};

export default TeeForm;