import React, { useState, useEffect } from "react";

const CourseImageForm = (props) => {
    
    const [courseImage, setCourseImage] = useState({
        image: null,
        //course: props.course.id,
    })

    const onChange = e => {
        console.log(e.target.files[0]);
        setCourseImage({
          ...courseImage,
          //[e.target.name]: e.target.value,
          image: e.target.files[0]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        //e.target.value = null;

        //Check for empty Form Fields
        if (courseImage.image) {
            props.addCoursePictureProps(courseImage.image);

            e.target['rating'].value = null;
        }
        else {
            alert("No image was selected");
        }

        setCourseImage({
            ...courseImage,
                image: null,
        })

        //props.onSubmit()
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div >
                <input
                    type="file"
                    //accept="image/png image/jpg image/jpeg"
                    //className={styles.holeinput}
                    placeholder="image"
                    //defaultValue={courseImage.image}
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

export default CourseImageForm;