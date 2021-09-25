import React, { useState, useEffect } from "react";

import TeeService from "../../services/TeeService";
import TeeColorService from "../../services/TeeColorService";
import TeeForm from "./TeeForm";

const Tee = (props) => {

    const [tee, setTee] = useState([]);
    const [teeColor, setTeeColor] = useState([]);

    const retrieveTee = (id) => {
        TeeService.getTeeById(id)
            .then(response => {
                setTee(response.data);


                TeeColorService.getTeeColorById(response.data.tee_color)
                .then(response => {
                    setTeeColor(response.data);
                    //retrieveTee(tee.id);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
                
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        //console.log(course.holes);
    };

    const updateTee = (color, yards) => {
        //console.log(hole.id);
        var data = {
            id: tee.id,
            tee_color: color,
            yards: yards,
            hole: tee.hole
        };
      console.log(data);
        TeeService.updateTee(tee.id, data)
            .then(response => {
                console.log(response.data);
                //props.handleChangeProps();
                retrieveTee(tee.id);
                //retrieveHole(hole.id);
                //props.handleChangeProps();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const deleteTee = (id) => {
        console.log(id);
        TeeService.deleteTee(id)
        .then(response => {
            //retrieveTee(tee.id);
            props.handleChangeProps();
        })
    }

    useEffect(() => {
        retrieveTee(props.teeId);
    }, [])

    return (
        <div>
            {tee.tee_color &&
            <h5>{teeColor.name}</h5> 
            }
            <h5>{tee.yards} Yards</h5>
            <TeeForm addTeeProps={updateTee} teeColor={tee.tee_color} />
            <button onClick={() => deleteTee(tee.id)}>Delete Tee</button>
    </div>
    );
};

export default Tee;