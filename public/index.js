'use strict';

(function(){
var recorder;
var audio_context;

// On window load
$(function () {
    // Setup recorder if available
    try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        audio_context = new AudioContext;
        console.log('Audio context set up.');
        console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
        alert('No web audio support in this browser!');
    }

    navigator.getUserMedia({ audio: true }, startUserMedia, function (e) {
        console.log('No live audio input: ' + e);
        $(".instructions").text("something went wrong :(").toggleClass('recorder-error');
        $(".loaders").css("display", "none");
    });

    // Setup record button
    $(".loaders").on("click", toggleRecord());
});


function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');
    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');

    recorder = new Recorder(input);
    console.log('Recorder initialised.');
}

function toggleRecord() {
    var recording = false;
    return function() {
        $('div.google-loader-bar').toggleClass('start');
        
        // stop recording
        if (recording) {
            recorder.stop()
            recorder.exportWAV((b) => { // Send data to server
                sendData().then((next) => {
                    setQuestion(next);
                    recorder.clear();
                });
            })
        } else {
            recorder.record()
        }

        recording = !recording
        console.log('Recording: ', recording);   
    };
}

// TODO
function setQuestion(q) {
    console.log(q);
}

function sendData(b) {
    $.ajax("audio", {
        data: b,
        processData: false,
        success: (res) => console.log("response: ", res),
        error: (err) => console.log("response: ", err)
    });
}
})();