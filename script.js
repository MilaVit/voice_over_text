const speek = window.speechSynthesis;

const pitch = document.getElementById('pitch');
const rate = document.querySelector('#rate');
const text = document.querySelector('#text');
const voiceSelect = document.getElementById('voices');
const btnStop = document.querySelector('#btn-stop');
const btnStart = document.querySelector('#btn-start');
const err = document.querySelector('.error');
let cont = document.querySelector('.container');

speek.addEventListener('voiceschanged', changeVoices);
btnStart.addEventListener('click', speakVoices);
btnStop.addEventListener('click', stopSpeaking);

let voices = [];

function changeVoices() {
    voices = window.speechSynthesis.getVoices();

    let voiceList = voices.map((voice, index) => {

       return `<option value=${index}>${voice.name} ${voice.lang}</option>`
    });

    voiceSelect.innerHTML = voiceList;
}

function speakVoices() {
    if(speek.speaking || text.value === '') {
    err.innerHTML = 'Unable to play text!'
    cont.style.display = 'none'
    }
    if(text.value !== '') {
        const listenText  = new SpeechSynthesisUtterance(text.value)
        listenText.voice = voices[voiceSelect.value]
        listenText.pitch = pitch.value
        listenText.rate = rate.value
        speek.speak(listenText)
    }
}

function stopSpeaking() {
    if(speek.speaking) {
        speek.cancel()
    }
}




