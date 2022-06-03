let user = JSON.parse(sessionStorage.user || null);

let greeting = document.querySelector('#seller-greeting');
greeting.innerHTML += user.name;