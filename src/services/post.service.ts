import type {
  IDataCreatePost,
  IDataUpdatePost,
  IPost,
} from "@/interfaces/interfaces";
import { Api } from "@/providers/Api";

export default class PostService {
  public static async getPosts(
    category?: "NFT Jogos" | "NFT Artes" | "Crypto",
  ) {
    try {
      const response = await Api.get<IPost[]>(
        `/post?${category ? `category=${category}` : ""}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Erro ao buscar os posts.");
    }
  }

  public static async getPostBySlug(slug: string) {
    try {
      const response = await Api.get<IPost>(`/post/slug/${slug}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
      });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Erro ao buscar o post.");
    }
  }

  public static async deletePost({
    id,
    authorizationToken,
  }: {
    id: string;
    authorizationToken: string;
  }) {
    try {
      const response = await Api.delete(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
      });
      return response;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async createPost({
    data,
    authorizationToken,
    authorId,
  }: IDataCreatePost) {
    try {
      const formData = new FormData();
      formData.append("file", data.file);

      formData.append(
        "postData",
        JSON.stringify({
          ...JSON.parse(data.postData),
          authorId,
        }),
      );

      const response = await Api.post(`/post`, formData, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      return response;
    } catch (error) {
      console.log("Erro ao enviar o post:", error);
      throw error;
    }
  }

  public static async updatePost({
    data,
    authorizationToken,
    authorId,
    postId,
  }: IDataUpdatePost) {
    try {
      let response;
      const formData = new FormData();
      if (data.file) {
        formData.append("file", data.file);
      }

      if (data.postData) {
        formData.append(
          "postData",
          JSON.stringify({
            ...JSON.parse(data.postData),
            authorId,
          }),
        );

        response = await Api.put(`/post/${postId}`, formData, {
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
      }

      return response;
    } catch (error) {
      console.log("Erro ao enviar o post:", error);
      throw error;
    }
  }
}
