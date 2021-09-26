import React, { useState, useEffect } from "react";

import TeeService from "../../services/TeeService";
import TeeColorService from "../../services/TeeColorService";
import TeeForm from "./TeeForm";

const Tee = (props) => {

    const [editing, setEditing] = useState(false);
    const [tee, setTee] = useState([]);
    const [teeColor, setTeeColor] = useState([]);
    const [containsColor, setContainsColor] = useState(true);

    const retrieveTee = (id) => {
        TeeService.getTeeById(id)
            .then(response => {
                setTee(response.data);


                TeeColorService.getTeeColorById(response.data.tee_color)
                .then(response => {
                    setTeeColor(response.data);
                    //retrieveTee(tee.id);
                    console.log(response.data);

                    if (props.checkColor) {
                        console.log("Enabled Colors ");
                        console.log(props.checkColor);
                        if (props.checkColor == response.data.id) {
                            console.log("Found Color");
                            //setContainsColor(true);
                        }
                        
                    }
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

    const handleEditing = () => {
        setEditing(!editing)
    }


    let viewMode = {}
    let editMode = {}
    
    if (editing) {
        viewMode.display = "none"
    } else {
    editMode.display = "none"
    }

    useEffect(() => {
        retrieveTee(props.teeId);
    }, [])

    return (
        <>
        { containsColor &&
        <>
            <div onClick={handleEditing} style={viewMode}>
                {tee.tee_color &&
                <></>
                }
                <h5>{tee.yards}</h5>
            </div>
            <div style={editMode}>
                <TeeForm addTeeProps={updateTee} onSubmit={handleEditing} teeColor={tee.tee_color} />
            </div>
        </>
        }
        { !containsColor && 
        <div><h5>X</h5></div>
        }

        </>
    );
};

export default Tee;