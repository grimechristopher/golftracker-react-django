import React, { useState, useEffect } from "react";

import styles from "./Course.module.css";

import ApiService from "../../services/ApiService";

import HoleForm from "./HoleForm";
import TeesList from "./TeesList";

const Hole = (props) => {

    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);



    const updateHole = (title, m_par, w_par) => {

        let arr = [];
        if (props.hole.tees) {
            props.hole.tees.map(tee => (
                arr.push(tee.id)
            ))
        }

        var data = {
            id: props.hole.id,
            number: props.hole.number,
            name: title,
            course: props.course.id,
            mens_par: m_par,
            womens_par: w_par,
            tees: arr
        };
      console.log(data);
        ApiService.update('holes', props.hole.id, data, localStorage.getItem('token'))
            .then(response => {
                props.handleChangeProps()
            })
            .catch(e => {
                console.log(e.response.data);
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

    return (
        <div className={styles.holecontainer}>
            <div className={styles.holecell}>
                <h3>{props.hole.number}</h3>
            </div>
            {props.hole.name && 
                <h4>{props.hole.name}</h4>
            }
            {props.hole.tees &&
                <TeesList 
                    course={props.course}
                    hole={props.hole}
                    tees={props.hole.tees}
                    handleChangeProps={props.handleChangeProps} 
                />
            }
            
            { !editing && 
            <>
                <div className={styles.holecell}>
                    <h4 onClick={handleEditing}>{props.hole.mens_par}</h4>
                </div>
                <div className={styles.holecell}>
                    <h4 onClick={handleEditing}>{props.hole.womens_par}</h4>
                </div>
            </>
            }
            { editing &&
            <>
            <HoleForm 
                course={props.course} 
                hole={props.hole} 
                addHoleProps={updateHole} 
                handleChangeProps={props.handleChangeProps} 
                handleSubmit={handleEditing}
            />
            </>
            }



            

        </div>
    );
};

export default Hole;