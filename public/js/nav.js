//sticky navbar
let headers = document.querySelector('header');

window.addEventListener('scroll', () => {
    if(window.scrollY > 270){
        headers.classList.add('bg');
    }else{
        headers.classList.remove('bg');
    }
});

//responsive
// responsive nav bar
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('nav');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  }
  
  window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}



const createNavbar = () => {
    let navbar = document.createElement('navbar');

    navbar.innerHTML += `
    <ul>
        <li class="logo">Hypestreet</li>
        <li class="btn"><span class="fas fa-bars"></span></li>
        <div class="items">
        <li><a href="#home">home</a></li>
        <li><a href="#products">products</a></li>
        <li><a href="#about">about</a></li>
        <li class="cart">
            <a href="#" class="fas fa-shopping-cart"></a>
            <span class="cart-item-count">00</span>
        </li>
        <li class="user">
            <a class="fas fa-user"></a>
            <div class="user-icon-popup">
                <p>Login to your account</p>
                <a>Login</a>
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
        location.href = `/search/${searchBox.value}`;
    }
})