import axios, { AxiosError, AxiosResponse } from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response: AxiosResponse) => response.data);

export default fetcher;
