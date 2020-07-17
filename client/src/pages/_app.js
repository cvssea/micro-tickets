import App from 'next/app';
import { buildClient } from '../lib/api';

import 'bootstrap/dist/css/bootstrap.css';

const AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

AppComponent.getInitialProps = async (appContext) => {
  try {
    const appProps = await App.getInitialProps(appContext);

    const api = buildClient(appContext.ctx);
    const { data } = await api.get('/api/users/current');

    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        ...data,
      },
    };
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default AppComponent;
