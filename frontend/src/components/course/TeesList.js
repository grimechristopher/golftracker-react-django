import React, { useState, useEffect } from "react";

import ApiService from "../../services/ApiService";

import styles from "./Course.module.css";

import Tee from './Tee';
import TeeForm from "./TeeForm";

const TeesList = (props) => {

    // Go through each enabled tee color. find the matching tee and display 
    // If no tee matches then display blank space

    const [adding, setAdding] = useState(false);
    const [enabledColors, setEnabledColors] = useState([]);

    const addTee = (color, yards) => {
        var data = {
            tee_color: color,
            yards: yards,
            hole: props.hole.id
        };
      
        ApiService.create('tees', data, localStorage.getItem('token'))
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
                //alert(e.response.data); Can get errors from server and display to user 
        });
    }

    const handleAdding = () => {
        if (localStorage.getItem('token') != null) {
            setAdding(!adding)
        }
    }

    useEffect( () => {
        //console.log('TeesList: course updated');
        //console.log(props.course);
        //console.log("Enabled colors " + props.enabledColors);
        setEnabledColors(props.course.tee_colors); // HOW DID THIS FIX IT??? When adding/removing an enabled color on the course. The card would not update the tees. 
    }, [props.course])

    useEffect(() => {
        if (props.round) {
            console.log("round prop found");
            setEnabledColors([props.round.tee_color,]);
        }
    }, [props.round])  

    useEffect(() => {
        if (props.round) {
            console.log("round prop found");
            setEnabledColors([props.round.tee_color,]);
        }
        else {
            setEnabledColors(props.course.tee_colors);
        }
    }, [])  


    return (
        <div>
            {enabledColors &&
            enabledColors.map((tee_color, index) => (
                props.tees.filter(tee => tee.tee_color.id === tee_color.id).length > 0 ?
                    props.tees.filter(tee => tee.tee_color.id === tee_color.id).map(tee => (
                        <Tee
                            key={tee.id}
                            course={props.course}
                            tee={tee}
                            handleChangeProps={props.handleChangeProps} 
                        />
                    ))
                    :
                    <div className={styles.holecell}>
                        {adding &&
                        <div >
                            <TeeForm 
                                tees={props.tees} 
                                addTeeProps={addTee}
                                handleSubmit={handleAdding}
                                color={tee_color.id}
                            />
                        </div>
                        }
                        { !adding && 
                            <div onClick={handleAdding}>
                                {
                                    localStorage.getItem('token') != null &&
                                    <h3>+</h3>
                                }
                            </div>
                        }
                                </div>
                                
                        ))}
                    </div>
    );
};

export default TeesList;