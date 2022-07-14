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