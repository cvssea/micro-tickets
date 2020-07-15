import { useState } from 'react';
import axios from 'axios';

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const res = await axios[method](url, body);
      setErrors(null);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(res.data);
      }
      return res.data;
    } catch (e) {
      const { errorData } = e.response.data;
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {errorData.map((e) => (
              <li key={e.msg}>{e.msg}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
