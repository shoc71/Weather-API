import dotenv from 'dotenv';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  wind: number;
  humidity: number;

  constructor(temperature: number, wind: number, humidity: number) {
    this.temperature = temperature;
    this.wind = wind;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private API_KEY: string;
  private cityName: string;
  private baseURL: string;

  constructor (API_KEY: string, cityName: string) {
    this.API_KEY = API_KEY
    this.cityName = cityName
    this.baseURL = 'https://api.openweathermap.org/data/2.5/weather';
  }

  // private API_KEY = '16466b777d32b3d95deb3c27f88c0ea9'
  // private cityName = ''
  // private baseUrl = `api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}`
  // private baseURLCoordinates = `api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${longitude}&appid=${this.API_KEY}`
  // private baseURLCityName = `api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=${this.API_KEY}`

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching location data: ', error)
      return null;
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    };
  };

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    return `${this.baseURL}?q=${this.cityName}&appid=${this.API_KEY}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    return `${this.baseURL}?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.API_KEY}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates | null> {
    const query = this.buildGeocodeQuery();
    const data = await this.fetchLocationData(query);
    return this.destructureLocationData(data);

  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    return await this.fetchLocationData(query);
  }

  // TODO: Build parseCurrentWeather method - Parse weather data into a Weather object
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.main.wind,
      response.main.humidity
    )
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map(day => new Weather(day.main.temp, day.main.speed, day.main.humidity));
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity() {
    const coordinates = await this.fetchAndDestructureLocationData();
    if (!coordinates) return null;

    const weatherData = await this.fetchWeatherData(coordinates);
    if (!weatherData || !weatherData.main) return null;

    return this.parseCurrentWeather(weatherData);
  }
}

const API_KEY = process.env.WEATHER_API_KEY || '';
const CITY_NAME = 'New York';
// const baseURL = ''

const weatherService = new WeatherService(API_KEY, CITY_NAME);
weatherService.getWeatherForCity().then(weather => {
  if (weather) {
    console.log(`Temperature: ${weather.temperature}C`)
    console.log(`Wind Speed: ${weather.wind} m/s`)
    console.log(`Humidity: ${weather.humidity}%`)
  } else {
    console.log('Could not retrieve weather data.')
  }
})

export default WeatherService;
