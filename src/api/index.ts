import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { backOff } from "exponential-backoff";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  responseType: "json",
});

const get = instance.get;

const post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return backOff(
    async () => {
      const res = await instance
        .post<T, AxiosResponse>(url, data, config)
        .catch(async (err) => {
          if (err.response) {
            // invalid auth
            if (err.response.status === 401) {
              // try silent refresh once in case token expire
              return instance.post<T, AxiosResponse>(url, data, config);
            }
            // rate limited
            if (err.response.status === 429) {
              throw new Error("retry");
            }
          }
          throw err;
        });
      return res;
    },
    {
      retry: (err: any) => {
        return err.message === "retry";
      },
      jitter: "full",
    }
  );
};

const api = { post, get };

export default api;
