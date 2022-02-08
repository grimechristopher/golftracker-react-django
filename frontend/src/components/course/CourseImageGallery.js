import React from 'react';

const CourseImageGallery = (props) => {
    return (
        <div>
            { props.images.map((image, index) => (
                    <img src={image.image} />
            ))
            }
        </div>
    );
};

export default CourseImageGallery;