import request from 'supertest';
import app from '../../app';

it('responds with current user details', async () => {
  const cookie = await global.getAuthCookie();
  const res = await request(app)
    .get('/api/users/current')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser).toBeDefined();
});

it('responds with currentUser null if not authenticated', async () => {
  const res = await request(app).get('/api/users/current').expect(200);
  expect(res.body.currentUser).toBeNull();
});
