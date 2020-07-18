import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRequest } from '../../hooks/useRequest';

export default () => {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'POST',
    body: {},
    onSuccess() {
      router.push('/');
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing out ...</div>;
};
