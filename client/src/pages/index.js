import { SSR_BASE_URL } from '../config';

export async function getServerSideProps({ req }) {
  try {
    const axios = await import('axios');
    const { data } = await axios.get(`${SSR_BASE_URL}/api/users/current`, {
      headers: req.headers,
    });

    return {
      props: {
        currentUser: data,
      },
    };
  } catch (e) {
    return { props: {} };
  }
}

export default ({ currentUser }) => {
  return <h1>Landing page!!!</h1>;
};
