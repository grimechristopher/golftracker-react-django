import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import RoundListItem from './RoundListItem';

import { Link } from 'react-router-dom';

const RoundsList = () => {

    const [rounds, setRounds] = useState([]);

    const retrieveRounds = () => {
        ApiService.getAll('rounds', localStorage.getItem('token'))
        .then(response => {
                setRounds(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

    useEffect(() => {
        retrieveRounds();
    }, []) 

    return (
        <div>
            {rounds &&
                rounds.map((round) => ( 
                    <Link to={`/rounds/${round.id}/`}>
                        <RoundListItem 
                            key={round.id}
                            round={round}
                        />
                    </Link>
            ))}
        </div>
    );
};

export default RoundsList;