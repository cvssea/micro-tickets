export default ({ currentUser }) => {
  if (currentUser) {
    return <h1>You are signed in!</h1>
  }

  return <h1>Please sign in</h1>;
};
