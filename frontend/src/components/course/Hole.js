import React, { useState, useEffect } from "react";

import HoleService from "../../services/HoleService";

import HoleForm from "./HoleForm";
import TeesList from "./TeesList";
import TeeForm from "./TeeForm";

const Hole = (props) => {

    const [editing, setEditing] = useState(false);
    const [hole, setHole] = useState([]);
    const [teesAmt, setTeesAmt] = useState([]);

    const handleChange = () => {
        retrieveHole(hole.id);
    }

    const retrieveHole = (id) => {
        HoleService.getHoleById(id)
            .then(response => {
                setHole(response.data);
                //console.log("Tees " + hole.tees);
                console.log(hole);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateHole = (title, m_par, w_par) => {
        console.log(hole.id);
        var data = {
            id: hole.id,
            number: hole.number,
            name: title,
            course: hole.course,
            mens_par: m_par,
            womens_par: w_par,
            tees: hole.tees
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
        retrieveHole(props.hole.id);
    }, [])

    return (
        <div class="hole-container">
            <h3>{hole.number}</h3>
            {hole.name && 
                <h4>{props.hole.name}</h4>
            }
            {hole.tees &&
                <TeesList 
                    teeIds={hole.tees} 
                    handleChangeProps={handleChange} 
                    teesLength={teesAmt}
                    holeId={hole.id}
                    enabledColors={props.enabledColors}
                />
            }
            { !editing && 
            <>
                <h4 onClick={handleEditing}>{hole.mens_par}</h4>
                <h4 onClick={handleEditing}>{hole.womens_par}</h4>
            </>
            }
            { editing &&
            <>

                <HoleForm addHoleProps={updateHole} onSubmit={handleEditing} hole={hole} />
            </>
            }

            <TeeForm addTeeProps={handleChange} teeIds={hole.tees} />

        </div>
    );
};

export default Hole;