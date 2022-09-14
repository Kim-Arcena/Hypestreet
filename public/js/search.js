const searchKey = decodeURI(location.pathname.split('/').pop().toLowerCase());
let moreReleasesBtn = document.querySelector('.more-releases');
let currentItem = 12;

getProducts(searchKey).then(data => {
    createProductCards(data, searchKey, '.listing-product-section')
    if(data.length <= 12) {
        moreReleasesBtn.style.display = 'none';
    }
}).catch(err => {errorHandler(err)});


moreReleasesBtn.onclick = () => {
    let listingCard = [...document.querySelectorAll('.listing-card')];
    for(var i = currentItem; i < currentItem + 12; i++) {
        const element = listingCard[i];

        if(typeof(element) === "undefined") {
            continue;
        }
        element.style.display = 'block';
    }
    currentItem += 12;

    if(currentItem >= listingCard.length) {
        moreReleasesBtn.style.display = 'none';
    }
}