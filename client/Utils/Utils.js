const screenCheck = () => {
  const page = window.screen.width;
  const container = page * 0.77;
  const itemsNumber = container / 160;
  return Math.ceil(itemsNumber);
}


const updateProduct = (product) => {
  const event = new CustomEvent('updateProduct', {
    detail: product
  });
  window.dispatchEvent(event)
}


module.exports = { screenCheck, updateProduct }