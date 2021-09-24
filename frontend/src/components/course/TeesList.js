import React from 'react';

import Tee from './Tee';
import AddTee from './AddTee';

const TeesList = (props) => {

    return (
        <div>
            {props.teeIds &&
                props.teeIds.map((id, index) => (
                    <Tee
                        teeId={id}
                    />
                ))}
            <AddTee />
            <hr />
        </div>
    );
};

export default TeesList;