# Digital Meter Capture

This is a web-based OCR App to read 7 Segment Digital Display. I created this to monitor temperature but it could be applicable for any casual data capturing usage. Don't use this as critical bottle neck of the system; such as, kill-switch for your stove.

<img src="https://raw.githubusercontent.com/kiichi/meter-cap/main/examples/example.gif"/>

This is PoC level but it's working somewhat. This app uses Tessaract JS, NoSleep.js, and Pico CSS. For training data, it seems that Adrian Lazaro's training data, SSD seems work the best. 

# How to use

It's not friendly yet, but first you need to turn on camera by pressing play button. Then, either manually click the capture button or set auto option in settings.

For local debugging, use live-server plugin. Tesseract cache the training data, so if you are playing with your own or other data included in this app (see assets/data folder), restart your browser in Incognito Mode, and approve the camera usage everytime.
# TODO

Here is my todo:

- Draw Graph
- Export CSV
- Integrate with IoT services
- Reset Button
- Remember configuration
- AdHoc Javascript for post processing the data
# References
## Tesseract
- [tesseract.js/examples.md at master · naptha/tesseract.js](https://github.com/naptha/tesseract.js/blob/master/docs/examples.md)
- [tesseract.js/api.md at master · naptha/tesseract.js](https://github.com/naptha/tesseract.js/blob/master/docs/api.md)
- [ocr - How to make tkesseract to recognize only numbers, when they are mixed with letters? - Stack Overflow](https://stackoverflow.com/questions/4944830/how-to-make-tesseract-to-recognize-only-numbers-when-they-are-mixed-with-letter)

## Trained Files
- [display_ocr/letsgodigital.traineddata at master · arturaugusto/display_ocr](https://github.com/arturaugusto/display_ocr/blob/master/letsgodigital/letsgodigital.traineddata)
- [Tesseract_sevenSegmentsLetsGoDigital/README.md at master · adrianlazaro8/Tesseract_sevenSegmentsLetsGoDigital](https://github.com/adrianlazaro8/Tesseract_sevenSegmentsLetsGoDigital/blob/master/README.md)
- [tessdata_ssd/ssd.traineddata at master · Shreeshrii/tessdata_ssd](https://github.com/Shreeshrii/tessdata_ssd/blob/master/ssd.traineddata)
- [Text detection on Seven Segment Display via Tesseract OCR - Stack Overflow](https://stackoverflow.com/questions/17672705/text-detection-on-seven-segment-display-via-tesseract-ocr)
- [javascript - Tesseract and OCR can't recognize digital-like fonts - Stack Overflow](https://stackoverflow.com/questions/67521276/tesseract-and-ocr-cant-recognize-digital-like-fonts)
- [arturaugusto/display_ocr: Real-time image preprocess and OCR.](https://github.com/arturaugusto/display_ocr)

## Avoid Screenlock

- [richtr/NoSleep.js: Prevent display sleep and enable wake lock in any Android or iOS web browser.](https://github.com/richtr/NoSleep.js/)
- [Screen Wake Lock API](https://w3c.github.io/screen-wake-lock/)

## Website

- [Pico.css • Minimal CSS Framework for semantic HTML](https://picocss.com/)
