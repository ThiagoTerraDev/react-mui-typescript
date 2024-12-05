import { AxiosError } from "axios";


export const errorInterceptor = (error: AxiosError) => {
  
  if (error.message === "Network Error") {
    return Promise.reject("An error occurred while trying to reach the server. Please check your internet connection.");
  }

  // if (error.response?.status === 401) {
  //   Do something
  // }

  return Promise.reject(error);
};
