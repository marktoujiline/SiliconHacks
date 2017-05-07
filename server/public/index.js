'use strict';

(function(){

var recorder;
var audio_context;
var questionNumber = 0;
var currentQuestion = "";
var results = {};

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

    updateQuestion();
});


function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');
    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');

    recorder = new Recorder(input, {
        numChannels: 1
    });
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
                sendData(b).then((result) => {
                    results[currentQuestion] = result;
                    updateQuestion();
                    recorder.clear();
                })
                .catch(() => {
                    console.log("Error sending audio");
                })
            })
        } else {
            recorder.record()
        }

        recording = !recording
        console.log('Recording: ', recording);   
    };
}

function sendData(b) {
    return new Promise((resolve, rej) => {
        $.ajax("audio", {
                method: 'POST',
                data: b,
                contentType: "audio/wav",
                processData: false,
                success: (res) => {
                    console.log("response: ", res); 
                    resolve(res)
                },
                error: (err) => {
                    console.log("error: ", err);
                    rej()
                },
                timeout: 20000
            });
    });
}

function updateQuestion() {
    return new Promise((res, rej) => {
        $.ajax(`/interview/question/${questionNumber}`,{
            success: (q) => {
                if(q.done){
					$('.fade').fadeOut();
                    showSummary();
                    res();
                    return;
				}

                $(".instructions").text(q.question);
                questionNumber++;
                currentQuestion = q.question;            
                res(q);
            },
            error: () => {
                console.error("error getting question");
                rej()
            }
        })
    });
}


function showSummary() {
    for(var prop in results) {
        var r = $('.result');
        var title = $('<h1></h1>').text(prop).appendTo(r);
        
        $("<h2></h2>")
            .text("Language level: " + results[prop][2])
            .appendTo(r);
        
        $("<h2></h2>").text("Keywords mentioned").appendTo(r);
        
        results[prop][0].keywords.forEach((k) => {
            $("<p></p>").text(k.text).appendTo(r);
        });

        var t = results[prop][1]
            .document_tone
            .tone_categories.forEach(function(e) {
                $('<h3></h3>').text(e.category_name).appendTo(r);
                e.tones.forEach((tone) => 
                    $("<p></p>")
                        .text(tone.tone_name + " " + Math.floor(tone.score*100) + "%")
                        .appendTo(r)
                )
            });
    }
}


})();
