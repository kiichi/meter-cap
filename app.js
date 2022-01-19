
const noSleep = new NoSleep();
var player;
var snapshotZone;
var captureButton;
var result;
var startTime;
var timer; 
var intervalSec = 10;
var rectangle = { top: 80, left: 80, width: 160, height: 80 };

function init() {
	// Tesseract Init https://codepen.io/umaniel/pen/ExxpZbG
	player = document.getElementById('player')
	snapshotZone = document.getElementById('snapshot')
	captureButton = document.getElementById('capture')
	result = document.getElementById('result')

	navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
		player.srcObject = stream
	});

	captureButton.addEventListener('click', function() {


		//TODO: do digits only https://stackoverflow.com/questions/4944830/how-to-make-tesseract-to-recognize-only-numbers-when-they-are-mixed-with-letter
		/*Tesseract.recognize(snapshotZone, 'eng', { logger: m => console.log(m) })
		.then(({ data: { text } }) => {
			if (!result.value){
				startTime = new Date();
			}
			let currentTime = new Date();
			let timeStr = currentTime.toString();
			let diffTime = (currentTime - startTime) / 1000;
			text = text.replace("\n","").replace(",","");
			result.value += "\n";
			result.value += parseInt(diffTime / 60) + "," + timeStr + "," + diffTime + "," + text;
		});*/

		capture();
	})
}

// TODO: https://github.com/arturaugusto/display_ocr/tree/master/letsgodigital
// https://github.com/Shreeshrii/tessdata_ssd
function capture(){
	startProgress();
	console.log('capture started');
	const context = snapshot.getContext('2d');
	context.drawImage(player, 0, 0, snapshotZone.width, snapshotZone.height);
	context.strokeStyle = "#FF0000";
	context.lineWidth = 4;
	context.beginPath();
	context.rect(rectangle.left+2, rectangle.top, rectangle.width-4, rectangle.height);
	context.stroke();
	console.log('snapshotZone',snapshotZone);
	console.log('rectangle',rectangle);
	const worker = Tesseract.createWorker({langPath:'./assets/data'});
	//const worker = Tesseract.createWorker();
	(async () => {
		await worker.load();
		const lang = 'ssd';
		await worker.loadLanguage(lang);
		await worker.initialize(lang);

		// await worker.setParameters({
		// 	tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
		// 	tessedit_char_blacklist: "!?@#$%&*()<>_-+=/:;'\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		// 	tessedit_char_whitelist: '0123456789'
		// });
		const { data: { text } } = await worker.recognize(snapshotZone,{rectangle:rectangle});
		// no rect
		console.log(text);
		if (!result.value){
			startTime = new Date();
		}
		let currentTime = new Date();
		let timeStr = currentTime.toLocaleTimeString();
		let diffTime = (currentTime - startTime) / 1000;
		let lineText = text.replace(/\n|,/g,'');
		result.value += "\n";
		result.value += parseInt(diffTime / 60) + "," + parseInt(diffTime) + "," + timeStr + "," + lineText;
		await worker.terminate();
		
		// snap
		result.scrollTop = result.scrollHeight;
		stopProgress();
	})();
}

function toggleTimer(elem){
	if (timer){
		clearInterval(timer);
		document.getElementById('capture').ariaBusy = false;
	}
	if (elem.checked){
		capture();
		timer = setInterval(capture, intervalSec*1000);
		document.getElementById('capture').ariaBusy = true;
	}
}

function toggleAwake(elem) {
	if (elem.checked){
		noSleep.enable();
	}
	else {
		noSleep.disable();
	}
}

function startProgress(){
	document.getElementById('progress').indeterminate = true;
	document.getElementById('progress').style.display = 'block';
}
function stopProgress(){
	document.getElementById('progress').indeterminate = false;
	document.getElementById('progress').style.display = 'none';
}