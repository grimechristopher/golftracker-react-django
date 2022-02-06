import React, { useState, useEffect } from "react";

import styles from "./Course.module.css";

import ApiService from "../../services/ApiService";
import TeeForm from "./TeeForm";

const Tee = (props) => {

    const [editing, setEditing] = useState(false);

    const updateTee = (color, yards) => {
        var data = {
            id: props.tee.id,
            tee_color: props.tee.tee_color.id,
            yards: yards,
            hole: props.tee.hole 
        };
      
        ApiService.update('tees', props.tee.id, data, localStorage.getItem('token'))
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const handleEditing = () => {
        if (localStorage.getItem('token') != null) {
            setEditing(!editing)
        }
    }

    let viewMode = {}
    let editMode = {}
    
    if (editing) {
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }

    useEffect( () => {
        console.log('Tee: course updated');
        console.log(props.course);
        //console.log("Enabled colors " + props.enabledColors);
    }, [props.course])

    return (
        <>
        <div style={viewMode} onClick={handleEditing} > 
            <div className={styles.holecell} >
                <h5>{props.tee.yards}</h5>
            </div>
        </div>
        <div style={editMode} >
            <div className={styles.holecell} >
                <TeeForm 
                    tee={props.tee} 
                    addTeeProps={updateTee}
                    handleSubmit={handleEditing}
                />
            </div>
        </div>
        </>
    );
};

export default Tee;