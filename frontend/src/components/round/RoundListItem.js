import React from 'react';

const RoundListItem = (props) => {
    return (
        <div>
            <div>
                { props.round.name ? ( 
                    <h2>{props.round.name}</h2>
                ):(
                    <h2>{props.round.course.name}</h2>
                )}
                <h3>{props.round.created_on}</h3>
            </div>
        </div>
    );
};

export default RoundListItem;