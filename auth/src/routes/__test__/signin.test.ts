import request from 'supertest';
import app from '../../app';

const urls = {
  signin: '/api/users/signin',
  signup: '/api/users/signup',
};

it('fails when account does not exist', async () => {
  await request(app)
    .post(urls.signin)
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when incorrect password supplied', async () => {
  await request(app)
    .post(urls.signup)
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post(urls.signin)
    .send({
      email: 'test@email.com',
      password: 'badpassword',
    })
    .expect(400);
});

it('responds with cookie with valid credentials', async () => {
  const credentials = {
    email: 'test@email.com',
    password: 'password',
  };

  await request(app).post(urls.signup).send(credentials).expect(201);

  const res = await request(app)
    .post(urls.signin)
    .send(credentials)
    .expect(200);
  expect(res.get('Set-Cookie')).toBeDefined();
});
