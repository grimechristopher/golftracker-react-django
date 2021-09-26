import React from 'react';

import styles from "./HolesList.module.css";

import HoleService from '../../services/HoleService';

import Hole from './Hole';
import HoleForm from './HoleForm';

const HolesList = (props) => {

    const addHole = (number, title, mens_par, womens_par) => {
        var data = {
            number: number,
            name: title,
            course: props.courseId,
            mens_par: mens_par,
            womens_par: womens_par,
            tees: []
        };
      
        HoleService.createHole(data)
            .then(response => {
                console.log(response.data);
                //retrieveCourse(props.match.params.id);
                props.handleChangeProps(props.courseId);
            })
            .catch(e => {
                console.log(e);
                console.log(e.response.data);
                alert(e.response.data.non_field_errors[0]);
        });
    }

    const deleteHole = (id) => {
        console.log(props.holes[props.holesLength - 1].id);
        HoleService.deleteHole(props.holes[props.holesLength - 1].id)
        .then(response => {
            //retrieveCourse(course.id);
            props.handleChangeProps(props.holes[0].course);
        })
    }


    return (
        <div className={styles.holescontainer} >
            <div>
                <h3>Hole</h3>
                {props.enabledColors &&
                props.enabledColors.map((c, i) => (
                    <h4>Yards</h4>
                ))
                }
                <h5>Mens</h5>
                <h5>Womens</h5>

            </div>
            {props.holes &&
            props.holes.map((hole, index) => (
            <Hole key={hole.id}
                hole={hole}
                handleChangeProps={props.handleChangeProps}
                enabledColors={props.enabledColors}
            />
            ))}
            {props.holesLength > 0 &&
            <button onClick={() => deleteHole(props.holesLength - 1)}>Delete Last Hole</button>
            }
            <HoleForm addHoleProps={addHole} holesLength={props.holesLength}/>
        </div>
    );
};

export default HolesList;