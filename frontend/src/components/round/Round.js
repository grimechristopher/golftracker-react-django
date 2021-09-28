import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";


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