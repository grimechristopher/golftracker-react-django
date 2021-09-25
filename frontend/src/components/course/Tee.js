import React, { useState, useEffect } from "react";

import TeeService from "../../services/TeeService";

const Tee = (props) => {

    const [tee, setTee] = useState([]);

    const retrieveTee = (id) => {
        TeeService.getTeeById(id)
            .then(response => {
                setTee(response.data);

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        //console.log(course.holes);
    };

    const deleteTee = () => {}

    useEffect(() => {
        retrieveTee(props.teeId);
    }, [])

    return (
        <div>
            {tee.tee_color &&
            <h5>{tee.tee_color.name}</h5> 
            }
            <h5>{tee.yards} Yards</h5>
            <button onClick={() => deleteTee(tee.id)}>Delete Tee</button>
    </div>
    );
};

export default Tee;