function ready(docReady) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    docReady();
  } else {
    document.addEventListener('DOMContentLoaded', docReady);
  }
}
var docReady = () => {

////////////// PRODUCT JAVASCRIPT /////////////
// when user clicks on 'Add to Cart'
$(".add-to-cart").click(function(event) {
    console.log('add to cart');
});


///////////// CART JAVASCRIPT /////////////

// create an empty cart array
var cart = [];

// adding item to cart
function addItem(name, price, color, size, count) {
    // define variable for the item to be added
    var item = {name: name, price: price, color: color, size: size, count: count}
    // check to make sure that the item doesn't already exist in cart, if it does just add to item count
    for (var i in cart) {
        if (cart[i].name === name && cart[i].color === color && cart[i].size === size) {
            cart[i].count += count;
            return;
        }
    cart.push(item);
    }
}


}

ready(docReady)