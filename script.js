///// VARIABLES  //////////////////
// defines the cart variable (array), pulls from local Storage if available
var cart = JSON.parse(localStorage.getItem('cart')) || [];
var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


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
    }
    // update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Adds a product (without specifics)
// to a wishlist
function addWishlistItem(name, price, path) {
    var exists = false;
    var item = {name: name, price: price, path: path};
    // check if the item is already on the wish list.
    for (var i in wishlist) {
        if (wishlist[i].name === name) {
            exists = true;
        }
    } // if it's not on the wish list than add it to the wishlist
    if (!exists) {
        wishlist.push(item);
    }
    // update the local storage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
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
            cartQuant += parseInt(cart[i].count);
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
    // show empty cart item
    $(".empty-cart").show();
};

// change display image on the
// product page and reseting active states
function changeDisplayImg(path) {
    $(".display-image").css("background-image", "url(img/" + path + ")");
    $(".thumbnails").children().children().removeClass("active");
};

// disable wishlist link if item
// already in wishlist
function disableWishlist(name) {
    var exists = false;
    for (var i in wishlist) {
        if (wishlist[i].name == name) {
            exists = true;
            $(".wishlist").text("This item's in your Wishlist!");
            $(".wishlist").css('text-decoration', 'none');
            $(".wishlist").css('cursor', 'auto');
            $(".wishlist").off('click');
            break; // stop loop when item is found
        }
    }
};


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
            var img = cart[i].image;
            // append it to the html to be added, 1 row for each line item
            rowsHtml += "\
            <tr class='item'>\
            <td>\
            <div class='cart-product-image' style='background-image: url(img/" + img +")'>\
            </div>\
            <h3>" + name +"</h3>\
            </td>\
            <td>\
            <p>Color:  " + color + "</p>\
            <p>Size:  " + size + "</p>\
            </td>\
            <td>\
            <input class='quantity' type='number' min='1' value=" + count + " required>\
            </td>\
            <td>\
            <a href='#' class='remove'>remove item</a>\
            </td>\
            </tr>";
        }
        // add the html rows to the table
        cartTable.append(rowsHtml);
        // show the check-out button
        $(".check-out").show();
        // hide empty cart state
        $(".empty-cart").hide();
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

    // when the quantity is changed...
    $(".quantity").bind('keyup mouseup', function() {
        var newCount = $(this).val();
        var index = $(this).parent().parent().index(".item");
        i = parseInt(index);
        cart[i].count = newCount;
        var updatedCount = cart[index].count;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartMenu();
    });

    // get the wishlist ul, create an html element
    var wishlistList = $("#wishlist-list")
    var html = '';
    // if there's no items in the wishlist, hide wishlist panel
    if (wishlist.length == 0) {
        $(".wishlist-panel").hide();
        $(".cart-panel").css('min-height', '620px');
    } else { // otherwise,  if the wishlist has items
        for (var i in wishlist) {
            // get data for each line item
            var name = wishlist[i].name;
            var price = wishlist[i].price;
            var path = wishlist[i].path;
            // build the li elements
            var li = "<li><h3>" + name + ", $" + price + " </h3>  <a href='" + path + "'> View </a> <a class='remove-wishlist'> Remove </a></li>";
            // add the li element to the current html variable
            html += li;
        }
    }
    // append html to the wishlist
    wishlistList.append(html);

    // remove a wishlist item when 'remove' is clicked
    $(".remove-wishlist").on("click", function(e) {
        // get the index of the li element
        var index = $(this).parent().index();
        // remove the li element
        $(this).parent().remove();
        // remove the row from the cart array and update the local storage
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        if (wishlist.length == 0) {
            $(".wishlist-panel").hide();
            $(".cart-panel").css('min-height', '620px');
        }
    });


    //////// PRODUCT PAGE /////////
    // disable wishlist for any item that's already on wishlist
    disableWishlist($("#product").attr("data-name"));

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

    // when a user clicks on 'Add to Wishlist'...
    $(".wishlist").on('click', function(e) {
        // get the name, price and path for the item
        var name = $("#product").attr("data-name");
        var price = $("#product").attr("data-price");
        var path = location.pathname.split('/').slice(-1)[0];
        // add to the wishlist array
        addWishlistItem(name, price, path);
        disableWishlist(name);
    });

    // when user selects a different color...
    $("#color").change(function(e) {
        // get the image path for that color option
        var imagePath = $("#color option:selected").attr("data-image");
        // change the display background to the right one
        changeDisplayImg(imagePath);
    });

    // when user wants to switch between images...
    $(".thumbnails").children().children().on("click", function(e) {
        var imagePath = $(this).attr("img");
        changeDisplayImg(imagePath);
        $(this).addClass("active");
    });

    //when user clicks on the left right arrows for the related products
    $(".left-arrow").on('click',function() {
        alert("Functionality is not available yet.");
    });
    $(".right-arrow").on('click',function() {
        alert("Functionality is not available yet.");
    });
}

$(document).ready(docReady)


