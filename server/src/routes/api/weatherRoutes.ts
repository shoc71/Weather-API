import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// API-KEY = 16466b777d32b3d95deb3c27f88c0ea9

// In-memory search history (replace with a database in production)
let searchHistory: string[] = [];

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weather = await new WeatherService(process.env.WEATHER_API_KEY || '', city).getWeatherForCity();
    if (!weather) {
      return res.status(404).json({ error: 'Weather data not found' });
    }

    // TODO: save city to search history
    // Save city to search history
    if (!searchHistory.includes(city)) {
      searchHistory.push(city)
    }

    res.json(weather);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  res.json({ searchHistory });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:city', async (req, res) => {
  const { city } = req.params;
  searchHistory = searchHistory.filter(c => c !== city);
  res.json({ message: `Deleted ${city} from search history`, searchHistory });
});

export default router;
