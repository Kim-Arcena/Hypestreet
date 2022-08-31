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
      console.log(tag);
      return data
  })
  .catch(err => {
      console.log(err);
    //   alert('no product found');
    //   location.replace('/404');
  })
}


displayProductId = null;

const createProductCards = (data, tag, ele) =>{
    if(ele === '.best-selling-product-section'){
        let container = document.querySelector(ele);
        container.innerHTML += `
        <h1 class="section-title">Similar Products</h1>
        <div class="listing-container">
            <div class="listing-container-parent"> 
            ${createCards(data, tag, ele)}
            </div>
        </div> 
        `;
    }
    if(ele === '.listing-product-section'){
        let container = document.querySelector(ele);
        container.innerHTML += `
        <div class="listing-title">
            <h1 class="listing-title-main">collection</h1>
            <h1 class="listing-title-sec">${tag} <span>Shit</span></h1>
        </div>   
        <div class="listing-container">
            <div class="listing-container-parent"> 
            ${createCards(data, tag, ele)}
            </div>
        </div>
        `;
    }
    if(ele === '.top-product-section'){
        let container = document.querySelector(ele);
        container.innerHTML += `
        <h1 class="section-title">Similar Products</h1>
        <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
        <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        <div class="listing-container">
            <div class="top-listing-container-parent"> 
            ${createCards(data, tag, ele)}
            </div>
        </div> 
        `;
    }

}

const createCards = (data, tag, ele) => {
    let dataArr = [];
    let cards = '';
    if(ele === '.best-selling-product-section'){
       data.forEach(product => {
            dataArr = data.filter(product => product.tags[0] === tag);
            data = dataArr.sort(() => .5 - Math.random()).slice(0, 5);
       })
    }    
    
    data.forEach(item =>{
        if(item.id !== displayProductId){
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
        console.log(item.id);
        }
    })
    return cards;
}

getProducts("nike").then(res => createProductCards(res, "nike", '.top-product-section'));

//cart funtion
const addProductToCart = (product) => {
    updateNavCartCounter();
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart === null){
        cart = [];
    }

    product = {
        item: 1,
        displayProductName: product.name,
        displayPrice: product.price,
        displayImagePath: product.images[1],
        displayShortDes: product.shortDes,
        displaySize: size
    }

    if(typeof product.displaySize == 'undefined'){
        showFormError('Please select a size');
        return 'add to cart';
    }
    else{
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        return 'added to cart';
    }
}