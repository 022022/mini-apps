const rocket = document.querySelector('.rocket');
const asteroid = document.querySelector('.asteroid');
const mainContainer = document.querySelector('.main-container');
const score = document.querySelector('.score');

let scoreNum = 0;

document.addEventListener('mousemove', moveShip);

rocket.width = parseInt(window.getComputedStyle(rocket).width);
rocket.height = parseInt(window.getComputedStyle(rocket).height);

asteroid.width = parseInt(window.getComputedStyle(asteroid).width);
asteroid.height = parseInt(window.getComputedStyle(asteroid).height);

function moveShip(event) {

    rocket.style.top = (event.clientY-100) + 'px';

    if (parseInt(rocket.style.top) >= parseInt(window.getComputedStyle(mainContainer).height) - 100){
        rocket.style.top = '300px';
    }
    if (parseInt(rocket.style.top) < 0){
        rocket.style.top = '0px';
    }   
}

function detectCollision() {
    let asteroidX = parseInt(window.getComputedStyle(asteroid).left);
    let asteroidY = parseInt(window.getComputedStyle(asteroid).top);

    let rocketX = parseInt(window.getComputedStyle(rocket).left) + rocket.width;
    let rocketYTop = parseInt(window.getComputedStyle(rocket).top);
    let rocketYBottom = parseInt(window.getComputedStyle(rocket).top) + rocket.height;
  

    if (asteroidX < rocketX && asteroidX > 0 && asteroidY >= rocketYTop - rocket.height && asteroidY <= rocketYBottom - rocket.height) {
        rocket.classList.add('shake');
        scoreNum++;
        score.textContent = 'Damage: '+scoreNum + '/1000';
        if (scoreNum >= 1000){            
            mainContainer.textContent = "Sorry, you lost :((( ";
            clearTimeout(timer);
        }
    }
    else {
        rocket.classList.remove('shake');
    }
}
let timer = setInterval(detectCollision, 1);


