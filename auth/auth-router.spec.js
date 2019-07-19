const request = require('supertest');

const db = require('../data/dbConfig.js')
const Users = require('../users/users-model');

describe('the auth-router', () => {
    
    describe('POST /register',() => {
        
        afterEach(async () => {
            //clean up
            await db('users').truncate();
        })

        it('should instert a user into the db', async () => {
            //using our model method
            await Users.add({ username: 'Ashley', password: 'abc123'})
            await Users.add({ username: 'Mandy', password: 'abc123'})

            //confirm with knex
            const users = await db('users');

            expect(users).toHaveLength(2);
            expect(users[0].username).toBe('Ashley')
        })
    })
})



  

