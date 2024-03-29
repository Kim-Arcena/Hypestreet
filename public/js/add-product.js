let user = JSON.parse(sessionStorage.user || null);

window.onload =  () => {
    if(user == null){
        location.replace('/login');
    }
}

let editables = [...document.querySelectorAll('*[contenteditable="true"]')];

editables.map((element) => {
    let placeholder = element.getAttribute('data-placeholder');
    element.innerHTML = placeholder;
    element.addEventListener('focus', () => {
        if(element.innerHTML === placeholder){
            element.innerHTML = '';
        }
    })
    element.addEventListener('focusout', () => {
        if(!element.innerHTML.length){
            element.innerHTML = placeholder;
        }
    })
})

let uploadInputs = document.querySelectorAll('.fileupload');
let imagePath = 'img/seller/noImage.png'; // default image
let imagePaths = [];


uploadInputs.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];
        // console.log(file);
        let imageUrl;
    
        if(file.type.includes('image')){
            // means its an image
            fetch('/s3url').then(res => res.json())
            .then(url => {
                fetch(url, {
                    method: 'PUT',
                    headers: new Headers({'Content-Type': 'image/png'}),
                    body: file
                }). then(res => {
                    imageUrl = url.split("?")[0];
                    imagePaths[index] = imageUrl;
                    console.log(imageUrl);
                    let label = document.querySelector(`label[for = ${fileupload.id} ]`);
                    label.style.backgroundImage = `url(${imageUrl})`;
                    let productImage = document.querySelector('.product-img');
                    productImage.src = imageUrl;
                })
            })
        }
        else{
            showAlert('Upload Image Only');
        }
    })    
})

// form submission

let addProductBtn = document.querySelector('.add-product-btn');
let loader = document.querySelector('.loader');

let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let tags = document.querySelector('.tags');

let sizes = [];

const storeSizes = () =>{
    sizes = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item =>{
        if(item.checked){
            sizes.push(item.value);
        }
    })
}

addProductBtn.addEventListener('click', () => {
    storeSizes();
    // console.log(sizes)
    // verification
    if(productName.innerHTML == productName.getAttribute('data-placeholder')){
        showFormError('should enter product name');
    }else if(shortDes.innerHTML == shortDes.getAttribute('data-placeholder')){
        showFormError('short des must be 80 letters long');
    } else if(price.innerHTML == price.getAttribute('data-placeholder') || !Number(price.innerHTML)){
        showFormError('enter valid price');
    } else if(detail.innerHTML == detail.getAttribute('data-placeholder')){
        showFormError('must enter the detail');
    } else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormError('enter tags');
    }else{
        // submit form
        loader.style.dispaly = 'block';
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-product', data)
    }

})

const productData = () => {
    let tagsArr = tags.innerText.split(',');
    const all = 'all';
    if(!tagsArr.includes(all)||(!tagsArr.includes(productName.innerText.toLowerCase()))){
        tagsArr.push(all);
        tagsArr.push(productName.innerText);
    }
    tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

    return {
        name: productName.innerText,
        shortDes: shortDes.innerText,
        price: price.innerText,
        detail: detail.innerText,
        images: imagePaths,
        sizes: sizes,
        tags: tagsArr,
        // image: imagePath,
        email: JSON.parse(sessionStorage.user).email,
        draft: false
    }
}

// draft btn
let draftBtn = document.querySelector('.draft-btn');

draftBtn.addEventListener('click', () => {
    if(!productName.innerHTML.length || productName.innerHTML == productName.getAttribute('data-placeholder')){
        showFormError('enter product name atleast');
    } else { // don't validate the form
        let data = productData();
        loader.style.dispaly = 'block';
        data.draft = true;
        if(productId){
            data.id = productId;
        }
        sendData('/add-product', data)
    }
})


const fetchProductData = () => {
    addProductBtn.innerHTML = 'save product';
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        setFormData(data)
    })
    .catch(err => console.log(err))
}

const setFormData = (data) => {
    productName.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    price.innerHTML = data.price;
    detail.innerHTML = data.detail;
    tags.innerHTML = data.tags;

    // let productImg = document.querySelector('.product-img')
    // productImg.src = imagePath = data.image;
    imagePaths = data.images;
    imagePaths.forEach((url, index) =>{
        let label = document.querySelector(`label[for = ${uploadInputs[index].id} ]`);
        label.style.backgroundImage = `url(${url})`;
        let productImage = document.querySelector('.product-img');
        productImage.src = url;
    })

    //setup size
    sizes = data.sizes;
    let sizesCheckbox = document.querySelectorAll('.size-checkbox');
    sizesCheckbox.forEach(item =>{
        if(sizes.includes(item.value)){
            item.setAttribute('checked', '');
        }
    })

}

let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}