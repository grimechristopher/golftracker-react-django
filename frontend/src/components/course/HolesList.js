import React, { useState, useEffect } from "react";

import styles from "./Course.module.css";

import ApiService from '../../services/ApiService';

import Hole from './Hole';
import HoleForm from './HoleForm';

const HolesList = (props) => {

    const [addingHole, setAddingHole] = useState(false);

    const addHole = (number, title, mens_par, womens_par ) => {
        var data = {
            number: number,
            name: title,
            course: props.course.id,
            mens_par: mens_par,
            womens_par: womens_par,
            tees: []
        };
      
        ApiService.create('holes', data, localStorage.getItem('token'))
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const deleteHole = () => {
        ApiService.remove('holes', props.holes[props.holes.length - 1].id, localStorage.getItem('token'))
        .then(response => {
            props.handleChangeProps();
        })
    }

    const handleAddingHole = () => {
        if (localStorage.getItem('token') != null) {
            setAddingHole(!addingHole)
        }
    }

    return (
        <div className={styles.holescontainer} >
            <div className={styles.holecontainer} >
                <div className={styles.holecell} >
                    <h3>Hole</h3>
                </div>

                {!props.round ? 
                props.tee_colors &&
                    props.tee_colors.map((c, i) => (
                        <div className={styles.holecell} >
                            <h4>{c.name}</h4>
                        </div>
                    )) 
                : 
                <div className={styles.holecell} >
                    <h4>{props.round.tee_color.name}</h4>
                </div>             
                }

                {props.round &&
                <div className={styles.holecell}>
                    <h4>Strokes</h4>
                </div>
                }

                <div className={styles.holecell}>
                    <h4>Mens</h4>
                </div>
                <div className={styles.holecell}>
                    <h4>Ladies</h4>
                </div>
            </div>
            {props.holes &&
            props.holes.map((hole, index) => (
            <Hole 
                key={hole.id}
                hole={hole}
                course={props.course}
                round={props.round}
                handleChangeProps={props.handleChangeProps}
                enabledColors={props.enabledColors}
            />
            ))}
            {props.holes &&
            <>
            {props.holes.length > 0 && localStorage.getItem('token') != null &&
                <button onClick={() => deleteHole()}>Delete Last Hole</button>
            }
            { !addingHole && localStorage.getItem('token') != null &&
                <button onClick={handleAddingHole}>+ Hole</button>
            }
            { addingHole && localStorage.getItem('token') != null &&
                <HoleForm addHoleProps={addHole} course={props.course} handleChangeProps={props.handleChangeProps} holesLength={props.holesLength} handleSubmit={handleAddingHole}/>
            }            
            </>
            }
        </div>
    );
};

export default HolesList;