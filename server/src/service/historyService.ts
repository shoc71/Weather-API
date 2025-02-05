// import { json } from "stream/consumers";
const fs = require('fs').promises;

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id
  }
}

// const city = new City('Nevada', 25)
// console.log(city)

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private filePath = 'searchHistory.json'

  private async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8')
      return JSON.parse(data) as City[];
    } catch (error) {
      console.log(error)
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string) {
    const cities = await this.read();
    const id = cities.length > 0 ? cities[cities.length - 1].id + 1 : 1;
    cities.push(new City(name, id));
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: number) {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities)
  }
}

export default new HistoryService();
