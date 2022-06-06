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

let uploadInput = document.querySelector('#upload-image');
let imagePath = 'img/noImage.png'; // default image

uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    let imageUrl;

    if(file.type.includes('image')){
        // means its an image
        fetch('/s3url').then(res => res.json())
        .then(url => {
            fetch(url, {
                method: 'PUT',
                headers: new Headers({'Content-Type': 'image/jpeg'}),
                body: file
            }). then(res => {
                imagePath = url.split("?")[0];

                let productImage = document.querySelector('.product-img');
                productImage.src = imagePath;
            })
        })
    }
})

