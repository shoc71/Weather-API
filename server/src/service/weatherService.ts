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
  private latitude: number;
  private longitude: number;

  constructor (API_KEY: string, cityName: string, baseURL: string, longitude: number, latitude: number) {
    this.API_KEY = API_KEY
    this.cityName = cityName
    this.baseURL = baseURL
    this.latitude = latitude
    this.longitude = longitude
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
      return await response.json();
    } catch (error) {
      console.error('Error fetching location data: ', error)
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
    return `${this.baseURL}?lat=${this.latitude}&lon=${this.longitude}&appid=${this.API_KEY}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
