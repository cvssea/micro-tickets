import { useState, useCallback } from 'react';
import { useRequest } from '../hooks/useRequest';

const AuthForm = ({ label, config }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    ...config,
    body: { email, password },
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
        <h1>{label}</h1>
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
          {label}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
