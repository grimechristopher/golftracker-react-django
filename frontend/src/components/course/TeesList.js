import React from 'react';

const TeesList = (props) => {

    const deleteTee = (id) => {
        console.log(id);
        //TeeService.deleteTee(id)
        //.then(response => {
        //    retrieveCourse(course.id);
        //})
    }

    return (
        <div>
            {props.tees &&
                props.tees.map((tee, index) => (
                <div>
                    <h5>{tee.color}</h5>
                    <h5>{tee.yards} Yards</h5>
                    <button onClick={() => deleteTee(tee.id)}>Delete Tee</button>
                </div>
                ))}
        </div>
    );
};

export default TeesList;