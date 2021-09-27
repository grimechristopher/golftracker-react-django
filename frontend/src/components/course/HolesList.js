import React from 'react';

import styles from "./Course.module.css";

import ApiService from '../../services/ApiService';

import Hole from './Hole';
import HoleForm from './HoleForm';

const HolesList = (props) => {

    const addHole = (number, title, mens_par, womens_par ) => {
        var data = {
            number: number,
            name: title,
            course: props.course.id,
            mens_par: mens_par,
            womens_par: womens_par,
            tees: []
        };
      
        ApiService.create('holes', data)
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const deleteHole = () => {
        ApiService.remove('holes', props.holes[props.holes.length - 1].id)
        .then(response => {
            props.handleChangeProps();
        })
    }

    return (
        <div className={styles.holescontainer} >
            <div className={styles.holecontainer} >
                <div className={styles.holecell} >
                    <h3>Hole</h3>
                </div>
                {props.course.tee_colors &&
                props.course.tee_colors.map((c, i) => (
                    <div className={styles.holecell} >
                        <h4>&nbsp;</h4>
                    </div>
                ))
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
                handleChangeProps={props.handleChangeProps}
                enabledColors={props.enabledColors}
            />
            ))}
            {props.holes &&
            <>
            {props.holes.length > 0 &&
            <button onClick={() => deleteHole()}>Delete Last Hole</button>
            }
            <HoleForm addHoleProps={addHole} course={props.course} handleChangeProps={props.handleChangeProps} holesLength={props.holesLength}/>
            </>
            }
        </div>
    );
};

export default HolesList;