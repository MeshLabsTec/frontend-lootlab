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
    return Api.get(`/carousel`, {})
      .then((response) => response)
      .then((response) => response.data)
      .catch((e) => e);
  }

  public static async uploadCarousel(file: File, token: string) {
    const formData = new FormData();
    formData.append("image", file);

    return Api.post("/carousel/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.data);
  }

  public static async deleteByIdCarousel(id: string, token: string) {
    return Api.delete(`/carousel/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.data);
  }
}
