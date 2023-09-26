require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose
    .connect(process.env.DB_HOST)
    .then(() => console.log('DB Connection Successful'))
    .catch((err) => {
        console.log('DB Error: ', err);
    });


app.listen(process.env.PORT, () => {
    console.log('Server is started and listening on port 3000');
})