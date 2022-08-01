//create product in cart

const createSmallCarts = (data) => {
    return `
    <div class="sm-product">
        <div class="sm-image-container">
            <img src="${data.displayImagePath}" class="sm-product-img" alt="">
        </div>
        <div class="sm-text">
            <p class="sm-product-name">${data.displayProductName}</p>
            <p class="sm-size">Size: ${data.size}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${data.item}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${data.displayPrice}">$${data.displayPrice * data.item}</p>    
        <buttonm class="sm-delete-btn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
    </div>
    `;
}

const setCartProducts = () => {
    const cartContainer = document.querySelector('.cart-container');
    let cart = JSON.parse(localStorage.getItem('cart'));

    console.log(cart);

    if (cart == null) {
        cartContainer.innerHTML = `<img src="img/home/empty-cart.svg" class="empty-img" alt="">`;
    }
    else{
        for(let i = 0; i< cart.length; i++){
            cartContainer.innerHTML += createSmallCarts(cart[i]);
        }
    }
}


setCartProducts();