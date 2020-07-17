import Router from 'next/router';
import AuthForm from '../../components/AuthForm';

export default () => {
  const reqConfig = {
    url: '/api/users/signin',
    method: 'POST',
    onSuccess() {
      Router.push('/');
    },
  };

  return <AuthForm label="Sign In" config={reqConfig} />;
};
