let slides = document.querySelectorAll('.slider-container');
let index = 0;
let header = document.querySelector('header');


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

const getProducts = (tag) => {
  return fetch('/get-products', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({tag: tag})
  }).then(res => res.json())
  .then(data => {
      return data
  })
  .catch(err => {
      console.log(err);
      alert('no product found');
      location.replace('/404');
  })
}
