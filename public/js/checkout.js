window.onload = () => {
    if(!sessionStorage.user){
        location.replace('/login');
    }
    if(location.search.includes('payment=done')){
        let items = [];
        localStorage.setItem('cart', JSON.stringify(items));
        showFormError('Payment Successful');
    }
}

const placeOrderBtn = document.querySelector('.place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    let address = getAddress();
    console.log(address);

    fetch('/stripe-checkout', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cart')),
            address: address,
            email: JSON.parse(sessionStorage.user).email 
        })
    }).then(res => res.json())
    .then(url => {
        location.href = url;
    })
    .catch(err => {
        console.log(err);
    })
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
    else{
        return{address, street, city, state, zipcode, landmark};
    }
}
