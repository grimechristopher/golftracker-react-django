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

        let isValidated = true;

        if (!isFinite(courseRating.rating) || courseRating.rating <= 0 || courseRating.rating > 5 ) {
            alert("Rating should be a number 1 to 5");
            isValidated = false;
        }

        //props.handleChangeProps();
        props.handleSubmit(courseRating.rating);
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div >
                <input
                    type="text"
                    //className={styles.holeinput}
                    placeholder="rating"
                    value={courseRating.rating}
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