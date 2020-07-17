import axios from 'axios';

import { isServerSide } from '../../utils';
import { SSR_BASE_URL } from '../../config';

export const buildClient = ({ req }) => {
  if (isServerSide()) {
    return axios.create({
      baseURL: SSR_BASE_URL,
      headers: req.headers,
    });
  }

  return axios;
};
