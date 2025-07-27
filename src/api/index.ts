import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

const getLogData = (
  config: InternalAxiosRequestConfig<unknown> | undefined,
) => {
  if (!config) {
    return {};
  }

  const { headers, baseURL, method, url, params, data } = config!;

  return {
    method,
    url,
    params,
    headers,
    baseURL,
    data: typeof data === 'string' ? JSON.parse(data) : data,
  };
};

const client = (config?: AxiosRequestConfig): AxiosInstance => {
  const httpClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  httpClient.interceptors.request.use(async (config) => {
    console.log(
      'Starting request -',
      new Date().toLocaleTimeString(),
      JSON.stringify(getLogData(config), null, 2),
    );

    return config;
  });

  httpClient.interceptors.response.use(undefined, async (error: AxiosError) => {
    const { message, config, response } = error;
    console.error(
      new Date().toLocaleTimeString(),
      JSON.stringify(
        { message, ...getLogData(config), response: response?.data },
        null,
        2,
      ),
    );
    return Promise.reject(error);
  });

  return httpClient;
};

const apiClient = client();

export default apiClient;
