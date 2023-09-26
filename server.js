require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log('Server is started and listening on port 3000');
})