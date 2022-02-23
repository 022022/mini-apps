const rocket = document.querySelector('.rocket');
const asteroid = document.querySelector('.asteroid');

document.addEventListener("mousemove", moveShip);

function moveShip(event){
    rocket.style.top = event.clientY+'px';
    rocket.style.left = (event.clientX-200) + 'px';
}

function detectCollision(){

}
