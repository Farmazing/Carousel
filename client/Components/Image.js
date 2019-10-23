import React from 'react';

const Image = (props) => {
  return (
    <div className="galleryImgContainer">
      <img onMouseOver={props.select} className="galleryImg" src={props.image}></img>
    </div>
  )
}

export default Image;