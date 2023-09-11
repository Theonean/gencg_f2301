let serial;
let latestData = "waiting for data";


let mic;
var sound;
var song;
var fft;
var button;

let totalPseudoLoudness = 0;
var rollingSpectrumAnalysis = new Array(7).fill(0);
var rollingSpectrumAnalysisCount = 0;
var i = 0;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  //uncomment and comment fft.setinput to have song data
  //song = loadSound("songs/fallenkingdom.mp3");
}

function prepareAudioInput() {
  button = createButton('toggle');
  button.mousePressed(toggleSong);

  //Uncomment when playing song
  //song.play();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();

  //comment this line when song input
  fft.setInput(mic);

  //For this usage saveRollingSpectrumAnalysis not needed because it resets data to 0
  //to prevent weird bubble colours imma just straight funnel the data coming in to the data array
  //setInterval(saveRollingSpectrumAnalysis, 100); // call saveRollingSpectrumAnalysis() every 2 seconds
}

//Resets array of data
function saveRollingSpectrumAnalysis() {

  //console.log(rollingSpectrumAnalysis);
  var dataString = rollingSpectrumAnalysis.join(","); // convert array to comma-separated string
  dataString += ";"; //add comma so last value is also read
  console.log(dataString);

  // Reset arrays and counts
  rollingSpectrumAnalysis = new Array(7).fill(0);
  rollingSpectrumAnalysisCount = 0;
  i++;

}

var subBass = 0;
var bass = 0;
var low = 0;
var midrange = 0;
var upperMidrange = 0;
var presence = 0;
var brilliance = 0;

//basically a process function called a lot every second
function getSoundInput() {


  var spectrum = fft.analyze();

  totalPseudoLoudness = 0;
  for (let i = 0; i < rollingSpectrumAnalysis.length; i++) {
    totalPseudoLoudness += rollingSpectrumAnalysis[i];
  }

  //go over each audio range type (bass, subBass, etc.)
  var analysisValues = [];
  for (const audioRange of Object.values(audioRanges)) {
    let mappedStart = Math.round(map(audioRange.start, 0, 20000, 0, 1024));
    let mappedEnd = Math.round(map(audioRange.end, 0, 20000, 0, 1024));
    analysisValues.push((getRangeAverage(spectrum, mappedStart, mappedEnd)));
  }

  //Save incoming audio directly into audio data
  for (let index = 0; index < analysisValues.length; index++) {
    rollingSpectrumAnalysis[index] = analysisValues[index];
  }
  console.log(rollingSpectrumAnalysis);
  rollingSpectrumAnalysisCount++;
}

function getRangeAverage(spectrum, start, end) {
  var sum = 0;
  var diff = end - start; //amount of indeces to be processed

  //calculate audiotype average
  for (let index = start; index < end; index++) {
    sum += spectrum[index];
  }
  var average = sum / 255; //normalizes sum from spectrumrange between 0 and 1
  return average / diff;
}

const audioRanges = {
  "subBass":
    { "start": 20, "end": 60 },
  "bass":
    { "start": 60, "end": 250 },
  "low":
    { "start": 250, "end": 500 },
  "midrange":
    { "start": 500, "end": 2000 },
  "upperMidrange":
    { "start": 2000, "end": 4000 },
  "presence":
    { "start": 4000, "end": 6000 },
  "brilliance":
    { "start": 6000, "end": 20000 },
}
