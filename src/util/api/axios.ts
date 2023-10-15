import axios from "axios";

export const post = (
  url: string,
  data: { [key: string]: string | number | boolean | object }
) => {
  return axios.post(url, data);
};

export const get = (url: string) => {
  return axios.get(url);
};
