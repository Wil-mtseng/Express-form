describe('Express form test', () => {
    const axios = require('axios');
    const fixture = require('./fixture')
    const readline = require('readline');

    let server
    beforeEach(() => {
        server = require('../index')
    });


    it('Return an html form', async(done) => {
        try {
            const html = await axios.get("http://localhost:3000/new-visitor")
            expect(html.data).toEqual(fixture)
        } catch (err) {
            console.log(err)
        }

        done()
    })
})