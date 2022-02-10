import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import RoundListItem from './RoundListItem';

import { Link } from 'react-router-dom';
import RoundForm from './RoundForm';

const RoundsList = () => {

    const [rounds, setRounds] = useState([]);
    const [addingRound, setAddingRound] = useState(false);

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

    const addRound = (title, course, tee_color) => {
        let now = new Date();

        let data = {
            name: title,
            course: course,
            created_on: now.toISOString(),
        };
      
        console.log(data);

        ApiService.create('rounds', data, localStorage.getItem('token'))
            .then(response => {
                retrieveRounds();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const handleSubmit = () => {
        retrieveRounds();
        setAddingRound(!addingRound);
    }

    const handleAddingRound = () => {
        if (localStorage.getItem('token') != null) {
            setAddingRound(!addingRound)
        }
    }

    useEffect(() => {
        retrieveRounds();
    }, []) 

    return (
        <>
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
        <div>
        { !addingRound && localStorage.getItem('token') != null &&
                <button onClick={handleAddingRound}>Start A New Round</button>
        }
        { addingRound && localStorage.getItem('token') != null &&
            <RoundForm 
                onSubmit={handleSubmit} 
                addRoundProps={addRound} 
            />        
        }    

        </div>
        </>
    );
};

export default RoundsList;