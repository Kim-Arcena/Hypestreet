const container = document.querySelector('.form-img-containter');
const cards = document.querySelector('.form-img');
const rCards = document.querySelector('.form-img right-form-img');

let isPressedDown = false;
let cursorXSpace;

container.addEventListener('mousedown', (e) => {
    isPressedDown = true;
    cursorXSpace = e.offsetX  - cards.offsetLeft;
})

window.addEventListener('mouseup', () => {
    isPressedDown = false;
})

container.addEventListener('mousemove', (e) => {
    if(!isPressedDown) return;
    e.preventDefault();
    
    if(window.location.pathname === '/signup.html'){
        rightVal = (e.offsetX - cursorXSpace) * -1;
        if(rightVal < -390){
            rightVal = -390;
        }
        if(rightVal > 0){
            rightVal = 0;
        }
    }
    else{
        rightVal = (e.offsetX - cursorXSpace) * -1;
        if(rightVal < 0){
            rightVal = 0;
        }
        if(rightVal > 390){
            rightVal = 390;
        }
    }


    cards.style.right = `${rightVal}px`;
})

container.addEventListener('click', () => {
    console.log(window.location.pathname);
})



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
    let fullname = document.querySelector('#name') || null;
    let email = document.querySelector('#email'); 
    let password = document.querySelector('#password');
    let number = document.querySelector('#number') || null;
    let tac = document.querySelector('#tc') || null;


    //form validation
    //for sign up
    if(fullname != null){
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
    }    
    else{
        if(!email.value.length || !password.value.length){
            showFormError('Email and Password are required');
        }
        else{
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            });
        }
    }
})
// aws

