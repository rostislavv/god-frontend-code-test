import { ICar } from "../types/Car";

export class CarsApi {
  // for simplicity
  private static baseUrl: string = '/api/cars';

  static async getData(): Promise<ICar[]> {
    return fetch(`${CarsApi.baseUrl}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }
}
