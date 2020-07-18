import Router from 'next/router';
import AuthForm from '../../components/AuthForm';

export default () => {
  const reqConfig = {
    url: '/api/users/signup',
    method: 'POST',
    onSuccess() {
      Router.push('/');
    },
  };

  return <AuthForm label="Sign Up" config={reqConfig} />;
};
