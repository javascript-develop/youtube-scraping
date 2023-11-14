const express =require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

app.use(cors({
  origin: "https://my-web-48f68.web.app",
}));


app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));



// app.js

const ytdl = require('ytdl-core');


const YOUR_API_TOKEN = process.env.AUDIO_PROCESSOR_KEY;
const transcriptEndpoint = 'https://api.assemblyai.com/v2/transcript';

const headers = {
  Authorization: `Bearer ${YOUR_API_TOKEN}`,
  'Content-Type': 'application/json',
};

app.use(express.json());

app.post('/api/start-transcription', async (req, res) => {
  try {
    const videoURL = req.body.videoURL;

    if (!videoURL) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    const info = await ytdl.getInfo(videoURL);

    if (!info || !info.formats || info.formats.length === 0) {
      return res.status(400).json({ error: 'No valid video formats found' });
    }

    const audioFormat = info.formats.find((format) => format.itag === 140);

    if (!audioFormat) {
      return res.status(400).json({ error: 'No valid audio format found' });
    }

    const audioURL = audioFormat.url;
    console.log('Found audio stream URL:', audioURL);

    // Submit the audio for transcription
    const data = {
      audio_url: audioURL,
    };

    const response = await axios.post(transcriptEndpoint, data, { headers });
    const transcriptionId = response.data.id;

    res.json({ transcriptionId });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/check-transcription-status/:transcriptionId', async (req, res) => {
  try {
    const transcriptionId = req.params.transcriptionId;

    if (!transcriptionId) {
      return res.status(400).json({ error: 'Transcription ID is required' });
    }

    const pollingEndpoint = `${transcriptEndpoint}/${transcriptionId}`;

    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, { headers });
      const transcriptionResult = pollingResponse.data;

      if (transcriptionResult.status === 'completed') {
        // Add nutritional data processing here if needed
        return res.json({ status: 'completed', result: transcriptionResult.text });
      } else if (transcriptionResult.status === 'failed') {
        return res.json({ status: 'failed' });
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Add more routes/functions as needed

// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// all router
const userRouter = require("./router/user");
const errorHandeler = require("./utilities/errorHendeler");
app.use("/api/v1/user", userRouter);
app.use("/", (req, res) => {
  res.send("hellw world");
});

app.use(errorHandeler);

module.exports = app;
