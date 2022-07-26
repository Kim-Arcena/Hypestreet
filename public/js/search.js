const searchKey =  decodeURI(location.pathname.split('/').pop());

getProducts(searchKey).then(data => createProducts(data, searchKey, '.listing-product-section'));