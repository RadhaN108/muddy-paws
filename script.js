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
    // if cart is empty, add in the item
    if (cart.length === 0) {
        cart.push(item);
        console.log(cart);
    // if cart is not empty...
    } else {
        // loop through all existing items in cart, and if same item just add to item count
        for (var i in cart) {
            if (cart[i].name === name && cart[i].color === color && cart[i].size === size) {
                cart[i].count += count;
                console.log(cart);
                return;
            // else add the new item
            } else {
                cart.push(item);
                console.log(cart);
            }
        }
    }
}


////////////// PRODUCT JAVASCRIPT /////////////
// when user clicks on 'Add to Cart'...
$("#product").submit(function( event ) {
    // grab the product name, price, color selected, and size selected
    var name = $(this).attr("data-name");
    var price = $(this).attr("data-price");
    var color = $("select#color").val();
    var size = $("select#size").val();
    // console.log(name, price, color, size);
    // add item to the cart using the addItem function
    addItem(name, price, color, size, 1);
    event.preventDefault();
});


}

ready(docReady)