import { useState, useCallback } from 'react';
import Router from 'next/router';

import { useRequest } from '../../hooks/useRequest';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess() {
      Router.push('/');
    },
  });

  const handleChange = useCallback(
    (field) => (e) => {
      const { value } = e.target;
      if (field === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      doRequest();
    },
    [email, password]
  );

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            className="form-control"
            onChange={handleChange('email')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={handleChange('password')}
          />
        </div>
        {errors}
        <button className="btn btn-primary" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};
