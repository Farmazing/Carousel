import React from 'react';
import ReactDOM from 'react-dom';
import ImageViewer from './Components/ImageViewer';
import Carousel from './components/Carousel';


ReactDOM.render(<ImageViewer />, document.getElementById('ImageGallery'));
ReactDOM.render(<Carousel />, document.getElementById('Carousel'));