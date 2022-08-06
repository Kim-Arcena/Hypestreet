//image slider
const displayProductImages = document.querySelectorAll(".product-images img");
const displayProductImageslide = document.querySelector(".image-slider");

let activeImageSlide = 0;

displayProductImages.forEach((item, index) =>{
    item.addEventListener('click',() =>{
        displayProductImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        displayProductImageslide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = index;
    })
})

//size toggle
const sizeBtns = document.querySelectorAll(".size-radio-btn");
let checkBtn = 0;
let size;

sizeBtns.forEach((item, index) =>{
  item.addEventListener('click',() =>{
    sizeBtns[checkBtn].classList.remove('check')
    item.classList.add('check');
    checkBtn = index;
    size = item.innerHTML;
  })  
})

let displayProductName = document.querySelector('.product-title');
let displayShortDes = document.querySelector('.product-des');
let displayPrice = document.querySelector('.price');
let displayDetail = document.querySelector('.des');
let displayTitle = document.querySelector('title');
let displayImagePath = 'img/seller/noImage.png'; // default image
let displayImagePaths = [];

let cartBtn = document.querySelector('.cart-btn');

const displayFetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: displayProductId})
    }).then(res => res.json())
    .then(data => {
        setData(data);
        getProducts(data.tags[0]).then(res => createProductCards(res, 'similar products', '.best-selling-product-section'))
    })
    .catch(err => {
        console.log(err);
        // alert('no product found');
        // location.replace('/404');
    })
}

const setData = (data) => {
    displayProductName.innerHTML = displayTitle.innerHTML = data.name;
    displayShortDes.innerHTML = data.shortDes;
    displayPrice.innerHTML = data.price;
    displayDetail.innerHTML = data.detail;

    //display image in product page
    displayImagePaths = data.images;
    displayImagePaths.forEach((url, index) =>{  
        displayProductImages[index].src = activeImage =  imagePath = data.images[index];
        displayProductImageslide.style.backgroundImage = `url('${data.images}')`;
        let productImage = document.querySelector('.image-slider');
        productImage.style.backgroundImage = `url('${data.images[0]}')`;
    })

    sizeBtns.forEach(item =>{
        if(!data.sizes.includes(item.innerHTML)){
            item.style.opacity = '0.2';
            item.style.pointerEvents = 'none';
        }
    })

    cartBtn.addEventListener('click',() =>{
        cartBtn.innerHTML = addProductToCart(data);
    })

}

let displayProductId = null;
if(location.pathname != '/add-product'){
    displayProductId = decodeURI(location.pathname.split('/').pop());
    displayFetchProductData();
}

