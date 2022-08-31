const searchKey = decodeURI(location.pathname.split('/').pop());

getProducts(searchKey).then(data => createProductCards(data, searchKey, '.listing-product-section'));


let moreReleasesBtn = document.querySelector('.more-releases');
let currentItem = 6;

moreReleasesBtn.onclick = () => {
    let listingCard = [...document.querySelectorAll('.listing-card')];
    for(var i = currentItem; i < currentItem + 6; i++) {
        const element = listingCard[i];

        if(typeof(element) === "undefined") {
            continue;
        }
        element.style.display = 'block';

    }
    currentItem += 6;

    if(currentItem >= listingCard.length) {
        moreReleasesBtn.style.display = 'none';
    }
}