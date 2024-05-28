import dotenv from 'dotenv'
import {MailRoutes} from  './routes/mailRoute'
import express from 'express';
const log = require('./helpers/loggerHelper')


dotenv.config();
const ip = process.env.SERVER_IP;
const port = process.env.SERVER_PORT;
const app = express();


app.use(express.json());
app.use(MailRoutes);


app.listen(port, () => {
    log.info(`Server is running on http://${ip}:${port}`)
    console.log(`Server is running on http://${ip}:${port}`)
});