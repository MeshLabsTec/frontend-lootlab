import { Api } from "@/providers/Api";

interface CarouselImage {
  id: string;
  title: string;
  path: string;
  order: number;
  active: boolean;
}

export default class CarouselService {
  public static async getCarousel(): Promise<CarouselImage[]> {
    return Api.get(`/carousel`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response)
      .then((response) => response.data)
      .catch((e) => e);
  }
}
