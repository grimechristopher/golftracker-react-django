import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";

import ScoreCard from "./ScoreCard";
import HolesList from "../course/HolesList";

/*
A Round has a course attached. 
A Round has one score for each hole on the course. A Round has a selected tee color to play from
In Round, from course get holes and tees relating to the color chosen for this round. 
*/

const Round = (props) => {

    const [round, setRound] = useState([]);
    const [teeColors, setTeeColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(1); 
    const [loading, setLoading] = useState(true);

    const retrieveRound = (id) => {
        setLoading(true);
        ApiService.get('rounds', id, localStorage.getItem('token'))
            .then(response => {
                setRound(response.data);
                //setLoading(false);
                console.log(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

    const onChange = e => {
        console.log(e.target.value);
        setRound({
          ...round,
          [e.target.name]: e.target.value,
        })
        setSelectedColor(e.target.value)
    }

    const selectColor = () => {

    }

    const retrieveTeeColors = () => {
        let container = [];
        ApiService.getAll('teecolors')
        .then(response => {
            response.data.forEach(element => {
                let obj = {};
                obj["value"] = element.id;
                obj["label"] = element.name;
                container.push(obj);
            });
            setTeeColors(container);
        })
        .catch(e => {
            console.log(e.message);
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        let data = {
            name: round.name,
            course: round.course.id,
            tee_color: selectedColor,
            created_on: round.created_on // Frustrating... this should not be required. Should be handled by backend
        };

        console.log(data);
        ApiService.update('rounds', round.id, data, localStorage.getItem('token'))
        .then(response => {
            retrieveRound(round.id);
        })
        .catch(e => {
            console.log(e.response.data);
        });
    }

    const handleChange = () => {
        retrieveRound(round.id);
    }

    useEffect(() => {
        retrieveRound(props.match.params.id);
        retrieveTeeColors(); // ok for now but needs to be changed to only show colors enabled on the course
    }, [])  


    return (
        <div>
            {loading === false && (
                <>
                    <div>
                    {round.tee_color &&
                    <h3>{round.tee_color.name}</h3>
                    }
                </div>

                <form onSubmit={handleSubmit} className="form-container">
                    <select 
                        name="tee_colors"
                        value={selectedColor}
                        onChange={onChange} 
                    >
                    {teeColors &&
                        teeColors.map((option) => (
                            <option value={option.value} >
                                {option.label}
                            </option>
                    ))}
                    </select>
                    <div>
                    <button className="input-submit">
                        Change Color
                    </button>
                    </div>
                </form>

                <div>
                    <HolesList 
                        round={round}
                        course={round.course}
                        holes={round.course.holes} 
                        tee_colors={round.tee_color}
                        handleChangeProps={handleChange} 
                    />
                </div>
            </>
            )}
            

        </div>
    );
};

export default Round;