import React, { useState, useEffect } from "react";

import ApiService from "../../services/ApiService";

import styles from "./Course.module.css";

import Tee from './Tee';
import TeeForm from "./TeeForm";

const TeesList = (props) => {

    // Go through each enabled tee color. find the matching tee and display 
    // If no tee matches then display blank space

    const [adding, setAdding] = useState(false);

    const addTee = (color, yards) => {
        var data = {
            tee_color: color,
            yards: yards,
            hole: props.hole.id
        };
      
        ApiService.create('tees', data)
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const handleAdding = () => {
        setAdding(!adding)
    }

    useEffect(() => {
    }, [props.course])  


    return (
        <div>
            {props.course.tee_colors &&
            props.course.tee_colors.map((tee_color, index) => (
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
                                <h3>Add Tee</h3>
                            </div>
                        }
                                </div>
                                
                        ))}
                    </div>
    );
};

export default TeesList;