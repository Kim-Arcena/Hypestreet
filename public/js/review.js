//star rating
let ratingStarInput = [...document.querySelectorAll('.rating-star')];
let rate = 0;


ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        rate = `${index + 1}.0`;
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
    else{
        if(reviewHeadline.value == '' || reviewField.value == '' || rate == 0){
            showFormError('Please fill in all fields');
        }
        else if(reviewHeadline.value.length > 50){
            showFormError('Headline must be less than 50 characters');
        }
        else if(reviewField.value.length > 300){
            showFormError('Review must be less than 300 characters');
        }
        else{
            loader.style.display = 'block';
            let data = {
                headline: reviewHeadline.value,
                review: reviewField.value,
                rate: rate,
                email: displayUser.email,
                product: displayProductId,
            }
            sendData('/add-review', data);
        }
    }
})