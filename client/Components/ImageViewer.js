import React from 'react';
import axios from 'axios';
import Image from './Image';

class ImageViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentProduct: 1,
      images: [],
      currentImage: ''
    }
    this.getImages = this.getImages.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
  }

  componentDidMount () {
    this.getImages();

    window.addEventListener('updateProduct', (event) => {
      this.setState({
        currentProduct: event.detail,
        currentImage: ''
      })
    }, false)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentProduct !== prevState.currentProduct) {
      this.getImages()
    }
  }

  mouseOver (event) {
    this.setState({
      currentImage: event.target.src
    })
    console.log(this.state.currentProduct)
  }

  getImages () {
    let data = {
      params: {
        id: this.state.currentProduct
      }
    }

    axios.get('http://ec2-18-191-245-73.us-east-2.compute.amazonaws.com/images', data)
      .then((res) => {
        this.setState({
          images: res.data[0].image
        })
      })
      .catch((err) => {
        console.log(err);
      })

  }

  render() {
    return (
      // <div className="j-imgGallery">
      <>
        <div className="j-imgsContainer">
          {this.state.images.map((image, i) => {
            return <Image key={i} select={this.mouseOver} image={image} />
          })}
        </div>
        <div className="j-currentImgContainer">
          <img className="j-currentImg" src={this.state.currentImage ? this.state.currentImage : this.state.images[0]}></img>
        </div>
      </>
      // </div>
    )
  }
}

export default ImageViewer;