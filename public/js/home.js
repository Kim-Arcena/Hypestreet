let slides = document.querySelectorAll('.slider-container');
let index = 0;
let header = document.querySelector('header');


//slider animation js

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}


function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

const getProducts = (tag) => {
  return fetch('/get-products', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({tag: tag})
  }).then(res => res.json())
  .then(data => {
      return data
  })
  .catch(err => {
      console.log(err);
      alert('no product found');
      location.replace('/404');
  })
}


displayProductId = null;

const createProductCards = (data, title, ele) =>{
    let container = document.querySelector(ele);
    container.innerHTML += `
    <h1 class="section-title">${title}</h1>
    <div class="listing-container">
        <div class="listing-container-parent">
        ${createCards(data, ele)}
        </div>
    </div>   
    `;
}

const createCards = (data, ele) => {
    let cards = '';
    if(ele === '.best-selling-product-section'){
        data = data.slice(0,4);
    }    

    data.forEach(item =>{
        cards += `
        <div class="listing-card" onclick="location.href = '/products/${item.id}'">
            <div class="listing-name">${item.name}<br><span>${item.tags[0]}</span></div>
            <img src="${item.images[0]}" class="product-image" alt="">              
            <div class="product-info">
                <div class="price">$<span>${item.price}.00</span></div>
                <button class="buy-now-button">Buy Now</button>
            </div>
        </div> 
        `
    })
    return cards;
}

//cart funtion
const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart === null){
        cart = [];
    }

    product = {
        item: 1,
        displayProductName: product.name,
        displayPrice: product.price,
        displayImagePath: product.images[0],
        displayShortDes: product.shortDes,
        size: size || null
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    return 'added to cart';
}
