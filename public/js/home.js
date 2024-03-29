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
  })
}

displayProductId = null;

const createProductCards = (data, tag, ele) =>{
    if(ele === '.listing-product-section'){
        let container = document.querySelector(ele);
        container.innerHTML += `
        <div class="listing-title">
            <h1 class="listing-title-main">collection</h1>
            <h1 class="listing-title-sec">${tag} <span>Shoes</span></h1>
        </div>   
        <div class="listing-container">
            <div class="listing-container-parent"> 
            ${createCards(data, tag, ele)}
            </div>
        </div>
        `;
        console.log(data);
    }
    if(ele === '.top-product-section' || ele === '.best-selling-product-section'){
        let container = document.querySelector(ele);
        if(ele === '.top-product-section'){
            container.innerHTML += `
            <h1 class="section-title">Best Selling Products</h1>`
        }
        if(ele === '.best-selling-product-section'){
            container.innerHTML += `
            <h1 class="section-title">Similar Products</h1>`
        }
        container.innerHTML += `
        <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
        <button class="next-btn"><i class="fas fa-chevron-right"></i></button> 
        <div class="listing-container">
            <div class="top-listing-container-parent"> 
            ${createCards(data, tag, ele)}
            </div>
        </div> 
        `;
    }

    const productContainers = [...document.querySelectorAll('.top-listing-container-parent')];
    const nextBtn = [...document.querySelectorAll('.next-btn')];
    const prevBtn = [...document.querySelectorAll('.prev-btn')];

    productContainers.forEach((item, i) => {
        let widthScroll = window.innerWidth / 2;
    
        nextBtn[i].addEventListener('click', () => {
            item.scrollLeft += widthScroll;
        })
        prevBtn[i].addEventListener('click', () => {
            item.scrollLeft -=  widthScroll;
        })
    })
}

const createCards = (data, tag, ele) => {
    let dataArr = [];
    let cards = '';
    if(ele === '.best-selling-product-section'){
       data.forEach(product => {
            dataArr = data.filter(product => product.tags[0] === tag);
            data = dataArr.sort(() => .5 - Math.random());
       })
    }    
    if(ele === '.top-product-section'){
        data.forEach(product => {
            data = data.sort(() => .12 - Math.random());
        })
    }
    
    data.forEach(item =>{
        if(item.id !== displayProductId){
            cards += `
            <div class="listing-card" onclick="location.href = '/products/${item.id}'">
                <div class="listing-name">${item.name}<br><span>${item.tags[0]}</span></div>
                <img src="${item.images[0]}" class="product-image" alt="">              
                <div class="product-info">
                    <div class="price-card">$<span>${item.price}.00</span></div>
                    <button class="buy-now-button">Buy Now</button>
                </div>
            </div> 
        `
        }
    })
    return cards;
}



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
        displaySize: size,
        id: product.id
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
if(window.location.pathname === '/'){
    getProducts("home").then(res => createProductCards(res, "all", '.top-product-section'));
}

