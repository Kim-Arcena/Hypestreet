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
                product: displayProductId
            }
            sendData('/add-review', data);
        }
    }
})

//create dynamic form submission
const getReviews = () => {
    if (displayUser == null){
        displayUser = {
            email: undefined
        };
    }

    fetch('/get-reviews', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: displayUser.email,
            product: displayProductId
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.length){
            console.log(data);
            createReviewSection(data);
        }
    })
}

const createReviewSection = (data) => {
    let reviewSection = document.querySelector('.review-section');
    reviewSection.innerHTML += `
    <h1 class="section-title">Product Reviews</h1>
    <div class="review-container">
        ${createReviewCards(data)}
    </div> 
    `;
}

const createReviewCards = (data) => {
   let cards = '';
   
    for (let i = 0; i < 4; i++){
        if(data[i]){
            cards += `
            <div class="review-card">
                <div class="user-dp" data-rating="${data[i].rate}"><img src="../img/review/tyler.png" alt=""></div>
                <h2 class="review-title">${data[i].headline}</h2>
                <p class="review">${data[i].review}</p>
            </div>
            `;
        }
    }
    return cards;
}

getReviews();