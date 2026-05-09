const express = require('express');
const config = require('./config/index'); 
const connectDB = require('./config/db'); 

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sentinel AI Server is Running! ');
});

const webhookRoutes = require('./routes/webhook.routes');
app.use('/api/webhooks', webhookRoutes);

const PORT = config.port || 5000;
app.listen(PORT, () => {
    console.log(` Server is flying on port ${PORT}`);
});