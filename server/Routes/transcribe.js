'use strict';

// [START speech_quickstart]
// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'eastern-polygon-163418';

// Instantiates a client
const speechClient = Speech({
  projectId: projectId
});

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const options = {
  encoding: 'LINEAR16',
  languageCode: 'en-US'
};

module.exports = (sound) => {
  return speechClient.recognize(sound, options)
    .then((results) => {
      const transcription = results[0];
      console.log(`Transcription: ${transcription}`);
      return transcription;
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}
