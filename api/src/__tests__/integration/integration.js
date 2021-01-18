const supertest = require('supertest');
const app = require('../../../../api/src/index.js');
const Helpers = require('../../utils/helpers.js')
const request = supertest(app);



describe('GET /test', () => {
    test('responds with 200', async (done) => {
        try {
            await request
                .get('/test')
                .expect(404, done())
        } catch (e) {

        }
    })
})

describe('POST /number endpoint', () => {
  let uuid = Helpers.generateUUID();
  const numberRecord = [
    {
      uuid: uuid,
      number: '2',
      answer: 'Tweede nummer',
      category: 'nummer'
    },
  ];

  test('POST- /number endpoint', async (done) => {
    try {
      await request.post('/number').send(numberRecord).expect(201);
      done();
    } catch (error) {}
  });
  test('POST- /number endpoint send error if not working', async (done) => {
    try {
      const numbersPost = await request.post('/number');
      expect(numbersPost.status).toBe(400);
      done();
    } catch (error) {}
  });
});