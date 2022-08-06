//sticky navbar
let headers = document.querySelector('header');

window.addEventListener('scroll', () => {
    if(window.scrollY > 270){
        headers.classList.add('bg');
    }else{
        headers.classList.remove('bg');
    }
});

const createNavbar = () => {
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML += `
        <ul>
            <li class="logo"><a href="/">HYPSTRT.ILO</a></li>
            <li class="nav-btn"><span class="fas fa-bars"></span></li>
            <div class="items">
                <li><a href="/">home</a></li>
                <li><a href="/product-list/all">products</a></li>
                <li><a href="/about">about</a></li>
                <li class="cart" onclick="location.href = '/cart'">
                    <a href="#" class="fas fa-shopping-cart"></a>
                    <span class="cart-item-count">00</span>
                </li>
                <li class="user">
                    <a class="fas fa-user"></a>
                    <div class="user-icon-popup">
                        <p>Login to your account</p>
                        <a class="log-btn">Login</a>
                    </div>
                </li>   
            </div>
            <li class="search-icon">
                <input class="search" type="search" placeholder="Search">
                <label class="icon">
                <span class="fas fa-search"></span>
                </label>
            </li>
        </ul>
    `   
}

createNavbar();


// responsive
// responsive nav bar
let navbar = document.querySelector('nav');
let navSpan = document.querySelector('.nav-btn span');
let items = document.querySelector('.items');
let menu = document.querySelector('.nav-btn');

menu.onclick = () =>{
    items.classList.toggle('show');
    navSpan.classList.toggle('show');
  }
  
  window.onscroll = () =>{
    // menu.classList.remove('fa-times');
    // navbar.classList.remove('active');
}


//user icon pop up
let userIcon = document.querySelector('.user');
let userPopupIcon = document.querySelector('.user-icon-popup');

userIcon.addEventListener('click', ()=> userPopupIcon.classList.toggle('active'));

let text = userPopupIcon.querySelector('p');
let actionBtn = userPopupIcon.querySelector('a');
let displayUser = JSON.parse(sessionStorage.user || null);

if(displayUser != null){
    text.innerHTML = `Welcome <b>${displayUser.name}</b>`;
    actionBtn.innerHTML = 'Logout';
    actionBtn.addEventListener('click', () => logout());
}
else{ 
    actionBtn.innerHTML = 'Login to your account';
    actionBtn.innerHTML = 'login';
    actionBtn.addEventListener('click', () => location.href = '/login');
    
}

const logout = () => {
    sessionStorage.clear();
    location.reload();
}

//search box
let searchBtn = document.querySelector('.icon');
let searchBox = document.querySelector('.search');

searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = `/product-list/${searchBox.value}`;
    }
})

const updateNavCartCounter = () => {
    let cartCount = document.querySelector('.cart-item-count');
    let cartItem = JSON.parse(localStorage.getItem('cart'));

    if(cartItem != null){
        cartCount.innerHTML = `0${cartItem.length}`;
    }
    else{
        cartCount.innerHTML = '00';
    }
}

updateNavCartCounter();