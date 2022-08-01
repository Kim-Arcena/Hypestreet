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

let totalBill = 0;


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
            totalBill += Number(cart[i].displayPrice * cart[i].item);
            updateBill();
        }
    }

    setupCartEvents();
}

const updateBill = () => {
    let billPrice = document.querySelector('.bill');
    billPrice.innerHTML = `$${totalBill}`;
}


const setupCartEvents = () => {
    const counterMinus = document.querySelectorAll('.cart-container .decrement');
    const counterPlus = document.querySelectorAll('.cart-container .increment');
    const counts = document.querySelectorAll('.cart-container .item-count');
    const price = document.querySelectorAll('.cart-container .sm-price');
    const deleteBtn = document.querySelectorAll('.cart-container .sm-delete-btn');

    let product = JSON.parse(localStorage.getItem('cart'));

    counts.forEach((item, i) => {
        let cost = Number(price[i].getAttribute('data-price'));
    
        counterMinus[i].addEventListener('click', () => {
            if(item.innerHTML > 0){
                item.innerHTML--;
                totalBill -= cost;
                updateBill();
                price[i].innerHTML = `$${cost * item.innerHTML}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
            if(item.innerHTML == 0){
                product = product.filter((data, index) =>  index !== i );
                localStorage.setItem('cart', JSON.stringify(product));
                location.reload();
            }
        })
        counterPlus[i].addEventListener('click', () => {
            item.innerHTML++;
            totalBill += cost;
            updateBill();
            price[i].innerHTML = `$${cost * item.innerHTML}`;
            product[i].item = item.innerHTML;
            localStorage.setItem('cart', JSON.stringify(product));
        })
    })
    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            product = product.filter((data, index) =>  index !== i );
            localStorage.setItem('cart', JSON.stringify(product));
            location.reload();
        })
    })
}



setCartProducts();