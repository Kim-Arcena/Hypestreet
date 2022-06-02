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
    <a href="#home">home</a>
    <a href="#products">products</a>
    <a href="#about">about</a>
    
    <div class="user-interactions">
        <div class="cart">
            <a href="#" class="fas fa-shopping-cart"></a>
            <span class="cart-item-count">00</span>
        </div>
        <div class="user">
            <a href="signup.html" class="fas fa-user"></a>
            <div class="user-icon-popup">
                <p>Login to your account</p>
                <a href="">Login</a>
            </div>
        </div>
    </div>
    `
    
}

createNavbar();