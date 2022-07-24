//sticky navbar
window.addEventListener('scroll', () => {
    if(window.scrollY > 270){
        header.classList.add('bg');
    }else{
        header.classList.remove('bg');
    }
});

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
            <input type="search" placeholder="Search">
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
let user = JSON.parse(sessionStorage.user || null);

if(user != null){
    text.innerHTML = `Welcome ${user.name}`;
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