import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";

/*
A Round has a course attached. 
A Round has one score for each hole on the course. A Round has a selected tee color to play from
In Round, from course get holes and tees relating to the color chosen for this round. 
*/

const Round = (props) => {

    const [round, setRound] = useState([]);

    const retrieveRound = (id) => {
        ApiService.get('rounds', id, localStorage.getItem('token'))
            .then(response => {
                setRound(response.data);
                //setLoading(false);

            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

    useEffect(() => {
        retrieveRound(props.match.params.id);
    }, [])  


    return (
        <div>
            
        </div>
    );
};

export default Round;