import request from 'supertest';
import app from '../../app';

it('unsets cookie on signout', async () => {
  const credentials = {
    email: 'email@test.com',
    password: 'password',
  };

  await request(app).post('/api/users/signup').send(credentials).expect(201);
  const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  const [session] = res.get('Set-Cookie')[0].split(';');
  expect(session).toEqual('express:sess='); // cookie was cleared
});
