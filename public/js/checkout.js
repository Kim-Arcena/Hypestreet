window.onload = () => {
    if(!sessionStorage.user){
        location.replace('/login');
    }
}

const placeOrderBtn = document.querySelector('.place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    getAddress();
})

const getAddress = () => {
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let zipcode = document.querySelector('#zipcode').value;
    let landmark = document.querySelector('#landmark').value;

    if(!address. length || !street. length || !city. length || !state. length || !zipcode. length || !landmark. length){
        return showFormError('Please fill all the fields');
    }
}
