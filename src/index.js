const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jsonFile = require('./users.json')
const app = express();


// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send({"message": "IVL_PM"});
});

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.get('/api/v1/users', async (req, res) => {
  res.send(jsonFile);
});

app.delete('/api/v1/users/:id', async (req, res) => {
    const temp = JSON.parse(JSON.stringify(jsonFile));
    
    temp.users.add({"PlayerName": req.params.id});

    jsonFile.push(temp);
    res.send({ message: 'PLR_LOUT' });
});

app.post('/api/v1/users/logout/:id', async (req, res) => {
    const temp = JSON.parse(JSON.stringify(jsonFile));

    for(temp2 in temp.users) {
        if(temp2.PlayerName == req.params.id) {
            temp2 = null;
        }
    }

    jsonFile.push(temp);
    res.post({message: 'PLR_LGD'})
});


// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});