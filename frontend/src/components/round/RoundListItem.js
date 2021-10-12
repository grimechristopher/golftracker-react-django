import React, { useEffect, useState } from 'react';

const RoundListItem = (props) => {

    const [createdOnLocal, setCreatedOnLocal] = useState([]);

    useEffect(() => {
        let utcDate = props.round.created_on;
        let localDate = new Date(utcDate).toString();

        console.log(localDate);
        setCreatedOnLocal(localDate);
    }, [props.round])

    return (
        <div>
            <div>
                { props.round.name ? ( 
                    <h2>{props.round.name}</h2>
                ):(
                    <h2>{}{props.round.course_details.name}</h2>
                )}
                <h3>{createdOnLocal}</h3>
            </div>
        </div>
    );
};

export default RoundListItem;