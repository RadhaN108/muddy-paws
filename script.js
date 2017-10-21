function ready(docReady) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    docReady();
  } else {
    document.addEventListener('DOMContentLoaded', docReady);
  }
}
var docReady = () => {

///////////// CART JAVASCRIPT /////////////

// create an empty cart array
var cart = [];

// adding item to cart
function addItem(name, price, color, size, count) {
    // define variable for the item to be added
    var item = {name: name,
                price: price,
                color: color,
                size: size,
                count: count}
    // check to make sure that the item doesn't already exist in cart, if it does just add to item count
    for (var i in cart) {
        if (cart[i].name === name && cart[i].color === color && cart[i].size === size) {
            cart[i].count += count;
            return;
        }
    cart.push(item);
    }
}


////////////// PRODUCT JAVASCRIPT /////////////
// when user clicks on 'Add to Cart'...
$( "#product" ).submit(function( event ) {
    // grab the product name, price, color selected, and size selected
    var name = $(this).attr("data-name");
    var price = $(this).attr("data-price");
    var color = $("select#color").val();
    var size = $("select#size").val();
    console.log(name, price, color, size);
    // add item to the cart using the addItem function
    addItem(name, price, color, size, 1);
    console.log(cart);
    event.preventDefault();
});


}

ready(docReady)