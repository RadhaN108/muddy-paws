function ready(docReady) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    docReady();
  } else {
    document.addEventListener('DOMContentLoaded', docReady);
  }
}

///// VARIABLES  //////
// defines the cart variable (array), pulls from local Storage if available
var cart = JSON.parse(localStorage.getItem('cart')) || [];
// number of items in cart
var numItems = cart.length;



///// FUNCTIONS  //////

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


///// RUNS WHEN DOC IS READY  //////
var docReady = () => {

    ///// show items in cart
    // get the cartTable on the cart page
    var cartTable = $("#cart-table");
    var html = "";
    // if there's no items in the cart, don't do anything
    if (numItems == 0) {
        console.log('cart is empty');
    } else { // if there are items in the cart, then add the rows to the cart page
        for (var i in cart) {
            // get data for each line item
            var name = cart[i].name;
            var price = cart[i].price;
            var color = cart[i].color;
            var size = cart[i].size;
            var count = cart[i].count;
            // append it to the html to be added, 1 row for each line item
            html += "<tr class='item'><td><div class='cart-product-image' style='background-image: url(img/cat-harness0.jpg)''></div><h3>" + name +"</h3></td><td><p>Color:  " + color + "</p><p>Size:  " + size + "</p></td><td><p>" + count + "</p></td><td><a href='#'>modify item</a><a href='#'>remove item</a></td></tr>";

            // update the number of items in the cart menu item
            var cartMenuItem = $(".cart");
            cartMenuItem.html("Cart (" + numItems + ")");
            console.log(cartMenuItem);
        }
        // add the html to the table
        cartTable.append(html);
    }


    ////////////// PRODUCT PAGE JAVASCRIPT /////////////

    // when user clicks on 'Add to Cart'...
    $("#product").submit(function(e) {
        // grab the product name, price, color selected, and size selected
        var name = $(this).attr("data-name");
        var price = $(this).attr("data-price");
        var color = $("select#color").val();
        var size = $("select#size").val();
        // console.log(name, price, color, size);
        // add item to the cart using the addItem function
        addItem(name, price, color, size, 1);
    });

}

ready(docReady)


