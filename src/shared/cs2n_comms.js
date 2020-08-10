import axios from 'axios';
import querystring from 'querystring';

export const sendRequest = (
  url,
  method,
  data,
  token,
  baseURL = 'https://cs2n.org'
) => {
  return axios({
    method,
    baseURL,
    url,
    data: querystring.stringify(data),
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
};
