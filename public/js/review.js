//star rating
let ratingStarInput = [...document.querySelectorAll('.rating-star')];
let rate = 0;


ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i < 5; i++){
            if(i <= index){
                ratingStarInput[i].src = '../img/product-des/fill-star.png';
            }
            else{
                ratingStarInput[i].src = '../img/product-des/no-fill-star.png';
            }
            console.log("starrr");
        }
    })
})   


//review form
let reviewHeadline = document.querySelector('.review-headline');
let reviewField = document.querySelector('.review-field');
let loader = document.querySelector('.loader');

let addReviewBtn = document.querySelector('.add-review-button');

addReviewBtn.addEventListener('click', () => {
    if(displayUser == null){
        location.href = `/login?after_page=${displayProductId}`;
        console.log('login first');
    }
})