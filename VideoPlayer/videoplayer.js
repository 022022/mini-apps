const container = document.querySelector('.video-container');
const playBtn = document.querySelector('.play-btn');
const skipBtns = document.querySelectorAll('[data-skip]');
const volumeSlider = document.querySelector('.volume-slider');
const rateSlider = document.querySelector('.rate-slider');
const timelineSlider = document.querySelector('.timeline-slider');


const video = document.createElement("video");
video.src = './assets/video/dinner.mp4';
container.appendChild(video);
changeVolume();
changeRate();


function playPauseVideo(){
	if (video.paused){		
		video.play();	
		playBtn.innerHTML = "❚ ❚"
	}
	else{
		video.pause();
		playBtn.innerHTML = "►";
	}	
}



function skip(event){
	video.currentTime = video.currentTime + Number(event.target.dataset.skip);
}



function changeVolume(){
	video.volume = volumeSlider.value;	
	const currentVolume = volumeSlider.value*100;
	updateThumb(volumeSlider, currentVolume);
}

function changeRate(){
	video.playbackRate = rateSlider.value;
	const currentRate = rateSlider.value*100/2;
	updateThumb(rateSlider, currentRate);
}

function updateTimeline(){	
	const progress = (video.currentTime / video.duration) * 100;
	timelineSlider.value = progress;
	updateThumb(timelineSlider, progress);
}

function updateThumb(target, value){
	target.style.background = `linear-gradient(to right, #82CFD0 ${value}%, #fff ${value}%)`
}


function seek(event){	
	video.currentTime = event.offsetX/timelineSlider.clientWidth * video.duration;
}

playBtn.addEventListener('click', playPauseVideo);
volumeSlider.addEventListener('input', changeVolume);
rateSlider.addEventListener('input', changeRate);
timelineSlider.addEventListener('click', seek);

video.addEventListener('timeupdate', updateTimeline);

Array.from(skipBtns).map(item => item.addEventListener('click', skip));
