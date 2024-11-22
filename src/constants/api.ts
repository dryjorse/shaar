import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = import.meta.env.VITE_SERVER_URL;
export const $api = axios.create({ baseURL: API_URL });
export const $apiPrivate = axios.create({ baseURL: API_URL });

export enum apiConfig {
  Register = "auth/users/",
  Login = "auth/jwt/jwt/create/",
  Refresh = "auth/jwt/jwt/refresh/",
  Categories = "place/categories/",
  Places = "place/places/",
  AirQuality = "air-quality/",
}

export enum queryKeys {
  MapText = "map-text",
  Categories = "categories",
  Places = "places",
  AirQuality = "air-quality",
}

$apiPrivate.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("shaar-access-token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$apiPrivate.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.post<{ access: string }>(
          `${API_URL}/${apiConfig.Refresh}`,
          {
            refresh: Cookies.get("refresh"),
          }
        );
        localStorage.setItem("shaar-access-token", data.access);
        return $api.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  }
);
