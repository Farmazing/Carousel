import React from 'react';

const Image = (props) => {
  return (
    <div className="j-galleryImgContainer">
      <img onMouseOver={props.select} className="j-galleryImg" src={props.image}></img>
    </div>
  )
}

export default Image;