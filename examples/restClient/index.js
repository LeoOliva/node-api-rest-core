var rest = require('../../lib/').restClient;

var rc = require('axios').create({
    baseURL: 'https://reqres.in/api/' //Fake public api
});

rest.request({ url: '/414', method: 'get', headers: {}, params: { page: 2 } },rc)
    .then(data => { console.log(data.data) })
    .catch(error => { console.log(error) })
    ;