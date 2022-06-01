window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}


let formBtn = document.querySelector('.submit-btn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name');
    let email = document.querySelector('#email'); 
    let password = document.querySelector('#password');
    let number = document.querySelector('#number');
    let tac = document.querySelector('#tc');


    //form validation
    if(fullname.value.length < 3){
        showFormError('Fullname must be at least 3 characters');
    }
    else if(!email.value.length){
        showFormError('Email is required');
    }
    else if(password.value.length < 8){
        showFormError('Password must be at least 8 characters');
    }
    else if(Number(number) || number.value.length < 10){
        showFormError('Invalid Number');
    }
    else if(!tac.checked){
        showFormError('You must agree to the terms and conditions');
    }
    else{
        loader.style.display = 'block';
        sendData('/signup', {
            name: fullname.value,
            email: email.value,
            password: password.value,
            number: number.value,
            tac: tac.checked
        });
    }


})