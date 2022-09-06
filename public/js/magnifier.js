const magnifyProductImages = document.querySelectorAll(".product-images img");
const magnifyProductImageslide = document.querySelector(".product-image-main");
const magnifyProductCont = document.querySelector(".image-slider");
const ZOOM = 200; 
let activeImageSlide = 0;

magnifyProductCont.addEventListener('mouseenter',() =>{
    magnifyProductImageslide.style.width = ZOOM + '%';
})

magnifyProductCont.addEventListener('mouseleave',() =>{
    magnifyProductImageslide.style.width = '100%';
    magnifyProductImageslide.style.top = '0';
    magnifyProductImageslide.style.left = '0';
})

magnifyProductCont.addEventListener('mousemove',(mouseEvent) =>{
    let obj = magnifyProductImageslide;
    let obj_left = 0;
    let obj_top = 0;
    let xpos;
    let ypos;

    while (obj.offsetParent) {
        obj_left += obj.offsetLeft;
        obj_top += obj.offsetTop;
        obj = obj.offsetParent;
    }

    if(mouseEvent){
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
    }
    else{
        xpos = window.event.x + document.body.scrollLeft -  2;
        ypos = window.event.y + document.body.scrollTop - 2;
    }
    xpos -= obj_left;
    ypos -= obj_top;

    const imgWidth = magnifyProductImageslide.clientWidth;
    const imgHeight = magnifyProductImageslide.clientHeight;
    const top = magnifyProductImageslide.style.top;
    magnifyProductImageslide.style.top = -(((imgHeight - magnifyProductCont.clientHeight) * ypos) / magnifyProductImageslide.clientHeight) + 'px';
    magnifyProductImageslide.style.left = -(((imgWidth - magnifyProductCont.clientWidth) * xpos) / magnifyProductImageslide.clientWidth) + 'px';
});