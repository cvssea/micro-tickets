import request from 'supertest';
import app from '../../app';

it('returns 201 on signup success', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);
});

it('returns 400 with invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'bademail.com',
      password: 'password',
    })
    .expect(400);
});

it('returns 400 with invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'p',
    })
    .expect(400);
});

it('returns 400 with missing credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: '',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: '',
      password: 'password',
    })
    .expect(400);
});

it('duplicate emails not allowed', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
