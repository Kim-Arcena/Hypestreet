//create product in cart
const createSmallCarts = (data) => {
    return `
    <div class="sm-product">
        <div class="sm-image-container">
            <buttonm class="sm-delete-btn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
            <img src="${data.displayImagePath}" class="sm-product-img" alt="">
        </div>
        <div class="sm-text">
            <p class="sm-product-name">${data.displayProductName}</p>
            <p class="sm-size">Size: ${data.displaySize}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${data.item}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${data.displayPrice}">$${data.displayPrice * data.item}</p>    
    </div>
    `;
}

let totalBill = 0;



const cartProductName = [];
let uniqueList = [];
let dupList = [];

const setCartProducts = () => {
    const cartContainer = document.querySelector('.cart-container');
    let cart = JSON.parse(localStorage.getItem('cart'));

    
    Array.prototype.contains = function(item){
    let filtered_item = this.filter((i) => {
        return (i.displayProductName === item.displayProductName) && (i.displaySize === item.displaySize);
    });
    return !!filtered_item.length;
    }
    
    function contains(list, item){
    let filtered_item = list.filter((i) => {
        return (i.displayProductName === item.displayProductName) && (i.displaySize === item.displaySize);
    });

    return !!filtered_item.length;
    }
    
    function pushToUniqueList(item){
        if(!uniqueList.contains(item)) uniqueList.push(item);
    }
    
    function pushToDuplicateList(item){
        if(!dupList.contains(item)) dupList.push(item);
    }
    
    for(let i = 0; i < cart.length; i++){
        if(uniqueList.contains(cart[i])){
            pushToDuplicateList(cart[i]);
        } 
        else {
            pushToUniqueList(cart[i]);
        }
    }
    
    console.log('Duplicate list is ', dupList);
    
    let totalCount = 0;
    console.log('Unique list is ', uniqueList);
    for(let i = 0; i < uniqueList.length; i++){
        totalCount += (uniqueList[i].id);
    }

    if (uniqueList == null || uniqueList.length == 0) {
        cartContainer.innerHTML = `<img src="img/home/empty-cart.svg" class="empty-img" alt="">`;
    }
    else{
        for(let i = 0; i< uniqueList.length; i++){
            cartContainer.innerHTML += createSmallCarts(uniqueList[i]);
            totalBill += Number(uniqueList[i].displayPrice * uniqueList[i].item);
            updateBill();
            cartProductName.push(uniqueList[i].displayProductName);
            
        }
        
    }

    
    setupCartEvents(uniqueList);
}

const updateBill = () => {
    updateNavCartCounter();
    let billPrice = document.querySelector('.bill');
    billPrice.innerHTML = `$${totalBill}`;
}


const setupCartEvents = (uniqueList) => {
    const counterMinus = document.querySelectorAll('.cart-container .decrement');
    const counterPlus = document.querySelectorAll('.cart-container .increment');
    const counts = document.querySelectorAll('.cart-container .item-count');
    const price = document.querySelectorAll('.cart-container .sm-price');
    const deleteBtn = document.querySelectorAll('.cart-container .sm-delete-btn');

    let product = uniqueList;

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
                location.reload();
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
            location.reload();
        })
    })
    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            product = product.filter((data, index) =>  index !== i );
            localStorage.setItem('cart', JSON.stringify(product));
            location.reload();
        })
    })
    console.log(counts);
}



setCartProducts();
updateNavCartCounter();