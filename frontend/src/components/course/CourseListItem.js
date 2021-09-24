import React from 'react';

const CourseListItem = (props) => {
    return (
        <div>
            <h2>{props.course.name}</h2>
            <h3>{props.course.city}, {props.course.state}</h3>
        </div>
    );
};

export default CourseListItem;