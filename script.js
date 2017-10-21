function ready(docReady) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    docReady();
  } else {
    document.addEventListener('DOMContentLoaded', docReady);
  }
}
var docReady = () => {

    ///////////// CART JAVASCRIPT /////////////

    ////// create an empty cart array that's in the local
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    ////// find out how many items are in the cart, display on cart menu item (TO DO)
    var itemsInCart = cart.length;

    ///// show items in cart
    // pull cart items from local storage to Items in Cart, find how many items in car
    if (cart == null) {
        console.log('cart is empty');
    } else {
        for (var i in cart) {
            console.log('stuff in cart');
        }
    }

    // adding item to cart
    function addItem(name, price, color, size, count) {
        // define variable for the item to be added
        var item = {name: name, price: price, color: color, size: size, count: count};
        // loop through all existing items in cart variable, and if same item just add to item count
        var exists = false;
        for (var i in cart) {
            if (cart[i].name === name && cart[i].color === color && cart[i].size === size) {
                cart[i].count += count;
                console.log(cart);
                exists = true;
                break;
            }
        }
        // if it doesn't exist, add new line item to cart variable
        if(!exists) {
            cart.push(item);
            console.log(cart);
        }
        // updating the cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));
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