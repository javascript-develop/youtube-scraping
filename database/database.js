const mongoose = require("mongoose");

const database = () => {
      const uri = process.env.database_uri;

      mongoose
            .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((data) => {
                  console.log("mongoose was connected");
            })
            .catch((error) => {
                  console.log("this is error", error);
            });
};

module.exports = database;

const ytdl = require('ytdl-core');
const YOUR_API_TOKEN = process.env.AUDIO_PROCESSOR_KEY;
const transcriptEndpoint = 'https://api.assemblyai.com/v2/transcript'; // Replace with your actual endpoint
const headers = {
  Authorization: `Bearer ${YOUR_API_TOKEN}`,
  'Content-Type': 'application/json',
};

const downloadVideo = async (videoURL) => {
  if (!videoURL) {
    return { error: 'Video URL is required' };
  }

  try {
    const info = await ytdl.getInfo(videoURL);

    if (!info || !info.formats || info.formats.length === 0) {
      return { error: 'No valid video formats found' };
    }

    const audioFormat = info.formats.find((format) => format.itag === 140);

    if (!audioFormat) {
      return { error: 'No valid audio format found' };
    }

    const audioURL = audioFormat.url;
    console.log('Found audio stream URL:', audioURL);

    // Submit the audio for transcription
    const data = {
      audio_url: audioURL,
    };

    const response = await axios.post(transcriptEndpoint, data, { headers });
    const transcriptionId = response.data.id;

    return { transcriptionId };
  } catch (error) {
    return { error: 'An error occurred' };
  }
};

// Example usage
const videoURL = 'https://www.youtube.com/watch?v=pIHZ0y3AQDQ&list=LL&index=8&t=1s';
downloadVideo()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));