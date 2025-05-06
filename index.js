// Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/GUJYlmVBD/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

// Status der Kamera
let isCameraPaused = false;

// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	console.log(classifier);
}

function setup() {
	createCanvas(320, 260).parent('sketch');
	
	// Create the video
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();

	// Button-Event hinzufügen
	const toggleButton = document.getElementById('toggleCamera');
	toggleButton.addEventListener('click', () => {
		if (isCameraPaused) {
			// Kamera starten
			video.loop();
			toggleButton.textContent = 'hold that picture';
		} else {
			// Kamera pausieren
			video.pause();
			toggleButton.textContent = 'resume!';
		}
		isCameraPaused = !isCameraPaused;
	});

	// Start classifying
	classifyVideo();
}

function draw() {
	background(0);
	// Draw the video
	image(video, 0, 0);

	// Draw the label
	fill(255);
	textSize(16);
	textAlign(CENTER);
	text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
    if (results && results[0]) {
        // Das Label des Ergebnisses
        label = results[0].label;

        // Aktualisiere den Text im #result-Div
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `Detected Genre: ${label}`;

        // Überprüfe, ob das Ergebnis "Pop" ist
        if (label.toLowerCase() === 'pop') {
            resultDiv.textContent = 'Du bist Pop!';
        } else if (label.toLowerCase() === 'rock') {
            resultDiv.textContent = 'Du bist Rock!';
        } else if (label.toLowerCase() === 'jazz') {
            resultDiv.textContent = 'Du bist Jazz!';
        } else {
            resultDiv.textContent = `Yay du bist: ${label}`;
        }
    }

    // Starte die Klassifizierung erneut
    classifyVideo();
}
