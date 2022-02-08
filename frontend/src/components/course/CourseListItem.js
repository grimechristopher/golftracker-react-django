import React from 'react';

import styles from "./Course.module.css";

const CourseListItem = (props) => {
    return (
        <div className={styles.courseListContainer}  >
            <div className={styles.courseListImageContainer} >
                { props.course.course_image.length > 0 ?
                <img src={props.course.course_image[0].image} />
                :
                <p> </p>
                }
            </div>
            <div>
                <h2>{props.course.name}</h2>
                <h3>{props.course.city}, {props.course.state}</h3>
            </div>
        </div>
    );
};

export default CourseListItem;