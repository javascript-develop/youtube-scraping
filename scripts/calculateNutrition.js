// const axios = require('axios');
// const express = require('express');
// const app = express();
// const port = 5000;

// app.use(express.json());

// const headers = {
//   'authorization': 'your_assemblyai_api_key', // Replace with your actual AssemblyAI API key
// };

// app.post('/start-transcription', async (req, res) => {
//   // Your transcription start logic here
// });

// app.get('/check-transcription-status/:transcriptionId', async (req, res) => {
//   // Your transcription status check logic here
// });

// app.get('/get-nutritional-data/:transcriptionId', async (req, res) => {
//   const transcriptionId = req.params.transcriptionId;

//   if (!transcriptionId) {
//     return res.status(400).json({ error: 'Transcription ID is required' });
//   }

//   try {
//     // Call the AssemblyAI API to get transcription result
//     const transcriptionResult = await getTranscriptionResult(transcriptionId);

//     // Analyze the transcription text to get food names
//     const foodNames = extractFoodNames(transcriptionResult.text);

//     if (foodNames.length === 0) {
//       console.log('No food entities found in the text:', transcriptionResult.text);
//       return res.json({ status: 'No food entities found' });
//     }

//     // Fetch nutritional data for each food name
//     const nutritionalDataPromises = foodNames.map((foodName) => fetchNutritionalData(foodName));

//     const nutritionalDataArray = await Promise.all(nutritionalDataPromises);

//     const combinedNutritionalData = nutritionalDataArray.filter((data) => data !== null).map((data) => ({
//       foodNames: data.foodName,
//       calories: data.calories,
//       protein: data.protein,
//       carbohydrates: data.carbohydrates,
//       fat: data.fat,
//     }));

//     console.log('Combined Nutritional Data:', combinedNutritionalData);

//     res.json({ nutritionalData: combinedNutritionalData });
//   } catch (error) {
//     // Handle errors
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// const getTranscriptionResult = async (transcriptionId) => {
//   // Your transcription result retrieval logic here
// };

// const extractFoodNames = (text) => {
//   // Your food name extraction logic here
// };

// const fetchNutritionalData = async (foodName) => {
//   try {
//     const apiEndpoint = `https://api.nal.usda.gov/fdc/v1/foods/search`;
//     const apiKey = 'your_fdc_api_key'; // Replace with your actual FDC API key

//     const params = {
//       api_key: apiKey,
//       query: foodName,
//     };

//     const response = await axios.get(apiEndpoint, { params });
//     const foods = response.data.foods;

//     if (foods.length > 0) {
//       const selectedFood = foods[0]; // Assuming you want the first result, you may adjust this logic
//       const nutrients = selectedFood.foodNutrients;

//       return {
//         foodName,
//         calories: getNutrientValue(nutrients, 'Energy'),
//         protein: getNutrientValue(nutrients, 'Protein'),
//         carbohydrates: getNutrientValue(nutrients, 'Carbohydrate, by difference'),
//         fat: getNutrientValue(nutrients, 'Total lipid (fat)'),
//       };
//     } else {
//       throw new Error(`Food not found: ${foodName}`);
//     }
//   } catch (error) {
//     console.error(`Error fetching nutritional data for ${foodName}:`, error);
//     return {
//       foodName,
//       calories: 0,
//       protein: 0,
//       carbohydrates: 0,
//       fat: 0,
//     };
//   }
// };

// const getNutrientValue = (nutrients, nutrientName) => {
//   const nutrient = nutrients.find((n) => n.nutrientName === nutrientName);
//   return nutrient ? nutrient.value : 0;
// };

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
