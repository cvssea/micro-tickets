import Header from '../components/Header';

import { buildClient } from '../lib/api';
import 'bootstrap/dist/css/bootstrap.css';

const AppComponent = ({ Component, pageProps }) => {
  const { currentUser } = pageProps;
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  try {
    let pageProps = {};

    if (
      Component.getInitialProps &&
      typeof Component.getInitialProps === 'function'
    ) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const api = buildClient(ctx);
    const { data } = await api.get('/api/users/current');

    return {
      pageProps: {
        ...pageProps,
        ...data,
      },
    };
  } catch (e) {
    console.log(e.message);
    return {};
  }
};

export default AppComponent;
