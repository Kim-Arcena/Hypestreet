const searchKey = decodeURI(location.pathname.split('/').pop());

getProducts(searchKey).then(data => creataProductCards(data, searchKey, '.listing-product-section'));