import axios from "axios";
import { StorageService } from "./storage.service";

const options = {
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    "cache-control": "no-cache",
  },
};

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.interceptors.request.use(
      (config) => {
        const token = StorageService.getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers["Content-Type"] = "application/vnd.api+json";
          config.headers["Accept"] = "application/vnd.api+json";
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(null, (error) => {
      if (error.response.status === 401) {
        StorageService.removeToken();

        // if the token is empty, redirect to internal/external login page
        // router.push('/login');
      }

      return Promise.reject(error);
    });
  },

  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${StorageService.getToken()}`;
    axios.defaults.headers.common["Content-Type"] = "application/vnd.api+json";
    axios.defaults.headers.common["Accept"] = "application/vnd.api+json";

    axios.interceptors.response.use(null, (error) => {
      if (error.response.status == 401) {
        StorageService.removeToken();
      }

      return Promise.reject(error);
    });
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(resource, params) {
    return axios.get(resource, params, options);
  },

  post(resource, data, options) {
    return axios.post(resource, data, options);
  },

  patch(resource, data, options) {
    return axios.patch(resource, data, options);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  },
};

export default ApiService;
