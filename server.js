const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const geolocator = require('geolocator');

app.use(express.static('public'));

app.listen(PORT, () => console.log('listening on PORT:', PORT));
