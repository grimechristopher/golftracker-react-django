import React from 'react';

import TeeService from '../../services/TeeService';

import Tee from './Tee';
import TeeForm from './TeeForm';

const TeesList = (props) => {

    const addTee = (color, yards) => {
        var data = {
            tee_color: color,
            yards: yards,
            hole: props.holeId
        };
      
        TeeService.createTee(data)
            .then(response => {
                console.log(response.data);
                //retrieveCourse(props.match.params.id);
                //props.handleChangeProps();
            })
            .catch(e => {
                console.log(e);
                console.log(e.response.data.non_field_errors[0]);
                alert(e.response.data.non_field_errors[0]);
        });
    }

    return (
        <div>
            {props.teeIds &&
                props.teeIds.map((id, index) => (
                    <Tee
                        teeId={id}
                    />
                ))}
            <TeeForm addTeeProps={addTee} teeIds={props.teeIds} />
            <hr />
        </div>
    );
};

export default TeesList;