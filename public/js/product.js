//image slider
const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0;

productImages.forEach((item, index) =>{
    item.addEventListener('click',() =>{
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = index;
    })
})

//size toggle
const sizeBtns = document.querySelectorAll(".size-radio-btn");
let checkBtn = 0;

sizeBtns.forEach((item, index) =>{
  item.addEventListener('click',() =>{
    sizeBtns[checkBtn].classList.remove('check')
    item.classList.add('check');
    checkBtn = index;
  })  
})

//star rating
let ratingStarInput = [...document.querySelectorAll('.rating-star')];

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i < 5; i++){
            if(i <= index){
                ratingStarInput[i].src = 'img/product-des/fill-star.png';
            }
            else{
                ratingStarInput[i].src = 'img/product-des/no-fill-star.png';
            }
            console.log("starrr");
        }
    })
})   

let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let title = document.querySelector('title');

// let cartBtn = document.querySelector('.cart-btn');

const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        setData(data)
    })
    .catch(err => console.log(err))
}

const setData = (data) => {
    productName.innerHTML = title.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    price.innerHTML = data.price;
    detail.innerHTML = data.detail;

    //should be fixed
    // let productImg = document.querySelector('.product-img')
    // productImg.src = imagePath = data.image;
    productImages[0].src = imagePath = data.image;
}

let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}

