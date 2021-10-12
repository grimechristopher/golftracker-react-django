import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";

/*
A Round has a course attached. 
A Round has one score for each hole on the course. A Round has a selected tee color to play from
In Round, from course get holes and tees relating to the color chosen for this round. 
*/

const Round = (props) => {

    const [round, setRound] = useState([]);
    const [teeColors, setTeeColors] = useState([]);

    const retrieveRound = (id) => {
        ApiService.get('rounds', id, localStorage.getItem('token'))
            .then(response => {
                setRound(response.data);
                //setLoading(false);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

    const onChange = e => {
        setRound({
          ...round,
          [e.target.name]: e.target.value,
        })
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

    useEffect(() => {
        retrieveRound(props.match.params.id);
        retrieveTeeColors(); // ok for now but needs to be changed to only show colors enabled on the course
    }, [])  


    return (
        <div>
                <select 
                    name="tee_colors"
                    value={round.tee_color}
                    onChange={onChange} 
                >
                  {teeColors &&
                      teeColors.map((option) => (
                          <option value={option.value} >
                              {option.label}
                          </option>
                  ))}
                </select>
        </div>
    );
};

export default Round;