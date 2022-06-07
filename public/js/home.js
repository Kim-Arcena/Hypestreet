// responsive nav bar
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let slides = document.querySelectorAll('.slider-container');
let index = 0;
let header = document.querySelector('header');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}


//slider animation js


function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}


function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

//get product functions
const getProducts = (tag) => {
  return fetch('/get-products', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({tag: tag})
  })
  .then(res => res.json())
  .then(data => {
      return data
  })
}

const createProductCards = (data, title, ele) => {
  if(data.length){
      let container = document.querySelector(ele);
      container.innerHTML += `
      <h1 class="section-title">${title}</h1>
      <div class="product-container">
        ${createCards(data)}
      </div>  
      `;
  }
}


const createCards = data => {
  let cards = '';

  data.forEach(item => {
      if(item.id != productId){
          cards += `
          <div class="product-card">
              <div class="product-name">${item.name}</div>
              <img src="${item.image}" onclick="location.href = '/products/${item.id}'" class="product-image" alt="">              
          </div>
      `
      }
  })

  return cards;
}
 