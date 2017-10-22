///// VARIABLES  //////////////////
// defines the cart variable (array), pulls from local Storage if available
var cart = JSON.parse(localStorage.getItem('cart')) || [];


///// FUNCTIONS  //////////////////
// Adds a product to the current
// cart array in local storage
function addItem(name, price, color, size, count, image) {
    // define item variable
    var item = {name: name, price: price, color: color, size: size, count: count, image: image};
    // loop through all existing items in cart, and if the item exists, the +1 to item count
    var exists = false;
    for (var i in cart) {
        if (cart[i].name === name && cart[i].color === color && cart[i].size === size) {
            cart[i].count += count;
            exists = true;
            break; // stop loop when item is found
        }
    }
    // if item doesn't exist in cart, add new line item
    if(!exists) {
        cart.push(item);
        console.log(cart);
    }
    // update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// update the number of items in cart
// that displays on the cart menu item
function updateCartMenu() {
    // get the cart menu item
    var cartMenuItem = $(".cart");
    // if there's no items in cart, then no number
    if (cart.length == 0) {
        cartMenuItem.html("Cart");
        hideCartElements();
    } else {
        // otherwise, find the quantity of products in the cart
        var cartQuant = 0;
        for (var i in cart) {
            cartQuant += cart[i].count;
        }
        // update the cart menu item html
        cartMenuItem.html("Cart (" + cartQuant + ")");
    }
}

// checking if cart is empty to
// hide unnecessary cart elements
function hideCartElements() {
    // hide check out button
    $(".check-out").remove();
    // hide cart table
    $("#cart-table").remove();
}

///// WHEN DOC IS READY... //////////////////
var docReady = () => {
    // show number of items in cart in the menu
    updateCartMenu();

    //////// CART /////////
    // get the table on the cart page and create an empty html var
    var cartTable = $("#cart-table");
    var row = $('<td></td>');
    var rowsHtml = "";
    // if there's no items in the cart, hide the checkout button and table
    if (cart.length == 0) {
        hideCartElements();
    } else { // otherwise,  if the cart has items
        for (var i in cart) {
            // get data for each line item
            var name = cart[i].name;
            var price = cart[i].price;
            var color = cart[i].color;
            var size = cart[i].size;
            var count = cart[i].count;
            // append it to the html to be added, 1 row for each line item
            rowsHtml += "\
            <tr class='item'>\
                <td>\
                    <div class='cart-product-image' style='background-image: url(img/cat-harness0.jpg')>\
                    </div>\
                    <h3>" + name +"</h3>\
                </td>\
                <td>\
                    <p>Color:  " + color + "</p>\
                    <p>Size:  " + size + "</p>\
                </td>\
                <td>\
                    <p>" + count + "</p>\
                </td>\
                <td>\
                    <a href='#'>modify item</a>\
                    <a href='#' class='remove'>remove item</a>\
                </td>\
            </tr>";
        }
        // add the html rows to the table
        cartTable.append(rowsHtml);
        // show the check-out button
        $(".check-out").show();
    }

    // when the remove button is clicked...
    $(".remove").on("click", function(e) {
        // get the index of the table row
        var index = $(this).parent().parent().index(".item");
        // remove the row from the table
        $(this).parent().parent().remove();
        // remove the row from the cart array and update teh local storage
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        // update the cart menu item with current products
        updateCartMenu();
    });

    //////// PRODUCT PAGE /////////

    // when user clicks on 'Add to Cart'...
    $("#product").submit(function(e) {
        // grab the product name, price, selected color, and select size
        var name = $(this).attr("data-name");
        var price = $(this).attr("data-price");
        var color = $("select#color").val();
        var size = $("select#size").val();
        var image = $("#color option:selected").attr("data-image");
        // add item to the cart array
        addItem(name, price, color, size, 1, image);
    });
}

$(document).ready(docReady)


