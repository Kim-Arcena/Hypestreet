//image slider
const displayProductImages = document.querySelectorAll(".product-images img");
const displayProductImageslide = document.querySelector(".product-image-main");
const ZOOM = 300; 
let activeImageSlide = 0;

displayProductImages.forEach((item, index) =>{
    item.addEventListener('click',() =>{
        displayProductImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        displayProductImageslide.src = item.src;
        activeImageSlide = index;
    })
})

// displayProductImageslide.addEventListener('mouseenter',() =>{
//     displayProductImageslide.style.transform = `scale(${ZOOM / 100})`;
// })

// displayProductImageslide.addEventListener('mouseleave',() =>{
//     displayProductImageslide.style.transform = `scale(${1})`;
// })

// displayProductImageslide.addEventListener('mousemove',(mouseEvent) =>{
//     let obj = displayProductImageslide;
//     let obj_left = 0;
//     let obj_top = 0;
//     let xpos;
//     let ypos;

//     while (obj.offsetParent) {
//         obj_left += obj.offsetLeft;
//         obj_top += obj.offsetTop;
//         obj = obj.offsetParent;
//     }

//     if(mouseEvent){
//         xpos = mouseEvent.pageX;
//         ypos = mouseEvent.pageY;
//     }
//     else{
//         xpos = window.event.x + document.body.scrollLeft -  2;
//         ypos = window.event.y + document.body.scrollTop - 2;
//     }
//     xpos -= obj_left;
//     ypos -= obj_top;

//     const imgWidth = displayProductImageslide.clientWidth;
//     const imgHeight = displayProductImageslide.clientHeight;

//     displayProductImageslide.style.top = -(((imgHeight - this.canvasHeight)*ypos)/this.clientHeight) + 'px';
//     displayProductImageslide.style.left = -(((imgWidth - this.canvasWidth)*xpos)/this.clientWidth) + 'px';
//     console.log(displayProductImageslide.style.top);
// })


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
let displayPrice = document.querySelector('.price span');
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
        getProducts(data.tags[0]).then(res => createProductCards(res, data.tags[0], '.best-selling-product-section'))
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
        // displayProductImageslide.style.backgroundImage = data.images;
        displayProductImageslide.src = activeImage =  imagePath = data.images[0];
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

