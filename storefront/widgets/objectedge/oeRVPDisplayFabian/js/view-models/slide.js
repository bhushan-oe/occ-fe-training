export default class Slide {
  
  constructor(productList) {
    this.products = Array.isArray(productList) ? [...productList] : [];
  }
}