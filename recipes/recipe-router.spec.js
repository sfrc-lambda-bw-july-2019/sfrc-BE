const db = require('../data/dbConfig.js');

const Recipes = require('./recipe-router.js');

describe('the recipe router', () => {
    
    describe('GET /', () => {
        it('should return 200', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        })
    })
})
