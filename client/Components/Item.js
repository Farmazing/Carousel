import React from 'react';

const Item = (props) => {
  let ratings = [];

  for (let i = 0; i < 5; i++) {
    if (i < props.item.rating) {
      if (props.item.rating - i === 0.5) {
        ratings.push(<i className="fa fa-star-half-o" aria-hidden="true"></i>);
      } else {
        ratings.push(<span className="fa fa-star checked"></span>);
      }
    } else {
      ratings.push(<span className="fa fa-star-o checked"></span>);
    }
  }

    return (
      <div className="j-item">
        <div onClick={props.select} className="j-imgContainer">
          <img title={props.id} className="j-imgs" src={props.item.image[0]}></img>
        </div>
        <div onClick={props.select} className="j-nameContainer">
          <p title={props.id} className="j-names">{props.item.name}</p>
        </div>
        <p className="j-rating">{ratings}</p>
        <div className="j-priceContainer">
          <p className="j-price">${props.item.price}</p>
            { props.item.prime &&
            <img className="j-primeLogo"
              src="https://amishon.s3.us-east-2.amazonaws.com/PicturesForFEC/Amazon-Prime-Logo.png">
            </img>
            }
        </div>
      </div>
    )
}

export default Item;