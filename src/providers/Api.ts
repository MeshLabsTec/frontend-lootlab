import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_URL_BACKEND
    : process.env.NEXT_PUBLIC_URL_BACKEND;

export const Api = axios.create({ baseURL, withCredentials: true });
