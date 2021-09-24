import React, { useState, useEffect } from "react";

import HoleService from "../../services/HoleService";

import HoleForm from "./HoleForm";
import TeesList from "./TeesList";
import AddTee from "./AddTee";

const Hole = (props) => {
    
    const [hole, setHole] = useState([]);

    const retrieveHole = (id) => {
        HoleService.getHoleById(id)
            .then(response => {
                setHole(response.data);

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateHole = (title, m_par, w_par) => {
        console.log(props.holeId);
        var data = {
            id: hole.id,
            number: hole.number,
            name: title,
            course: hole.course,
            mens_par: m_par,
            womens_par: w_par,
        };
      console.log(data);
        HoleService.updateHole(hole.id, data)
            .then(response => {
                console.log(response.data);
                props.handleChangeProps(hole.course)
                //retrieveCourse(course.id);
                retrieveHole(hole.id);
            })
            .catch(e => {
                console.log(e);
        });
    }

    useEffect(() => {
        console.log("Hole Id"+props.holeId);
        retrieveHole(props.holeId);
    }, [])



    return (
        <div>
            <h4>{hole.number}</h4>
            {hole.name && 
                <h4>{props.hole.name}</h4>
            }
            <h4>Mens Par: {hole.mens_par}</h4>
            <h4>Womens Par: {hole.womens_par}</h4>
            <HoleForm addHoleProps={updateHole} hole={hole} />

            <AddTee />
            <hr />
        </div>
    );
};

export default Hole;