const searchKey = decodeURI(location.pathname.split('/').pop());

getProducts(searchKey).then(data => createProductCards(data, searchKey, '.listing-product-section'));