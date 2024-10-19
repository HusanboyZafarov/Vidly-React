import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error! Please check your connection.");
      return Promise.reject(error);
    }

    const { status } = error.response;
    const expectedError = status >= 400 && status < 500;

    if (!expectedError) {
      toast.error("An unexpected error occurred. Please try again later.");
    } else {
      toast.error(`${error} with status code ${status}`)
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
