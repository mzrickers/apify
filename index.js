const apiUrl = "https://api.ecommerce.com/products";
let productArray = [];
let lowPrice = 0;
let highPrice = 100000;

// example products to be pulled from the website
let products = [
  {
    "id": 1,
    "price": 1,
    "product": "product1"
  },
  {
    "id": 2,
    "price": 99999,
    "product": "product2"
  }
]

const countProduct = async (lowPrice, highPrice) => {
  const response = await axios.get(apiUrl, {
    params: {
      minPrice: lowPrice,
      maxPrice: highPrice
    }
  });

  let lowerLimit = lowPrice;
  let upperLimit = highPrice;

  while (upperLimit > lowerLimit) {
    // if there is greater than 1000 you will miss out on counting some products
    if (response.data.count >= 1000) {
      // call function recursively by splitting search area in half
        countProduct(lowerLimit, (lowerLimit + upperLimit / 2));
    } else {
      response.data.products.forEach(product => {
        if (product.price > lowerLimit) {  // update the price so you have new minimum at end 
          lowerLimit = product.price;
        } 
        // push each product to the array
        productArray.push(product);
      })
      // increment lower limit and upper limit back to 100000 so you have a new range of prices
      lowerLimit += .01;
      upperLimit = 100000;
    };
  }
};