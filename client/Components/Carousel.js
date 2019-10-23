import React from 'react';
import axios from 'axios';
import Item from './Item';
import Utils from '../Utils/Utils';
const itemsNumber = Utils.screenCheck();

class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      currentPage: itemsNumber,
      currentProduct: 1
    }
    this.getProducts = this.getProducts.bind(this);
    this.pageRight = this.pageRight.bind(this);
    this.pageLeft = this.pageLeft.bind(this);
    this.productSelect = this.productSelect.bind(this);
    this.screenChange = this.screenChange.bind(this);
  }

  componentDidMount() {
    this.getProducts()

    window.addEventListener('updateProduct', (event) => {
      this.setState({
        currentProduct: event.detail,
      })
    }, false)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentProduct !== prevState.currentProduct) {
      this.getProducts();
    }
  }

  screenChange() {
    console.log('changed')
    this.setState({
      currentPage: screenCheck
    })
  }

  getProducts () {
    let data = {
      params: {
        id: this.state.currentProduct
      }
    }
    axios.get('/carousel', data)
      .then((res) => {
        this.setState({
          data: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  pageRight() {
    if(this.state.currentPage + itemsNumber < this.state.data.length + itemsNumber) {
      this.setState({
        currentPage: this.state.currentPage + itemsNumber
      })
    }
  }

  pageLeft() {
    if (this.state.currentPage > itemsNumber) {
      this.setState({
        currentPage: this.state.currentPage-itemsNumber
      })
    }
  }

  productSelect(event) {
    let id = Number(event.target.title)
    Utils.updateProduct(id);
  }

  render() {
    return (
      <>
        <hr></hr>
        <div>
          <h2 className="carouselTitle">Products related to this item</h2>
        </div>
        <div className="parentContainer">
          <hr className="lines" />
          <div className="btnLeft">
            <button onClick={this.pageLeft} className="nav-btn left"> <i className="fa fa-angle-left" aria-hidden="true"></i> </button>
          </div>
          <div className="itemContainer">
            {this.state.data.map((product, i) => {
              if (i < this.state.currentPage && i >= this.state.currentPage - itemsNumber) {
                return (
                  <Item key={product.id} id={product.id} select={this.productSelect} item={product} />
                )
              }
            })}
          </div>
          <div className="btnRight">
            <button onClick={this.pageRight} className="nav-btn right"> <i className="fa fa-angle-right" aria-hidden="true"></i> </button>
          </div>
        </div>
      </>
    )
  }
}

export default Carousel;