import React, { useState, useEffect} from "react";

const CourseRatingForm = (props) => {

    const [courseRating, setCourseRating] = useState({
        rating: "",
    })

    const onChange = e => {
        setCourseRating({
          ...courseRating,
          [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
    

        //props.handleChangeProps();
        //props.handleSubmit();
    
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div >
                <input
                    type="text"
                    //className={styles.holeinput}
                    placeholder="rating"
                    value={props.rating}
                    name="rating"
                    onChange={onChange}
                    //autoFocus
                />
            </div>

        <button className="input-submit">
            Submit
        </button>
        </form>
    );
};

export default CourseRatingForm;