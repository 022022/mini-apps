const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward');
const backwardBtn = document.querySelector('.backward');

const durationNum = document.querySelector('.durationNum');
const timeline = document.querySelector('.timeline');
const progressBar = document.querySelector('.progress')

const showVolume = document.querySelector('.showVolume');
let volumeNum = document.querySelector('.volumeNum'); 			//????
const volumeline = document.querySelector('.volumeline');
const currentVolume = document.querySelector('.currentVolume');
const volumeBlock = document.querySelector('.volume-block');

const playlistBlock = document.querySelector('.playlist-block');



 const tracks = [
	{link: 'drozd', name: 'Дрозд'},
	{link: 'javoronok', name: 'Жаворонок'},
	{link: 'slavka', name: 'Славка'},
	{link: 'solovey', name: 'Соловей'},
	{link: 'zaryanka', name: 'Зарянка'},
 ]



let playNum = 0;
let isPlay = false;


const audio = new Audio();

audio.volume = 0.75;
audio.currentTime = 0;
audio.src = './assets/sounds/'+tracks[playNum].link+'.mp3';





function renderPlaylist(){
	playlistBlock.innerHTML = tracks.map((item, index) => `<div id="${index}"> ${item.name}</div>`).join('\n');
}





function playPauseAudio(){
	playBtn.classList.toggle('-pause');
	if (!isPlay){		
		audio.play();	
		getTimeline();
	}
	else{
		audio.pause();
	}	
	isPlay = !isPlay;
	highlightTrack();
}





function play(){
		
	if (!playBtn.classList.contains('-pause')){
		playBtn.classList.add('-pause');
	}
	
	audio.src = './assets/sounds/'+ tracks[playNum].link +'.mp3';
	audio.play();	
	isPlay = true;	
	highlightTrack();
}

function playNext(){
	playNum++;
	if (playNum >= tracks.length) {
		playNum = 0;
	}	
	play();
}

function playPrev(){
	playNum--;
	if (playNum<0) {
		playNum = tracks.length-1;
	}
	play();
}

function playlistPlay(event){
	playNum = event.target.id;	
	play();
}





function highlightTrack(){
	Array.from(playlistBlock.children).map(item => item.classList.remove('-playing'))
	document.querySelector('#\\3'+playNum+' ').classList.add('-playing');
}





function getVolume(){
	volumeBlock.classList.toggle('-showVolume');
	
	const volumelineWidth = window.getComputedStyle(volumeline).width;
	currentVolume.style.width = audio.volume*parseInt(volumelineWidth)+'px';
	
	volumeNum.textContent = Math.round(audio.volume*100)+'%';
}

function seekVolume(event){
	const volumelineWidth = window.getComputedStyle(volumeline).width;
	audio.volume = event.offsetX / parseInt(volumelineWidth);
	currentVolume.style.width = audio.volume*parseInt(volumelineWidth)+'px';
	
	volumeNum.textContent = Math.round(audio.volume*100)+'%';
}




	
function getTimeline(){
	progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
	//durationNum.textContent = getTimeCodeFromNum(audio.duration)+' / '+getTimeCodeFromNum(audio.currentTime);
	durationNum.textContent = `${getTimeCodeFromNum(audio.duration)} / ${getTimeCodeFromNum(audio.currentTime)}`;
}

function getTimeCodeFromNum(num) {
	let seconds = ('0'+(Math.floor(num)%60)).slice(-2);	
	let minutes = ('0'+(Math.trunc(num/60)%60)).slice(-2);
	let hours = ('0'+(Math.trunc(num/60/60)%60)).slice(-2);
	
	return `${hours}:${minutes}:${seconds}`;
}	

function seek(event){
	const timelineWidth = window.getComputedStyle(timeline).width;	
	audio.currentTime = event.offsetX / parseInt(timelineWidth) * audio.duration;
}	




renderPlaylist();
	
let timerId = setInterval(getTimeline, 500);

playBtn.addEventListener('click', playPauseAudio);
forwardBtn.addEventListener('click', playNext);
backwardBtn.addEventListener('click', playPrev);
timeline.addEventListener('click', seek);
volumeline.addEventListener('click', seekVolume);
showVolume.addEventListener('click', getVolume);
playlistBlock.addEventListener('click', playlistPlay);